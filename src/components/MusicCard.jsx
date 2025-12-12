import React, { useRef, useState, useEffect } from 'react'
import './MusicCard.css'

export default function MusicCard({
  albumArt = '/img/sample-album.png',
  title = 'Tying Knots',
  artist = 'Avino, Jared Janzen',
  audioSrc = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  initiallyPlaying = false,
}) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(initiallyPlaying)
  const [volume, setVolume] = useState(0.2) // 20% default volume

  useEffect(() => {
    // Sync play state to audio element
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.play()
        .then(() => console.debug('[MusicCard] playback started'))
        .catch((err) => {
          console.error('[MusicCard] playback failed', err)
          setIsPlaying(false)
        })
    } else {
      audio.pause()
      console.debug('[MusicCard] paused')
    }
  }, [isPlaying])

  useEffect(() => {
    // Set volume
    const audio = audioRef.current
    if (!audio) return
    audio.volume = volume
    console.debug(`[MusicCard] volume set to ${(volume * 100).toFixed(0)}%`)
  }, [volume])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onEnded = () => setIsPlaying(false)
    audio.addEventListener('ended', onEnded)
    return () => audio.removeEventListener('ended', onEnded)
  }, [])

  function togglePlay(){
    const audio = audioRef.current

    // If the audio element doesn't yet have a source, attach it on demand.
    if (audio && !audio.src) {
      // lazy-init the source to avoid network download until user interacts
      audio.src = audioSrc
      // prefer not to preload until user wants it
      try { audio.load() } catch (e) {}
    }

    // Toggle state — use effect above to actually play/pause
    setIsPlaying(prev => !prev)
    if (audio) console.debug('[MusicCard] togglePlay — audio element src=', audio.src)
  }

  return (
    <div className={`music-card ${isPlaying ? 'playing' : ''}`} role="region" aria-label="Now playing">
      {/* audio source is lazy-initialized on first play to avoid network/download cost */}
      <audio ref={audioRef} preload="none" />

      <button className={`music-thumb ${isPlaying ? 'rotating' : ''}`} onClick={togglePlay} aria-pressed={isPlaying} aria-label={isPlaying ? 'Pause' : 'Play'}>
        <img src={albumArt} alt={`${title} cover`} loading="lazy" />
        <div className={`thumb-overlay ${isPlaying ? 'playing' : ''}`}>
          <div className={`play-icon ${isPlaying ? 'pause' : 'play'}`} />
        </div>
      </button>

      <div className="music-info">
        <div className="music-meta">
          <div className="music-title">{title}</div>
          <div className="music-artist">{artist}</div>
        </div>

        <div className="music-controls">
          <div className="dot"/>
          <div className="play-status">{isPlaying ? 'Playing' : 'Paused'}</div>
          <div className="volume-display">
            {(volume * 100).toFixed(0)}%
          </div>
        </div>
      </div>
    </div>
  )
}

import React, { useState, useCallback, useEffect } from 'react';
import './Certificates.css';
import { FiExternalLink } from 'react-icons/fi';
import { BiAward } from 'react-icons/bi';

const sampleCertificates = [
  { id: 1, title: 'Clevio — Workshop GameDev', issuer: 'Clevio', date: '2025', image: '/certificate/clevio.jpg', url: '#', category: 'Projects' },
  { id: 2, title: 'IDN — WebDev Competition ', issuer: 'IDN Academy', date: '2025', image: '/certificate/idn.jpg', url: '#', category: 'Projects' },
  { id: 3, title: 'Microvac — Seminar', issuer: 'Microvac', date: '2024', image: '/certificate/microvac.jpg', url: '#', category: 'Others' },
  { id: 4, title: 'Oscar — WebDev Competition', issuer: 'Oscar Program', date: '2025', image: '/certificate/oscar.jpg', url: '#', category: 'Projects' },
  { id: 5, title: 'Binance — AWS Blockchain Node Runner', issuer: 'Binance Program', date: '2025', image: '/certificate/binance1.png', url: '#', category: 'Certifications', pinned: true },
  { id: 6, title: 'AWS — Machine Learning', issuer: 'AWS Skill Builder', date: '2025', image: '/certificate/aws1.png', url: '#', category: 'Certifications',  pinned: true },
];

export default function Certificates({ certificates = sampleCertificates, isSmallScreen = false }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(2);

  // track certificate images that failed to load so we can show an explicit UI placeholder
  const [erroredIds, setErroredIds] = useState(() => new Set());

  // pinned certificate IDs (persisted to localStorage so pins survive reloads)
  const [pinnedIds, setPinnedIds] = useState(() => {
    try {
      const raw = localStorage.getItem('pinnedCertificates');
      const saved = raw ? JSON.parse(raw) : [];
      // Allow pins to be set directly in code by adding `pinned: true` on certificate objects
      const fromCode = (certificates || []).filter(c => c.pinned).map(c => c.id);
      // merge unique
      return Array.from(new Set([...(saved || []), ...fromCode]));
    } catch (e) {
      // fallback: include code-pinned ids if localStorage read fails
      try {
        return (certificates || []).filter(c => c.pinned).map(c => c.id);
      } catch (e2) {
        return [];
      }
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('pinnedCertificates', JSON.stringify(pinnedIds));
    } catch (e) {}
  }, [pinnedIds]);

  const togglePin = useCallback((id) => {
    setPinnedIds(prev => {
      const exists = prev.includes(id);
      if (exists) return prev.filter(x => x !== id);
      return [id, ...prev];
    });
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  const openPreview = useCallback((c) => {
    setSelected(c);
    setOpen(true);
  }, []);

  const closePreview = useCallback(() => {
    setOpen(false);
    setTimeout(() => setSelected(null), 300);
  }, []);

  const filteredCerts = filter === 'all' ? certificates : certificates.filter(c => c.category === filter);
  const categories = ['all', ...new Set(certificates.map(c => c.category))];

  // When showing 'all', show pinned certificates first (maintain relative order otherwise)
  const displayedCerts = (() => {
    const list = filteredCerts.slice();
    if (filter === 'all' && pinnedIds && pinnedIds.length) {
      list.sort((a, b) => {
        const aPinned = pinnedIds.includes(a.id) ? 0 : 1;
        const bPinned = pinnedIds.includes(b.id) ? 0 : 1;
        if (aPinned !== bPinned) return aPinned - bPinned;
        return 0;
      });
    }
    return list;
  })();

  return (
    <div className="cert-wrapper">
      <div className="cert-container">
        {/* Header Section */}
        <div className="cert-header">
          <div className="cert-title-section">
            <div className="cert-icon">
              <BiAward size={28} />
            </div>
            <div>
              <h2 className="cert-main-title">Certificates & Achievements</h2>
              <p className="cert-subtitle">Professional credentials and courses I've completed</p>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="cert-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Grid of Certificates */}
        <div className="cert-grid-container">
          {displayedCerts.slice(0, visibleCount).map((c, idx) => (
            <div
              key={c.id}
              className="cert-card-wrapper"
              style={{ '--delay': `${idx * 0.1}s` }}
              onClick={() => openPreview(c)}
            >
              <div className="cert-card">
                <div className="cert-image-container">
          {erroredIds.has(c.id) ? (
            <div className="cert-image cert-image-missing" role="img" aria-label={`Image unavailable for ${c.title}`}>
              <div className="cert-missing-inner">Image unavailable</div>
            </div>
          ) : (
            <img
              src={c.image}
              alt={c.title}
              className="cert-image"
              loading="lazy"
              onError={(e) => {
                // avoid infinite loop if fallback also fails
                if (e.currentTarget.dataset.errored) return;
                e.currentTarget.dataset.errored = '1';
                // mark this certificate id as errored so we can render a visible placeholder
                setErroredIds(prev => {
                  const s = new Set(prev);
                  s.add(c.id);
                  return s;
                });
                // fallback to a bundled image that exists in the project
                e.currentTarget.src = '/img/cover.png';
                // log to help debugging missing files on deploy
                // eslint-disable-next-line no-console
                console.warn(`Certificate image failed to load: ${c.image}`);
              }}
            />
          )}

          <div className="cert-overlay">
            <div className="cert-overlay-content">
              <span className="cert-view-badge">View Details</span>
            </div>
          </div>
          <div className="cert-badge">{c.date}</div>
                </div>

                <div className="cert-info">
                  <div className="cert-category-tag">{c.category}</div>
                  <h3 className="cert-card-title">{c.title}</h3>
                  <p className="cert-issuer-name">{c.issuer}</p>
                  
                  {c.url && c.url !== '#' && (
                    <a 
                      href={c.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="cert-external-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Open Certificate <FiExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredCerts.length && (
          <div className="cert-load-more-container">
            <button 
              className="cert-load-more-btn"
              onClick={() => setVisibleCount(prev => prev + 2)}
            >
              Load More
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {open && selected && (
        <div className={`cert-modal ${open ? 'open' : ''}`} onClick={closePreview} role="dialog" aria-modal="true">
          {isSmallScreen && (
            <button className="cert-modal-back" onClick={closePreview} aria-label="Back">
              ← Back
            </button>
          )}
          <div className="cert-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="cert-modal-close" onClick={closePreview} aria-label="Close preview">
              ✕
            </button>
            
            <div className="cert-modal-body">
              <div className="cert-modal-image">
                {selected && erroredIds.has(selected.id) ? (
                  <div className="cert-image-missing cert-modal-missing" role="img" aria-label={`Image unavailable for ${selected.title}`}>
                    <div className="cert-missing-inner">Image unavailable</div>
                  </div>
                ) : (
                  <img src={selected.image} alt={selected.title} />
                )}
              </div>
              
              <div className="cert-modal-text">
                <div className="cert-modal-badge">{selected.category}</div>
                <h2 className="cert-modal-title">{selected.title}</h2>
                <p className="cert-modal-issuer">{selected.issuer}</p>
                <p className="cert-modal-date">Issued: {selected.date}</p>
                
                {selected.url && selected.url !== '#' && (
                  <a 
                    href={selected.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="cert-modal-btn"
                  >
                    View Certificate <FiExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

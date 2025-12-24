import React, { useState, useCallback, useEffect } from 'react';
import './Certificates.css';
import { FiExternalLink } from 'react-icons/fi';
import { BiAward } from 'react-icons/bi';

const sampleCertificates = [
  { id: 1, title: 'Clevio — Workshop GameDev', issuer: 'Clevio', date: '2025', image: '/certificate/clevio.jpg', url: '#', category: 'Game' },
  { id: 2, title: 'IDN — WebDev Competition ', issuer: 'IDN Academy', date: '2025', image: '/certificate/idn.jpg', url: '#', category: 'Website' },
  { id: 3, title: 'Microvac — Seminar', issuer: 'Microvac', date: '2024', image: '/certificate/microvac.jpg', url: '#', category: 'Others' },
  { id: 4, title: 'Oscar — WebDev Competition', issuer: 'Oscar Program', date: '2025', image: '/certificate/oscar.jpg', url: '#', category: 'Website' },
  { id: 5, title: 'Binance — AWS Blockchain Node Runner', issuer: 'Binance Program', date: '2025', image: '/certificate/binance1.png', url: '#', category: 'Web3' },
];

export default function Certificates({ certificates = sampleCertificates, isSmallScreen = false }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(2);

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
          {filteredCerts.slice(0, visibleCount).map((c, idx) => (
            <div
              key={c.id}
              className="cert-card-wrapper"
              style={{ '--delay': `${idx * 0.1}s` }}
              onClick={() => openPreview(c)}
            >
              <div className="cert-card">
                <div className="cert-image-container">
                  <img src={c.image} alt={c.title} className="cert-image" loading="lazy" />
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
                <img src={selected.image} alt={selected.title} />
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

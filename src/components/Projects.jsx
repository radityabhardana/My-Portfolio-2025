import React, { useState, useCallback, useEffect } from 'react';
import './Projects.css';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { BiCodeAlt } from 'react-icons/bi';

const sampleProjects = [
  {
    id: 1,
    title: 'Petani Kode Cloning',
    description: 'Full-stack e-commerce clone built with React, Node.js, and MongoDB — includes product catalog, search & filters, shopping cart, and a demo payment flow.',
    image: '/project/petanikode.png',
    category: 'Frontend',
    tech: ['Html','Bootstrap'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 2,
    title: 'Personal Portfolio',
    description: 'Responsive portfolio site built with React to showcase projects, skills, and contact info; includes animated hero and modal project previews.',
    image: '/project/portfolio.png',
    category: 'Frontend',
    tech: ['React', 'Html', 'Css', 'Js'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
  },
  {
    id: 3,
    title: 'News Website',
    description: 'News aggregator template with article listing, category filtering, and client-side search — built with HTML, CSS and vanilla JavaScript.',
    image: '/project/websiteberita.png',
    category: 'Frontend',
    tech: ['Html', 'Css', 'Js'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 4,
    title: 'Space engineering Website',
    description: 'Space-themed portfolio site featuring responsive layouts, subtle animations, and interactive UI components for showcasing work.',
    image: '/project/aether.png',
    category: 'Frontend',
    tech: ['Html', 'Css', 'Js'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
  },
  {
    id: 5,
    title: 'Ui/Ux Space Engineering',
    description: 'UI/UX case study and Figma prototype focusing on space-themed dashboards, user flows and visual design systems.',
    image: '/project/figma.png',
    category: 'Design',
    tech: ['Figma'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
  },
  {
    id: 6,
    title: 'Inventory System',
    description: 'Inventory management app with CRUD, stock tracking, and admin dashboards — implemented with PHP & MySQL and basic auth.',
    image: '/project/inventory.png',
    category: 'Fullstack',
    tech: ['MySql', 'Html', 'Css', 'Js', 'Php'],
    liveUrl: '#',
    githubUrl: 'https://github.com/radityabhardana/Inventory-System',
    featured: false,
  },
  {
    id: 7,
    title: 'Ticket Reservation',
    description: 'Ticket reservation system with booking flow and seat selection; demonstrates reservation logic and basic backend handling.',
    image: '/project/tiketbus.png',
    category: 'Fullstack',
    tech: ['Vb'],
    liveUrl: '#',
    githubUrl: 'https://github.com/radityabhardana/Pemesanan-Tiket-Bus-VBNET',
    featured: false,
  },
  {
    id: 8,
    title: 'Fashion E-commerce',
    description: 'Ticket reservation system with booking flow and seat selection; demonstrates reservation logic and basic backend handling.',
    image: '/project/urban.png',
    category: 'Frontend',
    tech: ['Html', 'Css', 'Js'],
    liveUrl: 'urbancore.netlify.app',
    githubUrl: 'https://github.com/radityabhardana/Urban-Core-Fashion-Website',
    featured: false,
  },
];

const normalizeUrl = (url) => {
  if (!url) return url;
  if (url === '#') return url;
  // allow absolute URLs (http(s), mailto, protocol-relative)
  if (/^(https?:|mailto:|\/\/)/i.test(url)) return url;
  return `https://${url}`;
};

export default function Projects({ projects = sampleProjects, isSmallScreen = false }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter);
  const categories = ['all', ...new Set(projects.map(p => p.category))];

  return (
    <div className="projects-wrapper">
      <div className="projects-container">
        {/* Header Section */}
        <div className="projects-header">
          <div className="projects-title-section">
            <div className="projects-icon">
              <BiCodeAlt size={28} />
            </div>
            <div>
              <h2 className="projects-main-title">Featured Projects</h2>
              <p className="projects-subtitle">Showcase of my latest work and creative solutions</p>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="projects-filters">
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

        {/* Projects Grid */}
        <div className="projects-grid-container">
          {filteredProjects.slice(0, visibleCount).map((project, idx) => (
            <div
              key={project.id}
              className={`project-card-wrapper ${project.featured ? 'featured' : ''}`}
              style={{ '--delay': `${idx * 0.1}s` }}
            >
              <div className="project-card" onClick={() => setSelectedProject(project)}>
                <div className="project-image-container">
                  <img src={project.image} alt={project.title} className="project-image" loading="lazy" />
                  <div className="project-overlay">
                    <div className="project-overlay-content">
                      <span className="project-view-badge">View Project</span>
                    </div>
                  </div>
                  {project.featured && <div className="project-featured-badge">Featured</div>}
                </div>

                <div className="project-info">
                  <div className="project-category-tag">{project.category}</div>
                  <h3 className="project-card-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>

                  <div className="project-tech-stack">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="tech-badge">{tech}</span>
                    ))}
                  </div>

                  <div className="project-links">
                    {project.liveUrl && project.liveUrl !== '#' && (
                      <a
                        href={normalizeUrl(project.liveUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiExternalLink size={16} />
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && project.githubUrl !== '#' && (
                      <a
                        href={normalizeUrl(project.githubUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiGithub size={16} />
                        Source Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredProjects.length && (
          <div className="projects-load-more-container">
            <button
              className="projects-load-more-btn"
              onClick={() => setVisibleCount(prev => prev + 3)}
            >
              Load More Projects
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedProject && (
        <div
          className={`project-modal ${selectedProject ? 'open' : ''}`}
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* Mobile back button (easy to tap) */}
          {isSmallScreen && (
            <button
              className="project-modal-back"
              onClick={() => setSelectedProject(null)}
              aria-label="Back"
            >
              ← Back
            </button>
          )}

          <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="project-modal-close"
              onClick={() => setSelectedProject(null)}
              aria-label="Close preview"
            >
              ✕
            </button>

            <div className="project-modal-body">
              <div className="project-modal-image">
                <img src={selectedProject.image} alt={selectedProject.title} />
              </div>

              <div className="project-modal-text">
                <div className="project-modal-badge">{selectedProject.category}</div>
                <h2 className="project-modal-title">{selectedProject.title}</h2>
                <p className="project-modal-description">{selectedProject.description}</p>

                <div className="project-modal-tech">
                  <h4>Tech Stack</h4>
                  <div className="project-modal-tech-stack">
                    {selectedProject.tech.map((tech, i) => (
                      <span key={i} className="project-modal-tech-badge">{tech}</span>
                    ))}
                  </div>
                </div>

                <div className="project-modal-links">
                  {selectedProject.liveUrl && selectedProject.liveUrl !== '#' && (
                    <a
                      href={normalizeUrl(selectedProject.liveUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-modal-btn primary"
                    >
                      <FiExternalLink size={16} />
                      View Live
                    </a>
                  )}
                  {selectedProject.githubUrl && selectedProject.githubUrl !== '#' && (
                    <a
                      href={normalizeUrl(selectedProject.githubUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-modal-btn secondary"
                    >
                      <FiGithub size={16} />
                      GitHub Repository
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

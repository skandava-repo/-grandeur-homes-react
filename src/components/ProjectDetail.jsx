import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from './Projects'
import './ProjectDetail.css'

const ProjectDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('specifications')
  const [imageLoaded, setImageLoaded] = useState(false)
  const project = projects.find(p => p.id === parseInt(id))

  if (!project) {
    return (
      <div className="not-found">
        <span className="not-found-icon">✦</span>
        <h2>Project not found</h2>
        <button onClick={() => navigate('/projects')}>Back to Projects</button>
      </div>
    )
  }

  const highlights = [
    { label: 'RCC Framed Structure', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 21h18M9 21V3h6v18M3 21V9l6-6M21 21V9l-6-6M9 9h6M9 13h6M9 17h6"/></svg> },
    { label: 'Spacious Car Parking', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M5 11V7a2 2 0 012-2h10a2 2 0 012 2v4M7 15h.01M17 15h.01"/></svg> },
    { label: 'Passenger Lift', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 6v4M9 8l3-3 3 3M12 14v4M9 16l3 3 3-3"/></svg> },
    { label: 'Marble Flooring', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="1"/><path d="M2 12h20M12 2v20M2 7h10M12 17h10"/></svg> },
    { label: 'Video Door Phone', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="6" y="2" width="12" height="20" rx="2"/><circle cx="12" cy="9" r="3"/><path d="M9 16h6"/></svg> },
    { label: 'Power Backup', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> },
    { label: 'Rain Water Harvesting', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2C12 2 6 9 6 13a6 6 0 0012 0c0-4-6-11-6-11z"/></svg> },
    { label: 'Heavy Grade Grills', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg> },
  ]

  const specifications = [
    { item: 'Foundation', spec: 'Seismic-resistant RCC Framed Structure design' },
    { item: 'Doors', spec: 'First Class Teak Frame, Solid Teak Wood Main Door with Godrej Lock' },
    { item: 'Flooring', spec: 'Vitrified Tiles for Living, Bedroom & Kitchen. Anti-skid tiles for Bathroom' },
    { item: 'Kitchen', spec: 'Granite Platform, Stainless Steel Sink, Ceramic Tile Dado, Chimney Provision' },
    { item: 'Bathroom', spec: 'Anti-skid Ceramic Floor, Wall Tiles 7ft height, American Standard Fittings' },
    { item: 'Windows', spec: 'UPVC Windows with Square Rod Grills and Locking Accessories' },
    { item: 'Electrical', spec: 'Concealed Wiring, AC Points in Bedrooms, Modular Switches' },
    { item: 'Painting', spec: 'Interior – Emulsion Paint, Exterior – Weather Shield Paint' },
  ]

  return (
    <div className="project-detail-page">
      {/* Hero */}
      <section className="detail-hero">
        <div className="detail-hero-img-wrapper">
          <img
            src={project.image}
            alt={project.name}
            className={`detail-hero-img ${imageLoaded ? 'loaded' : ''}`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        <div className="detail-hero-overlay">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {project.name}
          </motion.h1>
          <motion.p
            className="detail-hero-location"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            {project.location}
          </motion.p>
        </div>
        <div className="detail-hero-scroll-hint">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Overview Strip */}
      <motion.section
        className="detail-overview"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {[
          { label: 'Configuration', value: project.type },
          project.status === 'Sold Out'
            ? { label: 'Area Range', value: project.range }
            : { label: 'Available Now', value: project.flats ? `${project.flats.length} Flats for Sale` : 'Enquire Now', highlight: true },
          { label: 'Floors', value: `G + ${Math.max(...(project.flats || []).map(f => f.floor === 'First' ? 1 : f.floor === 'Second' ? 2 : f.floor === 'Third' ? 3 : f.floor === 'Fourth' ? 4 : 5))}` },
          { label: 'Total Units', value: project.type === 'Villa' ? '1' : `${(project.flats || []).length} Apartments` },
        ].map((item, i) => (
          <div key={i} className={`overview-item ${item.highlight ? 'overview-item-highlight' : ''}`}>
            <span className="overview-label">{item.label}</span>
            <span className="overview-value">{item.value}</span>
          </div>
        ))}
        <a
          className="overview-location"
          href={`https://www.google.com/maps/search/${encodeURIComponent(project.address || project.location)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="location-pin-pulse">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#2a6e3a" stroke="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </span>
          <span>{project.location}</span>
        </a>
      </motion.section>

      {/* About */}
      <section className="detail-about">
        <motion.div
          className="about-inner"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <span className="section-eyebrow">About the Project</span>
          <h2>{project.name}</h2>
          <p>
            A thoughtfully crafted residential development offering premium {project.type} apartments 
            with contemporary architecture and superior finishes. Strategically located in {project.location}, 
            this project is designed for those who appreciate refined living with excellent connectivity 
            and modern amenities.
          </p>
          <div className="about-stats">
            <div className="about-stat">
              <span className="about-stat-number">{project.flats.length}</span>
              <span className="about-stat-label">Premium Units</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-number">{project.range?.split('-')[0]?.trim()}</span>
              <span className="about-stat-label">Starts from (Sq.ft)</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-number">24/7</span>
              <span className="about-stat-label">Security</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Highlights */}
      <section className="detail-highlights">
        <div className="highlights-inner">
          <span className="section-eyebrow">Amenities & Features</span>
          <h3 className="highlights-title">Everything You Need, Thoughtfully Designed</h3>
          <div className="highlights-grid">
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                className="highlight-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <span className="highlight-icon">{h.icon}</span>
                <span className="highlight-label">{h.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="detail-tabs-section">
        <div className="tabs-inner">
          <div className="detail-tabs">
            <button
              className={activeTab === 'specifications' ? 'active' : ''}
              onClick={() => setActiveTab('specifications')}
            >
              Specifications
            </button>
            <button
              className={activeTab === 'flats' ? 'active' : ''}
              onClick={() => setActiveTab('flats')}
            >
              Available Flats
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'specifications' && (
              <motion.div
                key="specs"
                className="tab-panel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="spec-grid">
                  {specifications.map((s, i) => (
                    <motion.div
                      key={i}
                      className="spec-card"
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                    >
                      <span className="spec-card-item">{s.item}</span>
                      <span className="spec-card-detail">{s.spec}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'flats' && (
              <motion.div
                key="flats"
                className="tab-panel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flats-grid">
                  <table className="flats-table">
                    <thead>
                      <tr>
                        <th>Flat No</th>
                        <th>Floor</th>
                        <th>Built-Up Area (Sq.ft)</th>
                        <th>UDS (Sq.ft)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {project.flats.map((flat, i) => (
                        <tr key={i}>
                          <td className="flat-no-cell">{flat.no}</td>
                          <td className="flat-floor-cell">{flat.floor}</td>
                          <td>{flat.builtUp}</td>
                          <td>{flat.uds}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      {/* Location Map */}
      <section className="detail-map">
        <h2>Location</h2>
        <p className="map-address">{project.address}</p>
        <div className="map-container">
          <iframe
            src={project.mapUrl}
            width="100%"
            height="400"
            style={{ border: 0, borderRadius: '8px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${project.name} location`}
          />
        </div>
        <a
          className="map-directions-link"
          href={`https://www.google.com/maps/search/${encodeURIComponent(project.address)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Get Directions →
        </a>
      </section>

      <section className="detail-cta">
        <motion.div
          className="cta-inner"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3>Interested in {project.name}?</h3>
          <p>Get in touch for pricing, site visit, and exclusive offers.</p>
          <div className="cta-buttons">
            <button className="cta-primary" onClick={() => {
              navigate('/')
              setTimeout(() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }, 100)
            }}>
              Enquiry
            </button>
            <button className="cta-secondary" onClick={() => navigate('/projects')}>
              ← All Projects
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default ProjectDetail

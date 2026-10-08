import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import './Projects.css'

const projects = [
  {
    id: 6,
    name: 'Grandeur Parimala',
    location: '29th Street Ext, TG Nagar, Nanganallur, Chennai',
    type: '2 & 3 BHK',
    status: 'Ongoing',
    range: '700 - 1226 Sq.ft',
    image: '/hero-5.png',
    address: 'Grandeur Parimala, 29th Street Extension, TG Nagar, Nanganallur, Chennai',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.1!2d80.19!3d12.98!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s29th+Street+Ext+TG+Nagar+Nanganallur+Chennai!5e0!3m2!1sen!2sin!4v1',
    flats: [
      { no: '#101', floor: 'First', builtUp: 700, uds: 311.55 },
      { no: '#102', floor: 'First', builtUp: 700, uds: 311.55 },
      { no: '#103', floor: 'First', builtUp: 729, uds: 325 },
      { no: '#201', floor: 'Second', builtUp: 1226, uds: 545.66 },
      { no: '#202', floor: 'Second', builtUp: 903, uds: 400.56 },
      { no: '#301', floor: 'Third', builtUp: 1226, uds: 545.12 },
      { no: '#302', floor: 'Third', builtUp: 903, uds: 400.56 },
    ]
  },
  {
    id: 2,
    name: 'Sai Aura',
    location: '49th Street, Nanganallur, Chennai',
    type: '2 & 3 BHK',
    status: 'Sold Out',
    range: '726 - 1949 Sq.ft',
    image: '/hero-saiaura.jpg',
    address: 'Grandeur Sai Aura, 49th Street, Nanganallur, Chennai',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.1!2d80.19!3d12.98!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s49th+Street+Nanganallur+Chennai!5e0!3m2!1sen!2sin!4v1',
    flats: [
      { no: '#101', floor: 'First', builtUp: 1254, uds: 529 },
      { no: '#102', floor: 'First', builtUp: 840, uds: 354 },
      { no: '#103', floor: 'First', builtUp: 919, uds: 388 },
      { no: '#201', floor: 'Second', builtUp: 1298, uds: 547 },
      { no: '#202', floor: 'Second', builtUp: 726, uds: 306 },
      { no: '#203', floor: 'Second', builtUp: 989, uds: 417 },
      { no: '#301', floor: 'Third', builtUp: 1949, uds: 821 },
      { no: '#302', floor: 'Third', builtUp: 1131, uds: 477 },
    ]
  },
  {
    id: 3,
    name: "Shannu's Enclave",
    location: 'Nallana Street, Royapettah, Chennai',
    type: '2 & 3 BHK',
    status: 'Sold Out',
    range: '618 - 1568 Sq.ft',
    image: '/hero-shannus.jpg',
    address: "Grandeur Shannu's Enclave, Nallana Street, Royapettah, Chennai",
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8!2d80.26!3d13.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sNallana+Street+Royapettah+Chennai!5e0!3m2!1sen!2sin!4v1',
    flats: [
      { no: '#101', floor: 'First', builtUp: 1158, uds: 507 },
      { no: '#102', floor: 'First', builtUp: 618, uds: 276 },
      { no: '#103', floor: 'First', builtUp: 942, uds: 419 },
      { no: '#201', floor: 'Second', builtUp: 938, uds: 405 },
      { no: '#202', floor: 'Second', builtUp: 832, uds: 370 },
      { no: '#203', floor: 'Second', builtUp: 942, uds: 409 },
      { no: '#301', floor: 'Third', builtUp: 1568, uds: 700 },
      { no: '#302', floor: 'Third', builtUp: 1150, uds: 507 },
    ]
  },
  {
    id: 4,
    name: 'Sri Lakshmi Nivaas',
    location: '29th Street, Nanganallur, Chennai',
    type: '2 & 3 BHK',
    status: 'Sold Out',
    range: '787 - 2064 Sq.ft',
    image: '/hero-lakshmi.png',
    address: 'Grandeur Lakshmi Nivas, 29th Street, Nanganallur, Chennai',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.1!2d80.19!3d12.98!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s29th+Street+Nanganallur+Chennai!5e0!3m2!1sen!2sin!4v1',
    flats: [
      { no: '#101', floor: 'First', builtUp: 1277, uds: 611.94 },
      { no: '#102', floor: 'First', builtUp: 787, uds: 377.14 },
      { no: '#202', floor: 'Second', builtUp: 2064, uds: 989.08 },
      { no: '#301', floor: 'Third', builtUp: 2064, uds: 989.08 },
    ]
  },
  {
    id: 5,
    name: 'Grandeur Sri Sowbhagya',
    location: '3rd Main Road, Nanganallur, Chennai',
    type: '2 & 3 BHK',
    status: 'Ongoing',
    range: '675 - 1600 Sq.ft',
    image: '/hero-10.png',
    address: 'Grandeur Sri Sowbhagya, 3rd Main Road, Nanganallur, Chennai',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.1!2d80.19!3d12.98!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s3rd+Main+Road+Nanganallur+Chennai!5e0!3m2!1sen!2sin!4v1',
    flats: [
      { no: '#101', floor: 'First', builtUp: 770, uds: 297.04 },
      { no: '#102', floor: 'First', builtUp: 675, uds: 260.4 },
      { no: '#103', floor: 'First', builtUp: 775, uds: 298.97 },
      { no: '#201', floor: 'Second', builtUp: 1548, uds: 597.17 },
      { no: '#202', floor: 'Second', builtUp: 775, uds: 298.97 },
      { no: '#301', floor: 'Third', builtUp: 1600, uds: 617.23 },
      { no: '#302', floor: 'Third', builtUp: 723, uds: 278.91 },
      { no: '#401', floor: 'Fourth', builtUp: 1293, uds: 498.85 },
      { no: '#402', floor: 'Fourth', builtUp: 1030, uds: 397.34 },
      { no: '#501', floor: 'Fifth', builtUp: 1422, uds: 548.54 },
      { no: '#502', floor: 'Fifth', builtUp: 901, uds: 347.58 },
    ]
  },
  {
    id: 1,
    name: "Grandeur's Skanda",
    location: '14th Street, Nanganallur, Chennai',
    type: '2 & 3 BHK',
    status: 'Sold Out',
    range: '650 - 1525 Sq.ft',
    image: '/hero-skanda.png',
    address: 'Grandeur Skanda, 14th Street, Nanganallur, Chennai',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.1!2d80.19!3d12.98!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s14th+Street+Nanganallur+Chennai!5e0!3m2!1sen!2sin!4v1',
    flats: [
      { no: '#101', floor: 'First', builtUp: 1210, uds: 489.3 },
      { no: '#102', floor: 'First', builtUp: 650, uds: 261.91 },
      { no: '#103', floor: 'First', builtUp: 875, uds: 352.57 },
      { no: '#104', floor: 'First', builtUp: 766, uds: 308.33 },
      { no: '#201', floor: 'Second', builtUp: 1210, uds: 487.55 },
      { no: '#202', floor: 'Second', builtUp: 1525, uds: 613.75 },
      { no: '#203', floor: 'Second', builtUp: 766, uds: 308.65 },
      { no: '#301', floor: 'Third', builtUp: 1210, uds: 487.55 },
      { no: '#302', floor: 'Third', builtUp: 1525, uds: 613.75 },
      { no: '#303', floor: 'Third', builtUp: 766, uds: 308.65 },
    ]
  },
  {
    id: 7,
    name: 'White House',
    location: 'Royapettah, Chennai',
    type: '2 & 3 BHK',
    status: 'Sold Out',
    range: '850 - 1450 Sq.ft',
    image: '/hero-11.png',
    noClick: true,
    flats: [{},{},{},{},{},{},{},{}]
  },
  {
    id: 8,
    name: 'Grandeur Kamatchi Residency',
    location: '24th Street, Nanganallur, Chennai',
    type: '2 & 3 BHK',
    status: 'Sold Out',
    range: '720 - 1380 Sq.ft',
    image: '/hero-kamatchi.png',
    noClick: true,
    flats: [{},{},{},{},{},{},{},{},{},{}]
  },
  {
    id: 9,
    name: 'Grandeur Villa',
    location: 'Shathi Nagar, Adambakkam, Chennai',
    type: 'Villa',
    status: 'Sold Out',
    range: '2312 Sq.ft',
    image: '/villa.png',
    noClick: true,
    flats: [{}]
  }
]

export { projects }

const Projects = () => {
  const navigate = useNavigate()

  return (
    <div className="projects-page">
      <section className="projects-hero">
        <div className="projects-hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Delivering Excellence in Every Build
          </motion.p>
        </div>
      </section>

      <section className="projects-listing">
        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => !project.noClick && navigate(`/projects/${project.id}`)}
              style={{ cursor: project.noClick ? 'default' : 'pointer' }}
            >
              {/* Image with overlay */}
              <div className="card-image">
                <img src={project.image} alt={project.name} />
                <div className="card-overlay">
                  <h3 className="card-title">{project.name}</h3>
                  <p className="card-location">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {project.location}
                  </p>
                </div>
                <span className={`status-ribbon ${project.status === 'Sold Out' ? 'sold-out' : ''}`}>
                  {project.status === 'Sold Out' ? 'SOLD OUT' : 'NEW LAUNCH'}
                </span>
              </div>

              {/* Info grid below image */}
              <div className="card-details">
                <div className="detail-item">
                  <span className="detail-label">Apartment</span>
                  <span className="detail-value">{project.type}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Project Status</span>
                  <span className="detail-value">{project.status}</span>
                </div>
                {project.status === 'Sold Out' ? (
                  <div className="detail-item">
                    <span className="detail-label">Apartment Range</span>
                    <span className="detail-value">{project.range}</span>
                  </div>
                ) : (
                  <div className="detail-item detail-item-highlight">
                    <span className="detail-label">Available Now</span>
                    <span className="detail-value detail-value-highlight">{project.flats ? `${project.flats.length} Flats for Sale` : 'Enquire Now'}</span>
                  </div>
                )}
                <div className="detail-item">
                  <span className="detail-label">Total Units</span>
                  <span className="detail-value">{project.flats ? (project.type === 'Villa' ? '1' : `${project.flats.length} Flats`) : '—'}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Projects

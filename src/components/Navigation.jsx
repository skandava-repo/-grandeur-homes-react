import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import './Navigation.css'

const Navigation = ({ scrolled, hidden }) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const isJVPage = location.pathname === '/jv'
  const isProjectsPage = location.pathname === '/projects'

  const handleNavClick = (path) => {
    setMobileOpen(false)
    
    if (path.startsWith('/#')) {
      const sectionId = path.substring(2)
      
      if (location.pathname !== '/') {
        // Navigate to home first, then scroll
        navigate('/')
        setTimeout(() => {
          const element = document.getElementById(sectionId)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      } else {
        // Already on home, just scroll
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
  }

  const navItems = [
    { name: 'Home', path: '/', type: 'link' },
    { name: 'About', path: '/#about', type: 'hash' },
    { name: 'Services', path: '/#services', type: 'hash' },
    { name: 'Projects', path: '/projects', type: 'link' },
    { name: 'JV', path: '/jv', type: 'link' },
    { name: 'Contact', path: '/#contact', type: 'hash' }
  ]

  return (
    <motion.nav 
      className={`nav ${scrolled ? 'scrolled' : ''} ${isJVPage ? 'jv-theme' : ''} ${isProjectsPage ? 'projects-theme' : ''} ${hidden ? 'nav-hidden' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="nav-container">
        <Link to="/" className="logo-container">
          <img src="/logo.png" alt="Grandeur Homes" className="logo" />
          <span className="logo-text-group">
            <span className="logo-text">GRANDEUR HOMES</span>
            <span className="logo-tagline">We Build Your Dreams</span>
          </span>
        </Link>
        <ul className={`nav-links ${mobileOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <li key={item.name}>
              {item.type === 'hash' ? (
                <a 
                  href={item.path} 
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(item.path)
                  }}
                >
                  {item.name}
                </a>
              ) : (
                <Link to={item.path} onClick={() => setMobileOpen(false)}>
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <button className="nav-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </motion.nav>
  )
}

export default Navigation

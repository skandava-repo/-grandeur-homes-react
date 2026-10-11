import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import './Navigation.css'

const Navigation = ({ scrolled, hidden }) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const isJVPage = location.pathname === '/jv'
  const isProjectsPage = location.pathname === '/projects'

  // The drawer's stagger-in animation (links fading/sliding from opacity:0)
  // must only run on mobile — mobileOpen is false by default everywhere,
  // so without this check it set every desktop nav link to opacity:0 too.
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)')
    const update = () => setIsMobile(mql.matches)
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [])

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
        <div
          className={`nav-overlay ${mobileOpen ? 'active' : ''}`}
          onClick={() => setMobileOpen(false)}
        />
        <ul className={`nav-links ${mobileOpen ? 'active' : ''}`}>
          <li
            className="nav-drawer-close"
            onClick={() => setMobileOpen(false)}
            role="button"
            aria-label="Close menu"
          >
            <span></span>
            <span></span>
          </li>
          {navItems.map((item, index) => (
            <motion.li
              key={item.name}
              className="nav-link-item"
              initial={false}
              animate={!isMobile || mobileOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
              transition={{ duration: 0.35, delay: isMobile && mobileOpen ? index * 0.06 : 0 }}
            >
              <span className="nav-link-index">{String(index + 1).padStart(2, '0')}</span>
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
            </motion.li>
          ))}
          <li className="nav-drawer-footer">
            <a href="tel:+919489211111" className="nav-drawer-phone">+91 94892 11111</a>
            <span className="nav-drawer-tagline">We Build Your Dreams</span>
          </li>
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

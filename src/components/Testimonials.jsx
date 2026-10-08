import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Testimonials.css'

const testimonials = [
  { name: 'Mr. N. Sankaranarayanan', flat: 'Flat 101', text: 'We are very happy with the quality of construction and timely support provided by Grandeur Homes. The entire process was handled professionally, and we sincerely appreciate their commitment and workmanship.' },
  { name: 'Mr. S. Seshadhri', flat: 'Flat 102', text: 'Grandeur Homes has delivered our home with excellent planning and attention to detail. The quality construction and smooth coordination made the entire experience pleasant and satisfactory.' },
  { name: 'Mr. S. Santhanakrishnan', flat: 'Flat 103', text: 'I appreciate the professionalism and dedication shown by Grandeur Homes during the development of our apartment. The finishing quality and overall execution met our expectations.' },
  { name: 'Mr. S. Ganesh', flat: 'Flat 104', text: 'We are pleased with the overall experience with Grandeur Homes. The project was completed with quality construction, good finishing standards, and timely support.' },
  { name: 'Mrs. N. Ananthavalli', flat: 'Flat 201', text: 'Grandeur Homes has done an excellent job in developing our property. Their professionalism, responsiveness, and commitment to customer satisfaction are truly appreciable.' },
  { name: 'Mr. Suriyanarayanan S.', flat: 'Flat 202', text: 'Our experience with Grandeur Homes has been very positive. The project was completed professionally, and we are satisfied with the quality and service provided.' },
  { name: 'Mr. G. Ramana', flat: 'Flat 203', text: 'We thank Grandeur Homes for delivering a well-constructed and thoughtfully designed home. Their transparency, coordination, and timely communication were highly commendable.' },
  { name: 'Mr. Balaji Ramamoorthy', flat: 'Flat 301', text: 'It was a wonderful experience associating with Grandeur Homes. The project execution, workmanship, and customer support were excellent.' },
  { name: 'Siva Saagaram Trust', flat: 'Flat 302', text: 'Grandeur Homes has demonstrated professionalism and quality in every aspect of the project. Their dedication to timely completion and customer satisfaction is highly appreciated.' },
  { name: 'Mr. K. Kumar', flat: 'Flat 303', text: 'We are extremely happy with the services provided by Grandeur Homes. The team maintained quality standards and professionalism throughout the project.' },
  { name: 'Mr. M.A. Jaffar Sharief', flat: 'Flat 101', text: 'Choosing Grandeur Homes for our apartment was the right decision. The team ensured excellent execution, neat finishing, and smooth coordination from start to completion.' },
  { name: 'Mr. R. Mohan Sunder', flat: 'Flat 102, 103, 202, 301, 302', text: 'My association with Grandeur Homes has been a very pleasant and reliable experience. Systematic planning and consistent quality throughout all stages of construction.' },
  { name: 'Mr. Syed Bakhar Ali', flat: 'Flat 201', text: 'Grandeur Homes delivered the apartment with good construction quality and practical design. The entire process was transparent and professionally managed.' },
  { name: 'Mr. D. Dharmaraj', flat: 'Flat 203', text: 'We thank Grandeur Homes for their sincere efforts and dedicated approach in completing the project successfully. The workmanship and overall execution were impressive.' },
]

const GoogleIcon = () => (
  <svg className="tm-google-icon" viewBox="0 0 24 24" width="18" height="18">
    <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.53 5.53 0 01-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.82z"/>
    <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.88-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.11A11.99 11.99 0 0012 24z"/>
    <path fill="#FBBC05" d="M5.27 14.28A7.2 7.2 0 014.9 12c0-.79.14-1.56.37-2.28V6.61H1.27A11.99 11.99 0 000 12c0 1.94.46 3.77 1.27 5.39l4-3.11z"/>
    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.27 6.61l4 3.11C6.22 6.86 8.87 4.75 12 4.75z"/>
  </svg>
)

const Stars = () => (
  <div className="tm-stars">
    {[0, 1, 2, 3, 4].map(i => (
      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#fbbc05"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01z"/></svg>
    ))}
  </div>
)

const Testimonials = () => {
  const [active, setActive] = useState(0)
  const count = testimonials.length

  useEffect(() => {
    const timer = setInterval(() => {
      setActive(prev => (prev + 1) % count)
    }, 5000)
    return () => clearInterval(timer)
  }, [count])

  const prev = (active - 1 + count) % count
  const next = (active + 1) % count

  return (
    <section className="tm" id="testimonials">
      {/* Background graphics */}
      <div className="tm-bg-graphics">
        <div className="tm-bg-ring tm-bg-ring1" />
        <div className="tm-bg-ring tm-bg-ring2" />
        <div className="tm-bg-dot tm-bg-dot1" />
        <div className="tm-bg-dot tm-bg-dot2" />
        <div className="tm-bg-dot tm-bg-dot3" />
        <div className="tm-bg-leaf" />
      </div>
      <div className="tm-top">
        <span className="tm-label">Testimonials</span>
        <h2 className="tm-heading">Homeowners Who Trust Us</h2>
        <a
          className="tm-google-badge"
          href="https://www.google.com/search?q=Grandeur+Homes+Nanganallur+reviews"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GoogleIcon />
          <span>Verified Google Reviews</span>
          <Stars />
        </a>
      </div>
      <div className="tm-container">
        <div className="tm-left">

          {/* Drum - 3 visible */}
          <div className="tm-drum">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="tm-drum-inner"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 180, damping: 22 }}
              >
                <div className="tm-row tm-row-faded" onClick={() => setActive(prev)}>
                  <span className="tm-avatar">{testimonials[prev].name.replace(/^Mr\.|^Mrs\./, '').trim().charAt(0)}</span>
                  <span>{testimonials[prev].name}</span>
                </div>
                <div className="tm-row tm-row-active">
                  <span className="tm-avatar tm-avatar-active">{testimonials[active].name.replace(/^Mr\.|^Mrs\./, '').trim().charAt(0)}</span>
                  <div className="tm-active-info">
                    <span className="tm-active-name">{testimonials[active].name}</span>
                    <span className="tm-active-flat">{testimonials[active].flat}</span>
                  </div>
                </div>
                <div className="tm-row tm-row-faded" onClick={() => setActive(next)}>
                  <span className="tm-avatar">{testimonials[next].name.replace(/^Mr\.|^Mrs\./, '').trim().charAt(0)}</span>
                  <span>{testimonials[next].name}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="tm-count">{String(active + 1).padStart(2, '0')} / {count}</div>
        </div>

        {/* Right - Quote */}
        <div className="tm-right">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active}
              className="tm-quote"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4 }}
            >
              <svg className="tm-quote-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
                <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
              </svg>
              <Stars />
              <p>{testimonials[active].text}</p>
              <footer>
                <strong>{testimonials[active].name}</strong>
                <span>{testimonials[active].flat}</span>
                <span className="tm-footer-google"><GoogleIcon /> Posted on Google</span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default Testimonials

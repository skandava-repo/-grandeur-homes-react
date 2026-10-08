import { motion } from 'framer-motion'

const Services = () => {
  const services = [
    {
      icon: <svg viewBox="0 0 24 24" width="40" height="40" fill="none"><rect x="4" y="9" width="16" height="12" rx="1" stroke="currentColor" strokeWidth="1.2"/><path d="M4 9l8-6 8 6" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/><rect x="9" y="14" width="6" height="7" rx="0.5" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1"/><circle cx="12" cy="17" r="0.8" fill="currentColor"/></svg>,
      title: 'Residential Apartments',
      desc: 'CMDA & DTCP approved 2 & 3 BHK apartments built with RCC framed structure, quality fittings, and on-time delivery across Chennai.'
    },
    {
      icon: <svg viewBox="0 0 24 24" width="40" height="40" fill="none"><path d="M4 21V6h7v15" stroke="currentColor" strokeWidth="1.2"/><path d="M11 21V3h9v18" stroke="currentColor" strokeWidth="1.2"/><path d="M4 21h16" stroke="currentColor" strokeWidth="1.2"/><rect x="6" y="9" width="2" height="2" rx="0.3" fill="currentColor" opacity="0.3"/><rect x="6" y="13" width="2" height="2" rx="0.3" fill="currentColor" opacity="0.3"/><rect x="14" y="6" width="2" height="2" rx="0.3" fill="currentColor" opacity="0.3"/><rect x="14" y="10" width="2" height="2" rx="0.3" fill="currentColor" opacity="0.3"/><rect x="14" y="14" width="2" height="2" rx="0.3" fill="currentColor" opacity="0.3"/><rect x="17" y="6" width="2" height="2" rx="0.3" fill="currentColor" opacity="0.3"/><rect x="17" y="10" width="2" height="2" rx="0.3" fill="currentColor" opacity="0.3"/><rect x="17" y="14" width="2" height="2" rx="0.3" fill="currentColor" opacity="0.3"/></svg>,
      title: 'Joint Development',
      desc: 'Landowners can partner with us for hassle-free joint ventures. We handle approvals, construction, and sales — you get your share of built-up area or revenue.'
    },
    {
      icon: <svg viewBox="0 0 24 24" width="40" height="40" fill="none"><path d="M2 22h20" stroke="currentColor" strokeWidth="1.2"/><path d="M5 22V11l7-6 7 6v11" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/><rect x="9" y="15" width="6" height="7" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="1"/><path d="M8 11h3v3H8z" stroke="currentColor" strokeWidth="0.8" rx="0.3"/><path d="M13 11h3v3h-3z" stroke="currentColor" strokeWidth="0.8" rx="0.3"/><path d="M12 5v-2M10 4h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>,
      title: 'Individual House Construction',
      desc: 'End-to-end house construction on your own plot — from foundation to finishing. We handle architecture, structure, plumbing, electrical, and interiors.'
    },
    {
      icon: <svg viewBox="0 0 24 24" width="40" height="40" fill="none"><path d="M3 21h18" stroke="currentColor" strokeWidth="1.2"/><path d="M4 21V11l5-4 5 4v10" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/><path d="M14 21v-6l4-3 3 3v6" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/><path d="M7 21v-4M11 21v-3" stroke="currentColor" strokeWidth="1" opacity="0.4"/></svg>,
      title: 'Land Development & Residential Projects',
      desc: 'From acquiring and developing land to delivering finished residential projects, we manage the complete lifecycle across Chennai and Tamil Nadu.'
    }
  ]

  return (
    <section className="services" id="services" style={{ background: 'var(--color-bg-darker)' }}>
      <div className="container">
        <h2 className="section-title center" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>What We Do</h2>
        <p className="section-subtitle">Trusted construction services for homebuyers and landowners in Chennai</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              style={{
                background: 'var(--color-bg-dark)',
                padding: '2.5rem 2rem',
                borderRadius: '8px',
                border: '1px solid rgba(201, 169, 97, 0.1)',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ color: 'var(--color-accent)', marginBottom: '1.2rem' }}>{service.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', marginBottom: '0.8rem' }}>{service.title}</h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, fontSize: '0.92rem' }}>{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services

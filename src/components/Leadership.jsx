import { motion } from 'framer-motion'

const partners = [
  {
    name: 'Sriram V',
    role: 'Head of Operations & Business',
    bio: 'Sriram leads the overall operations and business functions of Grandeur Homes, with a focus on new project development, business growth, sales, client coordination, and operational strategy. He drives projects from initial opportunity through execution and delivery, ensuring commercial discipline, operational efficiency, and alignment with the company’s vision.'
  },
  {
    name: 'Sathish P',
    role: 'Head of Design, Planning & Approvals',
    bio: 'Sathish leads the design and planning vertical at Grandeur Homes, overseeing architectural development, building layouts, detailed drawings, and design coordination across projects. He also takes responsibility for building plan approvals and statutory coordination, ensuring that projects progress efficiently through the necessary approval processes.'
  },
  {
    name: 'Kumaraguru A',
    role: 'Head of Strategic Planning, New Projects & Structural Management',
    bio: 'Kumaraguru leads the strategic planning and development of new projects at Grandeur Homes, from evaluating opportunities and developing project concepts to planning layouts and establishing the right development approach. He also oversees the structural planning and execution aspects of projects, ensuring sound engineering principles and strong structural integrity.'
  },
  {
    name: 'Dennis Christy K J',
    role: 'Head of Quality & Client Relations',
    bio: 'Dennis Christy leads quality assurance and client relationships at Grandeur Homes. He oversees quality standards across projects while maintaining strong communication and engagement with clients throughout the development journey, ensuring transparency, responsiveness, and confidence from commencement through handover.'
  }
]

const Leadership = () => {
  return (
    <section className="leadership" style={{ background: 'var(--color-bg-dark)' }}>
      <div className="container">
        <h2 className="section-title center" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>Four Partners. One Unified Vision.</h2>
        <p className="section-subtitle">
          Our strength lies in the collective expertise of our four partners, each leading a critical vertical of the business.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
          {partners.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              style={{
                background: 'var(--color-bg-darker)',
                border: '1px solid rgba(28, 96, 96, 0.12)',
                borderRadius: '8px',
                padding: '2rem 1.6rem'
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', marginBottom: '0.3rem', color: '#000' }}>{p.name}</h3>
              <p style={{ color: 'var(--color-accent)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1rem' }}>{p.role}</p>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, fontSize: '0.9rem' }}>{p.bio}</p>
            </motion.div>
          ))}
        </div>
        <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', maxWidth: '800px', margin: '3rem auto 0', lineHeight: 1.8 }}>
          Together, the four partners bring complementary expertise across the complete development lifecycle — from concept and design to construction, quality management, client engagement, and delivery.
        </p>
      </div>
    </section>
  )
}

export default Leadership

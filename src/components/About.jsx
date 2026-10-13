import { motion } from 'framer-motion'
import './About.css'

const About = () => {
  return (
    <section className="about" id="about" style={{ background: 'var(--color-bg-dark)' }}>
      <div className="container">
        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>Building Homes Across Chennai Since 2016</h2>
            <p style={{ color: 'var(--color-text-cream)', marginBottom: '1.5rem', fontSize: '1.1rem', lineHeight: 1.8 }}>
              Grandeur Homes is a trusted name in residential construction across Chennai and Tamil Nadu. Since 2016, we have successfully completed 15 projects, delivering quality apartments in prime localities including Nanganallur, Royapettah, and Adambakkam.
            </p>
            <p style={{ color: 'var(--color-text-cream)', fontSize: '1.1rem', lineHeight: 1.8 }}>
              We focus on what homebuyers truly need — strong RCC structures, quality fittings, on-time delivery, and transparent pricing. Every project is built with CMDA/DTCP approval and a commitment to giving families a home they can trust for generations.
            </p>
            <div className="about-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginTop: '2rem' }}>
              {[
                { number: '15', label: 'Projects Completed' },
                { number: '10+', label: 'Years Experience' },
                { number: '120+', label: 'Happy Families' }
              ].map((stat, i) => (
                <div key={i}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--color-accent)', marginBottom: '0.3rem' }}>{stat.number}</h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', margin: 0 }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <img src="/hero-5.png" alt="Grandeur Homes Project" className="about-img" style={{ width: '100%', height: '600px', objectFit: 'cover', borderRadius: '4px' }} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About

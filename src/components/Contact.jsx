import { useState } from 'react'
import { motion } from 'framer-motion'

const Contact = () => {
  const [status, setStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    const form = e.target
    const data = new FormData(form)
    data.append('access_key', '10d46b60-5553-4515-9c6b-99fb71c24578')

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: data,
    })

    if (res.ok) {
      setStatus('success')
      form.reset()
      setTimeout(() => setStatus(''), 4000)
    } else {
      setStatus('error')
    }
  }

  return (
    <section className="contact" id="contact" style={{ background: '#ffffff', padding: '100px 0 40px', position: 'relative', zIndex: 20 }}>
      <div className="container">
        <h2 className="section-title center">Get In Touch</h2>
        <p className="section-subtitle">Let's discuss your next luxury project</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '6rem', marginTop: '4rem' }}>
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <input type="hidden" name="subject" value="New enquiry from Grandeur Homes website" />
            <input type="text" name="name" placeholder="Your Name" required style={{ padding: '1rem 1.5rem', background: '#f5f7f5', border: '1px solid #e0e8e0', borderRadius: '4px', color: '#1a1a1a', fontSize: '1rem', outline: 'none' }} />
            <input type="email" name="email" placeholder="Email Address" required style={{ padding: '1rem 1.5rem', background: '#f5f7f5', border: '1px solid #e0e8e0', borderRadius: '4px', color: '#1a1a1a', fontSize: '1rem', outline: 'none' }} />
            <input type="tel" name="phone" placeholder="Phone Number" required style={{ padding: '1rem 1.5rem', background: '#f5f7f5', border: '1px solid #e0e8e0', borderRadius: '4px', color: '#1a1a1a', fontSize: '1rem', outline: 'none' }} />
            <textarea name="message" placeholder="Tell us about your project" rows="5" required style={{ padding: '1rem 1.5rem', background: '#f5f7f5', border: '1px solid #e0e8e0', borderRadius: '4px', color: '#1a1a1a', fontSize: '1rem', resize: 'vertical', outline: 'none' }} />
            <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
            {status === 'success' && <p style={{ color: '#2a6e3a', fontSize: '0.9rem' }}>✓ Message sent successfully! We'll get back to you soon.</p>}
            {status === 'error' && <p style={{ color: '#c0392b', fontSize: '0.9rem' }}>Something went wrong. Please call us directly.</p>}
          </motion.form>
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}
          >
            <div>
              <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-accent)', marginBottom: '1rem', fontSize: '1.2rem' }}>Office Address</h4>
              <p style={{ color: 'var(--color-text-cream)', lineHeight: 1.8 }}>47, 22nd Street, Thillaiganga Nagar<br />Nanganallur, Chennai, Tamil Nadu 600061</p>
            </div>
            <div>
              <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-accent)', marginBottom: '1rem', fontSize: '1.2rem' }}>Contact</h4>
              <p style={{ color: 'var(--color-text-cream)', lineHeight: 1.8 }}>Phone: +91 94892 11111<br />Landline: 044 4689 0796<br />Email: info@grandeurhomes.in</p>
            </div>
            <div>
              <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-accent)', marginBottom: '1rem', fontSize: '1.2rem' }}>Follow Us</h4>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <a href="#" style={{ color: 'var(--color-text-light)', textDecoration: 'none', transition: 'color 0.3s' }}>Instagram</a>
                <a href="#" style={{ color: 'var(--color-text-light)', textDecoration: 'none', transition: 'color 0.3s' }}>Facebook</a>
                <a href="#" style={{ color: 'var(--color-text-light)', textDecoration: 'none', transition: 'color 0.3s' }}>LinkedIn</a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact

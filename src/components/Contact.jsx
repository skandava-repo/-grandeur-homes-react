import { useState } from 'react'
import { motion } from 'framer-motion'
import './Contact.css'

const Contact = () => {
  const [status, setStatus] = useState('')

  // Opens the visitor's own mail app with a message pre-addressed to
  // info@grandeurhomes.in, pre-filled from the form fields, instead of
  // posting through a third-party form service.
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)
    const name = data.get('name')
    const email = data.get('email')
    const phone = data.get('phone')
    const message = data.get('message')

    const subject = `New enquiry from Grandeur Homes website - ${name}`
    const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`

    window.location.href = `mailto:info@grandeurhomes.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    setStatus('success')
    form.reset()
    setTimeout(() => setStatus(''), 4000)
  }

  return (
    <section className="contact" id="contact" style={{ background: '#ffffff', padding: '100px 0 40px', position: 'relative', zIndex: 20 }}>
      <div className="container">
        <h2 className="section-title center">Get In Touch</h2>
        <p className="section-subtitle">Let's discuss your next luxury project</p>
        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '6rem', marginTop: '4rem' }}>
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <input type="text" name="name" placeholder="Your Name" required style={{ padding: '1rem 1.5rem', background: '#f5f7f5', border: '1px solid #e0e8e0', borderRadius: '4px', color: '#1a1a1a', fontSize: '1rem', outline: 'none' }} />
            <input type="email" name="email" placeholder="Email Address" required style={{ padding: '1rem 1.5rem', background: '#f5f7f5', border: '1px solid #e0e8e0', borderRadius: '4px', color: '#1a1a1a', fontSize: '1rem', outline: 'none' }} />
            <input type="tel" name="phone" placeholder="Phone Number" required style={{ padding: '1rem 1.5rem', background: '#f5f7f5', border: '1px solid #e0e8e0', borderRadius: '4px', color: '#1a1a1a', fontSize: '1rem', outline: 'none' }} />
            <textarea name="message" placeholder="Tell us about your project" rows="5" required style={{ padding: '1rem 1.5rem', background: '#f5f7f5', border: '1px solid #e0e8e0', borderRadius: '4px', color: '#1a1a1a', fontSize: '1rem', resize: 'vertical', outline: 'none' }} />
            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
            {status === 'success' && <p style={{ color: '#2a6e3a', fontSize: '0.9rem' }}>✓ Opening your email app, addressed to info@grandeurhomes.in...</p>}
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
              <p style={{ color: 'var(--color-text-cream)', lineHeight: 1.8 }}>GRANDEUR HOMES & DEVELOPERS Pvt. Ltd.<br />47, 22nd Street, Thillaiganga Nagar<br />Nanganallur, Chennai, Tamil Nadu 600061</p>
            </div>
            <div>
              <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-accent)', marginBottom: '1rem', fontSize: '1.2rem' }}>Contact</h4>
              <p style={{ color: 'var(--color-text-cream)', lineHeight: 1.8 }}>Phone: +91 94892 11111<br />Landline: 044 4689 0796<br />Email: <a href="mailto:info@grandeurhomes.in" style={{ color: 'var(--color-accent)' }}>info@grandeurhomes.in</a></p>
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

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineOfficeBuilding, HiOutlineLightningBolt } from 'react-icons/hi'
import { FaHandshake } from 'react-icons/fa'
import { MdConstruction, MdAttachMoney, MdSearch, MdAssessment, MdArchitecture, MdBuild, MdVerifiedUser } from 'react-icons/md'
import './JointDevelopment.css'

const approachSteps = [
  { Icon: MdSearch, title: 'Understand', desc: 'We begin by understanding the landowner’s requirements, objectives, expectations, and priorities.' },
  { Icon: MdAssessment, title: 'Evaluate', desc: 'We assess the property, development potential, regulations, market conditions, and project feasibility.' },
  { Icon: MdArchitecture, title: 'Structure', desc: 'We develop a transparent and mutually beneficial joint development structure aligned with the interests of both the landowner and Grandeur Homes.' },
  { Icon: MdBuild, title: 'Execute', desc: 'From design and approvals to construction, finishing, quality, sales, and handover, our team remains closely involved throughout the project.' },
  { Icon: MdVerifiedUser, title: 'Deliver', desc: 'Our objective is to create a development that delivers strong value to the landowner while meeting the quality and expectations of the end customer.' },
]

const JointDevelopment = () => {
  const canvasRef = useRef(null)
  const [formData, setFormData] = useState({
    phone: '',
    location: '',
    landSize: '',
    dealType: '',
    expectedShare: 50,
    pricePerGround: 10000000
  })
  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let time = 0
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const ribbons = Array.from({ length: 5 }, (_, i) => ({
      offset: i * 1.2,
      speed: 0.003 + i * 0.001,
      amplitude: 80 + i * 30,
      y: canvas.height * (0.2 + i * 0.15),
      color: [
        'rgba(230,220,210,0.25)',
        'rgba(245,240,235,0.2)',
        'rgba(210,195,180,0.22)',
        'rgba(240,235,225,0.18)',
        'rgba(200,185,165,0.2)'
      ][i]
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time++
      for (const ribbon of ribbons) {
        ctx.beginPath()
        ctx.moveTo(0, ribbon.y)
        for (let x = 0; x <= canvas.width; x += 4) {
          const y = ribbon.y +
            Math.sin((x * 0.003) + time * ribbon.speed + ribbon.offset) * ribbon.amplitude +
            Math.sin((x * 0.007) + time * ribbon.speed * 0.7) * ribbon.amplitude * 0.5
          ctx.lineTo(x, y)
        }
        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()
        ctx.fillStyle = ribbon.color
        ctx.fill()
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    const data = new FormData()
    data.append('access_key', '10d46b60-5553-4515-9c6b-99fb71c24578')
    data.append('subject', 'New JV / Land Enquiry from Grandeur Homes')
    data.append('Phone', formData.phone)
    data.append('Location', formData.location)
    data.append('Land Size', formData.landSize)
    data.append('Deal Type', formData.dealType)
    data.append('Price Per Ground', '₹' + formData.pricePerGround.toLocaleString())

    const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
    if (res.ok) {
      setStatus('success')
      setFormData({ phone: '', location: '', landSize: '', dealType: '', expectedShare: 50, pricePerGround: 10000000 })
      setTimeout(() => setStatus(''), 4000)
    } else {
      setStatus('error')
    }
  }

  return (
    <div className="jv-page-premium">
      <canvas ref={canvasRef} className="jv-particles"></canvas>
      

      <section className="jv-hero-premium">
        <motion.div 
          className="hero-content-premium"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div 
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            Private & Confidential
          </motion.div>
          <h1>Joint Development<br/>Opportunities</h1>
          <p>Transform your land into exceptional architectural landmarks through strategic partnership</p>
        </motion.div>
      </section>

      <section className="jv-value-props">
        <div className="value-container">
          {[
            { Icon: HiOutlineOfficeBuilding, title: 'Premium Development', desc: 'World-class architectural projects' },
            { Icon: FaHandshake, title: 'Transparent Partnership', desc: 'Clear terms and fair agreements' },
            { Icon: HiOutlineLightningBolt, title: 'Fast Execution', desc: 'Streamlined approval process' }
          ].map((item, i) => (
            <motion.div
              key={i}
              className="value-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
            >
              <div className="value-icon">
                <item.Icon />
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="jv-understanding">
        <motion.div
          className="understanding-inner"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2>Every Successful Partnership Begins with Understanding.</h2>
          <p>
            At Grandeur Homes, we believe that a successful joint development is built on more than land and construction
            — it is built on understanding the landowner’s vision, priorities, and expectations.
          </p>
          <p>
            Our first strength is our ability to listen and understand client requirements. Every property and every
            landowner is different, with unique expectations around returns, apartment allocation, timelines, financial
            commitments, project positioning, and long-term value. We take the time to understand these requirements
            before developing the right strategy.
          </p>
          <p>
            With our integrated team covering business and operations, design and planning, structural execution,
            quality, and client relations, Grandeur Homes manages the development journey under a coordinated
            leadership structure.
          </p>
        </motion.div>
      </section>

      <section className="jv-approach">
        <div className="approach-header">
          <h2>Our Approach</h2>
        </div>
        <div className="approach-grid">
          {approachSteps.map((step, i) => (
            <motion.div
              key={i}
              className="approach-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <div className="approach-num">{String(i + 1).padStart(2, '0')}</div>
              <div className="approach-icon"><step.Icon /></div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="jv-form-container">
        <motion.div 
          className="form-wrapper-premium"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="form-header-premium">
            <h2>Express Your Interest</h2>
            <p>Share your property details for a confidential consultation</p>
          </div>

          <form onSubmit={handleSubmit} className="premium-form">
            
            <div className="form-group-premium">
              <label>Contact Number</label>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="+91 00000 00000"
                required 
              />
            </div>

            <div className="form-group-premium">
              <label>Property Location</label>
              <input 
                type="text" 
                name="location" 
                value={formData.location} 
                onChange={handleChange} 
                placeholder="Area / City"
                required 
              />
            </div>

            <div className="form-group-premium">
              <label>Land Size</label>
              <input 
                type="text" 
                name="landSize" 
                value={formData.landSize} 
                onChange={handleChange} 
                placeholder="sq.ft / grounds / acres"
                required 
              />
            </div>

            <div className="form-group-premium deal-type-group">
              <label>Partnership Model</label>
              <div className="deal-options-premium">
                <motion.label 
                  className={`deal-card-premium ${formData.dealType === 'joint-development' ? 'active' : ''}`}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <input 
                    type="radio" 
                    name="dealType" 
                    value="joint-development" 
                    checked={formData.dealType === 'joint-development'} 
                    onChange={handleChange}
                  />
                  <div className="deal-card-content">
                    <div className="deal-icon">
                      <MdConstruction />
                    </div>
                    <h4>Joint Development</h4>
                    <p>Share land, share profits</p>
                  </div>
                </motion.label>

                <motion.label 
                  className={`deal-card-premium ${formData.dealType === 'outright-sale' ? 'active' : ''}`}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <input 
                    type="radio" 
                    name="dealType" 
                    value="outright-sale" 
                    checked={formData.dealType === 'outright-sale'} 
                    onChange={handleChange}
                  />
                  <div className="deal-card-content">
                    <div className="deal-icon">
                      <MdAttachMoney />
                    </div>
                    <h4>Outright Sale</h4>
                    <p>Direct purchase offer</p>
                  </div>
                </motion.label>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {formData.dealType === 'joint-development' && (
                <motion.div 
                  className="form-group-premium slider-group"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5 }}
                >
                </motion.div>
              )}

              {formData.dealType === 'outright-sale' && (
                <motion.div 
                  className="form-group-premium slider-group"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <label>Expected Price per Ground</label>
                  <div className="slider-container-premium">
                    <input 
                      type="range" 
                      name="pricePerGround" 
                      min="5000000" 
                      max="20000000" 
                      step="500000"
                      value={formData.pricePerGround} 
                      onChange={handleChange}
                      className="premium-slider"
                    />
                    <div className="slider-value-display">₹{(formData.pricePerGround / 10000000).toFixed(1)}Cr</div>
                  </div>
                  <div className="slider-labels">
                    <span>₹50L</span>
                    <span>₹2Cr</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button 
              type="submit" 
              className="submit-btn-premium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending...' : 'Submit for Private Review'}
              {status !== 'sending' && <span className="btn-arrow">→</span>}
            </motion.button>
            {status === 'success' && <p style={{ color: '#2a6e3a', marginTop: '1rem', fontSize: '0.9rem' }}>✓ Submitted successfully! We'll contact you shortly.</p>}
            {status === 'error' && <p style={{ color: '#c0392b', marginTop: '1rem', fontSize: '0.9rem' }}>Something went wrong. Please call us directly.</p>}

          </form>

          <div className="form-footer-premium">
            <div className="security-badge">
              <span className="lock-icon">🔒</span>
              <span>All information is strictly confidential</span>
            </div>
          </div>

        </motion.div>
      </section>

    </div>
  )
}

export default JointDevelopment

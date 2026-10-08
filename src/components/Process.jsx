import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  MdTerrain,
  MdArchitecture,
  MdGpsFixed,
  MdConstruction,
  MdWaterDrop,
  MdViewColumn,
  MdFormatPaint,
  MdElevator,
  MdWbSunny,
  MdSecurity,
  MdFactCheck,
  MdVpnKey,
} from 'react-icons/md'
import { HiOutlineHome } from 'react-icons/hi'
import './Process.css'

const steps = [
  { title: 'Soil Testing', desc: 'Geo-technical soil investigation and foundation assessment.', Icon: MdTerrain },
  { title: 'Structural Design', desc: 'Seismic-resistant RCC design based on soil conditions.', Icon: MdArchitecture },
  { title: 'Site Marking', desc: 'Precise digital setting-out as per approved drawings.', Icon: MdGpsFixed },
  { title: 'RCC Framework', desc: 'Footings, columns, beams and slabs with checks at every stage.', Icon: MdConstruction },
  { title: 'Foundation Protection', desc: 'Waterproofing and anti-termite treatment before backfilling.', Icon: MdWaterDrop },
  { title: 'Brickwork & Walls', desc: 'Walls built true to line, level and plumb.', Icon: MdViewColumn },
  { title: 'Finishing Works', desc: 'Plastering, flooring, electrical, plumbing and painting.', Icon: MdFormatPaint },
  { title: 'Lifts', desc: 'Lift shaft, installation, testing and commissioning.', Icon: MdElevator },
  { title: 'Solar Power', desc: 'Rooftop solar planning, installation and integration.', Icon: MdWbSunny },
  { title: 'Smart Security', desc: 'Automatic gates, CCTV and video door phone systems.', Icon: MdSecurity },
  { title: 'Quality Inspection', desc: 'Stage-wise checks, snagging and final review.', Icon: MdFactCheck },
  { title: 'Handover', desc: 'Documentation, completion certificate and possession.', Icon: MdVpnKey },
]

const row1 = steps.slice(0, 6)
const row2 = steps.slice(6, 12)

const Process = () => {
  const navigate = useNavigate()

  return (
    <section className="construction-process" style={{ background: 'var(--color-bg-dark)' }}>
      <div className="container cp-container">
        <span className="cp-eyebrow">How We Build</span>
        <h2 className="section-title center cp-title">Our Construction Process</h2>
        <p className="section-subtitle cp-subtitle">From foundation to handover — all twelve stages, planned, executed, and quality-checked</p>

        <div className="cp-rows">
          {[row1, row2].map((row, rowIndex) => (
            <div className="cp-row" key={rowIndex}>
              <div className="cp-row-line" />
              {row.map((step, i) => {
                const globalIndex = rowIndex * 6 + i
                return (
                  <motion.div
                    key={step.title}
                    className="cp-node"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    viewport={{ once: true }}
                  >
                    <div className="cp-tooltip">{step.desc}</div>
                    <div className="cp-node-icon">
                      <step.Icon />
                    </div>
                    <span className="cp-node-num">{String(globalIndex + 1).padStart(2, '0')}</span>
                    <h3>{step.title}</h3>
                  </motion.div>
                )
              })}
            </div>
          ))}
        </div>

        <motion.button
          className="cp-end-cta"
          onClick={() => navigate('/projects')}
          aria-label="View our projects"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <span className="cp-end-icon">
            <HiOutlineHome />
          </span>
          See the Homes We've Built
        </motion.button>
      </div>
    </section>
  )
}

export default Process

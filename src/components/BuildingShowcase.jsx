import { useRef, useState, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './BuildingShowcase.css'

gsap.registerPlugin(ScrollTrigger)

const TOTAL_FRAMES = 61

const panels = [
  {
    title: 'Site & Foundation',
    subtitle: 'Excavation to Footing',
    description: "Site clearance and excavation begin the journey, guided by a qualified geo-technical soil report. PCC, RCC footings, column reinforcement, and plinth beams are laid to a seismic-resistant RCC framed structure design, giving every project a foundation built to last before a single column rises."
  },
  {
    title: 'Structural Framework',
    subtitle: 'RCC Columns & Beams Rising',
    description: 'Column reinforcement, plinth and tie beams, and RCC columns and slabs rise floor by floor under crane-supported construction. Our engineering team carries out quality checks at every RCC stage, verifying reinforcement, shuttering, and concrete work before the next level is allowed to begin.'
  },
  {
    title: 'Superstructure',
    subtitle: 'Floors Take Shape',
    description: 'Floor after floor stacks up with shuttering and scaffolding still in place, the structural skeleton climbing toward its final height. Brickwork, wall setting-out, and material selection follow close behind, with line, level, and plumb checked at every stage to keep the structure true.'
  },
  {
    title: 'Finishing & Facade',
    subtitle: 'Walls, Windows & Finishes',
    description: 'Plastering, waterproofing, flooring, and wall tiling bring the interiors to life while glazing, balconies, and painting shape the facade. Electrical works, plumbing, kitchen and utility finishing, and final fixtures are completed and snagged before the building is signed off as ready.'
  },
  {
    title: 'Handover',
    subtitle: 'From Foundation to Handover',
    description: 'Completion certificate, property tax assessment, TNEB and CMWSSB documentation, and the possession certificate are handed over along with every project document, giving owners a complete and transparent record. Planned with precision, built with quality, delivered with trust.'
  }
]

const phases = panels.map(p => p.title)

const BuildingShowcase = () => {
  const canvasRef = useRef(null)
  const silkRef = useRef(null)
  const rightPanelRef = useRef(null)
  const containerRef = useRef(null)
  const leftPanelRef = useRef(null)
  const spacerRef = useRef(null)
  const framesRef = useRef([])
  const currentFrameRef = useRef(0)
  const [loaded, setLoaded] = useState(false)
  const [loadProgress, setLoadProgress] = useState(0)
  const [percent, setPercent] = useState(0)
  const [phase, setPhase] = useState('Empty Plot')

  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const img = framesRef.current[index]
    if (!img || !img.complete) return
    const cw = canvas.width, ch = canvas.height
    const iw = img.width, ih = img.height
    // Contain: show full frame, centered
    const scale = Math.min(cw / iw, ch / ih)
    const sw = iw * scale, sh = ih * scale
    const sx = (cw - sw) / 2, sy = (ch - sh) / 2
    ctx.clearRect(0, 0, cw, ch)
    ctx.drawImage(img, sx, sy, sw, sh)
  }, [])

  const resize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = canvas.clientWidth * window.devicePixelRatio
    canvas.height = canvas.clientHeight * window.devicePixelRatio
    drawFrame(currentFrameRef.current)
  }, [drawFrame])

  // Load frames
  useEffect(() => {
    let loadedCount = 0
    const imgs = []
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image()
      img.src = `/frames_web/frame${String(i).padStart(4, '0')}.webp`
      img.onload = () => {
        loadedCount++
        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100))
        if (loadedCount === TOTAL_FRAMES) {
          setLoaded(true)
        }
      }
      imgs.push(img)
    }
    framesRef.current = imgs
  }, [])

  // Initial draw + resize
  useEffect(() => {
    if (!loaded) return
    resize()
    drawFrame(0)
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [loaded, resize, drawFrame])

  // ScrollTrigger on the right panel
  useEffect(() => {
    if (!loaded) return

    const trigger = ScrollTrigger.create({
      trigger: rightPanelRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0,
      onUpdate(self) {
        const p = self.progress
        const frameIndex = Math.min(Math.floor(p * TOTAL_FRAMES), TOTAL_FRAMES - 1)
        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex
          drawFrame(frameIndex)
        }
        setPercent(Math.round(p * 100))
        setPhase(phases[Math.min(Math.floor(p * phases.length), phases.length - 1)])
      }
    })

    // Animate sections in
    const sections = rightPanelRef.current?.querySelectorAll('.bs-section')
    sections?.forEach(s => {
      gsap.from(s.children, {
        scrollTrigger: { trigger: s, start: 'top 80%', toggleActions: 'play none none reverse' },
        y: 25, opacity: 0, stagger: 0.1, duration: 0.5, ease: 'power2.out'
      })
    })

    return () => {
      trigger.kill()
    }
  }, [loaded, drawFrame])

  // Vertical silk ribbons background for right panel
  useEffect(() => {
    const canvas = silkRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId, time = 0
    const resize = () => { canvas.width = canvas.parentElement.offsetWidth; canvas.height = canvas.parentElement.offsetHeight }
    resize()
    window.addEventListener('resize', resize)

    const ribbons = [
      { offset: 0, speed: 0.008, amplitude: 40, xFrac: 0.15, color: 'rgba(26,74,106,0.07)' },
      { offset: 1.5, speed: 0.01, amplitude: 50, xFrac: 0.35, color: 'rgba(42,122,170,0.05)' },
      { offset: 3, speed: 0.007, amplitude: 45, xFrac: 0.55, color: 'rgba(26,74,106,0.06)' },
      { offset: 4.5, speed: 0.009, amplitude: 55, xFrac: 0.75, color: 'rgba(42,122,170,0.05)' },
      { offset: 6, speed: 0.008, amplitude: 35, xFrac: 0.9, color: 'rgba(26,74,106,0.04)' }
    ]

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time++

      // Mobile: horizontal ribbons flowing left-to-right.
      // Web/desktop: original vertical ribbons flowing bottom-to-top.
      const horizontal = window.matchMedia('(max-width: 768px)').matches

      for (const r of ribbons) {
        if (horizontal) {
          // Repeat the band down the full panel height (one set per viewport
          // span) so every scrolled section keeps ribbons behind it.
          const span = window.innerHeight
          const bandThickness = r.amplitude * 1.6
          for (let origin = 0; origin < canvas.height; origin += span) {
            const baseY = origin + span * r.xFrac
            ctx.beginPath()
            ctx.moveTo(0, baseY)
            for (let x = 0; x <= canvas.width; x += 4) {
              const y = baseY +
                Math.sin(x * 0.004 + time * r.speed + r.offset) * r.amplitude +
                Math.sin(x * 0.008 + time * r.speed * 0.6) * r.amplitude * 0.4
              ctx.lineTo(x, y)
            }
            // Close into a thin horizontal band rather than filling downward.
            for (let x = canvas.width; x >= 0; x -= 4) {
              const y = baseY + bandThickness +
                Math.sin(x * 0.004 + time * r.speed + r.offset + 0.5) * r.amplitude * 0.5
              ctx.lineTo(x, y)
            }
            ctx.closePath()
            ctx.fillStyle = r.color
            ctx.fill()
          }
        } else {
          const baseX = canvas.width * r.xFrac
          ctx.beginPath()
          ctx.moveTo(baseX, 0)
          for (let y = 0; y <= canvas.height; y += 4) {
            const x = baseX +
              Math.sin(y * 0.004 + time * r.speed + r.offset) * r.amplitude +
              Math.sin(y * 0.008 + time * r.speed * 0.6) * r.amplitude * 0.4
            ctx.lineTo(x, y)
          }
          ctx.lineTo(canvas.width, canvas.height)
          ctx.lineTo(canvas.width, 0)
          ctx.closePath()
          ctx.fillStyle = r.color
          ctx.fill()
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  // Mobile-only JS-driven pin for the left visual. iOS Safari has multiple
  // undocumented ways native position:sticky silently breaks (an ancestor
  // with non-visible overflow, overflow on the sticky element itself, flex
  // containing-block quirks), so this bypasses position:sticky entirely on
  // mobile and manually toggles fixed/absolute based on scroll position.
  // Desktop is untouched — it keeps the native position:sticky from the
  // base CSS rule. The spacer reserves the panel's height in the flex
  // column so the stage text doesn't jump when the panel leaves the flow.
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)')
    // iOS needed the panel flush to the very top (0px); Android renders it
    // fine with the original small gap, and 0px was cutting it off there.
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
    const STICK_TOP = isIOS ? 0 : 8

    const clearInlineStyles = () => {
      const panel = leftPanelRef.current
      if (!panel) return
      panel.style.position = ''
      panel.style.top = ''
      panel.style.bottom = ''
      panel.style.left = ''
      panel.style.width = ''
    }

    const update = () => {
      const container = containerRef.current
      const panel = leftPanelRef.current
      if (!container || !panel) return

      if (!mql.matches) {
        clearInlineStyles()
        return
      }

      const containerRect = container.getBoundingClientRect()
      const panelHeight = panel.offsetHeight

      panel.style.left = '0'
      panel.style.width = '100%'

      if (containerRect.top > STICK_TOP) {
        panel.style.position = 'absolute'
        panel.style.top = '0'
        panel.style.bottom = ''
      } else if (containerRect.bottom < panelHeight + STICK_TOP) {
        panel.style.position = 'absolute'
        panel.style.top = ''
        panel.style.bottom = '0'
      } else {
        panel.style.position = 'fixed'
        panel.style.top = `${STICK_TOP}px`
        panel.style.bottom = ''
      }
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    mql.addEventListener('change', update)

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      mql.removeEventListener('change', update)
      clearInlineStyles()
    }
  }, [])

  return (
    <section className="building-showcase" id="building">
      <div className="bs-progress-bar" style={{ width: `${percent}%` }} />
      <div className="bs-container" ref={containerRef}>
        <div className="bs-left-spacer" ref={spacerRef} />
        <div className="bs-left-panel" ref={leftPanelRef}>
          <canvas ref={canvasRef} className="bs-canvas" />
          {!loaded && (
            <div className="bs-loader">
              <span>Loading... {loadProgress}%</span>
            </div>
          )}
          <div className="bs-overlay">
            <div className="bs-pct">{percent}%</div>
            <div className="bs-label">Constructed</div>
          </div>
        </div>
        <div className="bs-right-panel" ref={rightPanelRef}>
          <canvas ref={silkRef} className="bs-silk"></canvas>
          {panels.map((panel, index) => (
            <div key={index} className="bs-section">
              <div className="bs-tag">Stage {String(index + 1).padStart(2, '0')}</div>
              <h2>{panel.title}</h2>
              <h3>{panel.subtitle}</h3>
              <p>{panel.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BuildingShowcase

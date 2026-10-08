import { useEffect, useRef } from 'react'
import './WriteOn.css'

const WriteOn = () => {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const wrappers = containerRef.current?.querySelectorAll('.letter-mask')
    if (!wrappers) return
    wrappers.forEach((el, i) => {
      const inner = el.querySelector('.letter-inner')
      if (inner) inner.style.animationDelay = `${0.8 + i * 0.06}s`
    })
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId, time = 0
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const bands = [
      { yFrac: 0.3, color: [180, 210, 170], amplitude: 40, freq: 0.003, speed: 0.02, width: 120 },
      { yFrac: 0.45, color: [200, 175, 140], amplitude: 50, freq: 0.004, speed: 0.015, width: 100 },
      { yFrac: 0.55, color: [160, 190, 210], amplitude: 35, freq: 0.005, speed: 0.025, width: 90 },
      { yFrac: 0.7, color: [190, 210, 180], amplitude: 45, freq: 0.003, speed: 0.018, width: 110 },
    ]

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 1

      for (const band of bands) {
        const baseY = canvas.height * band.yFrac
        ctx.beginPath()
        ctx.moveTo(0, baseY - band.width)

        for (let x = 0; x <= canvas.width; x += 2) {
          const wave = Math.sin(x * band.freq + time * band.speed) * band.amplitude +
            Math.sin(x * band.freq * 2.5 + time * band.speed * 0.7) * band.amplitude * 0.3
          ctx.lineTo(x, baseY - band.width + wave)
        }

        for (let x = canvas.width; x >= 0; x -= 2) {
          const wave = Math.sin(x * band.freq + time * band.speed + 1) * band.amplitude * 0.6 +
            Math.sin(x * band.freq * 1.8 + time * band.speed * 0.5) * band.amplitude * 0.2
          ctx.lineTo(x, baseY + band.width + wave)
        }

        ctx.closePath()
        const grad = ctx.createLinearGradient(0, baseY - band.width, 0, baseY + band.width)
        grad.addColorStop(0, `rgba(${band.color[0]},${band.color[1]},${band.color[2]},0)`)
        grad.addColorStop(0.5, `rgba(${band.color[0]},${band.color[1]},${band.color[2]},0.3)`)
        grad.addColorStop(1, `rgba(${band.color[0]},${band.color[1]},${band.color[2]},0)`)
        ctx.fillStyle = grad
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  const text = 'Grandeur Homes'

  return (
    <section className="writeon-section">
      <canvas ref={canvasRef} className="writeon-canvas"></canvas>
      <img src="/logo.png" alt="Grandeur Homes" className="writeon-logo" />
      <div className="writeon-container" ref={containerRef}>
        {text.split('').map((char, i) => (
          <span key={i} className={`letter-mask ${char === ' ' ? 'space' : ''}`}>
            <span className="letter-inner">{char}</span>
          </span>
        ))}
      </div>
      <div className="writeon-line"></div>
      <p className="writeon-tagline">We Build Your Dreams</p>
    </section>
  )
}

export default WriteOn

import { useEffect, useRef } from 'react'
import './RibbonBackground.css'

const RibbonBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const ribbons = []
    const colors = ['#1C6060', '#2a8080', '#d4af37', '#e2efe2']

    class Ribbon {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = -50
        this.width = 15 + Math.random() * 10
        this.height = 80 + Math.random() * 40
        this.speed = 1 + Math.random() * 2
        this.swing = Math.random() * 2 - 1
        this.swingSpeed = 0.02 + Math.random() * 0.03
        this.rotation = Math.random() * 360
        this.rotationSpeed = (Math.random() - 0.5) * 3
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.opacity = 0.6 + Math.random() * 0.4
      }

      update() {
        this.y += this.speed
        this.x += Math.sin(this.y * this.swingSpeed) * this.swing
        this.rotation += this.rotationSpeed

        if (this.y > canvas.height + 100) {
          this.y = -100
          this.x = Math.random() * canvas.width
        }
      }

      draw() {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate((this.rotation * Math.PI) / 180)
        ctx.globalAlpha = this.opacity
        
        const gradient = ctx.createLinearGradient(0, 0, 0, this.height)
        gradient.addColorStop(0, this.color)
        gradient.addColorStop(0.5, this.color + 'dd')
        gradient.addColorStop(1, this.color + '88')
        
        ctx.fillStyle = gradient
        ctx.fillRect(-this.width / 2, 0, this.width, this.height)
        
        ctx.restore()
      }
    }

    for (let i = 0; i < 15; i++) {
      ribbons.push(new Ribbon())
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ribbons.forEach(ribbon => {
        ribbon.update()
        ribbon.draw()
      })
      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return <canvas ref={canvasRef} className="ribbon-canvas" />
}

export default RibbonBackground

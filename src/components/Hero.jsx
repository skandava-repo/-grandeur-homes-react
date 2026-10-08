import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

const images = ['/hero-2.png', '/hero-5.png', '/hero-11.png', '/hero-10.png', '/villa.png', '/hero-skanda.png', '/hero-shannus.jpg', '/hero-saiaura.jpg', '/hero-lakshmi.png', '/hero-kamatchi.png']

const Hero = () => {
  const ref = useRef(null)
  const titleRef = useRef(null)
  const [currentImage, setCurrentImage] = useState(0)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 3500)
    
    return () => clearInterval(interval)
  }, [isVisible])

  useEffect(() => {
    const title = titleRef.current
    if (!title) return

    const h1 = title.querySelector('h1')
    if (!h1) return

    gsap.fromTo(
      h1,
      {
        clipPath: 'inset(0 100% 0 0)',
        opacity: 1,
      },
      {
        clipPath: 'inset(0 0% 0 0)',
        duration: 2.5,
        ease: 'power2.inOut',
        delay: 0.5,
      }
    )

    gsap.to(title, {
      y: -150,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    })
  }, [])

  return (
    <section className="hero" id="home" ref={ref}>
      {currentImage === 0 ? (
        <img 
          key="hero-main"
          src="/hero-main.png" 
          alt="Hero" 
          className="hero-video hero-media"
        />
      ) : (
        <img 
          key={currentImage}
          src={images[currentImage]} 
          alt="Hero" 
          className="hero-video hero-media"
        />
      )}
      <motion.div className="hero-bg" style={{ y }} />

      <motion.div className="hero-content" style={{ opacity }}>
        {currentImage !== 0 && (
          <>
            <motion.img
              src="/logo.png"
              alt="Grandeur Homes"
              className="hero-logo"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />

            <div ref={titleRef}>
              <h1 className="hero-title">𝑮𝒓𝒂𝒏𝒅𝒆𝒖𝒓 𝑯𝒐𝒎𝒆𝒔</h1>
            </div>

            <motion.p
              className="hero-tagline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              We Build Your Dreams
            </motion.p>

            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Crafting luxury residences that define elegance and precision
            </motion.p>

            <motion.div
              className="hero-cta"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <a href="#building" className="btn btn-primary">Explore Building</a>
              <a href="#contact" className="btn btn-secondary">Schedule Consultation</a>
            </motion.div>
          </>
        )}
      </motion.div>

      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        style={{ opacity }}
      >
        <span>Scroll</span>
        <div className="scroll-line" />
      </motion.div>
    </section>
  )
}

export default Hero

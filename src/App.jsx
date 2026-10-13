import { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import WriteOn from './components/WriteOn'
import Hero from './components/Hero'
import BuildingShowcase from './components/BuildingShowcase'
import About from './components/About'
import Leadership from './components/Leadership'
import Services from './components/Services'
import Projects from './components/Projects'
import JointDevelopment from './components/JointDevelopment'
import ProjectDetail from './components/ProjectDetail'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Navigation from './components/Navigation'
import './App.css'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

function HomePage({ onHeroSlideChange }) {
  return (
    <>
      <WriteOn />
      <Hero onFirstSlideChange={onHeroSlideChange} />
      <BuildingShowcase />
      <About />
      <Leadership />
      <Services />
      <Process />
      <Testimonials />
      <Contact />
    </>
  )
}

function AppContent() {
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mobileNavVisible, setMobileNavVisible] = useState(false)
  // Hero's first slide (hero-saiaura.jpg, desktop only) needs an ivory
  // header instead of the usual teal — Hero reports live via this callback
  // whenever its carousel moves on/off that slide.
  const [heroIvorySlide, setHeroIvorySlide] = useState(true)
  const lastScrollYRef = useRef(0)
  const location = useLocation()

  // Desktop nav background/visibility — unchanged from before.
  useEffect(() => {
    const handleScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.5
      setScrolled(past)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Mobile-only nav behavior: hidden at rest at the very top of Hero (the
  // hero posters already carry the Grandeur Homes branding, so a header on
  // top would duplicate it). Anywhere past that — including while still
  // inside Hero — it shows while the user is actively scrolling up, and
  // hides again on the next scroll-down.
  useEffect(() => {
    if (!isMobile) return

    const handleMobileScroll = () => {
      const scrollY = window.scrollY

      if (scrollY <= 10) {
        setMobileNavVisible(false)
      } else {
        const scrollingUp = scrollY < lastScrollYRef.current
        setMobileNavVisible(scrollingUp)
      }
      lastScrollYRef.current = scrollY
    }

    lastScrollYRef.current = window.scrollY
    handleMobileScroll()

    window.addEventListener('scroll', handleMobileScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleMobileScroll)
  }, [isMobile, location.pathname])

  // Track mobile/touch viewport so the nav can use the mobile-only behavior there.
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)')
    const update = () => setIsMobile(mql.matches)
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [])

  // Reset mobile nav visibility whenever we land on a new route.
  useEffect(() => {
    setMobileNavVisible(false)
  }, [location.pathname])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    // Only enable section snap on home page
    if (location.pathname !== '/') return

    // Disable the scroll hijack on touch devices / small screens so mobile
    // uses native momentum scrolling instead of the programmatic snap.
    const isTouchOrSmall =
      window.matchMedia('(max-width: 768px)').matches ||
      window.matchMedia('(pointer: coarse)').matches
    if (isTouchOrSmall) return

    let isScrolling = false
    let scrollTimeout = null
    let lastWheelTime = 0
    let wheelDelta = 0
    let animationId = null

    const scrollToSection = (direction) => {
      if (isScrolling) return
      isScrolling = true

      const currentScrollY = window.scrollY + window.innerHeight / 2
      const sections = Array.from(document.querySelectorAll('section'))
      const buildingPanels = document.querySelectorAll('.bs-section')
      const buildingSection = document.querySelector('#building')

      let targetY = null

      // If inside building showcase, snap between panels
      if (buildingSection && buildingPanels.length > 0) {
        const buildingTop = buildingSection.offsetTop
        const buildingBottom = buildingTop + buildingSection.offsetHeight

        if (currentScrollY >= buildingTop && currentScrollY <= buildingBottom) {
          let currentPanelIndex = -1
          let minDistance = Infinity

          buildingPanels.forEach((panel, index) => {
            const panelTop = panel.getBoundingClientRect().top + window.scrollY
            const panelCenter = panelTop + panel.offsetHeight / 2
            const distance = Math.abs(currentScrollY - panelCenter)
            if (distance < minDistance) {
              minDistance = distance
              currentPanelIndex = index
            }
          })

          if (currentPanelIndex >= 0) {
            if (direction === 'down' && currentPanelIndex < buildingPanels.length - 1) {
              const nextPanel = buildingPanels[currentPanelIndex + 1]
              const panelTop = nextPanel.getBoundingClientRect().top + window.scrollY
              const panelHeight = nextPanel.offsetHeight
              targetY = panelTop - (window.innerHeight - panelHeight) / 2
            } else if (direction === 'up' && currentPanelIndex > 0) {
              const prevPanel = buildingPanels[currentPanelIndex - 1]
              const panelTop = prevPanel.getBoundingClientRect().top + window.scrollY
              const panelHeight = prevPanel.offsetHeight
              targetY = panelTop - (window.innerHeight - panelHeight) / 2
            } else if (direction === 'down' && currentPanelIndex === buildingPanels.length - 1) {
              const buildingIndex = sections.findIndex(s => s.id === 'building')
              if (buildingIndex >= 0 && sections[buildingIndex + 1]) {
                targetY = sections[buildingIndex + 1].offsetTop
              }
            } else if (direction === 'up' && currentPanelIndex === 0) {
              targetY = 0
            }
          }
        }
      }

      // If not in building section, snap between main sections
      if (targetY === null) {
        let currentIndex = 0
        let minDistance = Infinity

        sections.forEach((section, index) => {
          const sectionCenter = section.offsetTop + section.offsetHeight / 2
          const distance = Math.abs(currentScrollY - sectionCenter)
          if (distance < minDistance) {
            minDistance = distance
            currentIndex = index
          }
        })

        const nextIndex = direction === 'down' ? currentIndex + 1 : currentIndex - 1
        if (nextIndex >= 0 && nextIndex < sections.length) {
          targetY = sections[nextIndex].offsetTop
        }
      }

      if (targetY !== null) {
        const start = window.scrollY
        const distance = targetY - start
        if (Math.abs(distance) < 5) { isScrolling = false; return }

        // Slow only when snapping BETWEEN building panels (both start and target inside building)
        const buildingTop = buildingSection ? buildingSection.offsetTop : 0
        const buildingBottom = buildingSection ? buildingSection.offsetTop + buildingSection.offsetHeight : 0
        const inBuilding = buildingSection && 
          start >= buildingTop && 
          targetY >= buildingTop && 
          targetY < buildingBottom

        // Kill native smooth scroll so we control speed
        document.documentElement.style.scrollBehavior = 'auto'
        
        const duration = inBuilding ? 3000 : 1200
        const startTimestamp = performance.now()

        const step = (now) => {
          const elapsed = now - startTimestamp
          const progress = Math.min(elapsed / duration, 1)
          // easeInOutSine — very even, slow throughout
          const ease = -(Math.cos(Math.PI * progress) - 1) / 2

          window.scroll(0, start + distance * ease)

          if (progress < 1) {
            animationId = requestAnimationFrame(step)
          } else {
            document.documentElement.style.scrollBehavior = ''
            isScrolling = false
            animationId = null
          }
        }
        animationId = requestAnimationFrame(step)
      } else {
        isScrolling = false
      }
    }

    const handleWheel = (e) => {
      e.preventDefault()
      if (isScrolling) return

      const now = Date.now()
      if (now - lastWheelTime > 150) wheelDelta = 0
      wheelDelta += e.deltaY
      lastWheelTime = now

      if (scrollTimeout) clearTimeout(scrollTimeout)

      if (Math.abs(wheelDelta) > 50) {
        scrollToSection(wheelDelta > 0 ? 'down' : 'up')
        wheelDelta = 0
      } else {
        scrollTimeout = setTimeout(() => {
          if (Math.abs(wheelDelta) > 30) {
            scrollToSection(wheelDelta > 0 ? 'down' : 'up')
          }
          wheelDelta = 0
        }, 150)
      }
    }

    let touchStartY = 0
    const handleTouchStart = (e) => { touchStartY = e.touches[0].clientY }
    const handleTouchEnd = (e) => {
      const swipe = touchStartY - e.changedTouches[0].clientY
      if (Math.abs(swipe) > 30 && !isScrolling) {
        scrollToSection(swipe > 0 ? 'down' : 'up')
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
      if (scrollTimeout) clearTimeout(scrollTimeout)
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [location.pathname])

  const isProjectsPage = location.pathname === '/projects'
  const isJVPage = location.pathname === '/jv'

  return (
    <div className="app">
      <Navigation
        scrolled={scrolled || isProjectsPage || isJVPage || (isMobile && mobileNavVisible)}
        hidden={
          isMobile
            ? !mobileNavVisible && !isProjectsPage && !isJVPage
            : !scrolled && !isProjectsPage && !isJVPage
        }
        heroIvory={location.pathname === '/' && heroIvorySlide}
      />
      <Routes>
        <Route path="/" element={<HomePage onHeroSlideChange={setHeroIvorySlide} />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/jv" element={<JointDevelopment />} />
      </Routes>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App

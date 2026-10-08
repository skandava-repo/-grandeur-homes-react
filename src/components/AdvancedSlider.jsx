import { useState } from 'react'
import { SLIDES_DATA } from '../data/slidesData'
import './AdvancedSlider.css'

const AdvancedSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const currentSlide = SLIDES_DATA[activeIndex]

  const handleCardClick = (index) => {
    setActiveIndex(index)
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? SLIDES_DATA.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === SLIDES_DATA.length - 1 ? 0 : prev + 1))
  }

  return (
    <section className="advanced-slider">
      <div 
        className="full-screen-bg"
        style={{ backgroundImage: `url(${currentSlide.bgImageUrl})` }}
      >
        <div className="progress-dots">
          {SLIDES_DATA.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>

        <div className="content-overlay" key={activeIndex}>
          <h1>{currentSlide.title}</h1>
          <p>{currentSlide.description}</p>
          <button className="explore-btn">Explore</button>
        </div>

        <div className="carousel-container">
          <div className="cards-wrapper">
            {SLIDES_DATA.map((slide, index) => (
              <div
                key={slide.id}
                className={`card ${index === activeIndex ? 'active' : ''}`}
                onClick={() => handleCardClick(index)}
              >
                <img src={slide.cardImageUrl} alt={slide.title} />
                <div className="card-info">
                  <h3>{slide.title}</h3>
                  <p>{slide.cardSubtitle}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="nav-arrows">
            <button className="arrow-btn" onClick={handlePrev}>←</button>
            <button className="arrow-btn" onClick={handleNext}>→</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdvancedSlider

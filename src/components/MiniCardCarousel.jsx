import './MiniCardCarousel.css'

const MiniCardCarousel = ({ slides, activeIndex, onCardClick }) => {
  return (
    <div className="mini-card-carousel">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`mini-card ${index === activeIndex ? 'active' : ''}`}
          onClick={() => onCardClick(index)}
        >
          <img src={slide.cardImageUrl} alt={slide.cardSubtitle} />
          <p>{slide.cardSubtitle}</p>
        </div>
      ))}
    </div>
  )
}

export default MiniCardCarousel

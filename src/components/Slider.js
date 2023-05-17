import { useState } from "react";

export function Slider({ items, initialIndex = 0 }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goToNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="slider-container">
      <div className="slider-items">
        {items.map((item, index) => (
          <div
            key={index}
            className={`slider-item ${
              index === currentIndex ? "active" : ""
            }`}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="slider-controls">
        <button onClick={goToPrev}>Anterior</button>
        <button onClick={goToNext}>Siguiente</button>
      </div>
    </div>
  );
}

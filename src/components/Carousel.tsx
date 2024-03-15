import { useState } from 'react';
import Carouseldata from "../data/Carousel.json";

function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    const lastIndex = Carouseldata.length - 1;
    const newIndex = activeIndex === lastIndex ? 0 : activeIndex + 1;
    setActiveIndex(newIndex);
  };

  const prevSlide = () => {
    const lastIndex = Carouseldata.length - 1;
    const newIndex = activeIndex === 0 ? lastIndex : activeIndex - 1;
    setActiveIndex(newIndex);
  };

  return (
    <>
      <div id="carouselExampleAutoplaying" className="container carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {Carouseldata.map((data, index) => (
            <div className={`carousel-item ${index === activeIndex ? 'active' : ''}`} key={data.id}>
              <img src={data.img} alt={data.name} className="d-block w-100" />
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev" onClick={prevSlide}>
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next" onClick={nextSlide}>
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}

export default Carousel;

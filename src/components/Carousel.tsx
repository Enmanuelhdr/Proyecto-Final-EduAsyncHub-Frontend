import { useState } from 'react';
import Carouseldata from "../data/Carousel.json";
import { FcPrevious } from "react-icons/fc";
import { FcNext } from "react-icons/fc";

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
      <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {Carouseldata.map((data, index) => (
            <div className={`carousel-item ${index === activeIndex ? 'active' : ''}`} key={data.id}>
              <img src={data.img} alt={data.name} className="d-block w-100" />
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev" onClick={prevSlide}>
          <FcPrevious className='fs-1'/>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next" onClick={nextSlide}>
          <FcNext className='fs-1'/>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}

export default Carousel;

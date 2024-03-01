import Carouseldata from "../data/Carousel.json";

function Carousel() {
  return (
    <>
    <div id="carouselExample" className=" container carousel slide">
        <div className="carousel-inner ">



            {Carouseldata.map((data) => {
              return (
                <div className="carousel-item h-500 active" key={data.id}>
                  <img
                    src={data.img}
                    alt={data.name}
                    className="d-block w-100 "/>
                    
                
                </div>
              );
            })}
               
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

    </>
  );
}

export default Carousel;

import NavBar from "../components/NavBar";
import Carousel from "../components/Carousel";
import Eventos from "../components/Evento";

function Home() {
  return (
    <>
      <NavBar />
      <div className="pt-3">
        <Carousel />
      </div>

      <div className=" pt-5 d-flex flex-column justify-content-center align-items-center gap-3 pb-5">
        <h3>Eventos</h3>
        <Eventos cantidadMostrar={3} />
      </div>
    </>
  );
}

export default Home;

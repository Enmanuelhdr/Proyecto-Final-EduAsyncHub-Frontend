import NavBar from "../components/NavBar";
import Carousel from "../components/Carousel";
import Eventos from "../components/Evento";
import Noticias from "../components/Noticia";
import ButtonRuta from "../components/ButtonRuta";
import Navbardata from "../data/HomeNavbard.json";
import InfoSchoolData from "../data/InfoSchool.json";
import Footer from "../components/Footer";
import ResumenEscuela from "../components/ResumenEscuela";
import Niveles from "../components/Niveles";
function Home() {


  return (
    <>
      <NavBar  brand="EduAsyncHub" goto="/" navData={Navbardata} />
      <div className="">
        <Carousel />
      </div>

      <div className="container pt-5">
        <ResumenEscuela data={InfoSchoolData[0]}/>
        <Niveles data={InfoSchoolData[0]}/>
      </div>

      <div className=" container pt-5  d-flex flex-column justify-content-center align-items-center gap-3 ">
        <h3>Eventos</h3>
        <Eventos cantidadMostrar={3} />
        <ButtonRuta path="/eventos" text="Ver todos los eventos" className="btn btn-primary" />
      </div>

      <div className="container pt-5 d-flex flex-column justify-content-center align-items-center gap-3 pb-5">
        <h3>Noticias</h3>
        <Noticias cantidadMostrar={3} />
        <ButtonRuta path="/noticias" text="Ver todas las noticias" className="btn btn-primary" />
      </div>

      <Footer />
    </>
  );
}

export default Home;


import NavBar from "../components/NavBar"
import Evento from "../components/Evento"
import Navbardata from "../data/HomeNavbard.json";


function Eventos() {
  return (
    <>
    <NavBar brand="EduAsyncHub" goto="/" navData={Navbardata} />
      <div className="container d-flex flex-column pt-3 pb-3 justify-content-right ">
        <h2 className="display-7 fw-bold py-4  ">Eventos</h2>
        <Evento cantidadMostrar={9999}/>
      </div>

    </>
  )
}

export default Eventos
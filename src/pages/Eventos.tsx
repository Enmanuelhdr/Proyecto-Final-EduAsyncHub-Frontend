
import NavBar from "../components/NavBar"
import Evento from "../components/Evento"
import Navbardata from "../data/HomeNavbard.json";


function Eventos() {
  return (
    <>
    <NavBar brand="EduAsyncHub" goto="/" navData={Navbardata} />
      <div className="container pt-3 pb-3">
        <Evento cantidadMostrar={9999}/>
      </div>




    </>
  )
}

export default Eventos
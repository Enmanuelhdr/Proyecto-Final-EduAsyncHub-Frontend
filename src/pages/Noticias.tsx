import NavBar from "../components/NavBar"
import Noticia from "../components/Noticia"
import Navbardata from "../data/HomeNavbard.json";

function Noticias() {
  return (
    <>
    <NavBar  brand="EduAsyncHub" goto="/" navData={Navbardata}/>
    <div className="container pt-3 pb-3">
    <Noticia cantidadMostrar={9999}/>
  </div>
  </>
  )
}

export default Noticias
import NavBar from "../components/NavBar"
import Noticia from "../components/Noticia"
import Navbardata from "../data/HomeNavbard.json";

function Noticias() {
  return (
    <>
    <NavBar  brand="EduAsyncHub" goto="/" navData={Navbardata}/>
    <div className="container d-flex flex-column pt-3 pb-3 justify-content-center ">
      <h2 className="display-7 fw-bold py-4 ">Noticias</h2>
      <Noticia cantidadMostrar={9999}/>
    </div>
  </>
  )
}

export default Noticias
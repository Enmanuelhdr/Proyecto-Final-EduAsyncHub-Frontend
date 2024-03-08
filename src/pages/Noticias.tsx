import NavBar from "../components/NavBar"
import Noticia from "../components/Noticia"


function Noticias() {
  return (
    <>
    <NavBar/>
    <div className="container pt-3 pb-3">
    <Noticia cantidadMostrar={9999}/>
  </div>
  </>
  )
}

export default Noticias
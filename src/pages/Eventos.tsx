
import NavBar from "../components/NavBar"
import Evento from "../components/Evento"

function Eventos() {
  return (
    <>
    <NavBar/>
    <div>
      <h2 className="text-3xl text-success"> 
      Eventos
      </h2>
      </div>

      <div className="container pb-5">
        <Evento cantidadMostrar={9999}/>
      </div>




    </>
  )
}

export default Eventos

import NavBar from "../components/NavBar"
import Evento from "../components/Evento"

function Eventos() {
  return (
    <>
    <NavBar/>
      <div className="container pt-3 pb-3">
        <Evento cantidadMostrar={9999}/>
      </div>




    </>
  )
}

export default Eventos
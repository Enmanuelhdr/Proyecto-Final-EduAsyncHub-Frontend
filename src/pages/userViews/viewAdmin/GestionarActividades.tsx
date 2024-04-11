import Actvidades from "./Actividades"
import Navbardata from "../../../data/AdminNavbard.json";
import NavBar from "../../../components/NavBar";


function GestionarActividades() {
  return (
   <>
  <NavBar brand="Panel Admin" goto="/dashboardAdministrador" navData={Navbardata} />
   <Actvidades/>
   </>
  )
}

export default GestionarActividades
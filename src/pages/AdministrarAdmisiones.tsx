import NavBar from "../components/NavBar"
import Admisiones from "./userViews/viewAdmin/Admisiones"
import Navbardata from "../data/AdminNavbard.json"

function AdministrarAdmisiones() {
  return (
    <>
   <NavBar brand="Panel Admin" goto="/dashboardAdministrador" navData={Navbardata} />
    <Admisiones/>

    </>
  )
}

export default AdministrarAdmisiones
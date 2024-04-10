import MiCalificacion from "./MiCalificacion"
import navData from "../../../data/EstudianteNavbar.json";
import NavBar from "../../../components/NavBar";

function DashboardStudent() {
  return (
    <>
   <NavBar
        brand="Panel Estudiante"
        goto="/dashboardestudiante"
        navData={navData}
      />
      <div className="mt-4">

  <MiCalificacion />
      </div>
    </>
  )
}

export default DashboardStudent
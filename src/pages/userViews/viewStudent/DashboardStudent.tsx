import MiCalificacion from "./MiCalificacion"
import navData from "../../../data/EstudianteNavbar.json";
import NavBar from "../../../components/NavBar";

function DashboardStudent() {
  return (
    <>
      <NavBar
        brand="Panel Estudiante"
        goto="/dashboardEstudiante"
        navData={navData}
      />
      <div className="container-fluid" style={{ backgroundColor: '#e8e8e8', minHeight: '100vh' }}>
        <div className='row m-0 py-2 px-4 justify-content-md-between align-itemns-center justify-content-center'>
          <h3 className="fw-bold p-2">Dashboard</h3>
        </div>
        <MiCalificacion />
      </div>
    </>
  )
}

export default DashboardStudent
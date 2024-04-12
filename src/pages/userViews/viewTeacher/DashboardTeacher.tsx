import NavBar from "../../../components/NavBar";
import ShowSubjects from "./ShowSubjects";
import navData from "../../../data/ProfesorNavbar.json";

function DashboardTeacher() {
  return (
    <>
      <NavBar
        brand="Panel Profesor"
        goto="/dashboardprofesor"
        navData={navData}
      />
      <div className="mt-4">
        <ShowSubjects />
      </div>
    </>
  );
}

export default DashboardTeacher;

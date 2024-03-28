import NavBar from "../../../components/NavBar"
import ShowSubjects from "./ShowSubjects"
import  navData  from "../../../data/AdminNavbard.json"



function DashboardTeacher() {
  return (
    <>
    <NavBar brand="DashboardTeacher" goto="/dashboardprofesor" navData={navData}/>
    <ShowSubjects />
    
    </>
  )
}

export default DashboardTeacher
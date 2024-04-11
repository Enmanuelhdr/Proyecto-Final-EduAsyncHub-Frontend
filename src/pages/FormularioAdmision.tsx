import NavBar from "../components/NavBar"
import navData from "../data/HomeNavbard.json";
import SolicitarAdmision from "./userViews/viewStudent/SolicitarAdmision";

function FormularioAdmision() {
  return (
    <>
    <NavBar
        brand="EduAsyncHub"
        goto="/"
        navData={navData}
      />

      <SolicitarAdmision/>
    </>
  )
}

export default FormularioAdmision
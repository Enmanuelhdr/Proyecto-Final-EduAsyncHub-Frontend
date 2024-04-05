import InfoSchool from "../components/InfoSchool";
import NavBar from "../components/NavBar";
import Navbardata from "../data/HomeNavbard.json"

function Nosotros() {
  return (
    <>
    <NavBar brand="EduAsyncHub" goto="/" navData={Navbardata} />
    <InfoSchool/>
    </>
  );
}

export default Nosotros;
import SendMail from "../../../components/SendMail";
import Navbardata from "../../../data/AdminNavbard.json";
import NavBar from "../../../components/NavBar";


function EmailAdmin() {
  return (
    <>
      <NavBar brand="Panel Admin" goto="/dashboardAdministrador" navData={Navbardata} />
      <div className="container-fluid p-5">
        <h2 className="display-7 fw-bold py-4 ms-5 ps-2">Envios de Correos a la Comunidad</h2>
        <SendMail />
      </div>

    </>
  );
}

export default EmailAdmin;
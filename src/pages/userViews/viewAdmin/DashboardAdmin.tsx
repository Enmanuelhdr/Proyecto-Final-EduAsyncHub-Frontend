import NavBar from "../../../components/NavBar";
import Navbardata from "../../../data/AdminNavbard.json";
import TableUser from "./TableUser";

function DashboardAdmin() {
  return (
    <>
      <NavBar brand="Panel Admin" goto="/dashboardAdministrador" navData={Navbardata} />
      <div className=" row m-0 p-4  justify-content-md-between  align-itemns-center justify-content-center ">
        <TableUser />
      </div>

    </>
  );
}

export default DashboardAdmin;

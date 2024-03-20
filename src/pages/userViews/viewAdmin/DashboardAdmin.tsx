import Footer from "../../../components/Footer";
import NavBar from "../../../components/NavBar";
import Navbardata from "../../../data/AdminNavbard.json";
import AddUserForm from "./AddUserForm";
import TableUser from "./TableUser";

function DashboardAdmin() {
  return (
    <>
      <NavBar brand="DashboardAdmin" goto="/dashboardAdministrador" navData={Navbardata} />
      <div className=" row m-0 pt-4 justify-content-md-between  align-itemns-md-center justify-content-center ">
        <div className="col-10 col-md-4 p-2">
          <AddUserForm />
        </div>
        <div className="col-10  col-md-8 p-2">
          <TableUser />
        </div>
      </div>

      <Footer />

    </>
  );
}

export default DashboardAdmin;

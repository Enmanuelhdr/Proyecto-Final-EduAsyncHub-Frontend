import NavBarAdmin from "../../../components/NavBarAdmin";
import AddUserForm from "./AddUserForm";
import TableUser from "./TableUser";

function DashboardAdmin() {
  return (
    <>
      <NavBarAdmin />
      <div className="container-fluid row gap-5 justify-content-between justify-content-md-center align-itemns-md-center justify-content-center w-full ">
        <div className="col-lg-3 col-md-9">
          <AddUserForm />
        </div>
        <div className="col-lg-6 col-md-9">
          <TableUser />
        </div>
      </div>
    </>
  );
}

export default DashboardAdmin;

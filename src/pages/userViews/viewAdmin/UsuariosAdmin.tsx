import NavBar from "../../../components/NavBar";
import Navbardata from "../../../data/AdminNavbard.json";
import UserTable from "./UserTable";

function UsuariosAdmin() {
    return(
        <>
        <NavBar brand="Panel Admin" goto="/dashboardAdministrador" navData={Navbardata} />
        <div className=" row m-0">
            <UserTable/>
        </div>
        </>
    );
}

export default UsuariosAdmin;

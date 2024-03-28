import NavBar from "../../../components/NavBar";
import Navbardata from "../../../data/AdminNavbard.json";
import NewsTable from "./NewsTable";

function NoticiasAdmin() {
    return(
        <>
        <NavBar brand="Panel Admin" goto="/dashboardAdministrador" navData={Navbardata} />
        <div className="row m-0">
            <NewsTable />
        </div>
        
        </>
    );
}

export default NoticiasAdmin;

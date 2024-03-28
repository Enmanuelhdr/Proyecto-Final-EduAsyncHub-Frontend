import NavBar from "../../../components/NavBar";
import Navbardata from "../../../data/AdminNavbard.json";
import EventsTable from "./EventsTable";

function EventosAdmin() {
    return(
        <>
        <NavBar brand="Panel Admin" goto="/dashboardAdministrador" navData={Navbardata} />
        <div className="row m-0">
            <EventsTable/>
        </div>
        
        </>
    );
}

export default EventosAdmin;

import { Link } from "react-router-dom"
import Navbardata from "../data/AdminNavbard.json"
import ButtonLogout from "./ButtonLogout"


function NavBarAdmin() {
  return (
    <>
   <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid ">
    <Link to="/dashboardadmin" className="navbar-brand">Dashboard Admin</Link>
   
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">

      {Navbardata.map((data ) => {
        return(
          <li className="nav-item" key={data.name}>
          <Link to={data.url} className="nav-link">{data.name}</Link>
        </li>
        )

      }
    

      )}
        
      </ul>
    <div className="nav-item">
    <ButtonLogout/>
    </div>
    </div>
  </div>
</nav>
   </>
  )
}

export default NavBarAdmin
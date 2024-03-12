import { Link } from "react-router-dom";
import Navbardata from "../data/HomeNavbard.json";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import ButtonLogout from "./ButtonLogout";

function NavBar() {
  const cookies = new Cookies();

  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    const token = cookies.get("token");
    setIsLogged(!!token); 
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5 pb-3">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <Link to="/" className="navbar-brand">
              EduAsyncHub
            </Link>

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {Navbardata.map((data) => (
                <li className="nav-item" key={data.name}>
                  <Link to={data.url} className="nav-link">
                    {data.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="dropdown">
              <a
                className="text-reset me-3 dropdown-toggle hidden-arrow"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaRegUserCircle className="text-secondary fs-5" />
              </a>

              <ul
                className="dropdown-menu dropdown-menu-lg-end dropdown-menu-sm-start bg-dark"
                aria-labelledby="navbarDropdownMenuAvatar"
                style={{ right: 0 }}
              >
                <li>
                  {isLogged ? (
                    <ButtonLogout />
                  ) : (
                    <Link
                      to="/login"
                      className="dropdown-item text-light"
                      style={{ backgroundColor: "transparent" }}
                    >
                      Acceder
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { FaRegUserCircle } from "react-icons/fa";
import ButtonLogout from "./ButtonLogout";

interface NavItem {
  name: string;
  url: string;
}

interface NavBarProps {
  brand: string;
  goto: string;
  navData: NavItem[];
}

function NavBar(props: NavBarProps) {
  const { brand, goto, navData } = props;
  const cookies = new Cookies();
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = cookies.get("token");
    setIsLogged(!!token);
  }, []);

  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
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
            <Link to={goto} className="navbar-brand">
              {brand}
            </Link>

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {navData.map((data, index) => (
                <li className="nav-item" key={index}>
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
                    <>
                    <Link
                    to={'/'}
                    className="dropdown-item text-white"
                    style={{ backgroundColor: "transparent" }}
                  >
                    Home
                  </Link>
                    <Link
                      to={`/dashboard${cookies.get("userRole")}`}
                      className="dropdown-item text-primary"
                      style={{ backgroundColor: "transparent" }}
                    >
                      Dashboard
                    </Link>
                    <ButtonLogout />
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className="dropdown-item text-primary"
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

import  ImagenEstudiante from "../img/student.webp"
import { Link } from "react-router-dom";


function Footer() {
  return (
    <>
      <footer className="footer bg-dark text-white pt-5 px-5">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-10">
            <div className="row">
                <div className="col-lg-4 col-6 col-md-2 mb-3">
                  <h5 className="fw-bold">Nosotros</h5>
                  <ul className="nav flex-column">
                    <li className="nav-item mb-2">
                      <Link to="/nosotros" className="nav-link p-0 text-white">
                        Quiénes Somos
                      </Link>
                    </li>
                    <li className="nav-item mb-2">
                      <Link to="/nosotros" className="nav-link p-0 text-white">
                        Misión, Visión y Valores
                      </Link>
                    </li>
                    <li className="nav-item mb-2">
                      <Link to="/nosotros" className="nav-link p-0 text-white">
                        Oferta Educativa
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="col-lg-4 col-6 col-md-2 mb-3">
                  <h5 className="fw-bold">Vida Estudiantil</h5>
                    <ul className="nav flex-column">
                      <li className="nav-item mb-2">
                        <Link to="/noticias" className="nav-link p-0 text-white">
                          Noticias
                        </Link>
                      </li>
                      <li className="nav-item mb-2">
                        <Link to="/eventos" className="nav-link p-0 text-white">
                          Eventos
                        </Link>
                      </li>
                    </ul>
                </div>

                <div className="col-lg-4 col-6 col-md-2 mb-3">
                  <h5 className="fw-bold">Dirección</h5>
                  <p>Calle Puerto Rico, Alma Rosa I, Santo Domingo Este, Santo Domingo, República Dominicana</p>
                </div>
            </div>

            <div className="row">
              <div className="d-flex flex-column flex-sm-row justify-content-between py-4 border-top border-primary">
                <p>© 2024 EduAsyncHub, Inc. All rights reserved.</p>
              </div>
            </div>

          </div>
            
            <div className="col-lg-2 col-md-4 mb-3 d-flex justify-content-center align-items-center order-md-last">
              <img src={ImagenEstudiante} alt="Foto" className="img-fluid mb-3" />
            </div>

          </div>
        </footer>

    </>
  );
}

export default Footer;

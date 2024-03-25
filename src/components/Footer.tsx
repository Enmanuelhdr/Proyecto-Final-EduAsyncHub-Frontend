import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import  ImagenEstudiante from "../img/student.webp"
import { FaGithub } from "react-icons/fa6";
import ButtonRuta from "./ButtonRuta";
import { Link } from "react-router-dom";


function Footer() {
  return (
    <>
      <footer className=" footer p-2 mt-auto bg-dark text-white d-flex flex-column  ">
        <div className="container-fluid row p-0 m-0 gap-4">
         
         
            <div className="col-12 col-md-4  d-flex justify-content-center ">
              <a href="/">
               <img src={ImagenEstudiante} alt="Imagen estudiantes" className="img-fluid" />
              </a>
            </div>
            
            <div className="col-12 col-md-4 ">
        
            <div className="d-flex flex-column justify-content-center">
              <h3 className="d-flex justify-content-center fw-bold">Contacto</h3>
              <div className="container-fluid d-flex flex-column justify-content-center">
                <p>123 Calle Principal, Ciudad</p>
                
                <p>Correo electronico: colegiolafe@gmail.com</p>
                <p>Teléfono: 123-456-7890</p>
              </div>

              <div className="d-flex justify-content-center gap-4">
                <a href="https://www.facebook.com/">
                  <FaFacebook />
                </a>
                <a href="https://www.instagram.com/">
                  <AiFillInstagram />
                </a>
                <a href="https://www.github.com/">
                  <FaGithub />
                </a>
              </div>
              </div>
          
            
          </div>

          <div className="col-12 col-md-2 d-flex flex-column justify-content-center ">
            <h3 className="fw-bold">Sobre Nosotros</h3>
            <ul className="list-group list-group-flush">
              <ButtonRuta path="/nosotros" text="Quiénes Somos" className="text-white"></ButtonRuta>
              <br></br>
              <ButtonRuta path="/nosotros" text="Historia" className="text-white"></ButtonRuta>
              <ButtonRuta path="/nosotros" text="Programas" className="text-white"></ButtonRuta>
              <ButtonRuta path="/nosotros" text="Niveles" className="text-white"></ButtonRuta>        
            </ul>
          </div>
        </div>

        <div className="d-flex justify-content-center align-items-center">
          <p>&copy; 2024 La Fe. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;

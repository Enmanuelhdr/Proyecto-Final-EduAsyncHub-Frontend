import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import  ImagenEstudiante from "../img/student.webp"
import { FaGithub } from "react-icons/fa6";
import ButtonRuta from "./ButtonRuta";

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
              <h3 className="d-flex justify-content-center">Contacto</h3>
              <div className="container-fluid d-flex flex-column justify-content-center">
                <p>E2 first floor, Church COmpound</p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Dolores, voluptatum.
                </p>
                <p>Email: colegiomrcrystal@gmail.com</p>
                <p>Phone: 123-456-7890</p>
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
            <h3 className="">Spread</h3>
            <p className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
              cumque quo perspiciatis doloremque voluptate error quos nostrum
              aspernatur, beatae distinctio quidem ea. Fugiat!
            </p>
            <ButtonRuta
              path="/nosotros"
              text="Acerca de nosotros"
              className="btn btn-primary"
            />
          </div>
        </div>

        <div className="d-flex justify-content-center align-items-center">
          <p>&copy; 2024 MRCrystal. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;

import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaGraduationCap } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";


function Footer() {
  return (
    <>
      <footer className="page-footer shadow bg-dark p-5">
        <div className="d-flex flex-column mx-auto py-5">
          <div className="d-flex flex-wrap justify-content-between">
            <div>
              <a href="/" className="d-flex align-items-center p-0 text-white">
               
                <FaGraduationCap />
                <span className="ms-3 h5 font-weight-bold">EduAsyncHub</span>
              </a>
              <p className="my-3 pb-3 text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti fugiat ut modi nemo laboriosam ex aliquam atque nostrum? Ut, deleniti! Corrupti, molestias?
              </p>
              <div className="container d-flex justify-content-between mb-4 border-dark shadow-lg p-2  rounded w-50">
                <a
                  data-mdb-ripple-init
                  className="btn btn-outline btn-dark btn-floating m-1 text-white fs-3 "
                  href="#!"
                  role="button"
                >
                  <FaFacebook />
                </a>

                <a
                  data-mdb-ripple-init
                  className="btn btn-outline btn-dark btn-floating m-1 text-white fs-3 "
                  href="#!"
                  role="button"
                >
                <AiFillInstagram />
                </a>    <a
                  data-mdb-ripple-init
                  className="btn btn-outline btn-dark btn-floating m-1 text-white fs-3 "
                  href="#!"
                  role="button"
                >
                  <FaGithub />
                </a>
              </div>
            </div>
            <div>
              <p className="h5 mb-4 text-white">Help</p>
              <ul className="p-0">
                <li className="my-2">
                  <a className="text-white" href="/">
                    Resources
                  </a>
                </li>
                <li className="my-2">
                  <a className="text-white" href="/">
                    About Us
                  </a>
                </li>
                <li className="my-2">
                  <a className="text-white" href="/">
                    Contact
                  </a>
                </li>
                <li className="my-2">
                  <a className="text-white" href="/">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="h5 mb-4 text-white">Help</p>
              <ul className="p-0">
                <li className="my-2">
                  <a className="text-white" href="/">
                    Support
                  </a>
                </li>
                <li className="my-2">
                  <a className="text-white" href="/">
                    Sign Up
                  </a>
                </li>
                <li className="my-2">
                  <a className="text-white" href="/">
                    Sign In
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="h5 mb-4 text-white">Help</p>
              <ul className="p-0">
                <li className="my-2">
                  <a className="text-white" href="/">
                    Support
                  </a>
                </li>
                <li className="my-2">
                  <a className="text-white" href="/">
                    Sign Up
                  </a>
                </li>
                <li className="my-2">
                  <a className="text-white" href="/">
                    Sign In
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <small className="text-center mt-5 text-white">
            &copy; EduAsyncHub, 2024. All rights reserved.
          </small>
        </div>
      </footer>
    </>
  );
}

export default Footer;

import img404 from "../img/404.png"
import ButtonRuta from "../components/ButtonRuta"


function NotFound() {
  return (
    <>
   
    <div className="container d-flex justify-content-center flex-column">
      <div className="error-img d-flex justify-content-center ">
      <img src={img404} alt="Img error 404." className="img-fluid" />
      </div>
      <div className="error d-flex justify-content-center flex-column align-items-center">
        <p className=" fs-1 fw-bold">Página no encontrada</p>
        <div className="">
        <ButtonRuta path="/" text="Home" className="btn btn-primary"/>
        </div>
     
       </div>
    </div>


    </>
  )
}

export default NotFound
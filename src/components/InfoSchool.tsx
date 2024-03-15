import InfoSchoolData from "../data/InfoSchool.json";
import QuienesSomos from "./QuienesSomos";
import Historia from "./Historia";
import MisionVisionValores from "./MisionVisionValores";
import Programas from "./Programas";
import Niveles from "./Niveles";
import ContactUs from "./ContactUs";

function InfoSchool() {
  return (
    <>
    <div className="school-info">

      {/* Quienes somos */}
      <QuienesSomos data={InfoSchoolData[0].aboutUs}/>

      {/* Historia */}
      <Historia data={InfoSchoolData[0].history}/>
        
       {/* Mision vision y aja */}
       <MisionVisionValores data={InfoSchoolData[0]}/>

        {/* Oferta Educativa */}
       <div className="container px-4 py-3">
          <h1 className='display-7 fw-bold'>Oferta Educativa</h1>
          <Programas data={InfoSchoolData[0].programs}/>
          <Niveles data={InfoSchoolData[0]}/>
      </div>

      <ContactUs data={InfoSchoolData[0].contactInfo}/>


      

    </div>
    </>
  );
}

export default InfoSchool;
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
    <div className="pt-5">

      {/* Quienes somos */}
      <QuienesSomos data={InfoSchoolData[0].aboutUs}/>

      {/* Historia */}
      <Historia data={InfoSchoolData[0].history}/>
      <hr className="w-100 border border-primary" /><br />
       {/* Mision vision y aja */}
       <MisionVisionValores data={InfoSchoolData[0]}/>
       <br />

        {/* Oferta Educativa */}
       <div className="container py-3">
          <h1 className='display-7 fw-bold'>Oferta Educativa</h1>
          <h2 className='pb-2 fw-bold text-center text-primary'>Programas</h2>
          <Programas data={InfoSchoolData[0].programs}/>
          <br /><br />
          <h2 className='fw-bold text-center text-primary py-2'>Niveles</h2>
          <Niveles data={InfoSchoolData[0]} fontSizeBig={true}/>
          <br /><br />
          
      </div>

      <ContactUs data={InfoSchoolData[0].contactInfo}/>


      

    </div>
    </>
  );
}

export default InfoSchool;
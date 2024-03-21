import ButtonRuta from "../components/ButtonRuta";
import Niveles from "../components/Niveles";
import InfoSchoolData from "../data/InfoSchool.json";

interface Props {
    data: {
        nameSchool: string;
        contactInfo: {
            mapSrc: string;
        };
        aboutUs: {
            content: string[];
        }
    }
}

function ResumenEscuela(props: Props) {
    const { nameSchool, contactInfo, aboutUs } = props.data;
    const { mapSrc } = contactInfo;
    const { content } = aboutUs;

    return (
        <div className="container">
            <div className="school-title text-center mb-4">
                <h1 className="display-3 fw-bold lh-1">{nameSchool}</h1>
                <p className="lead">¡Descubre todo lo que tenemos para ofrecerte!</p>
            </div>

            <div className="row pt-3">
                <div className="col-lg-6">
                    <div className="row mb-1">
                        <div className="col-lg-12">
                            <p className="lead">{content[0]}</p>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-lg-12">
                            <ButtonRuta path="/nosotros" text="Leer más" className="btn btn-primary btn-sm px-4 me-sm-3" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <h2 className="display-7 fw-bold">Niveles ofrecidos</h2>
                            <Niveles data={InfoSchoolData[0]} fontSizeBig={false} />
                
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <iframe className="rounded-4 img-fluid w-100" title="Google Map" src={mapSrc} style={{ border: 0, height: '100%' }} allowFullScreen loading="lazy"></iframe>
                </div>
            </div>
        </div>
    );
}

export default ResumenEscuela;

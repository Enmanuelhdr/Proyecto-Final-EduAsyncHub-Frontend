import ButtonRuta from "../components/ButtonRuta";

interface Props {
    data: {
        nameSchool: string;
        typeSchool: string;
        contactInfo: {
            mapSrc: string;
        };
    }
}

function ResumenEscuela (props:Props) {

    const { nameSchool, typeSchool, contactInfo } = props.data;
    const { mapSrc } = contactInfo;

    return (
        <>
        <div className="container">
            <h1 className="display-7 fw-bold lh-1 mb-3">{nameSchool}</h1>
            <div className="row">
                <div className="col-lg-6">
                    <p className="lead mb-4">Somos una {typeSchool} comprometida con la excelencia educativa.</p>
                    <div className="d-grid gap-2 d-sm-flex">
                        <ButtonRuta path="/nosotros" text="Leer más" className="btn btn-primary btn-sm px-4 me-sm-3" />
                    </div>
                </div>
                <div className="col-lg-6 overflow-hidden text-end">
                    <div className="container ps-5">
                        <iframe className="rounded-4 img-fluid mb-4" title="Google Map" src={mapSrc} width="100%" height="500" style={{ border: 0 }} allowFullScreen loading="lazy"></iframe>
                    </div>
                </div>
            </div>
        </div>
        </>

    );
}

export default ResumenEscuela;
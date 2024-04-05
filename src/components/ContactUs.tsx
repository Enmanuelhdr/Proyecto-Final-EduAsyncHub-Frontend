interface Props {
    data: {
        address: string;
        phone: string;
        email: string;
        mapSrc: string;
    }
}

function ContactUs(props:Props) {

    const { address, phone, email, mapSrc } = props.data;

  return (
    <div className="container px-4 py-5">
            <h2 className="display-7 fw-bold lh-1 mb-3">Información de Contacto</h2>
            <div className="row">
                <div className="col-md-6">
                    <p className="fs-5 text-left">Pregúntenos hasta las preguntas más pequeñas. Podrían ser los primeros pasos hacia los mayores cambios.</p>
                    <div className="row mb-3">
                        <div className="col">
                            <p className="fs-5 text-primary"><strong>Teléfono:</strong></p>
                            <p>{phone}</p>
                        </div>
                        <div className="col">
                            <p className="fs-5 text-primary"><strong>Email:</strong></p>
                            <p>{email}</p>
                        </div>
                    </div>
                    <p className="fs-5 text-primary"><strong>Dirección:</strong></p>
                    <p>{address}</p>
                </div>
                <div className="col-md-6">
                    <div className="ratio ratio-16x9">
                        <iframe className="rounded-4" title="Google Map" src={mapSrc} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"></iframe>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default ContactUs;
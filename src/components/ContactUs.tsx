interface Props {
    data: {
        address: string;
        phone: string;
        email: string;
    }
}

function ContactUs(props:Props) {

    const { address, phone, email } = props.data;

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
                        <iframe className="rounded-4" title="Google Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1590.9014154900121!2d-69.85807909882496!3d18.491715904161225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eaf87d7c58ce175%3A0x2c323b5224f35977!2sLiceo%20Eugenio%20Maria%20De%20Hostos!5e0!3m2!1ses!2sdo!4v1710118671271!5m2!1ses!2sdo" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"></iframe>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default ContactUs;
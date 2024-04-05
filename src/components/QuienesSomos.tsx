
interface Props {
    data: {
        imgAboutUs: string;
        content: string[];
    }
}

function QuienesSomos(props:Props) {

    const { content, imgAboutUs } = props.data;

  return (
    <div className="container col-xxl-8 px-4 py-4">
        <div className="row g-4 py-2">
            <div className="col-lg-6">
              <h1 className="display-7 fw-bold lh-1 mb-3">Quiénes Somos</h1>
              <div>
                {content.map((parrafo, index) => (
                  <p key={index}>{parrafo}</p>
                ))}
              </div>
            </div>
            <div className="col-10 col-sm-12 col-lg-6 align-items-center">
              <img className="d-block mx-lg-auto img-fluid rounded-4" src={imgAboutUs} alt="foto de estudiantes" width="500" height="300"/>
            </div>
          </div>
    </div>
  )
}

export default QuienesSomos
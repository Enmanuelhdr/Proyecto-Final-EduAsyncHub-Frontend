
interface Props {
    data: {
        imgHistory: string;
        content: string[];
    }
}

function Historia(props:Props) {

    const { content, imgHistory } = props.data;

  return (
    <div className="container col-xxl-8 px-4 py-4">
        <div className="row flex-lg-row-reverse g-4 py-2 fade-in">
            <div className="col-lg-6 order-lg-1">
              <h1 className="display-7 fw-bold lh-1 mb-3">Historia</h1>
              <div>
                {content.map((parrafo, index) => (
                  <p key={index}>{parrafo}</p>
                ))}
              </div>
            </div>
            <div className="col-10 col-sm-8 col-lg-6">
              <img className="d-block mx-lg-auto img-fluid rounded-4" src={imgHistory} alt="foto de estudiantes" width="700" height="500"/>
            </div>
          </div>
    </div>
  )
}

export default Historia;
interface Props {
  data: {
      mission: string;
      vision: string;
      values: string[];
      imgMission: string;
      imgVision: string;
      imgValues: string;
  };
}

function MisionVisionValores(props: Props) {
  const { mission, vision, values, imgMission, imgVision, imgValues} = props.data;

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-4 col-md-6">
          <div className="card border-success mb-4 h-100" style={{borderWidth: "3px"}}>
            <div className="card-body">
              <h2 className="card-title display-7 fw-bold">Misión</h2>
              <p className="card-text">{mission}</p>
            </div>
            <img src={imgMission} className="card-img-top" alt="Misión"/>
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
          <div className="card border-warning mb-4 h-100" style={{borderWidth: "3px"}}>
            <div className="card-body">
              <h2 className="card-title display-7 fw-bold">Visión</h2>
              <p className="card-text">{vision}</p>
            </div>
            <img src={imgVision} className="card-img-top" alt="Visión"/>
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
          <div className="card border-primary mb-4 h-100" style={{borderWidth: "3px"}}>
            <div className="card-body">
              <h2 className="card-title display-7 fw-bold">Valores</h2>
              <div style={{ marginTop: '10px' }}>
                <p>Nuestros valores son:</p>
                {values.map((value, index) => (
                  <div className="value" key={index} style={{ marginBottom: '5px' }}>
                    <span className="bullet">&#8226;</span>
                    <span className="value-text pl-2">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <img src={imgValues} className="card-img-top" alt="Valores"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MisionVisionValores;

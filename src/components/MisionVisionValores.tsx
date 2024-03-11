interface Props {
    data: {
        mission: string;
        vision: string;
        values: string[];
    }
}

function MisionVisionValores(props: Props) {
    const { mission, vision, values } = props.data;

  return (
    <div className="container px-4 py-5">
      <div className="row">
        <div className="col-lg-4">
          <h1 className="display-7 fw-bold lh-1 mb-3">Misión</h1>
          <p>{mission}</p>

        </div>
        <div className="col-lg-4">
          <h1 className="display-7 fw-bold lh-1 mb-3">Visión</h1>
          <p>{vision}</p>
        </div>
        <div className="col-lg-4">
          <h1 className="display-7 fw-bold lh-1 mb-3">Valores</h1>
          
            {values.map((value, index) => (
              <p key={index}>{value}</p>
            ))}
          
        </div>
      </div>
    </div>
  );
}

export default MisionVisionValores;
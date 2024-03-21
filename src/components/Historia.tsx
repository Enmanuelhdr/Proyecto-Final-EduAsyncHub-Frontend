interface Props {
  data: {
    content: string[];
  };
}

function Historia(props: Props) {
  const { content } = props.data;

  return (
    <div className="container col-xxl-8 px-4 py-4">
      <div className="row flex-lg-row-reverse g-4 py-2 fade-in">
        <div className="col-lg-12">
          <h1 className="display-7 fw-bold lh-1 mb-3">Historia</h1>
          <div>
            {content.map((parrafo, index) => (
              <p key={index}>{parrafo}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Historia;

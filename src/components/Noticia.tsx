import React from 'react';
import noticias from '../data/Noticias.json'; 

interface Props {
  cantidadMostrar: number; 
}


const Noticia: React.FC<Props> = ({ cantidadMostrar }) => {
  return (
    <>
      <div className="container-fluid">
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-3 g-4">
          {noticias.slice(0, cantidadMostrar).map((noticia) => (
            <div
              className="col"
              key={noticia.id}
              onClick={() => {
                console.log(noticia.id);
              }}
            >
              <div className="card h-100">
                <img
                  className="card-img-top"
                  src={noticia.img}
                  alt="Imagen del noticia"
                />
                <div className="card-body">
                  <div className="fs-6">{noticia.date}</div>
                  <h4 className="card-title">{noticia.tittle}</h4>
                  <p className="card-text">{noticia.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Noticia;

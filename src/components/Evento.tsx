import React from 'react';
import eventos from '../data/Eventos.json'; 

interface Props {
  cantidadMostrar: number; 
}


const Evento: React.FC<Props> = ({ cantidadMostrar }) => {
  return (
    <>
      <div className="container-fluid">
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-3 g-4">
          {eventos.slice(0, cantidadMostrar).map((evento) => (
            <div
              className="col"
              key={evento.id}
              onClick={() => {
                console.log(evento.id);
              }}
            >
              <div className="card h-100">
                <img
                  className="card-img-top"
                  src={evento.img}
                  alt="Imagen del evento"
                />
                <div className="card-body">
                  <div className="fs-6">{evento.date}</div>
                  <h4 className="card-title">{evento.title}</h4>
                  <p className="card-text">{evento.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Evento;

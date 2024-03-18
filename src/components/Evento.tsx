import React from 'react';
import eventos from '../data/Eventos.json'; 
import { Link } from 'react-router-dom';

interface Props {
  cantidadMostrar: number; 
}


const Evento: React.FC<Props> = ({ cantidadMostrar }) => {
  return (
    <>
      <div className="container-fluid">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 d-flex justify-content-center align-items-center">
          {eventos.slice(0, cantidadMostrar).map((evento) => (
           <Link to={`/eventos/${evento.id}`}>  <div
              className="col"
              style={{
                height: "300px",
               
             
              }}
              key={evento.id}
              onClick={() => {
                console.log(evento.id);
              }}
            >
              <div className="bg-image rounded-4 h-100 hover-zoom  ">
                <img
                  className="w-100 h-100 fill object-fit-cover "
                  src={evento.img}
                  alt="Imagen del evento"
                />
                <div className="mask d-flex flex-column h-100 align-items-center text-center justify-content-center p-5 pb-3 " style={{backgroundColor: 'hsla(0, 0%, 0%, 0.6)'}}>
                  <div className="fs-6 text-white overflow-hidden">{evento.date}</div>
                 <h4 className="fw-bold text-white mb-4">{evento.title}</h4>
                  <p className="text-white overflow-hidden">{evento.description}</p>
                </div>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Evento;

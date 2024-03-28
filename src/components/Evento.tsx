import React, { useEffect, useState } from 'react';
import axios from "axios";
import Cookies from "universal-cookie";
import { Link } from 'react-router-dom';

interface Props {
  cantidadMostrar: number; 
}

interface Evento {
  id: number;
  img: string;
  title: string;
  date: string;
  description: string;
}

const Evento: React.FC<Props> = ({ cantidadMostrar }) => {
  const [events, setEvents] = useState<Evento[]>([]);
  const cookies = new Cookies();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = cookies.get("token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.get(
          "http://www.eduasynchub.somee.com/api/Evento/VerEvento"
        );
        setEvents(response.data); // Establece los eventos recibidos de la API
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents(); // Llama a la función para obtener los eventos cuando el componente se monta
  }, []);

  return (
    <div className="container-fluid">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 d-flex justify-content-center align-items-center">
        {events.slice(0, cantidadMostrar).map((evento) => (
          <Link to={`/eventos/${evento.id}`} key={evento.id}>
            <div className="col" style={{ height: "300px" }}>
              <div className="bg-image rounded-4 h-100 hover-zoom">
                <img
                  className="w-100 h-100 fill object-fit-cover"
                  src={evento.img}
                  alt="Imagen del evento"
                />
                <div className="mask d-flex flex-column h-100 align-items-center text-center justify-content-center p-5 pb-3" style={{ backgroundColor: 'hsla(0, 0%, 0%, 0.6)' }}>
                  <div className="fs-6 text-white overflow-hidden">{evento.date}</div>
                  <h4 className="fw-bold text-white mb-4">{evento.title}</h4>
                  <p className="text-white overflow-hidden">{evento.description.length > 100 ? evento.description.slice(0, 100) + "..." : evento.description}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Evento;
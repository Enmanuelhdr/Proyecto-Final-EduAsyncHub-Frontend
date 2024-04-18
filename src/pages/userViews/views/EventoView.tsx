import ButtonRuta from '../../../components/ButtonRuta';
import Footer from '../../../components/Footer';
import NavBar from '../../../components/NavBar';
import Navbardata from '../../../data/HomeNavbard.json';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from "axios";
import Cookies from "universal-cookie";

interface Evento {
  id: number;
  img: string;
  title: string;
  date: string;
  description: string;
}


function EventoView() {
  const [events, setEvents] = useState<Evento[]>([]);
  const cookies = new Cookies();
  const { id } = useParams();
  const evento = events.find(evento => evento.id === Number(id));

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

  // Función para dividir la descripción en párrafos
  const renderDescription = (description: string) => {
    // Dividir el texto en párrafos utilizando dos espacios consecutivos como separador
    const paragraphs = description.split('  ').map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ));
    return paragraphs;
  };

  if (!evento) {
    return (
      <>
        <NavBar navData={Navbardata} brand='EduAsyncHub' goto='/' />
        <div>Evento no encontrado</div>
        <ButtonRuta path="/eventos" text="Volver a eventos" className='btn btn-primary' />
        <Footer />
      </>
    )
  }

  return (
    <>
      <NavBar navData={Navbardata} brand='EduAsyncHub' goto='/eventos' />
      <div>
        <main className="min-vh-100">
          <section className="bg-success text-white">
            <div id='panel' className="d-block px-5 position-relative" style={{ padding: '90px 0 132px 0' }}>
              <div id='container' className="d-block mx-auto container-fluid">
                <div id='panel-content' className="d-flex align-items-center justify-content-center gap-1">
                  <div className="row">
                    <div className='col'>
                      <div className="row">
                        <h3 className="fw-bold display-2">{evento.title}</h3>
                      </div>
                      <div className="row">
                        <p className="text-center mt-2 d-none d-lg-block fw-bold">Fecha: {evento.date}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="container">
            <div id='container' className="row justify-content-center">
              <div className="col-md-8 position-relative">
                <div className="overflow-hidden rounded" style={{ marginTop: '-100px' }}>
                  <img src={evento.img} loading='lazy' className="rounded-3 w-100" style={{ zIndex: -1 }} />
                  <p className="text-center mt-2 d-lg-none fw-bold pt-3">Fecha: {evento.date}</p>
                </div>
                <div className="row description-text my-4">
                  <div className="col-12">
                    {renderDescription(evento.description)}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default EventoView;

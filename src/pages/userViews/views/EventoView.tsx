
import ButtonRuta from '../../../components/ButtonRuta';
import NavBar from '../../../components/NavBar';
import eventos from '../../../data/Eventos.json';
import Navbardata from '../../../data/HomeNavbard.json';
import { useParams } from 'react-router-dom';

function EventoView() {
    const { id } = useParams();
    const evento = eventos.find(evento => evento.id === Number(id));
  
    if (!evento) {
      return (
        <>
        <NavBar navData={Navbardata} brand='EduAsyncHub' goto='/eventos'/>
      <div>Evento no encontrado</div>
      <ButtonRuta path="/eventos" text="Volver a eventos" className='btn btn-primary' />
      </>
      )
    }
  
    return (
        <>
         <NavBar navData={Navbardata} brand='EduAsyncHub' goto='/eventos'/>
      <div>
        <h1>{evento.title}</h1>
        <img src={evento.img} alt="Imagen del evento" />
        <p>{evento.description}</p>
        {/* Add more event details as needed */}
      </div>
      </>
    );
  }

export default EventoView;
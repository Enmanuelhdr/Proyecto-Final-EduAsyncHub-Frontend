
import ButtonRuta from '../../../components/ButtonRuta';
import Footer from '../../../components/Footer';
import NavBar from '../../../components/NavBar';
import noticias from '../../../data/Noticias.json';
import Navbardata from '../../../data/HomeNavbard.json';
import { useParams } from 'react-router-dom';

function NoticiaView() {
    const { id } = useParams();
    const noticia = noticias.find(noticia => noticia.id === Number(id));
  
    if (!noticia) {
      return (
        <>
        <NavBar navData={Navbardata} brand='EduAsyncHub' goto='/noticias'/>
      <div>noticia no encontrada</div>
      <ButtonRuta path="/noticias" text="Volver a noticias" className='btn btn-primary' />
      </>
      )
    }
  
    return (
        <>
         <NavBar navData={Navbardata} brand='EduAsyncHub' goto='/noticias'/>
      <div>
        <h1>{noticia.title}</h1>
        <img src={noticia.img} alt="Imagen del noticia" />
        <p>{noticia.description}</p>
        {/* Add more event details as needed */}
      </div>

      <Footer />
      </>
    );
  }

export default NoticiaView;
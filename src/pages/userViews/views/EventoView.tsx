import ButtonRuta from '../../../components/ButtonRuta';
import Footer from '../../../components/Footer';
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
        <Footer />
      </>
    )
  }

  return (
    <>
      <NavBar navData={Navbardata} brand='EduAsyncHub' goto='/eventos'/>
      <div>
        <main className="min-vh-100">
          <section className="bg-success text-white">
            <div id='panel' className="d-block px-5 position-relative" style={{padding: '90px 0 132px 0'}}>
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
                  <img src={evento.img} loading='lazy' className="rounded-3 w-100" style={{ zIndex: -1 }}/>
                  <p className="text-center mt-2 d-lg-none fw-bold pt-3">Fecha: {evento.date}</p>
                </div>
                <div className="mt-1 pt-3 pb-5">
                  <p>{evento.description}</p>
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

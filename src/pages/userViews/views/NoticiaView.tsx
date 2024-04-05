
import ButtonRuta from '../../../components/ButtonRuta';
import Footer from '../../../components/Footer';
import NavBar from '../../../components/NavBar';
import Navbardata from '../../../data/HomeNavbard.json';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Cookies from "universal-cookie";

interface Noticia {
  id: number;
  img: string;
  title: string;
  date: string;
  description: string;
}

function NoticiaView() {
  const [news, setNews] = useState<Noticia[]>([]);
  const cookies = new Cookies();
  const { id } = useParams();
  const noticia = news.find(noticia => noticia.id === Number(id));

  useEffect(() => {
    const fetchNews = async () => {

      try {
        const token = cookies.get("token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.get(
          "http://www.eduasynchub.somee.com/api/Noticias/VerNoticias"
        );
        setNews(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);
  
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
        <main className="min-vh-100">
          <section className="bg-success text-white">
            <div id='panel' className="d-block px-5 position-relative" style={{padding: '90px 0 132px 0'}}>
              <div id='container' className="d-block mx-auto container-fluid">
                <div id='panel-content' className="d-flex align-items-center justify-content-center gap-1">
                  <div className="row">
                    <div className='col'>
                      <div className="row">
                        <h3 className="fw-bold display-2">{noticia.title}</h3>
                      </div>
                      <div className="row">
                        <p className="text-center mt-2 d-none d-lg-block fw-bold">Fecha: {noticia.date}</p>
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
                  <img src={noticia.img} loading='lazy' className="rounded-3 w-100" style={{ zIndex: -1 }}/>
                  <p className="text-center mt-2 d-lg-none fw-bold pt-3">Fecha: {noticia.date}</p>
                </div>
                <div className="mt-1 pt-3 pb-5">
                  <p>{noticia.description}</p>
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

export default NoticiaView;
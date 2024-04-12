import React, { useEffect, useState } from 'react';
import axios from "axios";
import Cookies from "universal-cookie";
import { Link } from 'react-router-dom';


interface Props {
  cantidadMostrar: number; 
}

interface Noticia {
  id: number;
  img: string;
  title: string;
  date: string;
  description: string;
}


const Noticia: React.FC<Props> = ({ cantidadMostrar }) => {
  const [news, setNews] = useState<Noticia[]>([]);
  const cookies = new Cookies();

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


  return (
    <>
      <div className="container-fluid">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 d-flex justify-content-center align-items-center">
          {news.slice(0, cantidadMostrar).map((noticia) => (
             <Link to={`/noticias/${noticia.id}`}>  <div
              className="col"
              style={{
                height: "300px",
               
             
              }}
              key={noticia.id}
              onClick={() => {
                console.log(noticia.id);
              }}
            >
              <div className="bg-image rounded-4 h-100 hover-zoom">
                <img
                  className="w-100 h-100 fill object-fit-cover "
                  src={noticia.img}
                  alt="Imagen del noticia"
                />
                <div className="mask d-flex flex-column h-100 align-items-center text-center justify-content-center p-5 pb-3 " style={{backgroundColor: 'hsla(0, 0%, 0%, 0.6)'}}>
                  <div className="fs-6 text-white overflow-hidden">{noticia.date}</div>
                  <h4 className="fw-bold text-white mb-4">{noticia.title}</h4>
                  <p className="text-white overflow-hidden">{noticia.description.length > 100 ? noticia.description.slice(0, 100) + "..." : noticia.description}</p>
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

export default Noticia;

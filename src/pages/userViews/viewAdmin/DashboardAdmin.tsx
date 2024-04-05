import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from "universal-cookie";
import NavBar from "../../../components/NavBar";
import Navbardata from "../../../data/AdminNavbard.json";

interface User {
  id: number;
  rolId: number;
}

interface Event {
  id: number;
}

interface Noticia {
  id:number;
}

interface UserCounts {
  students: number;
  teachers: number;
  administrators: number;
}

const DashboardAdmin: React.FC = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const [eventData, setEventData] = useState<Event[]>([]);
  const [noticiaData, setNoticiaData] = useState<Noticia[]>([]);
  const [userTypeData, setUserTypeData] = useState<UserCounts>({
    students: 0,
    teachers: 0,
    administrators: 0
  });
  const cookies = new Cookies();


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = cookies.get("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const [userResponse, eventResponse, noticiaResponse ] = await Promise.all([
        axios.get<User[]>("http://www.eduasynchub.somee.com/api/Admin/ObtenerUsuarios"),
        axios.get<Event[]>("http://www.eduasynchub.somee.com/api/Evento/VerEvento"),
        axios.get<Noticia[]>("http://www.eduasynchub.somee.com/api/Noticias/VerNoticias")
      ]);
      setUserData(userResponse.data);
      setEventData(eventResponse.data);
      setNoticiaData(noticiaResponse.data);

      // Contar usuarios por rol
      const userCounts: UserCounts = {
        students: 0,
        teachers: 0,
        administrators: 0
      };
      userResponse.data.forEach(user => {
        switch (user.rolId) {
          case 1:
            userCounts.students++;
            break;
          case 2:
            userCounts.teachers++;
            break;
          case 3:
            userCounts.administrators++;
            break;
          default:
            break;
        }
      });
      setUserTypeData(userCounts);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  return (
    <>
      <NavBar brand="Panel Admin" goto="/dashboardAdministrador" navData={Navbardata} />
      {/* <div className=" row m-0 p-4  justify-content-md-between  align-itemns-center justify-content-center ">
        Mostrar la cantidad de usuarios por tipo 
        <div className="card mt-5">
          <div className="card-body">
            <h5 className="card-title">Usuarios por Rol</h5>
            <p className="card-text">Estudiantes: {userTypeData.students || 0}</p>
            <p className="card-text">Profesores: {userTypeData.teachers || 0}</p>
            <p className="card-text">Administradores: {userTypeData.administrators || 0}</p>
          </div>
        </div>

      </div> */}

      <div className="row m-0 p-4 justify-content-md-between align-itemns-center justify-content-center">
        <div className="col-lg-6 col-xl-4 mb-4">
          <div className="card bg-primary text-white h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div className="me-3">
                  <div className="text-white-75 fs-6">Usuarios Registrados</div>
                  <div className="display-5 fw-bold">{userData.length || 0}</div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-users feather-xl text-white-50"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
            </div>
            <div className="card-footer d-flex align-items-center justify-content-between small">
              <a className="text-white stretched-link" href="/usuariosAdmin">
                Ver Usuarios
              </a>
              <div className="text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-arrow-right text-white-50"
                >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6 col-xl-4 mb-4">
          <div className="card bg-success text-white h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div className="me-3">
                  <div className="text-white-75 fs-6">Eventos Registrados</div>
                  <div className="display-5 fw-bold">{eventData.length || 0}</div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-calendar feather-xl text-white-50"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
            </div>
            <div className="card-footer d-flex align-items-center justify-content-between small">
              <a className="text-white stretched-link" href="/eventosAdmin">
                Ver Eventos
              </a>
              <div className="text-white">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-arrow-right text-white-50"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6 col-xl-4 mb-4">
          <div className="card bg-warning text-white h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div className="me-3">
                  <div className="text-white fs-6">Noticias Registradas</div>
                  <div className="display-5 fw-bold">{noticiaData.length || 0}</div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-book feather-xl text-white-50"
                >
                  <path d="M4 19.5c0 .83.67 1.5 1.5 1.5h13c.83 0 1.5-.67 1.5-1.5V4c0-.83-.67-1.5-1.5-1.5H5.5A1.5 1.5 0 0 0 4 4v15.5z"></path>
                  <line x1="12" y1="2" x2="12" y2="18"></line>
                </svg>
              </div>
            </div>
            <div className="card-footer d-flex align-items-center justify-content-between small">
              <a className="text-white" href="/noticiasAdmin">
                Ver Noticias
              </a>
              <div className="text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-arrow-right text-white-50"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardAdmin;

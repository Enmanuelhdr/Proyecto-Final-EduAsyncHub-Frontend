import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { MdDangerous } from "react-icons/md";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { FaBook } from 'react-icons/fa';
import { jwtDecode } from "jwt-decode";
import Calendar from "../viewAdmin/ListaActividad";

interface Calificacion {
  materia: string;
  notas: Array<{ periodo: string; calificacion: number }>;
  notaTotal: number;
}

interface Asistencia {
  assistanceDetails: Array<{
    materia: string;
    fecha: string;
    asistenciaStatus: string;
  }>;
  totalAssistances: number;
  totalInassitances: number;
}

function MiCalificacion() {
  const cookies = new Cookies();
  const studentId = cookies.get("userId");
  const [calificaciones, setCalificaciones] = useState<Calificacion[]>([]);
  const [asistencias, setAsistencias] = useState<Asistencia[]>([]);
  const [asistenciaTotal, setAsistenciaTotal] = useState(0);
  const [ausenciaTotal, setAusenciaTotal] = useState(0);
  const [userData, setUserData] = useState({
    matricula: "",
    email: "",
    nombre: "",
    fecha: "",
    rol: "",
  });

  const getUserData = (token: string) => {
    const decodedToken = jwtDecode(token) as {
      role: string;
      nameid: string;
      unique_name: string;
      UserName: string;
    };
    console.log(decodedToken);

    const matricula = decodedToken.nameid || "";
    const email = decodedToken.unique_name || "";
    const nombre = decodedToken.UserName || "";
    const rol = decodedToken.role || "";
    const fecha = "2023-2024";
    setUserData({ matricula, email, nombre, fecha, rol });
  };

  useEffect(() => {
    const token = cookies.get("token");
    getUserData(token);
    axios
      .get(
        `http://www.eduasynchub.somee.com/api/Student/VerMisCalificaciones?UserId=${studentId}`
      )
      .then((response) => {
        console.log(response.data);
        setCalificaciones(response.data);
      });

    axios
      .get(
        `http://www.eduasynchub.somee.com/api/Student/VerMisAsistencias?UserId=${studentId}`
      )
      .then((response) => {
        console.log(response.data);
        setAsistencias(response.data);
        const totalAssistances = response.data.reduce(
          (acc: number, curr: Asistencia) => acc + curr.totalAssistances,
          0
        );
        setAsistenciaTotal(totalAssistances);
        const totalInassitances = response.data.reduce(
          (acc: number, curr: Asistencia) => acc + curr.totalInassitances,
          0
        );
        setAusenciaTotal(totalInassitances);
      });
  }, []);

  const getAsistenciaPorMateria = (materia: string) => {
    const asistencia = asistencias.find((item) =>
      item.assistanceDetails.some((detail) => detail.materia === materia)
    );
    if (asistencia) {
      const asistenciasMateria = asistencia.assistanceDetails.filter(
        (detail) =>
          detail.materia === materia && detail.asistenciaStatus === "Asistió"
      ).length;
      const ausenciasMateria = asistencia.assistanceDetails.filter(
        (detail) =>
          detail.materia === materia && detail.asistenciaStatus === "No Asistió"
      ).length;
      return { asistenciasMateria, ausenciasMateria };
    }
    return { asistenciasMateria: 0, ausenciasMateria: 0 };
  };

  return (
    <>
      <div className="row m-0 px-4 justify-content-md-between align-items-center justify-content-center">
        {/* Columna de estadísticas generales */}
        <div className="col-12 col-lg-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="fw-bold">
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
                  className="feather feather-bar-chart-2 me-2 text-primary"
                >
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
                Estadísticas Generales
              </h5>
              <div className="row">
                {/* Asistencia Total */}
                <div className="col-12 col-6 mb-4">
                  <div className="card bg-success text-white h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="me-3">
                          <div className="text-white-75 fs-6">
                            Asistencia Total
                          </div>
                          <div className="display-5 fw-bold">
                            {asistenciaTotal}
                          </div>
                        </div>
                        <AiFillSafetyCertificate
                          size={50}
                          className="text-white-50"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Ausencia Total */}
                <div className="col-12 col-6 mb-4">
                  <div className="card bg-danger text-white h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="me-3">
                          <div className="text-white-75 fs-6">
                            Ausencia Total
                          </div>
                          <div className="display-5 fw-bold">
                            {ausenciaTotal}
                          </div>
                        </div>
                        <MdDangerous size={50} className="text-white-50" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Columna para información del estudiante */}
        <div className="col-lg-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title fw-bold">
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
                  className="feather feather-user me-2 text-primary"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Información del Usuario
              </h5>
              <div className="card-text">
                <div className="row mb-3 my-3 p-6">
                  <div className="col-sm-3 fw-bold">Nombre:</div>
                  <div className="col-sm-9">{userData.nombre}</div>
                </div>
                <hr />
                <div className="row mb-3 my-3">
                  <div className="col-sm-3 fw-bold">Matrícula:</div>
                  <div className="col-sm-9">{userData.matricula}</div>
                </div>
                <hr />
                <div className="row mb-3 my-3">
                  <div className="col-sm-3 fw-bold">Email:</div>
                  <div className="col-sm-9">{userData.email}</div>
                </div>
                <hr />
                <div className="row mb-3 my-3">
                  <div className="col-sm-3 fw-bold">Año Escolar:</div>
                  <div className="col-sm-9">{userData.fecha}</div>
                </div>
                <hr />
                <div className="row mb-3 my-3">
                  <div className="col-sm-3 fw-bold">Rol</div>
                  <div className="col-sm-9">
                    <span className={`badge rounded-pill d-inline ${userData.rol == "Estudiante" ? "badge bg-primary" :
                      userData.rol == "Profesor" ? "badge bg-success" :
                        userData.rol == "Administrado" ? "badge bg-danger" : ""}`}>
                      {userData.rol}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mis materias y mis calificaciones */}
        <div className="col-12 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="text-primary">
                  <FaBook />
                </div>
                <h5 className="ps-2 card-title fw-bold mb-0">Materias y Calificaciones</h5>
              </div>
              <div className="row">
                {calificaciones.map((materia, index) => (
                  <div key={index} className="col-md-6 mb-3">
                    <div className="card border border-3 border-secondary">
                      <div className="card-header bg-secondary text-white fw-bold">
                        {materia.materia}
                      </div>
                      <div className="card-body">
                        <ul className="list-unstyled mb-0">
                          {materia.notas.map((nota, i) => (
                            <li key={i} className="mb-2">
                              <span className="fw-bold">P{nota.periodo}:</span> {nota.calificacion}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="card-footer d-flex justify-content-between align-items-center">
                        <span className="fw-bold">Ausencias:</span>
                        <span>{getAsistenciaPorMateria(materia.materia).asistenciasMateria}</span>
                      </div>
                    </div>
                  </div>
                ))}
                {calificaciones.length === 0 && (
                  <div className="col-12 mb-4">
                    <div className="card shadow-sm">
                      <div className="card-body">
                        <p className="fw-bold text-center">Aún no se han añadido calificaciones.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 mb-4">
          <Calendar/>
        </div>

      </div>

    </>
  );
}

export default MiCalificacion;

import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { MdDangerous } from "react-icons/md";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { IoTimerSharp } from "react-icons/io5";
import { jwtDecode } from "jwt-decode";

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
  const diasDeClase = 220;
  const [userData, setUserData] = useState({
    matricula: "",
    email: "",
    nombre: "",
    fecha: "",
  });

  const getUserData = (token: string) => {
    const decodedToken = jwtDecode(token) as {
      role: string;
      nameid: string;
      unique_name: string;
      UserName:string;
    };
    console.log(decodedToken);

    const matricula = decodedToken.nameid || "";
    const email = decodedToken.unique_name || "";
    const nombre = decodedToken.UserName || "";
    const fecha = "2023-2024";
    setUserData({ matricula, email, nombre, fecha });
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
      <div className="container border  shadow p-3 rounded  mb-4 ">
        <div className="row m-0 p-3 rounded  mb-4">
          <div className="col-12">
            <h1 className="text-center display-6 fw-bold ">Resumen Estudiantil </h1>
          </div>
        </div>

        {/* Datos */}
        <div className="row m-0 px-2 justify-content-md-between align-itemns-center justify-content-center">
          <div className=" ">
            <div className="card-body">
              <div className="row">
                {/* Dias de Clase */}
                <div className="col-lg-6 col-xl-4 mb-4">
                  <div className="card bg-primary text-white h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="me-3">
                          <div className="text-white-75 fs-6">
                            Días de Clase
                          </div>
                          <div className="display-5 fw-bold">{diasDeClase}</div>
                        </div>
                        <IoTimerSharp size={50} className="text-white-50" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Asistencia Total */}
                <div className="col-lg-6 col-xl-4 mb-4">
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

                <div className="col-lg-6 col-xl-4 mb-4">
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

        <div className="container   mt-4  p-3">
          <div className="row     p-3 rounded  mb-4">
            <div className="col-12 col-md-6">
            {/* {userData.matricula && <p className="h4"> Matricula: {userData.matricula}</p>}
            {userData.nombre && <p className="h4">Nombre: {userData.nombre}</p>}
            {userData.email && <p className="h4">Email: {userData.email}</p>}
            {userData.fecha && <p className="h4">Año escolar: {userData.fecha}</p>} */}
         

            <table className="table table-hover shadow border border-3 border-dark">
             <thead>
               <tr>
               <th colSpan={5}  className="text-center bg-dark text-white display-6 fw-bold">Información</th>
               </tr>
               <tr>
                 <th className="text-center">Nombre</th>
                 
               </tr>
               <tr> 
                 <td className="text-center">{userData.nombre && <p className="">{userData.nombre}</p>}</td>
               </tr>
               <tr>
                 <th className="text-center">Matricula</th>
               </tr>
               <tr>
                 <td className="text-center">{userData.matricula && <p className="">{userData.matricula}</p>}</td>
               </tr>
               <tr>
                 <th className="text-center">Email</th>
               </tr>
               <tr>
                 <td className="text-center">{userData.email && <p className="">{userData.email}</p>}</td>
               </tr>
               <tr>
                 <th className="text-center">Año escolar</th>
               </tr>
               <tr>
                 <td className="text-center">{userData.fecha && <p className="">{userData.fecha}</p>}</td>
               </tr>
      

             </thead>
           

            </table>

            </div>
            <div className="col-12 col-md-6 d-flex itemns-center">
            <table className="table table-hover shadow border border-3 border-dark">
             <thead>
               <tr>
               <th colSpan={5}  className="text-center bg-dark text-white display-6 fw-bold">Sistema de calificación</th>
               </tr>
               <tr>
                 <th className="text-center">Rango</th>
                 <th className="text-center">Descripción</th>
               </tr>

             </thead>
             <tbody>
               <tr>
                 <td className="text-center">0-69</td>
                 <td className="text-center">Insuficiente</td>
               </tr>
               <tr>
                 <td className="text-center">70-79</td>
                 <td className="text-center">Suficiente</td>
               </tr>
               <tr>
                 <td className="text-center">80-89</td>
                 <td className="text-center">Bueno</td>
               </tr>
               <tr>
                 <td className="text-center">90-100</td>
                 <td className="text-center">Excelente</td>
               </tr>
             </tbody>

            </table>

            </div>
         
         
          </div>

          
          <div className="row   mb-4">
            <div className="col">
              <table className="table table-hover shadow border border-3 border-dark">
                <thead>
                  <tr>
                    <th
                      colSpan={5}
                      className="text-center bg-dark text-white display-6 fw-bold"
                    >
                      Materias
                    </th>
                  </tr>
                  <tr>
                    <th className="sticky-th w-25 text-center">Materia</th>
                    <th className="sticky-th col-2 text-center">Período</th>
                    <th className="sticky-th col-2 text-center ">Ausencias</th>
                    <th className="sticky-th  text-center">Nota Final</th>
                  </tr>
                </thead>
                <tbody>
                  {calificaciones.map((materia, index) => (
                    <tr key={index}>
                      <th className="text-center">{materia.materia}</th>
                      <td>
                        <ul className="list-unstyled text-center">
                          {materia.notas.map((nota, i) => (
                            <li key={i} >
                              P{nota.periodo}: {nota.calificacion}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="text-center">
                        {
                          getAsistenciaPorMateria(materia.materia)
                            .asistenciasMateria
                        }
                      </td>
                      <td className="text-center">
                        {materia.notaTotal == null ? "0" : materia.notaTotal}
                      </td>
                     
                      {/* <td>
                        {
                          getAsistenciaPorMateria(materia.materia)
                            .ausenciasMateria
                        }
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MiCalificacion;

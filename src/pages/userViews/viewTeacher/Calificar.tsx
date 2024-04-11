import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import navData from "../../../data/ProfesorNavbar.json";
import NavBar from "../../../components/NavBar";
interface Student {
  nombreEstudiante: string;
  userId: string;
}

function CalificarComponent() {
  const { materiaId, gradoId } = useParams();
  const [students, setStudents] = useState<Student[]>([]);
  const [calificacion, setCalificacion] = useState<number>(0);
  const [teacherId, setTeacherId] = useState();
  const [currentPeriod, setCurrentPeriod] = useState<number>(0);
  const cookies = new Cookies();
  const periodoEvaluar1 = 1;
  const periodoEvaluar2 = 2;
  const periodoEvaluar3 = 3;
  const periodoEvaluar4 = 4;
  useEffect(() => {
    setTeacherId(cookies.get("userId"));
    axios
      .get(
        `http://www.eduasynchub.somee.com/api/Teacher/MostrarEstudiantesMateriaYGrado?MateriaId=${materiaId}&GradoId=${gradoId}`
      )
      .then((response) => {
        console.log(response.data);
        setStudents(response.data);
        console.log("Estudiantes", students);
      });

   
      const currentDate = new Date();
     
      const currentMonth = currentDate.getMonth() + 1; 
      if (currentMonth <= 3) {
        setCurrentPeriod(1);
      } else if (currentMonth <= 6) {
        setCurrentPeriod(2);
      } else if (currentMonth <= 9) {
        setCurrentPeriod(3);
      } else {
        setCurrentPeriod(4);
      }
  }, []);

  const calificar = (studentId: string, materiaId: string, periodo: number) => {
    console.log("Calificar a: ", studentId);
    console.log("Materia: ", materiaId);
    console.log("Grado: ", gradoId);
    console.log("Periodo: ", periodo);
    axios
      .post(
        "http://www.eduasynchub.somee.com/api/Teacher/PublicarCalificacionesPeriodos",
        {
          stundentUserId: studentId,
          materiaId: materiaId,
          teacherUserId: teacherId,
          calificacion: calificacion,
          periodo: periodo,
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error al calificar:", error);
      });
  };
  return (
    <>
         <NavBar
        brand="Panel Profesor"
        goto="/dashboardprofesor"
        navData={navData}
      />
    <div className="container mb-4 mt-4">
      <h1 className="text-center">Calificaciones</h1>
    
      
    </div>

      <div
        className="container accordion accordion-flush"
        id="accordionFlushExample"
        >
        {/* P1 */}
        {   currentPeriod === periodoEvaluar1 && (
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              Calificar Periodo #1
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="table-responsive">
              <table className="table table-striped table-hover table-bordered">
                <thead>
                  <tr>
                    <th>Estudiante</th>
                    <th>Nombre</th>
                    <th className="w-25">Calificación</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={index}>
                      <td>{student.userId}</td>
                      <td>{student.nombreEstudiante}</td>
                      <td className="">
                        <input
                          type="number"
                          className="form-control w-50 text-center"
                          placeholder="100"
                          onChange={(e) => {
                            setCalificacion(parseInt(e.target.value));
                          }}
                        />
                      </td>
                      <td className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            if (materiaId && gradoId) {
                              calificar(student.userId, materiaId, 1);
                            } else {
                              console.error("materiaId is undefined");
                            }
                          }}
                        >
                          Calificar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>

     )}

        {/* P2 */}
        {   currentPeriod === periodoEvaluar2 && (
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseTwo"
              aria-expanded="false"
              aria-controls="flush-collapseTwo"
            >
              Calificar Periodo #2
            </button>
          </h2>
          <div
            id="flush-collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
         

         <div className="table-responsive">
              <table className="table table-striped table-hover table-bordered">
                <thead>
                  <tr>
                    <th>Estudiante</th>
                    <th>Nombre</th>
                    <th className="w-25">Calificación</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={index}>
                      <td>{student.userId}</td>
                      <td>{student.nombreEstudiante}</td>
                      <td className="">
                        <input
                          type="number"
                          className="form-control w-50 text-center"
                          placeholder="100"
                          onChange={(e) => {
                            setCalificacion(parseInt(e.target.value));
                          }}
                        />
                      </td>
                      <td className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            if (materiaId && gradoId) {
                              calificar(student.userId, materiaId, 2);
                            } else {
                              console.error("materiaId is undefined");
                            }
                          }}
                        >
                          Calificar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        )}

        {/* P3 */}
        {   currentPeriod === periodoEvaluar3 && (
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseThree"
              aria-expanded="false"
              aria-controls="flush-collapseThree"
            >
              Calificar Periodo #3
            </button>
          </h2>
          <div
            id="flush-collapseThree"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
             <div className="table-responsive">
              <table className="table table-striped table-hover table-bordered">
                <thead>
                  <tr>
                    <th>Estudiante</th>
                    <th>Nombre</th>
                    <th className="w-25">Calificación</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={index}>
                      <td>{student.userId}</td>
                      <td>{student.nombreEstudiante}</td>
                      <td className="">
                        <input
                          type="number"
                          className="form-control w-50 text-center"
                          placeholder="100"
                          onChange={(e) => {
                            setCalificacion(parseInt(e.target.value));
                          }}
                        />
                      </td>
                      <td className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            if (materiaId && gradoId) {
                              calificar(student.userId, materiaId, 3);
                            } else {
                              console.error("materiaId is undefined");
                            }
                          }}
                        >
                          Calificar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        )}

         {/* P4 */}
          {   currentPeriod === periodoEvaluar4 && (
         <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseFourth"
              aria-expanded="false"
              aria-controls="flush-collapseFourth"
            >
              Calificar Periodo #4
            </button>
          </h2>
          <div
            id="flush-collapseFourth"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
             <div className="table-responsive">
              <table className="table table-striped table-hover table-bordered">
                <thead>
                  <tr>
                    <th>Estudiante</th>
                    <th>Nombre</th>
                    <th className="w-25">Calificación</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={index}>
                      <td>{student.userId}</td>
                      <td>{student.nombreEstudiante}</td>
                      <td className="">
                        <input
                          type="number"
                          className="form-control w-50 text-center"
                          placeholder="100"
                          onChange={(e) => {
                            setCalificacion(parseInt(e.target.value));
                          }}
                        />
                      </td>
                      <td className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            if (materiaId && gradoId) {
                              calificar(student.userId, materiaId, 4);
                            } else {
                              console.error("materiaId is undefined");
                            }
                          }}
                        >
                          Calificar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        )}
      </div>

      
    </>
  );
}

export default CalificarComponent;

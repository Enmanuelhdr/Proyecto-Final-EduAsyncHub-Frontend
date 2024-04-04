import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "universal-cookie";

interface Student {
  nombreEstudiante: string;
  userId: string;
}

function CalificarComponent() {
  const { materiaId, gradoId } = useParams();
  const [students, setStudents] = useState<Student[]>([]);
  const [calificacion, setCalificacion] = useState<number>(0);
  const [teacherId, setTeacherId] = useState();

  const cookies = new Cookies();

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
      <div
        className="container accordion accordion-flush"
        id="accordionFlushExample"
      >
        {/* P1 */}
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

        {/* P2 */}
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

        {/* P3 */}
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

         {/* P4 */}
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
      </div>

      

      {/* <div>
      <h1>Calificar</h1>
      <div className="container">
        <h1 className="d-flex justify-content-center">Calificar</h1>
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th>Estudiante</th>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index}>
                  <td>{student.userId}</td>
                  <td>{student.nombreEstudiante}</td>
                  <td  className="d-flex justify-content-center gap-2">
                    <button className="btn btn-primary">Calificar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
   
    </div> */}
    </>
  );
}

export default CalificarComponent;

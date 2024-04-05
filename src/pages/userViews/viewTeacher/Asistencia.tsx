import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

interface Student {
  nombreEstudiante: string;
  userId: string;
}

function Asistencia() {
  const { materiaId, gradoId } = useParams();
  const cookies = new Cookies();
  const [teacherId, setTeacherId] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [asistencia, setAsistencia] = useState(true);

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

  const asistenciaEstudiante = (studentId: string, teacherId: string) => {
 
    axios
      .post("http://www.eduasynchub.somee.com/api/Teacher/PublicarAsistencia", {
        stundentUserId: studentId,
        materiaId: materiaId,
        teacherUserId: teacherId,
        asistio: asistencia,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error al calificar:", error);
      });
  };

  return (
    <>
      <div>
        <div className="container">
          <h1 className="d-flex justify-content-center">Asistencia</h1>
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th>Estudiante</th>
                  <th>Nombre</th>
                  <th className="w-25">Asistencia</th>
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
                        type="checkbox"
                        className="form-check-input"
                        id="asistencia"
                        value="1"
                        checked={asistencia}
                        onChange={() => {
                          setAsistencia(!asistencia);
                        }}
                      />
                    </td>
                    <td className="d-flex justify-content-center gap-2">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          if (materiaId && gradoId) {
                            asistenciaEstudiante(student.userId, teacherId);
                          } else {
                            console.error("materiaId is undefined");
                          }
                        }}
                      >
                        Enviar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Asistencia;

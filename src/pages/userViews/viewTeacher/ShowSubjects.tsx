import Cookies from "universal-cookie";
import axios from "axios";
import { useEffect, useState } from "react";

interface Subject {
  materiaId: number;
  nombreMateria: string;
  gradoId: number;
}

function ShowSubjects() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [error, setError] = useState("");
  const cookies = new Cookies();
  const userId = cookies.get("userId");
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [grades, setGrades ] = useState<{ [key: number]: string }>({ 
    1: "Primero de Primaria",
    2: "Segundo de Primaria",
    3: "Tercero de Primaria",
    4: "Cuarto de Primaria",
    5: "Quinto de Primaria",
    6: "Sexto de Primaria",
    7: "Primero de Secundaria",
    8: "Segundo de Secundaria",
    9: "Tercero de Secundaria",
    10: "Cuarto de Secundaria",
    11: "Quinto de Secundaria",
    12: "Sexto de Secundaria",
  });

  useEffect(() => {
    axios
      .get(`http://www.eduasynchub.somee.com/api/Teacher/MostrarMisMateriasImpartidas?UserId=${userId}`)
      .then(response => {
        console.log(response.data);
        if (response.data.length > 0) {
          setError("");
          setSubjects(response.data);
        } else {
          setError("No cuenta con materias asignadas");
        }
      })
      .catch(error => {
        console.error("Error al obtener materias:", error);
        setError("Hubo un error al obtener las materias");
      });
  }, []);

  return (
    <>
      
    
    <div className="container">
    <h1 className="d-flex justify-content-center">Mis Materias</h1>
      {error ? <h2>{error}</h2> : null}
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th>Materia</th>
              <th>Grado</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => (
              <tr key={index}>
                <td>{subject.nombreMateria}</td>
                <td>{grades[subject.gradoId]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
       
     
    </>
  );
}

export default ShowSubjects;

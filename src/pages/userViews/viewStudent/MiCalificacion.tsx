import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

function MiCalificacion() {
    const cookies = new Cookies();
    const studentId = cookies.get("userId");
    const [calificaciones, setCalificaciones] = useState([]);

    interface Materia {
        materia: string;
        notas: Array<{ periodo: string; calificacion: number }>;
        notaTotal: number;
    }

    useEffect(() => {
        axios
          .get(
            `http://www.eduasynchub.somee.com/api/Student/VerMisCalificaciones?UserId=${studentId}`
          )
          .then((response) => {
            console.log(response.data);

            setCalificaciones(response.data);
          });
    }, []);

    return (
        <div className="container">
            <h1 className="text-center mb-4">Mis Calificaciones</h1>
            <div className="row gap-6">
                {calificaciones.map((materia: Materia, index) => (
                    <div className="col-lg-6 mb-4" key={index}>
                        <div className="card ">
                            <div className="card-body">
                                <h3 className="card-title text-center">{materia.materia}</h3>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>P#</th>
                                            <th>Calificación</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {materia.notas.map((nota, i) => (
                                            <tr key={i}>
                                                <td>P{nota.periodo}</td>
                                                <td>{nota.calificacion}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="card-footer">
                                <strong>Nota Total: {materia.notaTotal==null?"0": materia.notaTotal} </strong>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MiCalificacion;

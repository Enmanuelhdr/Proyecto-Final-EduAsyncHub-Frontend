import { useEffect, useState } from "react";
import axios from "axios";
import { FaCalendarAlt } from "react-icons/fa";

function Calendar() {
    interface Actividad {
        id: number;
        title: string;
        date: string;
        hora: string;
    }

    const [actividades, setActividades] = useState<Actividad[]>([]);

    useEffect(() => {
        fetchActividades();
    }, []);

    const fetchActividades = () => {
        axios.get("http://www.eduasynchub.somee.com/api/CalendarioEspecifico/MostrarActividades")
            .then((response) => {
                console.log(response.data);
                setActividades(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    const activitiesByDate: { [date: string]: Actividad[] } = {};
    actividades.forEach((actividad) => {
        if (!activitiesByDate[actividad.date]) {
            activitiesByDate[actividad.date] = [];
        }
        activitiesByDate[actividad.date].push(actividad);
    });


    return (
        <div className="col-12 mb-4">
            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                        <div className="text-primary me-3">
                            <FaCalendarAlt /> {/* Icono de calendario */}
                        </div>
                        <h5 className="card-title fw-bold mb-0">Calendario</h5>
                    </div>
                    <hr className="my-3 border-primary" /> {/* Línea azul separadora */}
                    <ul className="list-unstyled">
                        {actividades.map((actividad, index) => (
                            <>
                                <li key={index}>
                                    <h6 className="fw-bold">{actividad.title}</h6>
                                    <p>{actividad.date} - {actividad.hora}</p>
                                </li>
                                <hr className="my-3 border-primary" />
                            </>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Calendar;

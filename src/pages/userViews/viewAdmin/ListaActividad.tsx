import  { useEffect, useState } from "react";
import axios from "axios";

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

    
    const renderActivities = () => {
        return Object.keys(activitiesByDate).map((date) => (
          
            <div key={date} className="border border-dark w-50 mx-auto p-4">
                <h2>{date}</h2>
                <ul>
                    {activitiesByDate[date].map((actividad) => (
                        <li key={actividad.id}className="list-unstyled">
                            <h3>{actividad.title}</h3>
                            <p>{actividad.hora}</p>
                        </li>
                    ))}
                </ul>
            </div>
        ));
    };

    return (
        <>
        <div className="container">

            {renderActivities()}
            </div>
        </>
    );
}

export default Calendar;

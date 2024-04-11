import axios from "axios";
import  { useEffect, useState } from "react";


function ListaActividad() {
    interface Actividad {
        id: number;
        title: string;
        date: string;
        hora: string;
      }
    const [actividades, setActividades] = useState<Actividad[]>([]);


    useEffect(() => {
        fetchActividad();
      }, []);
    
      const fetchActividad=()=>{
        axios.get("http://www.eduasynchub.somee.com/api/CalendarioEspecifico/MostrarActividades")
        .then((response)=>{
          console.log(response.data);
            setActividades(response.data);
        })
        .catch((error)=>{
          console.log(error);
        })
    
  return (
  <>
   <div>
      <h1>Actividades</h1>
      <ul>
        {actividades.map((actividad) => (
          <li key={actividad.id}>
            {actividad.title} - {actividad.date} - {actividad.hora}
          </li>
        ))}
      </ul>
    </div>
  </>
  )
}
}

export default ListaActividad
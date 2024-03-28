import Cookies from "universal-cookie"
import axios from "axios";
import { useEffect, useState } from "react";
function ShowSubjects() {

  const [subjects, setSubjects] = useState([])
  const [error, setError] = useState("")
  const cookies = new Cookies();

  const userId = cookies.get("userId")


useEffect(() => {
axios.get(`http://www.eduasynchub.somee.com/api/Teacher/MostrarMisMateriasImpartidas?UserId=${userId}`)
.then(response => {
  console.log(response.data)
  if(response.data.length > 0){
    setError("")
    setSubjects(response.data)

  }
  else{
    const response = "No cuenta con materias asignadas"
    setError(response)
  }


}
)
}
, [])

  return (
  <>
  <h1>Mis Materias</h1>
  {error ? <h2>{error}</h2> : null}
  <ul>
    {subjects.map((subject,index) => (
      <li key={index}>
        {subject}
      </li>
    ))}
  </ul>
  </>
  )
}

export default ShowSubjects
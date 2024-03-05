import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";

function TableUser() {
  interface User {
    usuarioId: number;
    nombre: string;
    correoElectronico: string;
  }

  const [users, setUsers] = useState<User[]>([]);
  const cookies = new Cookies();

  const fetchUsers = async () => {
    try {
      const token = cookies.get("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const response = await axios.get(
        "https://localhost:7152/api/Admin/ObtenerUsuarios"
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []); 


  // Eliminar usuario

  // const deleteUser=(id:number)=>{
  
  //   axios.delete('https://localhost:7152/api/Admin/EliminarUsuario', {
  //     data: {
  //       userId: id
  //     }
  //   })
  //     .then(response => {
  //       console.log('Usuario eliminado con éxito',response);
  //     })
  //     .catch(error => {
  //       console.error('Error al eliminar el usuario:', error);
  //     });
    
  // }

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <button onClick={fetchUsers}>Actualizar</button>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nombre</th>
            <th scope="col">Correo</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.usuarioId}>
              <th scope="row">{user.usuarioId}</th>
              <td>{user.nombre}</td>
              <td>{user.correoElectronico}</td>
              <td>
                {/* <button
                  onClick={()=>{deleteUser(user.usuarioId)}}
                  className="btn btn-primary">
                  D
                </button> */}
                 <button
                  onClick={()=>{console.log("Usuario Eliminado",user.usuarioId)}}
                  className="btn btn-primary">
                  D
                </button>
              </td>
              <td>
                <button
                  onClick={()=>{console.log("Usuario editado",user.usuarioId)}}
                  className="btn btn-primary">
                  E
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableUser;

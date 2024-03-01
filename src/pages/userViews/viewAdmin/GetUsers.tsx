import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";

function GetUsers() {
  interface User {
    usuarioId: number;
    nombre: string;
    correoElectronico: string;
  }
  const [userToken, setUserToken] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    setUserToken(token);
  }, []);

  useEffect(() => {
    if (userToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;

      const fetchUsers = async () => {
        try {
          const response = await axios.get(
            "https://localhost:7152/api/Admin/ObtenerUsuarios"
          );
          setUsers(response.data);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };

      fetchUsers();
    }
  }, [userToken]);

  return (
    <div>
      <h1>Lista de Usuarios</h1>
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
                <button
                  key={user.usuarioId}
                  onClick={() => {
                    console.log("Usuario Eliminado ",user.usuarioId);
                  }}
                  className="btn btn-primary">
                  D
                </button>
              </td>

              <td>
                <button key={user.usuarioId} className="btn btn-primary"
                  onClick={() => {
                    console.log("Usuario Editado ",user.usuarioId);
                  }}>
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

export default GetUsers;

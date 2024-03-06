import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { IoReload } from "react-icons/io5";

function TableUser() {
  interface User {
    usuarioId: number;
    nombre: string;
    correoElectronico: string;
  }
  const [temporalUserName, settemporalUserName] = useState("");
  const [temporalUserId, settemporalUserId] = useState(0);
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
      fetchUsers()
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Eliminar usuario

  const deleteUser = (id: number) => {
    axios.delete("https://localhost:7152/api/Admin/EliminarUsuario", {
        data: {
          userId: id,
        },
      })
      .then((response) => {
        console.log("Usuario eliminado con éxito", response);
        fetchUsers()
      })
      .catch((error) => {
        console.error("Error al eliminar el usuario:", error);
      });
  };

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <button onClick={fetchUsers} className="btn btn-primary"><IoReload /></button>
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
                
           {/* Boton de eliminar */}
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#modaleliminar"
                  onClick={() => {
                    settemporalUserId(user.usuarioId);
                    settemporalUserName(user.nombre);
                  }}
                >
                  <MdDeleteForever />
                </button>
              </td>

              {/* Boton de editar */}
              <td>
                <button
                  onClick={() => {
                    console.log("Usuario editado", user.usuarioId);
                  }}
                  className="btn btn-primary"
                >
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para eliminar  */}
      <div
        className="modal fade"
        id="modaleliminar"
        aria-labelledby="modaleliminarLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="modaleliminarLabel">
                Quieres eliminar este usuario?
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close">
                  
                </button>
            </div>
            <div className="modal-body">
              ID: {temporalUserId} Nombre: {temporalUserName}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {
                  settemporalUserId(0);
                  settemporalUserName("");
                }}>
                Regresar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  deleteUser(temporalUserId);
                  settemporalUserId(0);
                  settemporalUserName("");
                }}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableUser;

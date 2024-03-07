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
    contraseña: string;
    rolID: number;
  }

  const [temporalUser, setTemporalUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Nuevo estado para el mensaje de éxito
  const [temporalUserName, settemporalUserName] = useState("");
  const [temporalUserId, settemporalUserId] = useState(0);
  const cookies = new Cookies();

  const fetchUsers = async () => {
    try {
      const token = cookies.get("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const response = await axios.get(
        "https://localhost:7152/api/Admin/ObtenerUsuarios"
      );
      setUsers(response.data);
      fetchUsers();
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Eliminar usuario

  const deleteUser = (id: number) => {
    axios
      .delete("https://localhost:7152/api/Admin/EliminarUsuario", {
        data: {
          userId: id,
        },
      })
      .then((response) => {
        console.log("Usuario eliminado con éxito", response);
        fetchUsers();
      })
      .catch((error) => {
        console.error("Error al eliminar el usuario:", error);
      });
  };


  const editUser = async (editedUser: User) => {
    try {
      const token = cookies.get("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const response = await axios.put(
        "https://localhost:7152/api/Admin/EditarUsuario",
        editedUser
      );
      console.log("Usuario editado con éxito", response);
      fetchUsers();
      setSuccessMessage("Usuario editado con éxito"); 
      setTimeout(() => {
        setSuccessMessage(null); 
      }, 3000); 
    } catch (error) {
      console.error("Error al editar el usuario:", error);
    }
  };

  const handleEditModal = (user: User) => {
    setTemporalUser(user);
  };

  const handleEditSubmit = () => {
    if (temporalUser) {
      editUser(temporalUser);
      setTemporalUser(null);
    }
  };

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <button onClick={fetchUsers} className="btn btn-primary">
        <IoReload />
      </button>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
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

                {/* Boton de editar */}

                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#modalEdit"
                  onClick={() => {
                    handleEditModal(user);
                  }}
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
                aria-label="Close"
              ></button>
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
                }}
              >
                Regresar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  deleteUser(temporalUserId);
                  settemporalUserId(0);
                  settemporalUserName("");
                }}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para editar */}

      <div
        className="modal fade"
        id="modalEdit"
        aria-labelledby="modaledit"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="modaleditLabel">
                Editar Usuario
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {temporalUser && (
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">
                      Nombre
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombre"
                      name="nombre"
                      defaultValue={temporalUser.nombre}
                      required
                      onChange={(e) =>
                        setTemporalUser({
                          ...temporalUser,
                          nombre: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="correoElectronico" className="form-label">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="correoElectronico"
                      name="correoElectronico"
                      defaultValue={temporalUser.correoElectronico}
                      required
                      onChange={(e) =>
                        setTemporalUser({
                          ...temporalUser,
                          correoElectronico: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="contraseña" className="form-label">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="contraseña"
                      name="contraseña"
                      defaultValue={temporalUser.contraseña}
                      required
                      onChange={(e) =>
                        setTemporalUser({
                          ...temporalUser,
                          contraseña: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="rolID" className="form-label">
                      Rol
                    </label>
                    <select
                      className="form-select"
                      name="rolID"
                      id="rolID"
                      defaultValue={temporalUser.rolID}
                      required
                      onChange={(e) =>
                        setTemporalUser({
                          ...temporalUser,
                          rolID: parseInt(e.target.value),
                        })
                      }
                    >
                      <option value="1">Estudiante</option>
                      <option value="2">Profesor</option>
                      <option value="3">Administrador</option>
                    </select>
                  </div>
                </form>
              </div>
            )}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleEditSubmit}
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      </div>




    </div>
  );
}

export default TableUser;

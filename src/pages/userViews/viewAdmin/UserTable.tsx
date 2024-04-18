import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { FaPlus, FaPencilAlt, FaTrashAlt, FaEye } from "react-icons/fa";
import { CgDanger } from "react-icons/cg";

function UserTable() {
  interface User {
    usuarioId: number;
    nombre: string;
    correoElectronico: string;
    contraseña: string;
    rolId: number;
  }
  const initialFormData = {
    nombre: "",
    correoElectronico: "",
    contraseña: "",
    rolID: "1",
    gradoId: "1",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [temporalUser, setTemporalUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [temporalUserName, setTemporalUserName] = useState("");
  const [temporalUserId, setTemporalUserId] = useState(0);
  const [temporalUserEmail, setTemporalUserEmail] = useState("");
  const [temporalUserRolId, setTemporalUserRolId] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserRole, setSelectedUserRole] = useState<string>("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [fetchUsersTrigger, setFetchUsersTrigger] = useState(false);
  const cookies = new Cookies();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.contraseña.length < 8) {
      setErrorMessage("La contraseña debe tener al menos 8 caracteres");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      return;
    }

    try {
      const response = await fetch(
        `http://www.eduasynchub.somee.com/api/User/RegistrarUsuarios?gradoId=${formData.gradoId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setSuccessMessage("Usuario añadido correctamente");
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);

        setFetchUsersTrigger(!fetchUsersTrigger);
        setFormData(initialFormData);
      } else {
        setErrorMessage("Error al añadir usuario");
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Error al añadir usuario");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  const handleClearForm = () => {
    setFormData(initialFormData);
  };

  const fetchUsers = async () => {
    try {
      const token = cookies.get("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.get(
        "http://www.eduasynchub.somee.com/api/Admin/ObtenerUsuarios"
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsersTrigger]);

  const deleteUser = (id: number) => {
    axios
      .delete("http://www.eduasynchub.somee.com/api/Admin/EliminarUsuario", {
        data: {
          userId: id,
        },
      })
      .then(() => {
        fetchUsers();
        setSuccessMessage("Usuario eliminado con éxito");
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);

      })
      .catch((error) => {
        console.error("Error al eliminar el usuario:", error);
        setErrorMessage("Error al eliminar el usuario");
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      });
  };

  const editUser = async (editedUser: User) => {
    try {
      const token = cookies.get("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.put(
        "http://www.eduasynchub.somee.com/api/Admin/EditarUsuario",
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

  const handleUserRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserRole(e.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearchTerm =
      searchTerm === "" || user.usuarioId.toString().includes(searchTerm);
    const matchesUserRole =
      selectedUserRole === "" || user.rolId.toString() === selectedUserRole;

    // Si searchTerm está vacío, no se aplica el filtro de búsqueda por ID
    // Si selectedUserRole está vacío, no se aplica el filtro por tipo de usuario
    return matchesSearchTerm && matchesUserRole;
  });

  return (
    <div className="row gap-3">
      <div className="container">
        <div className="pt-4">
          <div className="row align-items-center justify-content-end pb-2">
            <div className="col-12 col-md-6 mb-2 mb-md-0 order-md-1">
              <h3>
                Gestión de <b>Usuarios</b>
              </h3>
            </div>
            <div className="container">
              {successMessage && (
                <div className="alert alert-success" role="alert">
                  {successMessage}
                </div>
              )}

              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}
            </div>
            <div className="col-12 col-md-4 order-md-3"></div>

            <div className="col-12 col-md-6 mb-2 mb-md-0 order-md-2 text-end">
              <div className="input-group">
                <input
                  className="form-control me-2"
                  type="text"
                  placeholder="Buscar por ID"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                  className="form-select me-2"
                  onChange={handleUserRoleChange}
                >
                  <option value="">Todos</option>
                  <option value="1">Estudiantes</option>
                  <option value="2">Profesores</option>
                </select>
                <button
                  type="button"
                  className="btn btn-success"
                  data-bs-toggle="modal"
                  data-bs-target="#modalAgregar"
                >
                  <FaPlus className="me-2" />
                  Agregar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                {/* <th className="sticky-th">Id</th> */}
                <th className="sticky-th">ID</th>
                <th className="sticky-th">Nombre</th>
                <th className="sticky-th">Rol</th>
                <th className="sticky-th">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.usuarioId}>
                  {/* <th scope="row">{user.usuarioId}</th> */}
                  <td>
                    <p className="fw-bold">{user.usuarioId}</p>
                  </td>
                  <td>
                    {" "}
                    <div className="ms-3">
                      <p className="fw-bold mb-1">{user.nombre}</p>
                      <p className="text-muted mb-0">
                        {user.correoElectronico}
                      </p>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`badge rounded-pill d-inline ${
                        user.rolId === 1
                          ? "badge bg-primary"
                          : user.rolId === 2
                          ? "badge bg-success"
                          : user.rolId === 3
                          ? "badge bg-danger"
                          : ""
                      }`}
                    >
                      {user.rolId === 1
                        ? "Estudiante"
                        : user.rolId === 2
                        ? "Profesor"
                        : user.rolId === 3
                        ? "Administrador"
                        : "Desconocido"}
                    </span>
                  </td>

                  <td>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Acciones"
                    >
                      {/* Boton de editar */}
                      <button
                        type="button"
                        className="btn"
                        data-toggle="tooltip"
                        title="Editar"
                        data-bs-toggle="modal"
                        data-bs-target="#modalEdit"
                        onClick={() => {
                          handleEditModal(user);
                        }}
                      >
                        <FaPencilAlt
                          className="color-primary"
                          style={{ color: "#005e93" }}
                        />
                      </button>

                      {/* Boton de ver  */}
                      <button
                        type="button"
                        className="btn"
                        data-toggle="tooltip"
                        title="Ver usuario"
                        data-bs-toggle="modal"
                        data-bs-target="#modalView"
                        onClick={() => {
                          setTemporalUserId(user.usuarioId);
                          setTemporalUserName(user.nombre);
                          setTemporalUserEmail(user.correoElectronico);
                          setTemporalUserRolId(user.rolId);
                          setViewModalOpen(true);
                          console.log(viewModalOpen);
                        }}
                      >
                        <FaEye />
                      </button>
                      {/* Boton de eliminar */}
                      <button
                        type="button"
                        className="btn"
                        data-toggle="tooltip"
                        title="Eliminar"
                        data-bs-toggle="modal"
                        data-bs-target="#modalDelete"
                        onClick={() => {
                          setTemporalUserId(user.usuarioId);
                          setTemporalUserName(user.nombre);
                          setTemporalUserEmail(user.correoElectronico);
                        }}
                      >
                        <FaTrashAlt style={{ color: "red" }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para agregar */}
      <div
        className="modal fade"
        id="modalAgregar"
        aria-labelledby="modalagregar"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Agregar Usuario</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {}}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                  <label className="mb-2 fw-bold">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    id="nombre"
                    name="nombre"
                    placeholder="Nombre completo"
                    value={formData.nombre}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group mb-2">
                  <label className="mb-2 fw-bold">Correo Electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    id="correoElectronico"
                    name="correoElectronico"
                    placeholder="ejemplo@gmail.com"
                    required
                    value={formData.correoElectronico}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group mb-2">
                  <label className="mb-2 fw-bold">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    required
                    id="contraseña"
                    name="contraseña"
                    placeholder="Contraseña"
                    value={formData.contraseña}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group mb-2">
                  <label className="mb-2 fw-bold">Rol</label>
                  <select
                    className="form-select mb-3"
                    name="rolID"
                    id="rolID"
                    value={formData.rolID}
                    onChange={handleChange}
                    required
                  >
                    <option value="1">Estudiante</option>
                    <option value="2">Profesor</option>
                    <option value="3">Administrador</option>
                  </select>
                </div>

                <div className="form-group mb-2">
                  <label className="mb-2 fw-bold">Grado</label>
                  <select
                    className="form-select mb-3"
                    required
                    name="gradoId"
                    id="gradoId"
                    value={formData.gradoId}
                    onChange={handleChange}
                    disabled={formData.rolID !== "1"}
                  >
                    <option value="1">Primero de Primaria</option>
                    <option value="2">Segundo de Primaria</option>
                    <option value="3">Tercero de Primaria</option>
                    <option value="4">Cuatro de Primaria</option>
                    <option value="5">Quinto de Primaria</option>
                    <option value="6">Sexto de Primaria</option>
                    <option value="7">Primero de Secundaria</option>
                    <option value="8">Segundo de Secundaria</option>
                    <option value="9">Tercero de Secundaria</option>
                    <option value="10">Cuatro de Secundaria</option>
                    <option value="11">Quinto de Secundaria</option>
                    <option value="12">Sexto de Secundaria</option>
                  </select>
                </div>
                <div className="modal-footer">
                  <input
                    type="button"
                    className="btn btn-default"
                    data-bs-dismiss="modal"
                    value="Cancelar"
                    onClick={handleClearForm}
                  />
                  <button
                    type="submit"
                    className="btn btn-success"
                    data-bs-dismiss="modal"
                    onClick={() => {}}
                  >
                    Agregar
                  </button>
                </div>
              </form>
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
            <form>
              <div className="modal-header">
                <h4 className="modal-title">Editar Usuario</h4>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    setTemporalUser(null);
                    setTemporalUserId(0);
                    setTemporalUserName("");
                    setTemporalUserEmail("");
                  }}
                ></button>
              </div>
              {temporalUser && (
                <div className="modal-body">
                  <div className="form-group mb-2">
                    <label className="mb-2 fw-bold">Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      id="nombre"
                      name="nombre"
                      defaultValue={temporalUser.nombre}
                      onChange={(e) =>
                        setTemporalUser({
                          ...temporalUser,
                          nombre: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label className="mb-2 fw-bold">Correo Electrónico</label>
                    <input
                      type="email"
                      className="form-control"
                      id="correoElectronico"
                      name="correoElectronico"
                      required
                      defaultValue={temporalUser.correoElectronico}
                      onChange={(e) =>
                        setTemporalUser({
                          ...temporalUser,
                          correoElectronico: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label className="mb-2 fw-bold">Contraseña</label>
                    <input
                      type="password"
                      className="form-control"
                      id="contraseña"
                      name="contraseña"
                      required
                      defaultValue={temporalUser.contraseña}
                      onChange={(e) =>
                        setTemporalUser({
                          ...temporalUser,
                          contraseña: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label className="mb-2 fw-bold">Rol</label>
                    <select
                      className="form-select"
                      name="rolID"
                      id="rolID"
                      required
                      defaultValue={temporalUser.rolId}
                      onChange={(e) =>
                        setTemporalUser({
                          ...temporalUser,
                          rolId: parseInt(e.target.value),
                        })
                      }
                    >
                      <option value="1">Estudiante</option>
                      <option value="2">Profesor</option>
                      <option value="3">Administrador</option>
                    </select>
                  </div>
                </div>
              )}
              <div className="modal-footer">
                <input
                  type="button"
                  className="btn btn-default"
                  data-bs-dismiss="modal"
                  value="Cancelar"
                  onClick={() => {
                    setTemporalUser(null);
                    setTemporalUserId(0);
                    setTemporalUserName("");
                    setTemporalUserEmail("");
                  }}
                />
                <button
                  type="button"
                  className="btn btn-success"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    handleEditSubmit();
                    setTemporalUser(null);
                    setTemporalUserId(0);
                    setTemporalUserName("");
                    setTemporalUserEmail("");
                  }}
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modal para ver */}
      <div
        className="modal fade"
        id="modalView"
        aria-labelledby="modalViewLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Información del Usuario</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setTemporalUser(null);
                  setTemporalUserId(0);
                  setTemporalUserName("");
                  setTemporalUserEmail("");
                  setTemporalUserRolId(0);
                }}
              ></button>
            </div>

            <div className="modal-body">
              <div className="form-group mb-2">
                <label className="mb-2 fw-bold">ID</label>
                <p>{temporalUserId}</p>
              </div>
              <div className="form-group mb-2">
                <label className="mb-2 fw-bold">Nombre</label>
                <p>{temporalUserName}</p>
              </div>
              <div className="form-group mb-2">
                <label className="mb-2 fw-bold">Correo Electrónico</label>
                <p>{temporalUserEmail}</p>
              </div>
              <div className="form-group mb-2">
                <label className="mb-2 fw-bold">Rol</label>
                <p>
                  {temporalUserRolId === 1
                    ? "Estudiante"
                    : temporalUserRolId === 2
                    ? "Profesor"
                    : temporalUserRolId === 3
                    ? "Administrador"
                    : "Rol desconocido"}
                </p>
              </div>
            </div>

            <div className="modal-footer">
              <input
                type="button"
                className="btn btn-default"
                data-bs-dismiss="modal"
                value="Cancelar"
                onClick={() => {
                  setTemporalUser(null);
                  setTemporalUserId(0);
                  setTemporalUserName("");
                  setTemporalUserEmail("");
                  setTemporalUserRolId(0);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal para eliminar */}
      <div
        className="modal fade"
        id="modalDelete"
        aria-labelledby="modalDeleteLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">¿Desea eliminar este usuario?</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setTemporalUser(null);
                  setTemporalUserId(0);
                  setTemporalUserName("");
                  setTemporalUserEmail("");
                }}
              ></button>
            </div>

            <div className="modal-body">
              <div
                className="alert alert-danger d-flex align-items-center"
                role="alert"
              >
                <CgDanger
                  className="flex-shrink-0 me-2"
                  style={{ color: "red", fontSize: "24px" }}
                />
                <div className="pl-5">
                  Al realizar esta acción se eliminará permanentemente al
                  usuario y no se podrá deshacer.
                </div>
              </div>
              <div className="form-group mb-2">
                <label className="mb-2 fw-bold">ID</label>
                <p>{temporalUserId}</p>
              </div>
              <div className="form-group mb-2">
                <label className="mb-2 fw-bold">Nombre</label>
                <p>{temporalUserName}</p>
              </div>
              <div className="form-group mb-2">
                <label className="mb-2 fw-bold">Correo Electrónico</label>
                <p>{temporalUserEmail}</p>
              </div>
            </div>

            <div className="modal-footer">
              <input
                type="button"
                className="btn btn-default"
                data-bs-dismiss="modal"
                value="Cancelar"
                onClick={() => {
                  setTemporalUser(null);
                  setTemporalUserId(0);
                  setTemporalUserName("");
                  setTemporalUserEmail("");
                }}
              />
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => {
                  deleteUser(temporalUserId);
                  setTemporalUserId(0);
                  setTemporalUserName("");
                  setTemporalUserEmail("");
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserTable;

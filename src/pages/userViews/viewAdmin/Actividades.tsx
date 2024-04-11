import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPencilAlt, FaTrashAlt, FaPlus, FaEye } from "react-icons/fa";
import { CgDanger } from "react-icons/cg";

function Actividades() {
  interface Actividad {
    id: number;
    title: string;
    date: string;
    hora: string;
  }
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [hora, setHora] = useState("");
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [temporalId, setTemporalId] = useState<number | null>(null);

  useEffect(() => {
    fetchActividad();
  }, []);

  const fetchActividad = () => {
    axios
      .get(
        "http://www.eduasynchub.somee.com/api/CalendarioEspecifico/MostrarActividades"
      )
      .then((response) => {
        console.log(response.data);
        setActividades(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const clearData = () => {
    setTitle("");
    setDate("");
    setHora("");
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://www.eduasynchub.somee.com/api/CalendarioEspecifico/AgregarActividad",
        {
          title: title,
          date: date,
          hora: hora,
        }
      );
      if (response.status === 200) {
        console.log("Actividad agregada correctamente");
        fetchActividad();
        clearData();
      }
    } catch (error) {
      console.error("Error al agregar la actividad:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://www.eduasynchub.somee.com/api/CalendarioEspecifico/EditarActividad/${temporalId}`,
        {
          title: title,
          date: date,
          hora: hora,
        }
      );

      if (response.status === 200) {
        console.log("Actividad actualizada correctamente");
        fetchActividad();
        clearData();
        setTemporalId(null);
      }
    } catch (error) {
      console.error("Error al editar la actividad:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://www.eduasynchub.somee.com/api/CalendarioEspecifico/EliminarActividad/${id}`
      );
      if (response.status === 200) {
        console.log("Actividad eliminada correctamente");
        fetchActividad();
      }
    } catch (error) {
      console.error("Error al eliminar la actividad:", error);
    }
    clearData();
  };

  const filteredActividades = actividades.filter((actividad) =>
    actividad.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Filtro */}
      <div className=" p-4">
        <div className="row align-items-center justify-content-end">
          <div className="col-12 col-md-6 mb-2 mb-md-0 order-md-1">
            <h3>
              Gestión de <b>Actividades</b>
            </h3>
          </div>
          <div className="col-12 col-md-6 mb-2 mb-md-0 order-md-2 text-end">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por título"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
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

      {/* Tabla */}

      <div className="p-4">
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th className="sticky-th">Id</th>
                <th className="sticky-th">Titulo</th>
                <th className="sticky-th">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredActividades.map((actividad) => (
                <tr key={actividad.id}>
                  <th scope="row">{actividad.id}</th>
                  <td>{actividad.title}</td>

                  <td>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Acciones"
                    >
                      <button
                        type="button"
                        className="btn"
                        data-bs-toggle="modal"
                        data-bs-target="#modalEditar"
                        onClick={() => {
                          setTemporalId(actividad.id);
                          setTitle(actividad.title);
                          setDate(actividad.date);
                          setHora(actividad.hora);
                        }}
                      >
                        <FaPencilAlt
                          className="color-primary"
                          style={{ color: "#005e93" }}
                        />
                      </button>
                      <button
                        type="button"
                        className="btn"
                        data-bs-toggle="modal"
                        data-bs-target="#modalVisualizar"
                        onClick={() => {
                          setTemporalId(actividad.id);
                          setTitle(actividad.title);
                          setDate(actividad.date);
                          setHora(actividad.hora);
                        }}
                      >
                        <FaEye />
                      </button>

                      <button
                        type="button"
                        className="btn"
                        data-bs-toggle="modal"
                        data-bs-target="#modalEliminar"
                        onClick={() => {
                          setTemporalId(actividad.id);
                          setTitle(actividad.title);
                          setDate(actividad.date);
                          setHora(actividad.hora);
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

      {/* Modal para Agregar */}
      <div
        className="modal fade"
        id="modalAgregar"
        aria-labelledby="modalAgregarLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalAgregarLabel">
                Agregar Actividad
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Título:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">
                    Fecha:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="hora" className="form-label">
                    Hora:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="hora"
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => {
                  handleSubmit();
                  clearData();
                }}
              >
                Agregar Actividad
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para Editar */}
      <div
        className="modal fade"
        id="modalEditar"
        aria-labelledby="modalEditarLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalEditarLabel">
                Editar Actividad
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  clearData();
                  setTemporalId(null);
                }}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="editTitle" className="form-label">
                    Título:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editTitle"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editDate" className="form-label">
                    Fecha:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="editDate"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editHora" className="form-label">
                    Hora:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editHora"
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                data-bs-dismiss="modal"
                onClick={() => {
                  clearData();
                  setTemporalId(null);
                }}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={() => {
                  handleUpdate();
                  clearData();
                  setTemporalId(null);
                }}
              >
                Actualizar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para Eliminar */}

      <div
        className="modal fade"
        id="modalEliminar"
        aria-labelledby="modalEliminarLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalEliminarLabel">
                Eliminar Actividad
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  clearData();
                  setTemporalId(null);
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
                  Al realizar esta acción se eliminará permanentemente la
                  Actividad y no se podrá deshacer.
                </div>
              </div>
              <div className="form-group mb-2">
                <label className="mb-2 fw-bold">ID</label>
                <p>{temporalId}</p>
              </div>
              <div className="form-group mb-2">
                <label className="mb-2 fw-bold">Titulo</label>
                <p>{title}</p>
              </div>
              <div className="form-group mb-2">
                <label className="mb-2 fw-bold">Fecha</label>
                <p>{date}</p>
              </div>
              <div className="form-group mb-2">
                <label className="mb-2 fw-bold">Hora</label>
                <p>{hora}</p>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                data-bs-dismiss="modal"
                onClick={() => {
                  clearData();
                  setTemporalId(null);
                }}
              >
                Cancelar
              </button>

              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => {
                  temporalId && handleDelete(temporalId);
                  clearData();
                  setTemporalId(null);
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para visualizar */}

      <div
        className="modal fade"
        id="modalVisualizar"
        aria-labelledby="modalVisualizarLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalVisualizarLabel">
                Visualizar Actividad
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  clearData();
                  setTemporalId(null);
                }}
              ></button>
            </div>
            <div className="modal-body">
              <div className="form-group mb-2">
                <label className="mb-2 fw-bold">ID</label>
                <p>{temporalId}</p>
              </div>
              <div className="form-group mb-2">
                <label className="mb-2 fw-bold">Titulo</label>
                <p>{title}</p>
              </div>
              <div className="form-group mb-2">
                <label className="mb-2 fw-bold">Fecha</label>
                <p>{date}</p>
              </div>
              <div className="form-group mb-2">
                <label className="mb-2 fw-bold">Hora</label>
                <p>{hora}</p>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                data-bs-dismiss="modal"
                onClick={() => {
                  clearData();
                  setTemporalId(null);
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Actividades;

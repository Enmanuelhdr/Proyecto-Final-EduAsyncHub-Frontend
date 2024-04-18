import { useState, useEffect } from "react";
import axios from "axios";
import { FaPencilAlt, FaTrashAlt, FaPlus, FaEye } from "react-icons/fa";
import SolicitarAdmision from "../viewStudent/SolicitarAdmision";
import { CgDanger } from "react-icons/cg";


function Admisiones() {
  interface Admision {
    solicitudId: number;
    nombreEstudiante: string;
    fechaNacimiento: string;
    genero: string;
    direccionEstudiante: string;
    grado: number;
    escuelaActual: string;
    nombrePadreTutor: string;
    relacionEstudiante: string;
    direccionPadreTutor: string;
    numeroTelefono: string;
    correoElectronico: string;
    fechaHoraSolicitud: string;
    estadoSolicitud: string;
    notasComentarios: string;
  }

  const [solicitudId, setSolicitudId] = useState(0);
  const [nombreEstudiante, setNombreEstudiante] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [genero, setGenero] = useState("");
  const [direccionEstudiante, setDireccionEstudiante] = useState("");
  const [grado, setGrado] = useState(0);
  const [escuelaActual, setEscuelaActual] = useState("");
  const [nombrePadreTutor, setNombrePadreTutor] = useState("");
  const [relacionEstudiante, setRelacionEstudiante] = useState("");
  const [direccionPadreTutor, setDireccionPadreTutor] = useState("");
  const [numeroTelefono, setNumeroTelefono] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [fechaHoraSolicitud, setFechaHoraSolicitud] = useState("");
  const [estadoSolicitud, setEstadoSolicitud] = useState("");
  const [notasComentarios, setNotasComentarios] = useState("");

  const [admisiones, setAdmisiones] = useState<Admision[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [temporalId, setTemporalId] = useState(0);
  const [comentarioExtra, setComentarioExtra] = useState("");
  const [selectedState, setSelectedState] = useState("Todos");




  useEffect(() => {
    fetchAdmisiones();
  }, [
  ]);

  const fetchAdmisiones = () => {
    axios
      .get("http://www.eduasynchub.somee.com/api/Admisiones")
      .then((response) => {

        console.log(response.data);
        setAdmisiones(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const clearData = () => {
    setSolicitudId(0);
    setNombreEstudiante("");
    setFechaNacimiento("");
    setGenero("");
    setDireccionEstudiante("");
    setGrado(0);
    setEscuelaActual("");
    setNombrePadreTutor("");
    setRelacionEstudiante("");
    setDireccionPadreTutor("");
    setNumeroTelefono("");
    setCorreoElectronico("");
    setFechaHoraSolicitud("");
    setEstadoSolicitud("");
    setNotasComentarios("");
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://www.eduasynchub.somee.com/api/Admisiones/${temporalId}`,
        {
          solicitudId: solicitudId,
          nombreEstudiante: nombreEstudiante,
          fechaNacimiento: fechaNacimiento,
          genero: genero,
          direccionEstudiante: direccionEstudiante,
          grado: grado,
          escuelaActual: escuelaActual,
          nombrePadreTutor: nombrePadreTutor,
          relacionEstudiante: relacionEstudiante,
          direccionPadreTutor: direccionPadreTutor,
          numeroTelefono: numeroTelefono,
          correoElectronico: correoElectronico,
          fechaHoraSolicitud: fechaHoraSolicitud,
          estadoSolicitud: estadoSolicitud,
          notasComentarios: notasComentarios,
        }
      );

      console.log("Solicitud de admisión actualizada correctamente", response);

 

      fetchAdmisiones();
      clearData();
      setTemporalId(0);
    } catch (error) {
      console.error("Error al editar la solicitud de admisión:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://www.eduasynchub.somee.com/api/Admisiones/${id}`
      );

      console.log("Solicitud de admisión eliminada correctamente", response);
      fetchAdmisiones();
    } catch (error) {
      console.error("Error al eliminar la solicitud de admisión:", error);
    }
    clearData();
  };

  const handleApprove = async () => {
    try {


      await axios.put(`http://www.eduasynchub.somee.com/api/Admisiones/Approve/${solicitudId}?comentario=${encodeURIComponent(comentarioExtra)}`);
     // Envío de correo electrónico si es el primer cambio de estado
     if (estadoSolicitud !== '' && notasComentarios !== '') {
      await axios.post(
        "https://backend-chat-en-tiempo-real-dev-haxk.4.us-1.fl0.io/email/",
        new URLSearchParams({
          institucion: "EduAsynchub@outlook.com",
          email: correoElectronico,
          mensaje: `Su solicitud de admisión ha sido actualizada. Comentario: ${notasComentarios}`,
          asunto: "Actualización de Solicitud de Admisión",
        }).toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    }     // Envío de correo electrónico si es el primer cambio de estado
    if (estadoSolicitud !== '' && notasComentarios !== '') {
      await axios.post(
        "https://backend-chat-en-tiempo-real-dev-haxk.4.us-1.fl0.io/email/",
        new URLSearchParams({
          institucion: "EduAsynchub@outlook.com",
          email: correoElectronico,
          mensaje: `Su solicitud de admisión ha sido actualizada. Comentario: ${notasComentarios}`,
          asunto: "Actualización de Solicitud de Admisión",
        }).toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    }


    } catch (error) {

      console.error('Es necesario enviar un comentario para aprobar la solicitud, o su solicitud ya ha sido aprobada.', error);

    }
    finally {
      window.location.reload()
    }
  };

  const handleReject = async () => {
    try {


      await axios.put(`http://www.eduasynchub.somee.com/api/Admisiones/Reject/${solicitudId}?comentario=${encodeURIComponent(comentarioExtra)}`);
           // Envío de correo electrónico si es el primer cambio de estado
           if (estadoSolicitud !== '' && notasComentarios !== '') {
            await axios.post(
              "https://backend-chat-en-tiempo-real-dev-haxk.4.us-1.fl0.io/email/",
              new URLSearchParams({
                institucion: "EduAsynchub@outlook.com",
                email: correoElectronico,
                mensaje: `Su solicitud de admisión ha sido actualizada. Comentario: ${notasComentarios}`,
                asunto: "Actualización de Solicitud de Admisión",
              }).toString(),
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              }
            );
          }
      fetchAdmisiones()

    } catch (error) {

      console.error('Es necesario enviar un comentario para rechazar la solicitud, o su solicitud ya ha sido rechazada.', error);

    }
    finally {
      window.location.reload()
    }
  };



  const filteredAdmisiones = admisiones.filter((admision) =>
    admision.nombreEstudiante.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedState === "Todos" || admision.estadoSolicitud.toLowerCase() === selectedState.toLowerCase())
  );


  return (
    <>
      {/* Filtro */}
      <div className=" p-4">
        <div className="row align-items-center justify-content-end">
          <div className="col-12 col-md-6 mb-2 mb-md-0 order-md-1">
            <h3>
              Gestión de <b>Admisiones</b>
            </h3>
          </div>
          <div className="col-12 col-md-6 mb-2 mb-md-0 order-md-2 text-end">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por nombre"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <select
                className="form-select"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
              >
                <option value="Todos">Todos</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Aprobada">Aprobada</option>
                <option value="Rechazada">Rechazada</option>
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

      {/* Tabla */}
      <div className="p-4">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th className="sticky-th">ID</th>
                <th className="sticky-th">Nombre del Estudiante</th>
                <th className="sticky-th">Estado</th>
                <th className="sticky-th">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdmisiones.map((admision) => (
                <tr key={admision.solicitudId}>
                  <th scope="row">{admision.solicitudId}</th>
                  <td>{admision.nombreEstudiante}</td>
                  <td><span className={`badge rounded-pill d-inline ${admision.estadoSolicitud === "Pendiente" || admision.estadoSolicitud === "pendiente" ? "badge bg-primary" :
                    admision.estadoSolicitud === "Aprobada" ? "badge bg-success" :
                      admision.estadoSolicitud === "Rechazada" ? "badge bg-danger" : ""}`}>
                    {admision.estadoSolicitud === "Pendiente" || admision.estadoSolicitud === "pendiente" ? "Pendiente" :
                      admision.estadoSolicitud === "Aprobada" ? "Aprobada" :
                        admision.estadoSolicitud === "Rechazada" ? "Rechazada" : ""}
                  </span></td>
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
                          setTemporalId(admision.solicitudId);
                          setSolicitudId(admision.solicitudId);
                          setNombreEstudiante(admision.nombreEstudiante);
                          setFechaNacimiento(admision.fechaNacimiento);
                          setGenero(admision.genero);
                          setDireccionEstudiante(admision.direccionEstudiante);
                          setGrado(admision.grado);
                          setEscuelaActual(admision.escuelaActual);
                          setNombrePadreTutor(admision.nombrePadreTutor);
                          setRelacionEstudiante(admision.relacionEstudiante);
                          setDireccionPadreTutor(admision.direccionPadreTutor);
                          setNumeroTelefono(admision.numeroTelefono);
                          setCorreoElectronico(admision.correoElectronico);
                          setFechaHoraSolicitud(admision.fechaHoraSolicitud);
                          setEstadoSolicitud(admision.estadoSolicitud);
                          setNotasComentarios(admision.notasComentarios);
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
                          setTemporalId(admision.solicitudId);
                          setSolicitudId(admision.solicitudId);
                          setNombreEstudiante(admision.nombreEstudiante);
                          setFechaNacimiento(admision.fechaNacimiento);
                          setGenero(admision.genero);
                          setDireccionEstudiante(admision.direccionEstudiante);
                          setGrado(admision.grado);
                          setEscuelaActual(admision.escuelaActual);
                          setNombrePadreTutor(admision.nombrePadreTutor);
                          setRelacionEstudiante(admision.relacionEstudiante);
                          setDireccionPadreTutor(admision.direccionPadreTutor);
                          setNumeroTelefono(admision.numeroTelefono);
                          setCorreoElectronico(admision.correoElectronico);
                          setFechaHoraSolicitud(admision.fechaHoraSolicitud);
                          setEstadoSolicitud(admision.estadoSolicitud);
                          setNotasComentarios(admision.notasComentarios);
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
                          setTemporalId(admision.solicitudId);
                          setNombreEstudiante(admision.nombreEstudiante);
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
                Agregar Admisión
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <SolicitarAdmision titulo={false} />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-dissmiss"
                data-bs-dismiss="modal"
              >
                Cancelar
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
                Editar Admisión
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  clearData();
                  setTemporalId(0);
                }}
              ></button>
            </div>
            <div className="modal-body">
              <form className="container">
                <div className="mb-3">
                  <label htmlFor="nombreEstudiante" className="form-label">
                    Nombre del estudiante
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombreEstudiante"
                    name="nombreEstudiante"
                    value={nombreEstudiante}
                    onChange={(e) => setNombreEstudiante(e.target.value)}
                    placeholder="Nombre del estudiante"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="fechaNacimiento" className="form-label">
                    Fecha de nacimiento
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="fechaNacimiento"
                    name="fechaNacimiento"
                    value={fechaNacimiento}
                    onChange={(e) => setFechaNacimiento(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="genero" className="form-label">
                    Género
                  </label>
                  <select
                    className="form-select"
                    name="genero"
                    id="genero"
                    value={genero}
                    onChange={(e) => setGenero(e.target.value)}
                    required
                  >
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="direccionEstudiante" className="form-label">
                    Dirección del estudiante
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="direccionEstudiante"
                    name="direccionEstudiante"
                    value={direccionEstudiante}
                    onChange={(e) => setDireccionEstudiante(e.target.value)}
                    placeholder="Dirección del estudiante"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="grado" className="form-label">
                    Grado
                  </label>
                  <select
                    className="form-select"
                    name="grado"
                    id="grado"
                    value={grado}
                    onChange={(e) => setGrado(Number(e.target.value))}
                    required
                  >
                    <option value="1">Primero de Primaria</option>
                    <option value="2">Segundo de Primaria</option>
                    <option value="3">Tercero de Primaria</option>
                    <option value="4">Cuarto de Primaria</option>
                    <option value="5">Quinto de Primaria</option>
                    <option value="6">Sexto de Primaria</option>
                    <option value="7">Primero de Secundaria</option>
                    <option value="8">Segundo de Secundaria</option>
                    <option value="9">Tercero de Secundaria</option>
                    <option value="10">Cuarto de Secundaria</option>
                    <option value="11">Quinto de Secundaria</option>
                    <option value="12">Sexto de Secundaria</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="escuelaActual" className="form-label">
                    Escuela actual
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="escuelaActual"
                    name="escuelaActual"
                    value={escuelaActual}
                    onChange={(e) => setEscuelaActual(e.target.value)}
                    placeholder="Escuela actual"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="nombrePadreTutor" className="form-label">
                    Nombre del padre/tutor
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombrePadreTutor"
                    name="nombrePadreTutor"
                    value={nombrePadreTutor}
                    onChange={(e) => setNombrePadreTutor(e.target.value)}
                    placeholder="Nombre del padre/tutor"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="relacionEstudiante" className="form-label">
                    Relación con el estudiante
                  </label>
                  <select
                    className="form-select"
                    name="relacionEstudiante"
                    id="relacionEstudiante"
                    value={relacionEstudiante}
                    onChange={(e) => setRelacionEstudiante(e.target.value)}
                    required
                  >
                    <option value="Padre">Padre</option>
                    <option value="Madre">Madre</option>
                    <option value="Tutor">Tutor</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="direccionPadreTutor" className="form-label">
                    Dirección del padre/tutor
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="direccionPadreTutor"
                    name="direccionPadreTutor"
                    value={direccionPadreTutor}
                    onChange={(e) => setDireccionPadreTutor(e.target.value)}
                    placeholder="Dirección del padre/tutor"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="numeroTelefono" className="form-label">
                    Número de teléfono
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="numeroTelefono"
                    name="numeroTelefono"
                    value={numeroTelefono}
                    onChange={(e) => setNumeroTelefono(e.target.value)}
                    placeholder="Número de teléfono"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="correoElectronico" className="form-label">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="correoElectronico"
                    name="correoElectronico"
                    value={correoElectronico}
                    onChange={(e) => setCorreoElectronico(e.target.value)}
                    placeholder="Correo electrónico"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="fechaHoraSolicitud" className="form-label">
                    Fecha y hora de la solicitud
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="fechaHoraSolicitud"
                    name="fechaHoraSolicitud"
                    value={fechaHoraSolicitud}
                    onChange={(e) => setFechaHoraSolicitud(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="notasComentarios" className="form-label">
                    Notas o comentarios
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="notasComentarios"
                    name="notasComentarios"
                    value={notasComentarios}
                    onChange={(e) => setNotasComentarios(e.target.value)}
                    placeholder="Notas o comentarios"
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
                  setTemporalId(0);
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
                  setTemporalId(0);
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
                ¿Estás seguro de eliminar la siguiente admisión?
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  clearData();
                  setTemporalId(0);
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
                  Solicitud de {nombreEstudiante} y no se podrá deshacer.
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                data-bs-dismiss="modal"
                onClick={() => {
                  clearData();
                  setTemporalId(0);
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
                  setTemporalId(0);
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
                Visualizar Admisión
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  clearData();
                  setTemporalId(0);
                }}
              ></button>
            </div>
            <div className="modal-body">
              <div className="form-group mb-2">
                <label className="mb-2 fw-bold">ID</label>
                <p>{solicitudId}</p>
              </div>
              <div className="form-group mb-2">
                <label className="mb-2 fw-bold">Nombre del estudiante</label>
                <p>{nombreEstudiante}</p>
              </div>
              <div className="form-group mb-2">
                <label className="mb-2 fw-bold">Fecha de nacimiento</label>
                <p>{fechaNacimiento}</p>
              </div>
              <div className="form-group mb-2">
                <label className="mb-2 fw-bold">Género</label>
                <p>{genero}</p>
              </div>
              <div className="form-group mb-2">
                <label className="mb-2 fw-bold">Dirección del estudiante</label>
                <p>{direccionEstudiante}</p>
              </div>
              <div className="form-group mb-2">
                <label className="mb-2 fw-bold">Grado</label>
                <p>{grado}</p>
              </div>
              <div className="form-group mb-2">
                <label className="mb-2 fw-bold">Escuela actual</label>
                <p>{escuelaActual}</p>
              </div>
              <div className="form-group mb-2">
                <label className="mb-2 fw-bold">Nombre del padre/tutor</label>
                <p>{nombrePadreTutor}</p>
              </div>
              <div className="form-group mb-2">
                <label className="mb-2 fw-bold">
                  Relación con el estudiante
                </label>
                <p>{relacionEstudiante}</p>
              </div>
              <div className="form-group mb-2">
                <label className="mb-2 fw-bold">
                  Dirección del padre/tutor
                </label>
                <p>{direccionPadreTutor}</p>
              </div>
              <div className="form-group mb-2">
                <label className="mb-2 fw-bold">Número de teléfono</label>
                <p>{numeroTelefono}</p>
              </div>
              <div className="form-group mb-2">
                <label className="mb-2 fw-bold">Correo electrónico</label>
                <p>{correoElectronico}</p>
              </div>
              <div className="form-group mb-2">
                <label className="mb-2 fw-bold">
                  Fecha y hora de la solicitud
                </label>
                <p>{fechaHoraSolicitud}</p>
              </div>
              <div className="form-group mb-2">
                <label className="mb-2 fw-bold">Estado de la solicitud</label>
                <p>{estadoSolicitud}</p>
              </div>
              <div className="form-group mb-2">
                <label className="mb-2 fw-bold">Notas o comentarios</label>
                <p>{notasComentarios}</p>
              </div>

              <div className="form-group mb-2">
                <label className="mb-2 fw-bold">Comentario de solicitud</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={comentarioExtra}
                  onChange={(e) => setComentarioExtra(e.target.value)}
                ></textarea>
                <p className="text-danger">Nota: Para poder Aprobar o Rechazar una solicitud debe ingresar un comentario. </p>

                <div className="d-flex gap-4 pt-4">
                  {/* <Approve id={solicitudId.toString()} comentario={comentarioExtra} /> */}
                  <button onClick={handleApprove} className='btn btn-success' >
                    {estadoSolicitud == "Aprobada" ? "Aprobado" : "Aprobar"}
                  </button>

                  <button onClick={handleReject} className='btn btn-danger' >
                    {estadoSolicitud == "Rechazada" ? "Rechazado" : "Rechazar"}
                  </button>

                  {/* <Reject id={solicitudId.toString()} comentario={comentarioExtra} /> */}
                </div>
              </div>

            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                data-bs-dismiss="modal"
                onClick={() => {
                  clearData();
                  fetchAdmisiones
                  setTemporalId(0);
                }}
              >
                Cerrar
              </button>


            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admisiones;

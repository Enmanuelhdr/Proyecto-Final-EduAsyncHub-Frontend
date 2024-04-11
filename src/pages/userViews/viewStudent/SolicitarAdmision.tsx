import React, { useState } from "react";
import axios from "axios";
import { IoMdAlert } from "react-icons/io";


function SolicitarAdmision() {
  const [datosFormulario, setDatosFormulario] = useState({
    solicitudId: 0,
    nombreEstudiante: "",
    fechaNacimiento: new Date().toISOString(),
    genero: "Masculino",
    direccionEstudiante: "",
    grado: 1,
    escuelaActual: "",
    nombrePadreTutor: "",
    relacionEstudiante: "Padre",
    direccionPadreTutor: "",
    numeroTelefono: "",
    correoElectronico: "",
    fechaHoraSolicitud: new Date().toISOString(),
    
    notasComentarios: "",
  });
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
 const mensajeTimeOut=5000;
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setDatosFormulario({
      ...datosFormulario,
      [name]: value,
    });
  };
  

  const handleSubmit = async () => {
    const {
        nombreEstudiante,
        fechaNacimiento,
        genero,
        direccionEstudiante,
        grado,
        escuelaActual,
        nombrePadreTutor,
        relacionEstudiante,
        direccionPadreTutor,
        numeroTelefono,
        correoElectronico,
        fechaHoraSolicitud,
        notasComentarios,
      } = datosFormulario;

    if (
        !nombreEstudiante ||
        !fechaNacimiento ||
        !genero ||
        !direccionEstudiante ||
        !grado ||
        !escuelaActual ||
        !nombrePadreTutor ||
        !relacionEstudiante ||
        !direccionPadreTutor ||
        !numeroTelefono ||
        !correoElectronico ||
        !fechaHoraSolicitud ||
        !notasComentarios
      ) {
        setError("Todos los campos son requeridos.");
        setTimeout(() => {
          setError("");
        }, mensajeTimeOut);
        return;
      }
    try {
        
      const response = await axios.post(
        "http://www.eduasynchub.somee.com/api/Admisiones",
        datosFormulario
      );
      console.log("Respuesta:", response);
      setTimeout(() => {
        setMensaje("");
      }, mensajeTimeOut);
      setMensaje("Solicitud enviada correctamente.");
      
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      setTimeout(() => {
        setError("");
      }, mensajeTimeOut);
      setError(
        "Ya existe una solicitud con esa direccion de correo electronico."
      );
      setMensaje("");
    }
  };

  return (
    <>
   
    
    <div className="container p-4">
      <h2 className="text-center">Formulario de Solicitud de Admisión</h2>
      
      {error && <div className="alert alert-danger d-flex justify-content-center align-items-center gap-2 " role="alert">
              <p><IoMdAlert className="fs-5" /></p> <p>{error}</p>
            </div>}
      {mensaje && <div className="alert alert-success d-flex justify-content-center align-items-center gap-2 " role="alert">
              <p><IoMdAlert className="fs-5" /></p> <p>{mensaje}</p>
            </div>}
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
            value={datosFormulario.nombreEstudiante}
            onChange={handleInputChange}
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
            value={datosFormulario.fechaNacimiento}
            onChange={handleInputChange}
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
            value={datosFormulario.genero}
            onChange={handleInputChange}
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
            value={datosFormulario.direccionEstudiante}
            onChange={handleInputChange}
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
            value={datosFormulario.grado}
            onChange={handleInputChange}
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
            value={datosFormulario.escuelaActual}
            onChange={handleInputChange}
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
            value={datosFormulario.nombrePadreTutor}
            onChange={handleInputChange}
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
            value={datosFormulario.relacionEstudiante}
            onChange={handleInputChange}
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
            value={datosFormulario.direccionPadreTutor}
            onChange={handleInputChange}
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
            value={datosFormulario.numeroTelefono}
            onChange={handleInputChange}
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
            value={datosFormulario.correoElectronico}
            onChange={handleInputChange}
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
            value={datosFormulario.fechaHoraSolicitud}
            onChange={handleInputChange}
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
            value={datosFormulario.notasComentarios}
            onChange={handleInputChange}
            placeholder="Notas o comentarios"
          />
        </div>
        <button
          type="button"
          className="btn btn-success"
          onClick={handleSubmit}
        >
          Enviar Solicitud
        </button>
      </form>
    </div>

    </>
  );
}

export default SolicitarAdmision;

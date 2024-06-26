import React, { useState } from "react";

const AddUserForm: React.FC = () => {
  const initialFormData = {
    nombre: "",
    correoElectronico: "",
    contraseña: "",
    rolID: "1",
    gradoId: "1",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); 
  const [errorMessage, setErrorMessage] = useState<string | null>(null); 

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
    if(formData.contraseña.length < 8){
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

        setFormData(initialFormData); 
      } else {
        throw new Error("Error al añadir usuario");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al añadir usuario");
    }
  };

  const handleClearForm = () => {
    setFormData(initialFormData);
  };

  return (
    <div>
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
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            placeholder="Nombre completo"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
      

      
          <label htmlFor="correoElectronico" className="form-label">
            Correo Electrónico
          </label>
          <input
            type="email"
            className="form-control"
            id="correoElectronico"
            name="correoElectronico"
            placeholder="ejemplo@gmail.com"
            value={formData.correoElectronico}
            onChange={handleChange}
            required
          />
 
          <label htmlFor="contraseña" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="contraseña"
            name="contraseña"
            placeholder="Contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            required
          />

          <label htmlFor="rolID" className="form-label">
            Rol
          </label>
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

          <label htmlFor="gradoId" className="form-label">
            Grado
          </label>
          <select
            className="form-select"
            name="gradoId"
            id="gradoId"
            value={formData.gradoId}
            onChange={handleChange}
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

        <div className="form-group d-flex gap-2 mb-3 mt-4 justify-content-center">
          <button type="submit" className="btn btn-primary ">
            Añadir Usuario
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleClearForm}
          >
            Limpiar Campos
          </button>

        </div>
      </form>
    </div>
  );
};

export default AddUserForm;

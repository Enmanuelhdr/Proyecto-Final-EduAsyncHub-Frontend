import React, { useState } from "react";

const AddUserForm: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    correoElectronico: "",
    contraseña: "",
    rolID: "1",
    gradoId: "1", 
  });

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
    try {
      const response = await fetch(
        `https://localhost:7152/api/User/RegistrarUsuarios?gradoId=${formData.gradoId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
    
        alert("Usuario añadido correctamente");
        setFormData({
          nombre: "",
          correoElectronico: "",
          contraseña: "",
          rolID: "1",
          gradoId: "1", 
        });


        
      } else {
        throw new Error("Error al añadir usuario");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al añadir usuario");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">
          Nombre
        </label>
        <input
          type="text"
          className="form-control"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
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
          value={formData.correoElectronico}
          onChange={handleChange}
          required
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
          value={formData.contraseña}
          onChange={handleChange}
          required
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
      <button type="submit" className="btn btn-primary">
        Añadir Usuario
      </button>
    </form>
  );
};

export default AddUserForm;

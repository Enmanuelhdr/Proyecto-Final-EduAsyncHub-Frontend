import React, { useState } from 'react';

const AddUserForm: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correoElectronico: '',
    contraseña: '',
    rolID: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://localhost:7152/api/User/RegistrarUsuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Usuario añadido correctamente');
        setFormData({
          nombre: '',
          correoElectronico: '',
          contraseña: '',
          rolID: 0
        });
      } else {
        throw new Error('Error al añadir usuario');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al añadir usuario');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">Nombre</label>
        <input type="text" className="form-control" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label htmlFor="correoElectronico" className="form-label">Correo Electrónico</label>
        <input type="email" className="form-control" id="correoElectronico" name="correoElectronico" value={formData.correoElectronico} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label htmlFor="contraseña" className="form-label">Contraseña</label>
        <input type="password" className="form-control" id="contraseña" name="contraseña" value={formData.contraseña} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label htmlFor="rolID" className="form-label">Rol ID</label>
        <input type="number" className="form-control" id="rolID" name="rolID" value={formData.rolID} onChange={handleChange} required />
      </div>
      <button type="submit" className="btn btn-primary">Añadir Usuario</button>
    </form>
  );
};

export default AddUserForm;
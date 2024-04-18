import React, { useState } from "react";

interface Props {
    onAddUser: () => void; // Definición de la función que se ejecutará después de agregar un usuario
}

const ModalAgregarUsuario: React.FC<Props> = ({ onAddUser }) => {
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
        onAddUser();
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
    <div className="modal-dialog">
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

        <div className="modal-content">
        
            <div className="modal-header">
                <h4 className="modal-title">Agregar Usuario</h4>
                <button 
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => {
                            
                    }}
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
                            onClick={() => {

                            }}
                        >Agregar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
};

export default ModalAgregarUsuario;

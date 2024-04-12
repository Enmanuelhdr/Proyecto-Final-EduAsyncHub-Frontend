import React, { useState } from "react";

interface Props {
    onAddEvent: () => void; // Definición de la función que se ejecutará después de agregar un usuario
}

const ModalAgregarNoticia: React.FC<Props> = ({ onAddEvent }) => {
  const initialFormData = {
    id: 0,
    img: "",
    title: "",
    date: "",
    description: "",
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
    if(formData.title.length < 46){
      setErrorMessage("Debe escribir un título más corto");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      return;
    }

    try {
      const response = await fetch(
        "http://www.eduasynchub.somee.com/api/Noticias/AgregarNoticia",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setSuccessMessage("Noticia añadida correctamente");
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);

        setFormData(initialFormData); 
        onAddEvent();
      } else {
        throw new Error("Error al añadir noticia");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al añadir noticia");
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
                <h4 className="modal-title">Agregar Noticia</h4>
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
                        <label className="mb-2 fw-bold">Título</label>
                        <input  
                            type="text"
                            className="form-control"
                            required
                            id="title"
                            name="title"
                            placeholder="Título de la noticia"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group mb-2">
                        <label className="mb-2 fw-bold">Fecha</label>
                        <input
                            type="text"
                            className="form-control"
                            id="date"
                            name="date"
                            required
                            value={formData.date}
                            onChange={handleChange}
                        />
                        <p className="text-muted">Ejemplo: 14 de febrero de 2024</p>
                    </div>

                    <div className="form-group mb-2">
                        <label className="mb-2 fw-bold">Imagen</label>
                        <input
                            type="text"
                            className="form-control"
                            required
                            id="img"
                            name="img"
                            placeholder="URL de la imagen"
                            value={formData.img}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group mb-2">
                        <label className="mb-2 fw-bold">Contenido</label>
                        <input
                            type="text"
                            className="form-control"
                            required
                            id="description"
                            name="description"
                            placeholder="Contenido de la noticia"
                            value={formData.description}
                            onChange={handleChange}
                        />
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

export default ModalAgregarNoticia;

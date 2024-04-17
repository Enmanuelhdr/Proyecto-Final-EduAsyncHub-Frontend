import React, { useState } from 'react';
// import Cookies from "universal-cookie";
// import { jwtDecode } from "jwt-decode";
import NavBar from "../../../components/NavBar";
import navData from "../../../data/AdminNavbard.json";
import { FaPlus } from "react-icons/fa";
import Foros from '../../../components/Foros';

const ForumAdmin: React.FC = () => {
    const initialFormData = {
        nombre: "",
        fecha: "",
    };

    // const [userName, setUserName] = useState("");
    // const [nameId, setNameId] = useState("");
    const [formData, setFormData] = useState(initialFormData);
    // const cookies = new Cookies();


    // const handleSubmit = async () => {
    //     try {
    //         const response = await axios.post(
    //             "http://www.eduasynchub.somee.com/api/Salas",
    //             {
    //                 nombre: nombre,
    //                 fecha: fecha,
    //             }
    //         );

    //         console.log("Sala agregada correctamente", response);
    //         clearData();

    //     } catch (error) {
    //         console.error("Error al agregar la actividad:", error);
    //     }
    // };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(
                "http://www.eduasynchub.somee.com/api/Salas",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );
            console.log("hola")
            console.log(response);
            if (response.ok) {
                console.log("Sala agregada correctamente", response);
                setFormData(initialFormData);
                handleCloseModal(); // Llama a la función para cerrar el modal
                window.location.reload();
            } else {
                throw new Error("Error al añadir sala");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error al añadir sala");
        }
    };

    const handleCloseModal = () => {
        // Código para cerrar el modal
        const modal = document.getElementById('modalAgregar');
        if (modal) {
            modal.classList.remove('show');
            modal.style.display = 'none';
        }
        const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
        if (modalBackdrop) {
            modalBackdrop.remove();
        }
    };

    // useEffect(() => {
    //     const token = cookies.get('token');
    //     const userName = cookies.get('userName');
    //     const userId = cookies.get;
    //     setUserName(userName);
    //     setNameId(userId);
    //     if (token) {
    //         const decodedToken = jwtDecode(token) as { role: string, nameid: string, UserName: string };
    //         setUserName(decodedToken.UserName);
    //         setNameId(decodedToken.nameid);
    //     }
    // }, []);

    return (
        <>
            <>
                <NavBar brand="Panel Admin" goto="/dashboardAdministrador" navData={navData} />

                <div className="container-fluid" style={{ backgroundColor: '#e8e8e8', minHeight: '100vh' }}>
                    <div className='row p-3 bg-white'>
                        <div className="col-12 col-md-6 mb-2 mb-md-0 d-flex align-items-center"> {/* Columna para el título */}
                            <h3 className='fw-bold m-0'>Foro Escolar</h3>
                        </div>
                        <div className="col-sm-12 col-12 col-md-6 mb-2 mb-md-0 d-flex justify-content-end"> {/* Columna para el botón */}
                            <button
                                type="button"
                                className="btn btn-success align-end"
                                data-bs-toggle="modal"
                                data-bs-target="#modalAgregar"
                            >
                                <FaPlus className="me-2" />
                                Agregar
                            </button>
                        </div>
                    </div>

                    <Foros />

                </div>

                {/* Modal para Agregar */}
                <div className="modal fade" id="modalAgregar" aria-labelledby="modalAgregarLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="modalAgregarLabel">
                                    Agregar Foro
                                </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="nombre" className="form-label">
                                        Título:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nombre"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
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
                                        name="fecha"
                                        value={formData.fecha}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                    Cancelar
                                </button>
                                <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                                    Agregar Foro
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </>

        </>
    );
}

export default ForumAdmin;
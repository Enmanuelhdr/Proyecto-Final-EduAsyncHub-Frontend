import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { FaPlus, FaPencilAlt, FaTrashAlt, FaEye } from "react-icons/fa";
import { CgDanger } from "react-icons/cg";
import ModalAgregarNoticia from "./ModalAgregarNoticia";

function NewsTable() {
    interface Noticia {
        id: number;
        img: string;
        title: string;
        date: string;
        description: string;
    }

    const [temporalNew, setTemporalNew] = useState<Noticia | null>(null);
    const [news, setNews] = useState<Noticia[]>([]);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [temporalNewTitle, setTemporalNewTitle] = useState("");
    const [temporalNewId, setTemporalNewId] = useState(0);
    const [temporalNewDate, setTemporalNewDate] = useState("");
    const [temporalNewDescription, setTemporalNewDescription] = useState("");
    const [temporalNewImage, setTemporalNewImage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [fetchNewsTrigger, setFetchNewsTrigger] = useState(false);
    const cookies = new Cookies();


    const fetchNews = async () => {
        try {
            const token = cookies.get("token");
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const response = await axios.get(
                "http://www.eduasynchub.somee.com/api/Noticias/VerNoticias"
            );
            setNews(response.data);
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    };

    useEffect(() => {
        fetchNews();
    }, [fetchNewsTrigger]);


    const handleAddNew = () => {
        // funcion pa cuando se agregue una nueva noticia
        setFetchNewsTrigger(prevState => !prevState);
    };

    const deleteNew = (id: number) => {
        axios
            .delete(`http://www.eduasynchub.somee.com/api/Noticias/EliminarNoticia/${id}`
            )
            .then(() => {
                fetchNews();
            })
            .catch((error) => {
                console.error("Error al eliminar la noticia:", error);
            });
    };


    const editNew = async (editedNew: Noticia) => {
        try {
            const token = cookies.get("token");
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const response = await axios.put(
                `http://www.eduasynchub.somee.com/api/Noticias/EditarNoticia/${editedNew.id}`,
                editedNew
            );
            console.log("Noticia editada con éxito", response);
            fetchNews();
            setSuccessMessage("Noticia editada con éxito");
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
        } catch (error) {
            console.error("Error al editar la noticia:", error);
        }
    };

    const handleEditModal = (noticia: Noticia) => {
        setTemporalNew(noticia);
    }


    const handleEditSubmit = () => {
        if (temporalNew) {
            editNew(temporalNew);
            setTemporalNew(null);
        }
    };

    const filteredNews = news.filter((noticia) =>
        noticia.id.toString().includes(searchTerm)
    );

    return (
        <div className="row gap-3">
            {successMessage && (
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
            )}

            <div className="container">
                <div className="pt-3">
                    <div className="row align-items-center justify-content-end">
                        <div className="col-12 col-md-6 mb-2 mb-md-0 order-md-1">
                            <h3>Gestión de <b>Noticias</b></h3>
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
                                <th className="sticky-th">Id</th>
                                <th className="sticky-th">Titulo</th>
                                <th className="sticky-th">Imagen</th>
                                <th className="sticky-th">Fecha</th>
                                <th className="sticky-th">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredNews.map((noticia) => (
                                <tr key={noticia.id}>
                                    <th scope="row">{noticia.id}</th>
                                    <td>{noticia.title}</td>
                                    <td>
                                        <a href={noticia.img} target="_blank">{noticia.img}</a>
                                        <br></br>
                                        <img src={noticia.img} className="rounded-3 img-thumbnail" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                    </td>
                                    <td>{noticia.date}</td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="Acciones">
                                            {/* Boton de editar */}
                                            <button
                                                type="button"
                                                className="btn"
                                                data-toggle="tooltip"
                                                title="Editar"
                                                data-bs-toggle="modal"
                                                data-bs-target="#modalEdit"
                                                onClick={() => {
                                                    handleEditModal(noticia);
                                                }}
                                            >
                                                <FaPencilAlt className="color-primary" style={{ color: "#005e93" }} />
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
                                                    setTemporalNewId(noticia.id);
                                                    setTemporalNewTitle(noticia.title);
                                                    setTemporalNewDescription(noticia.description);
                                                    setTemporalNewImage(noticia.img);
                                                    setTemporalNewDate(noticia.date);
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
                                                    setTemporalNewId(noticia.id);
                                                    setTemporalNewTitle(noticia.title);
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
                <ModalAgregarNoticia onAddEvent={handleAddNew} />

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
                                <h4 className="modal-title">Editar Noticia</h4>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => {
                                        setTemporalNew(null);
                                        setTemporalNewId(0);
                                        setTemporalNewTitle("");
                                        setTemporalNewDescription("");
                                        setTemporalNewImage("");
                                        setTemporalNewDate("");
                                    }}
                                ></button>
                            </div>
                            {temporalNew && (
                                <div className="modal-body">
                                    <div className="form-group mb-2">
                                        <label className="mb-2 fw-bold">Título</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            required
                                            id="title"
                                            name="title"
                                            defaultValue={temporalNew.title}
                                            onChange={(e) => setTemporalNew({
                                                ...temporalNew,
                                                title: e.target.value,
                                            })}
                                        />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label htmlFor="date" className="form-label">
                                            Fecha:
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="date"
                                            defaultValue={temporalNew.date}
                                            onChange={(e) => setTemporalNew({
                                                ...temporalNew,
                                                date: e.target.value,
                                            })}
                                        />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label className="mb-2 fw-bold">Contenido</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="description"
                                            name="description"
                                            required
                                            defaultValue={temporalNew.description}
                                            onChange={(e) => setTemporalNew({
                                                ...temporalNew,
                                                description: e.target.value,
                                            })}
                                        />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label className="mb-2 fw-bold">Imagen</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="img"
                                            name="img"
                                            required
                                            defaultValue={temporalNew.img}
                                            onChange={(e) => setTemporalNew({
                                                ...temporalNew,
                                                img: e.target.value,
                                            })}
                                        />
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
                                        setTemporalNew(null);
                                        setTemporalNewId(0);
                                        setTemporalNewTitle("");
                                        setTemporalNewDescription("");
                                        setTemporalNewImage("");
                                        setTemporalNewDate("");
                                    }}
                                />
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    data-bs-dismiss="modal"
                                    onClick={() => {
                                        handleEditSubmit();
                                        setTemporalNew(null);
                                        setTemporalNewId(0);
                                        setTemporalNewTitle("");
                                        setTemporalNewDescription("");
                                        setTemporalNewImage("");
                                        setTemporalNewDate("");
                                    }}
                                >Guardar</button>
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
                            <h4 className="modal-title">Información de la Noticia</h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => {
                                    setTemporalNew(null);
                                    setTemporalNewId(0);
                                    setTemporalNewTitle("");
                                    setTemporalNewDescription("");
                                    setTemporalNewImage("");
                                    setTemporalNewDate("");
                                }}
                            ></button>

                        </div>

                        <div className="modal-body">
                            <div className="form-group mb-2">
                                <label className="mb-2 fw-bold">ID</label>
                                <p>{temporalNewId}</p>
                            </div>
                            <div className="form-group mb-2">
                                <label className="mb-2 fw-bold">Título</label>
                                <p>{temporalNewTitle}</p>
                            </div>
                            <div className="form-group mb-2">
                                <label className="mb-2 fw-bold">Fecha</label>
                                <p>{temporalNewDate}</p>
                            </div>
                            <div className="form-group mb-2">
                                <label className="mb-2 fw-bold">Imagen</label>
                                <img src={temporalNewImage} loading='lazy' className="rounded-3 w-100" />
                            </div>
                            <div className="form-group mb-2">
                                <label className="mb-2 fw-bold">Contenido:</label>
                                <p>{temporalNewDescription.length > 100 ? temporalNewDescription.slice(0, 100) + "..." : temporalNewDescription}</p>

                            </div>

                        </div>

                        <div className="modal-footer">
                            <input
                                type="button"
                                className="btn btn-default"
                                data-bs-dismiss="modal"
                                value="Cancelar"
                                onClick={() => {
                                    setTemporalNew(null);
                                    setTemporalNewId(0);
                                    setTemporalNewTitle("");
                                    setTemporalNewDescription("");
                                    setTemporalNewImage("");
                                    setTemporalNewDate("");
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
                            <h4 className="modal-title">¿Desea eliminar esta noticia?</h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => {
                                    setTemporalNew(null);
                                    setTemporalNewId(0);
                                    setTemporalNewTitle("");
                                    setTemporalNewDescription("");
                                    setTemporalNewImage("");
                                    setTemporalNewDate("");
                                }}
                            ></button>

                        </div>

                        <div className="modal-body">
                            <div className="alert alert-danger d-flex align-items-center" role="alert">
                                <CgDanger className="flex-shrink-0 me-2" style={{ color: "red", fontSize: "24px" }} />
                                <div className="pl-5">
                                    Al realizar esta acción se eliminará permanentemente la noticia y no se podrá deshacer.
                                </div>
                            </div>
                            <div className="form-group mb-2">
                                <label className="mb-2 fw-bold">ID</label>
                                <p>{temporalNewId}</p>
                            </div>
                            <div className="form-group mb-2">
                                <label className="mb-2 fw-bold">Título</label>
                                <p>{temporalNewTitle}</p>
                            </div>
                            <div className="form-group mb-2">
                                <label className="mb-2 fw-bold">Fecha</label>
                                <p>{temporalNewDate}</p>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <input
                                type="button"
                                className="btn btn-default"
                                data-bs-dismiss="modal"
                                value="Cancelar"
                                onClick={() => {
                                    setTemporalNew(null);
                                    setTemporalNewId(0);
                                    setTemporalNewTitle("");
                                    setTemporalNewDescription("");
                                    setTemporalNewImage("");
                                    setTemporalNewDate("");
                                }}
                            />
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                                onClick={() => {
                                    deleteNew(temporalNewId);
                                    setTemporalNew(null);
                                    setTemporalNewId(0);
                                    setTemporalNewTitle("");
                                    setTemporalNewDescription("");
                                    setTemporalNewImage("");
                                    setTemporalNewDate("");
                                }}
                            >Eliminar</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewsTable;
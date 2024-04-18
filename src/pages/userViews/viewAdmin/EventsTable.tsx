import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { FaPlus, FaPencilAlt, FaTrashAlt, FaEye } from "react-icons/fa";
import { CgDanger } from "react-icons/cg";
import ModalAgregarEvento from "./ModalAgregarEvento";

function EventsTable() {
    interface Event {
        id: number;
        img: string;
        title: string;
        date: string;
        description: string;
    }

    const [temporalEvent, setTemporalEvent] = useState<Event | null>(null);
    const [events, setEvents] = useState<Event[]>([]);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [temporalEventTitle, setTemporalEventTitle] = useState("");
    const [temporalEventId, setTemporalEventId] = useState(0);
    const [temporalEventDate, setTemporalEventDate] = useState("");
    const [temporalEventDescription, setTemporalEventDescription] = useState("");
    const [temporalEventImage, setTemporalEventImage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [fetchEventsTrigger, setFetchEventsTrigger] = useState(false);
    const cookies = new Cookies();


    const fetchEvents = async () => {
        try {
            const token = cookies.get("token");
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const response = await axios.get(
                "http://www.eduasynchub.somee.com/api/Evento/VerEvento"
            );
            setEvents(response.data);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [fetchEventsTrigger]);


    const handleAddEvent = () => {
        // funcion pa cuando se agregue un nuevo evento
        setFetchEventsTrigger(prevState => !prevState);
    };

    const deleteEvent = (id: number) => {
        axios
            .delete(`http://www.eduasynchub.somee.com/api/Evento/EliminarEvento/${id}`
            )
            .then(() => {
                fetchEvents();
            })
            .catch((error) => {
                console.error("Error al eliminar el evento:", error);
            });
    };


    const editEvent = async (editedEvent: Event) => {
        try {
            const token = cookies.get("token");
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const response = await axios.put(
                `http://www.eduasynchub.somee.com/api/Evento/EditarEvento/${editedEvent.id}`,
                editedEvent
            );
            console.log("Evento editado con éxito", response);
            fetchEvents();
            setSuccessMessage("Evento editado con éxito");
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
        } catch (error) {
            console.error("Error al editar el evento:", error);
        }
    };

    const handleEditModal = (event: Event) => {
        setTemporalEvent(event);
    };

    const handleEditSubmit = () => {
        if (temporalEvent) {
            editEvent(temporalEvent);
            setTemporalEvent(null);
        }
    };

    const filteredEvents = events.filter((event) =>
        event.id.toString().includes(searchTerm)
    );

    return (
        <div className="row gap-3">
            {successMessage && (
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
            )}

            <div className="container-fluid">
                <div className="pt-3">
                    <div className="row align-items-center justify-content-end">
                        <div className="col-12 col-md-6 mb-2 mb-md-0 order-md-1">
                            <h3>Gestión de <b>Eventos</b></h3>
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
                            {filteredEvents.map((event) => (
                                <tr key={event.id}>
                                    <th scope="row">{event.id}</th>
                                    <td>{event.title}</td>
                                    <td>
                                        <a href={event.img} target="_blank">{event.img}</a>
                                        <br></br>
                                        <img src={event.img} className="rounded-3 img-thumbnail" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                    </td>
                                    <td>{event.date}</td>
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
                                                    handleEditModal(event);
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
                                                    setTemporalEventId(event.id);
                                                    setTemporalEventTitle(event.title);
                                                    setTemporalEventDescription(event.description);
                                                    setTemporalEventImage(event.img);
                                                    setTemporalEventDate(event.date);
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
                                                    setTemporalEventId(event.id);
                                                    setTemporalEventTitle(event.title);
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
                <ModalAgregarEvento onAddEvent={handleAddEvent} />

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
                                <h4 className="modal-title">Editar Evento</h4>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => {
                                        setTemporalEvent(null);
                                        setTemporalEventId(0);
                                        setTemporalEventTitle("");
                                        setTemporalEventDescription("");
                                        setTemporalEventImage("");
                                        setTemporalEventDate("");
                                    }}
                                ></button>
                            </div>
                            {temporalEvent && (
                                <div className="modal-body">
                                    <div className="form-group mb-2">
                                        <label className="mb-2 fw-bold">Título</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            required
                                            id="title"
                                            name="title"
                                            defaultValue={temporalEvent.title}
                                            onChange={(e) => setTemporalEvent({
                                                ...temporalEvent,
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
                                            defaultValue={temporalEvent.date}
                                            onChange={(e) => setTemporalEvent({
                                                ...temporalEvent,
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
                                            defaultValue={temporalEvent.description}
                                            onChange={(e) => setTemporalEvent({
                                                ...temporalEvent,
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
                                            defaultValue={temporalEvent.img}
                                            onChange={(e) => setTemporalEvent({
                                                ...temporalEvent,
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
                                        setTemporalEvent(null);
                                        setTemporalEventId(0);
                                        setTemporalEventTitle("");
                                        setTemporalEventDescription("");
                                        setTemporalEventImage("");
                                        setTemporalEventDate("");
                                    }}
                                />
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    data-bs-dismiss="modal"
                                    onClick={() => {
                                        handleEditSubmit();
                                        setTemporalEvent(null);
                                        setTemporalEventId(0);
                                        setTemporalEventTitle("");
                                        setTemporalEventDescription("");
                                        setTemporalEventImage("");
                                        setTemporalEventDate("");
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
                            <h4 className="modal-title">Información del Evento</h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => {
                                    setTemporalEvent(null);
                                    setTemporalEventId(0);
                                    setTemporalEventTitle("");
                                    setTemporalEventDescription("");
                                    setTemporalEventImage("");
                                    setTemporalEventDate("");
                                }}
                            ></button>

                        </div>

                        <div className="modal-body">
                            <div className="form-group mb-2">
                                <label className="mb-2 fw-bold">ID</label>
                                <p>{temporalEventId}</p>
                            </div>
                            <div className="form-group mb-2">
                                <label className="mb-2 fw-bold">Título</label>
                                <p>{temporalEventTitle}</p>
                            </div>
                            <div className="form-group mb-2">
                                <label className="mb-2 fw-bold">Fecha</label>
                                <p>{temporalEventDate}</p>
                            </div>
                            <div className="form-group mb-2">
                                <label className="mb-2 fw-bold">Imagen</label>
                                <img src={temporalEventImage} loading='lazy' className="rounded-3 w-100" />
                            </div>
                            <div className="form-group mb-2">
                                <label className="mb-2 fw-bold">Contenido:</label>
                                <p>{temporalEventDescription.length > 100 ? temporalEventDescription.slice(0, 100) + "..." : temporalEventDescription}</p>

                            </div>

                        </div>

                        <div className="modal-footer">
                            <input
                                type="button"
                                className="btn btn-default"
                                data-bs-dismiss="modal"
                                value="Cancelar"
                                onClick={() => {
                                    setTemporalEvent(null);
                                    setTemporalEventId(0);
                                    setTemporalEventTitle("");
                                    setTemporalEventDescription("");
                                    setTemporalEventImage("");
                                    setTemporalEventDate("");
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
                            <h4 className="modal-title">¿Desea eliminar este evento?</h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => {
                                    setTemporalEvent(null);
                                    setTemporalEventId(0);
                                    setTemporalEventTitle("");
                                    setTemporalEventDescription("");
                                    setTemporalEventImage("");
                                    setTemporalEventDate("");
                                }}
                            ></button>

                        </div>

                        <div className="modal-body">
                            <div className="alert alert-danger d-flex align-items-center" role="alert">
                                <CgDanger className="flex-shrink-0 me-2" style={{ color: "red", fontSize: "24px" }} />
                                <div className="pl-5">
                                    Al realizar esta acción se eliminará permanentemente el evento y no se podrá deshacer.
                                </div>
                            </div>
                            <div className="form-group mb-2">
                                <label className="mb-2 fw-bold">ID</label>
                                <p>{temporalEventId}</p>
                            </div>
                            <div className="form-group mb-2">
                                <label className="mb-2 fw-bold">Título</label>
                                <p>{temporalEventTitle}</p>
                            </div>
                            <div className="form-group mb-2">
                                <label className="mb-2 fw-bold">Fecha</label>
                                <p>{temporalEventDate}</p>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <input
                                type="button"
                                className="btn btn-default"
                                data-bs-dismiss="modal"
                                value="Cancelar"
                                onClick={() => {
                                    setTemporalEvent(null);
                                    setTemporalEventId(0);
                                    setTemporalEventTitle("");
                                    setTemporalEventDescription("");
                                    setTemporalEventImage("");
                                    setTemporalEventDate("");
                                }}
                            />
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                                onClick={() => {
                                    deleteEvent(temporalEventId);
                                    setTemporalEvent(null);
                                    setTemporalEventId(0);
                                    setTemporalEventTitle("");
                                    setTemporalEventDescription("");
                                    setTemporalEventImage("");
                                    setTemporalEventDate("");
                                }}
                            >Eliminar</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventsTable;
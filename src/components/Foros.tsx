import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaInfo } from "react-icons/fa";
import io from 'socket.io-client';
import Chat from './Chat';
import Cookies from 'universal-cookie';

const socket = io("https://backend-chat-en-tiempo-real-dev-haxk.4.us-1.fl0.io");

// interface ForosProps {
//     userName: string;
//     nameId: string;
//     role: string;
// }

function Foros() {

    interface Foro {
        id: number;
        nombre: string;
        fecha: string;
    }

    const [room, setRoom] = useState("");
    const [foros, setForos] = useState<Foro[]>([]);
    const cookies = new Cookies();
    // const [nameId, setNameId] = useState("");
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState<number>(0);
    const [showChat, setShowChat] = useState(false);
    const [totalMensajes, setTotalMensajes] = useState<number>(0);
    // const numberUserId = parseInt(props.nameId.split('-')[1]);

    const fetchForos = () => {
        axios
            .get(
                "http://www.eduasynchub.somee.com/api/Salas",
                {
                    timeout: 2000 // 5 segundos de tiempo de espera
                }
            )
            .then((response) => {
                setForos(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    const fetchTotalMensajes = async (userId: number) => {
        try {
            const response = await axios.get(`https://backend-chat-en-tiempo-real-dev-haxk.4.us-1.fl0.io/mensaje/${userId}`);
            const totalMensajesData = response.data.mensajes.length;
            setTotalMensajes(totalMensajesData);
        } catch (error) {
            console.error("Error fetching total mensajes:", error);
        }
    };

    useEffect(() => {
        // const token = cookies.get('token');
        const userName = cookies.get('userName');
        const codigoUser = cookies.get('userId');
        setUserName(userName);
        setUserId(parseInt(codigoUser.split('-')[1]));
        // setNameId(codigoUser);

        fetchForos();
    }, [cookies]);

    useEffect(() => {
        if (userId !== 0) {
            fetchTotalMensajes(userId);
        }
    }, [userId]);

    const getBorderColor = (index: number): string => {
        const colors = ['border-warning', 'border-danger', 'border-success', 'border-info'];
        return colors[index % colors.length];
    };

    const joinRoom = (card: Foro) => {
        if (userName !== "" && card.nombre !== "") {
            setRoom(card.nombre);
            socket.emit("join__room", room);
            setShowChat(true);

        }

    }

    const totalForos = foros.length;

    return (
        <div className="container-fluid" style={{ backgroundColor: '#e8e8e8', minHeight: showChat ? '100vh' : 'auto', maxHeight: showChat ? '100vh' : 'auto' }}>
            <div className='row mt-3'>
                {!showChat ?
                    <div className='col-xl-10 col-lg-10 col-md-12 col-sm-12'>
                        {foros.map((card, index) => (
                            <div
                                key={card.id}
                                className={`card row-hover pos-relative py-3 px-3 mb-3 border border-4 ${getBorderColor(index)} border-top-0 border-bottom-0`}
                            >
                                <div className="row align-items-center">
                                    <div className="col-md-8 mb-3 mb-sm-0">
                                        <h4 className='text-primary'>{card.nombre}</h4>
                                        <p className="text-sm">
                                            <small className="text-muted">Publicado</small>
                                            <small className="text-muted"> {card.fecha}</small>
                                        </p>
                                        <button className="btn btn-primary" onClick={() => joinRoom(card)}>Unirse a la Sala</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    :
                    <Chat userName={userName} room={room} userId={userId} />
                }
                <div className='col-xl-2 col-lg-2 col-md-12 col-sm-12'>
                    <div className="card shadow-sm bg-light text-sm mb-2">
                        <div className="px-3 py-3 d-flex align-items-center">
                            <FaInfo className="text-primary" style={{ fontSize: '1.25em' }} />
                            <h5 className="ps-2 m-0 fw-bold">Información</h5>
                        </div>
                        <hr className="my-0" />
                        <div className="px-3 py-3">
                            <h6 className="m-0 fw-bold py-2">Acerca de Nuevos Foros</h6>
                            <p className="m-0 pb-2">Si eres estudiante y deseas comenzar un nuevo tema, debes comunicarte con un maestro para realizar la solicitud.</p>
                            <h6 className="m-0 fw-bold">Lenguaje Formal</h6>
                            <p className="m-0 pb-2">
                                Evita palabras ofensivas o inapropiadas.</p>
                        </div>
                    </div>
                    <div className="card shadow-sm bg-light text-sm mb-2">
                        <h5 className="px-3 py-3 m-0 fw-bold">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-bar-chart-2 me-2 text-primary"
                            >
                                <line x1="18" y1="20" x2="18" y2="10"></line>
                                <line x1="12" y1="20" x2="12" y2="4"></line>
                                <line x1="6" y1="20" x2="6" y2="14"></line>
                            </svg>
                            Estadísticas
                        </h5>
                        <hr className="my-0" />
                        <div className="row text-center d-flex flex-row mx-0">
                            <div className="col-sm-7 flex-ew text-center py-3 border-bottom border-right">
                                <p className='d-block fw-bold mt-0 mb-0' style={{ fontSize: '0.8rem' }}>Total de Foros</p>
                            </div>
                            <div className="col-sm-5 flex-ew text-center py-3 border-bottom border-right">
                                <p className='d-block fw-bold text-danger mt-0 mb-0' style={{ fontSize: '0.8rem' }}>{totalForos}</p>
                            </div>
                        </div>
                        <div className="row d-flex flex-row">
                            <div className="col-sm-7 flex-ew text-center py-3 border-bottom border-right">
                                <p className='d-block fw-bold mt-0 mb-0' style={{ fontSize: '0.8rem' }}>Mis Mensajes</p>
                            </div>
                            <div className="col-sm-5 flex-ew text-center py-3 border-bottom border-right">
                                <p className='d-block fw-bold text-success mt-0 mb-0' style={{ fontSize: '0.8rem' }}>{totalMensajes}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Foros;

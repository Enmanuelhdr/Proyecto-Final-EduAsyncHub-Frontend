import { useState } from 'react';
// import axios from 'axios';
// import Cookies from "universal-cookie";
import { BiCommentDetail } from "react-icons/bi";
import { FaInfo } from "react-icons/fa";
import jsonData from "../data/Salas.json";
import io from 'socket.io-client';
import Chat from './Chat';

const socket = io("https://backend-chat-en-tiempo-real-dev-haxk.4.us-1.fl0.io");

interface ForosProps {
    userName: string;
    nameId: string;
    role: string;
}

interface CardData {
    id: number;
    title: string;
    published: string;
    comments: number;
}

function Foros(props: ForosProps) {
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);
    const [cardData] = useState<CardData[]>(jsonData);

    // Función para determinar el color del borde según la cantidad de elementos
    const getBorderColor = (index: number): string => {
        const colors = ['border-warning', 'border-danger', 'border-success', 'border-info'];
        return colors[index % colors.length];
    };

    const joinRoom = (card: CardData) => {
        if (props.userName !== "" && card.title !== "") {
            setRoom(card.title);
            socket.emit("join__room", room);
            setShowChat(true);

        }

    }

    return (
        <div className="container-fluid" style={{ backgroundColor: '#e8e8e8', minHeight: '100vh' }}>
            <div className='row mt-3'>
                {!showChat ?
                    <div className='col-xl-10 col-lg-10 col-md-12 col-sm-12'>
                        {/* Renderizar las cards */}
                        {cardData.map((card, index) => (
                            <div
                                key={card.id}
                                className={`card row-hover pos-relative py-3 px-3 mb-3 border border-4 ${getBorderColor(index)} border-top-0 border-bottom-0`}
                            >
                                <div className="row align-items-center">
                                    <div className="col-md-8 mb-3 mb-sm-0">
                                        <h4 className='text-primary'>{card.title}</h4>
                                        <p className="text-sm">
                                            <small className="text-muted">Publicado</small>
                                            <small className="text-muted"> hace 20 minutos</small>
                                        </p>
                                        <button className="btn btn-primary" onClick={() => joinRoom(card)}>Unirse a la Sala</button>
                                    </div>
                                    <div className="col-md-4 op-7">
                                        <div className="row text-center op-7">
                                            <div className="col px-1"></div>
                                            <div className="col px-1"></div>
                                            <div className="col px-1 gray-icon">
                                                <BiCommentDetail /><span className="d-block text-sm text-muted">{card.comments} Mensajes</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    :
                    <Chat userName={props.userName} room={room} userId={props.nameId} />
                }
                <div className='col-xl-2 col-lg-2 col-md-12 col-sm-12'>

                    <div className="card shadow-sm bg-light text-sm mb-2">
                        <div className="px-3 py-4 d-flex align-items-center">
                            <FaInfo className="text-primary" style={{ fontSize: '1.25em' }} />
                            <h5 className="ps-2 m-0 fw-bold">Información</h5>
                        </div>
                        <hr className="my-0" />
                        <div className="px-3 py-2">
                            <h6 className="m-0 fw-bold py-2">Acerca de Nuevos Foros</h6>
                            <p className="m-0 pb-2">Si eres estudiante y deseas comenzar un nuevo tema, debes comunicarte con un maestro para realizar la solicitud.</p>
                        </div>
                    </div>

                    <div className="card shadow-sm bg-light text-sm mb-2">
                        <h5 className="px-3 py-4 m-0 fw-bold">
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
                            <div className="col-sm-7 flex-ew text-center py-4 border-bottom border-right">
                                <p className='d-block fw-bold mt-0 mb-0'>Total de Foros</p>
                            </div>
                            <div className="col-sm-5 flex-ew text-center py-4 border-bottom border-right">
                                <p className='d-block fw-bold text-danger mt-0 mb-0'>58</p>
                            </div>

                        </div>
                        <div className="row d-flex flex-row">
                            <div className="col-sm-7 flex-ew text-center py-4 border-bottom border-right">
                                <p className='d-block fw-bold mt-0 mb-0'>Mis Mensajes</p>
                            </div>
                            <div className="col-sm-5 flex-ew text-center py-4 border-bottom border-right">
                                <p className='d-block fw-bold text-success mt-0 mb-0'>58</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Foros;
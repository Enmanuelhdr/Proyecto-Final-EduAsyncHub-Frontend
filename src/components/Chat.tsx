import { useEffect, useState } from 'react';
import io from 'socket.io-client';

interface ForosProps {
    userName: string;
    userId: number;
    room: string;
}

interface MessageInfo {
    message: string;
    room: string;
    author: string;
    userId: number;
    time: string;
}

const Chat = ({ userName, room, userId }: ForosProps) => {
    const [currentMessage, setCurrentMessage] = useState<string>("");
    const [messagesList, setMessagesList] = useState<MessageInfo[]>([]);
    const [socket, setSocket] = useState<any>(null);
    // const numberUserId = parseInt(userId.split('-')[1]);

    const fetchMessages = async () => {
        try {
            const response = await fetch(`https://backend-chat-en-tiempo-real-dev-haxk.4.us-1.fl0.io/sala/${room}`);
            const data = await response.json();
            if (data.mensajes) {
                setMessagesList(data.mensajes);
            } else {
                console.log("");
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    useEffect(() => {
        console.log(messagesList);
        // Conectarse al servidor de socket
        const newSocket = io("https://backend-chat-en-tiempo-real-dev-haxk.4.us-1.fl0.io");
        setSocket(newSocket);

        // Unirse a la sala cuando se establezca la conexión
        if (room && newSocket) {
            newSocket.emit("join__room", room);
            // setCurrentUser(userId);
        }

        fetchMessages();

        // Manejar mensajes recibidos
        const messageHandle = (data: MessageInfo) => {
            setMessagesList((list) => [...list, data]);
        };
        newSocket.on("recieve_message", messageHandle);

        // Limpiar efectos
        return () => {
            newSocket.off("recieve_message", messageHandle);
            newSocket.disconnect();
        };

    }, [room, userId]);



    const formatTime = (date: Date): string => {
        const hours = padZero(date.getHours());
        const minutes = padZero(date.getMinutes());
        return ` ${hours}:${minutes}`
    };

    const padZero = (num: number): string => {
        return num < 10 ? '0' + num : num.toString();
    };

    const sendMessage = async () => {


        if (userName && userId && currentMessage && room && socket) {
            const currentTime = new Date(Date.now());
            const formattedTime = formatTime(currentTime);
            const info: MessageInfo = {
                message: currentMessage,
                room: room,
                author: userName,
                userId: userId,
                time: `${formattedTime} - ${currentTime.getDate()} /${currentTime.getMonth() + 1}`
            };

            // Enviar mensaje al servidor
            await socket.emit("send_message", info);

            // Actualizar lista de mensajes localmente
            setMessagesList((list) => [...list, info]);

            // Limpiar el campo de entrada después de enviar el mensaje
            setCurrentMessage("");
        }
    };

    return (
        <div className="col-xl-10 col-lg-10 col-md-12 col-sm-12">
            <div className="card h-100 mb-3" style={{ maxHeight: '570px' }}>
                <div className="card-header bg-primary text-light fw-bold">
                    <h5 className='fw-bold'>Foro | Sala: {room}</h5>
                </div>
                <div className="card-body" style={{ backgroundColor: '#f8f9fa', maxHeight: '500px', overflowY: 'auto' }}>
                    {messagesList.map((item, i) => {
                        const isCurrentUser = userName === item.author;
                       
                        return (
                            <div key={i} className={`row mb-4 justify-content-${isCurrentUser ? 'end' : 'start'}`}>
                                <div className={`col-lg-6 col-sm-12 mb-2`}>
                                    <h5 className={`fw-bold ${isCurrentUser ? 'text-end' : 'text-start'}`}>{item.author}</h5>
                                    <div className={`card p-3 ${isCurrentUser ? 'border border-success text-justify  bg-success' : 'border border-secondary text-justify  bg-secondary'}`}>
                                        <div className="card-body">
                                            <p className="card-text text-white fs-5">{item.message}</p>
                                            <p className="card-text small text-white"><i>{item.time}</i></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="card-footer">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Escribe tu mensaje..." value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} />
                        <button className="btn btn-primary" type="button" onClick={sendMessage}>Enviar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;
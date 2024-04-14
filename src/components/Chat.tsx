import { useEffect, useState } from 'react';
import io from 'socket.io-client';

interface ForosProps {
    userName: string;
    userId: string;
    room: string;
    role: string;
}

interface MessageInfo {
    message: string;
    room: string;
    author: string;
    userId: string;
    time: string;
}

const Chat = ({ userName, room, userId, role }: ForosProps) => {
    const [currentMessage, setCurrentMessage] = useState<string>("");
    const [currentUser, setCurrentUser] = useState<string>("");
    const [messagesList, setMessagesList] = useState<MessageInfo[]>([]);
    const [socket, setSocket] = useState<any>(null);

    useEffect(() => {
        // Conectarse al servidor de socket
        const newSocket = io("https://backend-chat-en-tiempo-real-dev-haxk.4.us-1.fl0.io");
        setSocket(newSocket);

        // Unirse a la sala cuando se establezca la conexión
        if (room && newSocket) {
            newSocket.emit("join__room", room);
            setCurrentUser(userId);
        }

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
    }, [room]);

    const formatTime = (date: Date): string => {
        const hours = padZero(date.getHours());
        const minutes = padZero(date.getMinutes());
        return `${hours}:${minutes}`;
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
                time: `${formattedTime} - ${currentTime.getDate()}/${currentTime.getMonth() + 1}`
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
        <div className="col-xl-10 col-lg-10 col-md-12 col-sm-12 mb-2 overflow-auto">
            <div className="card" style={{ maxHeight: '600px' }}>
                <div className="card-header bg-primary text-light fw-bold">
                    <h5 className='fw-bold'>Foro | Sala:</h5><h5>{room}</h5>
                </div>
                <div className="card-body" style={{ backgroundColor: '#f8f9fa', maxHeight: '500px', overflowY: 'auto' }}>
                    {messagesList.map((item, i) => (
                        <div key={i} className={`message card mb-2 ${currentUser === item.userId ? 'text-end border border-success' : 'text-start border border-primary'}`}>
                            <div className="card-body">
                                <h5 className="fw-bold">{item.author}</h5>
                                <p className="card-text">{item.message}</p>
                                <p className="card-text small"><i>{item.time}</i></p>
                            </div>
                        </div>
                    ))}
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

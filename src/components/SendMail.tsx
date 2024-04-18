import React, { useState } from "react";
import axios from "axios";

interface FormData {
    email: string;
    mensaje: string;
    asunto: string;
    institucion: string;
}

const SendMail: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        mensaje: "",
        asunto: "",
        institucion: "eduasynchub@outlook.com",
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.email || !formData.mensaje || !formData.asunto) {
            alert("Por favor, llene todos los campos");
            return;
        }


        try {
            const response = await axios.post(
                "https://backend-chat-en-tiempo-real-dev-haxk.4.us-1.fl0.io/email/",
                new URLSearchParams({
                    ...formData,
                }).toString(),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            setFormData({
                email: "",
                mensaje: "",
                asunto: "",
                institucion: "eduasynchub@outlook.com"
            });

            console.log(response.data);
        } catch (error) {
            console.error("Error al enviar la solicitud:", error);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="container">
            <div className="form-group mb-4">
                <label className="form-label fw-bold fs-4" >Email:</label>
                <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Correo electrónico"
                />
            </div>
            <div className="form-group mb-4">
                <label className="form-label fw-bold fs-4">Asunto:</label>
                <input
                    type="text"
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Asunto"
                />
            </div>
            <div className="form-group mb-4">
                <label className="form-label fw-bold fs-4">Mensaje:</label>
                <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    className="form-control"
                    style={{ maxHeight: "300px", minHeight: "300px", overflowY: "auto" }}
                    placeholder="Mensaje"
                />
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-success fs-5">
                    Enviar
                </button>
            </div>
        </form>

    );
};

export default SendMail;
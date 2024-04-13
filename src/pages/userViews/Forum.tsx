import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import NavBar from "../../components/NavBar";
import navDataProfesor from "../../data/ProfesorNavbar.json";
import navDataEstudiante from "../../data/EstudianteNavbar.json";
import Foros from '../../components/Foros';

const Forum: React.FC = () => {
    const [userName, setUserName] = useState("");
    const [nameId, setNameId] = useState("");
    const [role, setRole] = useState("");

    const cookies = new Cookies();
    useEffect(() => {
        const token = cookies.get('token');
        if (token) {
            const decodedToken = jwtDecode(token) as { role: string, nameid: string, UserName: string };
            setUserName(decodedToken.UserName);
            setNameId(decodedToken.nameid);
            setRole(decodedToken.role);
        }


    }, []);

    return (
        <>
            { role === "Profesor" ? <NavBar brand='Panel Profesor' goto='/dashboardProfesor' navData={navDataProfesor}/> : <NavBar brand='Panel Estudiante' goto='/dashboardEstudiante' navData={navDataEstudiante}/>}

            <div className="container-fluid" style={{ backgroundColor: '#e8e8e8', minHeight: '100vh' }}>
                {/* Header */}
                <div className='row p-3 align-items-center bg-white'>
                    <div className="col-12 col-md-6 mb-2 mb-md-0 order-md-1">
                        <h3 className='fw-bold'>Foro Escolar</h3>
                    </div>
                    <div className="col-12 col-md-4 order-md-3"></div>
                    <div className="col-12 col-md-6 mb-2 mb-md-0 order-md-2 text-end">
                        <div className="input-group">
                            <input
                                className="form-control me-2"
                                type="text"
                                placeholder="Buscar foro por nombre"
                            // value={searchTerm}
                            // onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                </div>

                <Foros userName={userName} nameId={nameId} role={role} />

            </div>

        </>
    );
}

export default Forum;

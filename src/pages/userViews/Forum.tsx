import React, { useState, useEffect } from 'react';
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import NavBar from "../../components/NavBar";
import navDataEstudiante from "../../data/EstudianteNavbar.json";
import navDataProfesor from "../../data/ProfesorNavbar.json";
import Foros from '../../components/Foros';

const Forum: React.FC = () => {

    const [role, setRole] = useState("");
    const cookies = new Cookies();


    useEffect(() => {
        const token = cookies.get('token');
        if (token) {
            const decodedToken = jwtDecode(token) as { role: string, nameid: string, UserName: string };
            setRole(decodedToken.role);
        }
    }, []);

    return (
        <>

            {role === "Estudiante" ? (
                <NavBar brand="Panel Estudiante" goto='/dashboardEstudiante'  navData={navDataEstudiante} />
            ) : (
                <NavBar brand="Panel Profesor" goto='/dashboardProfesor'  navData={navDataProfesor} />
            )}

            <div className="container-fluid" style={{ backgroundColor: '#e8e8e8', minHeight: '100vh' }}>
                <div className='row p-3 bg-white'>
                    <div className="col-12 col-md-6 mb-2 mb-md-0 d-flex align-items-center"> {/* Columna para el título */}
                        <h3 className='fw-bold m-0 mb-2'>Foro Escolar</h3>
                    </div>
                </div>

                <Foros />

            </div>
        </>
    );
}

export default Forum;

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdAlert } from "react-icons/io";
import Cookies from "universal-cookie";

function ApiLogin({ updateUserRole }: { updateUserRole: (role: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
const cookies = new Cookies()
  const navigate = useNavigate();
  const errorTimeout = 5000;

  const clearFields = () => {
    setEmail("");
    setPassword("");
  };

  const handleNavigation = (roleId: string) => {
    clearFields();
    switch (roleId) {
      case "Estudiante":
        navigate("/dashboardEstudiante");
        break;
      case "Profesor":
        navigate("/dashboardProfesor");
        break;
      case "Administrador":
        navigate("/dashboardAdministrador");
        break;
      default:
        navigate("/login");
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://www.eduasynchub.somee.com/api/User/LoguearUsuarios",
        { correoElectronico: email, contraseña: password }
      );
  
      const token = response.data.token;
     
      cookies.set("token", token);
  
      const decodedToken = jwtDecode(token) as { role: string ,nameid:string,UserName:string}; 

      console.log(decodedToken);
      
      const roleId = decodedToken.role || "";
      const userName = decodedToken.UserName || "";
      cookies.set("userName",userName)
      cookies.set("userId",decodedToken.nameid)

      updateUserRole(roleId);
  
      handleNavigation(roleId);
    } catch (error) {
      setTimeout(() => {
        setError("");
      }, errorTimeout);
      setError("Credenciales inválidas. Por favor, revise su usuario y contraseña.");
    }
  };

  return (
    <>
      <div className="container-fluid bg-dark vh-100 d-flex justify-content-center align-items-center">
        <div className="text-white p-4">
          <h1 className="mb-4 text-center fw-bold">EduAsyncHub</h1>
          <h5 className="mb-4 text-center">
            ¡Bienvenido! Ingresa con tu correo institucional
          </h5>

          {error && (
            <div className="alert alert-danger d-flex justify-content-center align-items-center gap-2 " role="alert">
              <p><IoMdAlert className="fs-5" /></p> <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                id="email"
                value={email}
                className="form-control mb-4"
                placeholder="Correo Electrónico"
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="on"
                required
              />
              <input
                type="password"
                id="password"
                value={password}
                className="form-control mb-4"
                placeholder="Contraseña"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="on"
                required
              />
              <a href="/" className="text-white">
                Regresar a la página principal
              </a>
            </div>
            <div className="form-group mt-3">
              <button
                type="submit"
                className="btn btn-primary btn-block mb-2 w-100"
              >
                Ingresar
              </button>
            </div>
          </form>
          <hr className="text-white my-3" />
          <p className="mb-4">
            ¿No tienes una cuenta? Contacta a tu maestro o la Dirección General
          </p>
        </div>
      </div>
    </>
  );
}

export default ApiLogin;

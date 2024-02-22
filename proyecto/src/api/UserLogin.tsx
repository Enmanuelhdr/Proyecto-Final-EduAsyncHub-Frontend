import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://localhost:7152/api/User/LoguearUsuarios",
        { correoElectronico: email, contraseña: password }
      );

    
        const token = response.data.token;
        localStorage.setItem("token", token);

        // Decode the token
        const decodedToken = jwtDecode(token) as { [key: string]: string };
        console.log("Decoded token data:", decodedToken);

        // Access specific data from the decoded token if exists
        const userId = decodedToken["nameid"] || ''; // Assuming user ID is stored in 'nameid'
        const userName = decodedToken["unique_name"] || ''; // Assuming username is stored in 'unique_name'
        const roleId = decodedToken["role"] || ''; // Assuming role ID is stored in 'role'

        // Use userId, userName, and roleId as needed
        console.log("User ID:", userId);
        console.log("User Name:", userName);
        console.log("Role ID:", roleId);

        // navigate('/home'); // Redirect to the dashboard
      
    } catch (error) {
      setError("Hubo un error al procesar la solicitud.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default LoginForm;

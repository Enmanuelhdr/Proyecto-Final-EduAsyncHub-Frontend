import React, { useState } from 'react';
import NavBar from '../../common/NavBar';

interface User {
  username: string;
  password: string;
  role: 'admin' | 'teacher' | 'user';
}

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState<'admin' | 'teacher' | 'user' | ''>('');

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Definir una lista de usuarios válidos (esto es solo para demostración, en una app real usarías una base de datos u otro sistema de almacenamiento)
    const validUsers: User[] = [
      { username: 'admin', password: 'admin123', role: 'admin' },
      { username: 'teacher', password: 'teacher123', role: 'teacher' },
      { username: 'user', password: 'user123', role: 'user' }
    ];

    // Verificar si las credenciales coinciden con alguno de los usuarios válidos
    const authenticatedUser = validUsers.find(user => user.username === username && user.password === password);

    if (authenticatedUser) {
      setUserRole(authenticatedUser.role);
      console.log('Usuario autenticado con éxito. Rol:', authenticatedUser.role);
    } else {
      console.log('Error: Usuario o contraseña incorrectos.');
    }
  };

  return (
    <>
    <NavBar/>
    
    <div>
      
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {userRole && <p>Usuario autenticado con el rol: {userRole}</p>}
    </div>
    </>
  );
};

export default Login;

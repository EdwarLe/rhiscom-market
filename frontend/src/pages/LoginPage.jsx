import { useState } from 'react';
import axios from '../services/axiosConfig';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/auth/login', { username, password });
            localStorage.setItem('token', response.data);
            navigate('/');
        } catch (error) {
            console.error('Error al iniciar sesión', error);
        }
    };

    return (
        <div className="container mx-auto p-4 bg-slate-200 rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>
            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label className="block">Nombre de Usuario</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border rounded p-2 w-full outline-blue-700"
                    />
                </div>
                <div>
                    <label className="block">Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border rounded p-2 w-full outline-blue-700"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default LoginPage;
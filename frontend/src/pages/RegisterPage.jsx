import{ useState } from 'react';
import axios from '../services/axiosConfig';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('USER');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/auth/register', { username, password, role });
            console.log('Registro exitoso:', response.data);
            navigate('/login')
        } catch (error) {
            console.error('Error al registrar usuario:', error);
        }
    };

    return (
        <div className="container mx-auto p-4 bg-slate-200 rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-center">Registrar Usuario</h1>
            <form onSubmit={handleRegister} className="space-y-4">
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
                <div>
                    <label className="block">Rol</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="border rounded p-2 w-full outline-blue-700"
                    >
                        <option value="USER">Usuario</option>
                        <option value="ADMIN">Administrador</option>
                    </select>
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Registrar</button>
            </form>
        </div>
    );
};

export default RegisterPage;
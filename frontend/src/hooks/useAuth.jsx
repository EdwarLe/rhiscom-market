import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = () => {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setAuth(true);
        } else {
            setAuth(false);
        }
    }, []);

    return auth;
};

export default useAuth;
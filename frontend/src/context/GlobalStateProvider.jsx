import { useReducer, useEffect } from 'react';
import GlobalState from './GlobalState';
import axios from '../services/axiosConfig';

const initialState = {
    products: [],
    orders: []
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return { ...state, products: action.payload };
        case 'SET_ORDERS':
            return { ...state, orders: action.payload };
        default:
            return state;
    }
};

const GlobalStateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        axios.get('/productos/todos')
            .then(response => {
                dispatch({ type: 'SET_PRODUCTS', payload: response.data });
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    return (
        <GlobalState.Provider value={{ state, dispatch }}>
            {children}
        </GlobalState.Provider>
    );
};

export { GlobalState };
export default GlobalStateProvider;
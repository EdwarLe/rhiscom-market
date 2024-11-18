import { useContext, useEffect, useState } from 'react';
import GlobalState from '../context/GlobalState';
import axios from '../services/axiosConfig';

const ProductList = () => {
    const { state, dispatch } = useContext(GlobalState);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    useEffect(() => {
        axios.get(`/productos/paginados?page=${page}&size=${size}`)
            .then(response => {
                const products = response.data.content || response.data;
                dispatch({ type: 'SET_PRODUCTS', payload: products });
            })
            .catch(error => {
                console.error("Error fetching products:", error);
            });
    }, [dispatch, page, size]);

    const handleStockChange = (id, stock) => {
        axios.put(`/productos/${id}/stock`, { stock })
            .then(response => {
                dispatch({ type: 'SET_PRODUCTS', payload: state.products.map(p => p.id === id ? { ...p, stock } : p) });
            })
            .catch(error => {
                console.error("Error updating stock:", error);
            });
    };

    return (
        <div className='p-4 w-full h-full shadow-md bg-slate-100 rounded-md'>
            <h1 className='text-2xl font-bold text-center mb-4 text-blue-950'>Lista de Productos</h1>
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr className='text-white bg-blue-950 divide-x-2'>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(state.products) && state.products.map(product => (
                        <tr key={product.id} className='text-slate-700 divide-x-2 text-center'>
                            <td>{product.nombre}</td>
                            <td>{product.precio}</td>
                            <td>
                                <input
                                    type="number"
                                    value={product.stock}
                                    onChange={(e) => handleStockChange(product.id, e.target.value)}
                                    className="border rounded p-1"
                                />
                            </td>
                            <td>
                                <button onClick={() => handleStockChange(product.id, product.stock)} className='bg-blue-950 text-white px-4 py-1 hover:bg-white hover:text-blue-950 transition-colors rounded-full'>Actualizar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4 flex justify-center gap-4">
                <button onClick={() => setPage(page - 1)} disabled={page === 0} className='bg-blue-950 text-white px-4 py-2 hover:bg-white hover:text-blue-950 transition-colors rounded-full'>Anterior</button>
                <button onClick={() => setPage(page + 1)} className='bg-blue-950 text-white px-4 py-2 hover:bg-white hover:text-blue-950 transition-colors rounded-full'>Siguiente</button>
            </div>
        </div>
    );
};

export default ProductList;
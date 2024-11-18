import { useContext, useEffect, useState } from 'react';
import GlobalState from '../context/GlobalState';
import axios from '../services/axiosConfig';

const CreateOrder = () => {
    const { state } = useContext(GlobalState);
    const [order, setOrder] = useState({ productos: [] });
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [startDate, setStartDate] = useState('2024-01-01');
    const [endDate, setEndDate] = useState('2024-12-31');
    const [totalOrders, setTotalOrders] = useState([]);
    const [total, setTotal] = useState(0);

    const handleProductChange = (e, index) => {
        const newProducts = [...order.productos];
        const selectedProduct = state.products.find(p => p.id === e.target.value);
        newProducts[index] = { ...newProducts[index], id: e.target.value, nombre: selectedProduct.nombre, precio: selectedProduct.precio, stock: selectedProduct.stock };
        setOrder({ ...order, productos: newProducts });
    };

    const handleQuantityChange = (e, index) => {
        const newProducts = [...order.productos];
        const quantity = parseInt(e.target.value, 10);
        if (quantity <= newProducts[index].stock) {
            newProducts[index] = { ...newProducts[index], cantidad: quantity };
            setOrder({ ...order, productos: newProducts });
            calculateTotal(newProducts);
        } else {
            alert('La cantidad no puede superar el stock disponible');
        }
    };

    const calculateTotal = (products) => {
        const total = products.reduce((acc, product) => acc + (product.precio * product.cantidad || 0), 0);
        setTotal(total);
    };

    const handleSubmit = () => {
        axios.post('/ordenes', order)
            .then(response => {
                console.log('Orden creada:', response.data);
            });
    };

    const fetchTotalOrders = () => {
        axios.get(`/ordenes/total?page=${page}&size=${size}&startDate=${startDate}&endDate=${endDate}`)
            .then(response => {
                setTotalOrders(response.data.content);
                console.log('Total de ordenes:', response.data);
            });
    };

    useEffect(() => {
        fetchTotalOrders();
    }, [page, size, startDate, endDate]);

    return (
        <div className='p-4 w-full h-full shadow-md bg-slate-100 rounded-md overflow-y-scroll max-h[626px]'>
            <h1 className='text-2xl font-bold text-center mb-4 text-blue-950'>Crear Orden</h1>
            {order.productos.map((product, index) => (
                <div key={index} className="mb-4">
                    <select onChange={(e) => handleProductChange(e, index)} className="border rounded p-2 w-full mb-2">
                        <option value="">Seleccionar Producto</option>
                        {state.products.map(p => (
                            <option key={p.id} value={p.id}>{p.nombre}</option>
                        ))}
                    </select>
                    <input
                        type="number"
                        placeholder="Cantidad"
                        onChange={(e) => handleQuantityChange(e, index)}
                        className="border rounded p-2 w-full"
                    />
                </div>
            ))}
            <div className='flex justify-center gap-4'>
                <button onClick={() => setOrder({ ...order, productos: [...order.productos, {}] })} className="bg-blue-500 text-white p-2 rounded">Agregar Producto</button>
                <button onClick={handleSubmit} className="bg-green-500 text-white p-2 rounded">Crear Orden</button>
            </div>

            <div className="mt-4">
                <h2 className="text-xl font-bold mb-2">Total: ${total}</h2>
            </div>

            <div className="mt-4 flex justify-end items-center gap-4">
                <h2 className="text-xl font-bold mb-2 text-blue-950">Filtros</h2>
                <div className='flex gap-4'>
                    <div className="mb-2">
                        <label className="block">Fecha de Inicio</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="border rounded px-2 w-full"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block">Fecha de Fin</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="border rounded px-2 w-full"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block">Ítems por Página</label>
                        <input
                            type="number"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            className="border rounded px-2 w-full"
                        />
                    </div>
                </div>
            </div>

            <div className="mt-4 flex flex-col gap-4">
                <h2 className="text-xl font-bold mb-2 text-blue-950">Total de Órdenes</h2>
                <div className='w-full h-full shadow-md bg-slate-50 rounded-md p-2 overflow-y-scroll max-h-[256px] min-h-[256px]'>
                    <ul> 
                        {totalOrders.map(order => (
                            <li key={order.id}>{order.id} - {order.total} - {new Date(order.fecha).toLocaleDateString()}</li>
                        ))}
                    </ul>
                </div>
                <div className="flex justify-between">
                    <button onClick={() => setPage(page - 1)} disabled={page === 0} className="bg-blue-950 text-white p-2 rounded">Anterior</button>
                    <button onClick={() => setPage(page + 1)} className="bg-blue-950 text-white p-2 rounded">Siguiente</button>
                </div>
            </div>
        </div>
    );
};

export default CreateOrder;
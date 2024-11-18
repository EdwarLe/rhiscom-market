import { useState } from 'react';
import ProductList from '../components/ProductList';
import CreateOrder from '../components/CreateOrder';
import Dashboard from '../components/Dashboard';

const HomePage = () => {
    const [productActive, setProductActive] = useState(false)
    const [orderActive, setOrderActive] = useState(false)
    const [dashboardActive, setDashboardActive] = useState(false)

    const handleProductClick = () => {
        setProductActive(true)
        setOrderActive(false)
        setDashboardActive(false)
    }

    const handleOrderClick = () => {
        setProductActive(false)
        setOrderActive(true)
        setDashboardActive(false)
    }

    const handleDashboardClick = () => {
        setProductActive(false)
        setOrderActive(false)
        setDashboardActive(true)
    }
    return (
        <div className="h-full w-full self-start flex"> 
            <div className="flex flex-col space-y-4 w-60 bg-blue-600 p-4 shadow-md">
                <div className="text-white cursor-pointer hover:bg-white hover:text-blue-950 p-2 rounded-full px-4 transition-colors" onClick={handleProductClick}>Lista de Productos</div>
                <div className="text-white cursor-pointer hover:bg-white hover:text-blue-950 p-2 rounded-full px-4 transition-colors" onClick={handleOrderClick}>Crear Orden</div>
                <div className="text-white cursor-pointer hover:bg-white hover:text-blue-950 p-2 rounded-full px-4 transition-colors" onClick={handleDashboardClick}>Dashboard</div>
            </div>
            
                {productActive 
                    ? <div className='p-5 w-full h-full'><ProductList /></div> 
                    : orderActive 
                    ? <div className='p-5 w-full h-full'><CreateOrder /></div> 
                    : dashboardActive 
                    ? <div className='p-5 w-full h-full'><Dashboard /></div> 
                    : <div></div>
                }
            
        </div>
    );
};

export default HomePage;
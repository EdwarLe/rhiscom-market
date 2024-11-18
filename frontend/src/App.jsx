import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import GlobalStateProvider, { GlobalState } from './context/GlobalStateProvider.jsx';
import ProductList from './components/ProductList.jsx';
import CreateOrder from './components/CreateOrder.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import { lazy } from 'react';

const Dashboard = lazy(() => import('./components/Dashboard.jsx'));

const PrivateRoute = ({ children }) => {
    const { state } = useContext(GlobalState);
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/register" />;
    }

    return children;
};

const App = () => {
    return (
        <GlobalStateProvider>
            <div className='min-h-screen h-screen flex flex-col justify-center items-center w-full max-w-[1200px] mx-auto'>
            <h1 className="text-2xl font-bold bg-blue-600 w-full text-center text-white py-4 shadow-md">Bienvenido a Rhiscom Market</h1>
                <Router>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/products" element={
                            <PrivateRoute>
                                <ProductList />
                            </PrivateRoute>
                        } />
                        <Route path="/create-order" element={
                            <PrivateRoute>
                                <CreateOrder />
                            </PrivateRoute>
                        } />
                        <Route path="/dashboard" element={
                            <PrivateRoute>
                                <React.Suspense fallback={<div>Loading...</div>}>
                                    <Dashboard />
                                </React.Suspense>
                            </PrivateRoute>
                        } />
                    </Routes>
                </Router>
            </div>
        </GlobalStateProvider>
    );
};

export default App;
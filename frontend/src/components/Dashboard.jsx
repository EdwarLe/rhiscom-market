import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from '../services/axiosConfig';

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulación de datos
    const fetchData = async () => {
      try {
        const response = await axios.get('/ordenes/total?page=0&size=10&startDate=2024-01-01&endDate=2024-12-31'); // Suponiendo que este endpoint devuelve todas las órdenes
        const orders = response.data.content;

        console.log(orders)

        // Agrupar órdenes por fecha
        const groupedData = orders.reduce((acc, order) => {
          const date = new Date(order.fecha).toLocaleDateString();
          if (!acc[date]) {
            acc[date] = 0;
          }
          acc[date] += 1;
          return acc;
        }, {});

        // Formatear datos para Recharts
        const formattedData = Object.keys(groupedData).map(date => ({
          fecha: date,
          totalOrdenes: groupedData[date]
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="shadow-md bg-slate-100 rounded-md p-10 w-full h-full flex flex-col justify-between">
      <h2 className='text-2xl font-bold text-blue-950 text-center mb-4'>Total de Órdenes por Día</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="fecha" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="duotone" dataKey="totalOrdenes" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Dashboard;
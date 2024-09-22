import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import axios from 'axios';
import dayjs from 'dayjs';
import { Button } from '@mui/material';

const Dashboard = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [salesData, setSalesData] = useState({ today: 0, weekly: 0, monthly: 0 });
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    fetchOrdersData();
  }, []);

  const fetchOrdersData = async () => {
    try {
      const response = await axios.get('https://sufilatestbe.vercel.app/v2/checkout');
      const orders = response.data;

      // Calculate Orders
      const totalOrders = orders.length;
      setOrdersData([
        { name: 'Orders', value: totalOrders },
      ]);

      // Calculate Sales Statistics
      const today = dayjs().startOf('day');
      const startOfWeek = dayjs().startOf('week');
      const startOfMonth = dayjs().startOf('month');

      let todaySales = 0, weeklySales = 0, monthlySales = 0, overallSales = 0;

      orders.forEach(order => {
        const orderDate = dayjs(order.createdAt); // Use createdAt for correct date
        const orderTotal = order.products.reduce((total, product) => total + (product.price * product.quantity), 0);

        overallSales += orderTotal;

        if (orderDate.isAfter(today)) todaySales += orderTotal;
        if (orderDate.isAfter(startOfWeek)) weeklySales += orderTotal;
        if (orderDate.isAfter(startOfMonth)) monthlySales += orderTotal;
      });

      setSalesData({
        today: todaySales,
        weekly: weeklySales,
        monthly: monthlySales,
      });

      setTotalSales(overallSales);

    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleResetCharts = () => {
    setOrdersData([]);
    setSalesData({ today: 0, weekly: 0, monthly: 0 });
    setTotalSales(0);
  };

  const COLORS = ['#8884d8'];

  // Data for the sales bar chart
  const salesChartData = [
    { name: 'Today', sales: salesData.today },
    { name: 'This Week', sales: salesData.weekly },
    { name: 'This Month', sales: salesData.monthly },
  ];

  return (
    <div>
      <h2>Dashboard</h2>
      {/* Flex container for side-by-side layout */}
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        
        {/* Pie chart for total orders */}
        <div>
          <h3>Total Orders Chart</h3>
          {ordersData.length > 0 ? (
            <PieChart width={400} height={400}>
              <Pie
                data={ordersData}
                cx={200}
                cy={200}
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {ordersData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          ) : (
            <p>No Orders Data Available</p>
          )}
        </div>
        
        {/* Bar chart for sales statistics */}
        <div>
          <h3>Sales Statistics</h3>
          <BarChart width={600} height={300} data={salesChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => `PKR ${value.toLocaleString()}`} />
            <Legend />
            <Bar dataKey="sales" fill="#8884d8" />
          </BarChart>
          <h3>Total Sales: PKR {totalSales.toLocaleString()}</h3>
        </div>
        
      </div>

      {/* Reset button */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Button variant="contained" color="secondary" onClick={handleResetCharts}>
          Reset Charts
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;

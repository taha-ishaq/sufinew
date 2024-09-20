import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import ProductForm from './components/productForm';
import ProductList from './components/ProductList';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import OrdersPage from './components/OrderDetails';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? <ProductList /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/add-product"
            element={
              isAuthenticated ? <ProductForm /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/Dashboard"
            element={
              isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
            }
          />
           <Route
            path="/orders"
            element={
              isAuthenticated ? <OrdersPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/login"
            element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

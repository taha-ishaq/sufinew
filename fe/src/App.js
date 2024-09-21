import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import ProductForm from './components/productForm';
import ProductList from './components/ProductList';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import OrdersPage from './components/OrderDetails';
import UserMails from './components/UserMails';
import BulkUploadForm from './components/BulkUploadForm';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check localStorage for authentication status
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true'); // Store the authenticated state
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('isAuthenticated', 'false'); // Update the localStorage
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
            path="/mails"
            element={
              isAuthenticated ? <UserMails /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/bulkupload"
            element={
              isAuthenticated ? <BulkUploadForm /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/login"
            element={<LoginPage setIsAuthenticated={handleLogin} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

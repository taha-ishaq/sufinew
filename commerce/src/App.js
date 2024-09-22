import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import NewIn from './pages/Newin';

import All from './pages/All';
import Footer from './components/Footer';
import Search from './pages/Search';
import Cart from './components/Cart';
import ProductD from './components/ProductD';
import Checkout from './pages/Checkout';
import Woman from './pages/Woman';
import Bridal from './pages/Bridal';
import Man from './pages/Man';


const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === product._id);
      if (existingItem) {
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        const updatedItems = [...prevItems, { ...product, quantity: 1 }];
        localStorage.setItem("cartItems", JSON.stringify(updatedItems));
        return updatedItems;
      }
    });
  };

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Router>
      <Navbar cartItemsCount={cartItemsCount} />
      <Routes>
        <Route path='/' element={<All />} />
        <Route path='/search' element={<Search />} />
        <Route path='/collections' element={<NewIn addToCart={addToCart} />} />
        <Route path='/product/:id' element={<ProductD addToCart={addToCart} />} />
        <Route path='/wedding-formals' element={<Bridal addToCart={addToCart} />} />
        <Route path='/woman' element={<Woman addToCart={addToCart} />} />
        <Route path='/man' element={<Man addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        {/* Add more routes as needed */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

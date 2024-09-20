import React,{useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import NewIn from './pages/Newin';
import Homepage from './pages/Homepage';
import All from './pages/All';
import Footer from './components/Footer';
import Search from './pages/Search';
import Cart from './components/Cart';
import ProductD from './components/ProductD';
import Checkout from './pages/Checkout';
// Import your other components/pages

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
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<All/>}/>
        <Route path='/search' element={<Search/>}/>
       <Route path='/all' element={<NewIn addToCart={addToCart}/>}/>
       <Route path='/product/:id' element={<ProductD addToCart={addToCart}/>}/>
       <Route path="/cart" element={<Cart />} />
       <Route path="/checkout" element={<Checkout />} />
        {/* Add more routes as needed */}
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;

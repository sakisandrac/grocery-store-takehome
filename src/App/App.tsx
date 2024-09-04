import React, { useState } from 'react';
import './App.css';
import Homepage from '../Homepage/Homepage';
import Navigation from '../Navigation/Navigation';
import { FoodItem } from '../types';
import { Route, Routes } from 'react-router-dom';
import Checkout from '../Checkout/Checkout';
import Search from '../Search/Search';

function App() {
  const [toggleCart, setToggleCart] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<FoodItem[]>([]);

  return (
    <>

      <div className="App">
        <Navigation setToggleCart={setToggleCart} />
      </div>
      <Routes>
        <Route path="/" element={<Homepage toggleCart={toggleCart} cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/checkout" element={<Checkout cartItems={cartItems} />} />
        <Route path="/search" element={<Search setCartItems={setCartItems} cartItems={cartItems} toggleCart={toggleCart} />} />
      </Routes>
    </>
  );
}

export default App;

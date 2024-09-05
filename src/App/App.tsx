import React, { useState } from 'react';
import './App.css';
import Homepage from '../Components/Homepage/Homepage';
import Navigation from '../Components/Navigation/Navigation';
import { FoodItem } from '../utilities/types';
import { Route, Routes } from 'react-router-dom';
import Checkout from '../Components/Checkout/Checkout';
import Search from '../Components/Search/Search';
import ErrorPage from '../Components/ErrorPage/ErrorPage';

const App = () => {
  const [data, setData] = useState<FoodItem[]>([]);
  const [toggleCart, setToggleCart] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<FoodItem[]>([]);
  const [error, setError] = useState('');

  return (
    <div className="app">
      <Navigation setToggleCart={setToggleCart} cartItems={cartItems} />
      <Routes>
        <Route path="/" element={<Homepage data={data} setData={setData} setError={setError} error={error} toggleCart={toggleCart} cartItems={cartItems} setCartItems={setCartItems} setToggleCart={setToggleCart} />} />
        <Route path="/checkout" element={<Checkout cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/search" element={<Search setCartItems={setCartItems} cartItems={cartItems} toggleCart={toggleCart} setToggleCart={setToggleCart} />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;

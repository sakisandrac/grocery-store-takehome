import React, { useEffect, useState } from 'react';
import './App.css';
import Homepage from '../Homepage/Homepage';
import Navigation from '../Navigation/Navigation';
import { FoodItem } from '../types';
import { Route, Routes } from 'react-router-dom';
import Checkout from '../Checkout/Checkout';
import Search from '../Search/Search';
import ErrorPage from '../ErrorPage/ErrorPage';
import { API_ID, API_KEY, getData, shapeFoodData } from '../utlities';

const App = () => {
  const [data, setData] = useState<FoodItem[]>([]);
  const [toggleCart, setToggleCart] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<FoodItem[]>([]);
  const [error, setError] = useState('');

  const query = ['generic-foods'];
  const API_URL = `https://api.edamam.com/api/food-database/v2/parser?category=${query}&app_id=${API_ID}&app_key=${API_KEY}`;

  useEffect(() => {
      getData(query, API_URL).then((data) => {
        setData(shapeFoodData(data));
      }).catch((err) => {
        setError(err);
      });
  }, []);

  return (
    <div className="app">
      <Navigation setToggleCart={setToggleCart} cartItems={cartItems} />
      <Routes>
        <Route path="/" element={<Homepage data={data} error={error} toggleCart={toggleCart} cartItems={cartItems} setCartItems={setCartItems} setToggleCart={setToggleCart} />} />
        <Route path="/checkout" element={<Checkout cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/search" element={<Search setCartItems={setCartItems} cartItems={cartItems} toggleCart={toggleCart} setToggleCart={setToggleCart} />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;

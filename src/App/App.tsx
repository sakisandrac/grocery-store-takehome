import React, { useEffect, useState } from 'react';
import './App.css';
import Homepage from '../Homepage/Homepage';
import Navigation from '../Navigation/Navigation';
import { FoodItem, Hint } from '../types';
import { Route, Routes } from 'react-router-dom';
import Checkout from '../Checkout/Checkout';
import Search from '../Search/Search';
import ErrorPage from '../ErrorPage/ErrorPage';

const App = () => {
  const [data, setData] = useState<FoodItem[]>([]);
  const [toggleCart, setToggleCart] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<FoodItem[]>([]);
  const [error, setError] = useState('');

  const APP_ID = process.env.REACT_APP_API_ID;
  const APP_KEY = process.env.REACT_APP_API_KEY;
  const query = ['generic-foods'];

  const fetchFoodData = async (query: string[]) => {
    try {
      const response = await fetch(`https://api.edamam.com/api/food-database/v2/parser?category=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      const shapedData: FoodItem[] = data.hints.map((item: Hint) => ({
        foodId: item.food.foodId,
        label: item.food.label,
        brand: item.food.brand,
        category: item.food.category,
        image: item.food.image
      }));

      setData(shapedData);
    } catch (error) {
      setError('Failed to fetch data');
    }
  };

  useEffect(() => {
    if (data.length === 0) {
      fetchFoodData(query);
    }
  }, []);

  return (
    <>
      <div className="App">
        <Navigation setToggleCart={setToggleCart} />
      </div>
      <Routes>
        <Route path="/" element={<Homepage data={data} error={error} toggleCart={toggleCart} cartItems={cartItems} setCartItems={setCartItems} setToggleCart={setToggleCart} />} />
        <Route path="/checkout" element={<Checkout cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/search" element={<Search setCartItems={setCartItems} cartItems={cartItems} toggleCart={toggleCart} setToggleCart={setToggleCart} />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import './App.css';
import Homepage from '../Homepage/Homepage';
import Navigation from '../Navigation/Navigation';
import { FoodItem, Hint } from '../types';
import { Route, Routes } from 'react-router-dom';
import Checkout from '../Checkout/Checkout';
import Search from '../Search/Search';

const mockData = [
  {
    category: "Generic foods",
    categoryLabel: "food",
    foodId: "food_bwrgmmqau78xrdazxx79obeezumz",
    image: "https://www.edamam.com/food-img/515/515af390107678fce1533a31ee4cc35b.jpeg",
    label: "Butter, Salted"
  },
  {

    category: "Generic foods",
    categoryLabel: "food",
    foodId: "food_bwrgmmqau78xrdazxx79obeezumz",
    image: "https://www.edamam.com/food-img/515/515af390107678fce1533a31ee4cc35b.jpeg",
    label: "Butter, Salted"

  },
  {

    category: "Generic foods",
    categoryLabel: "food",
    foodId: "food_bwrgmmqau78xrdazxx79obeezumz",
    image: "https://www.edamam.com/food-img/515/515af390107678fce1533a31ee4cc35b.jpeg",
    label: "Butter, Salted"

  },
  {

    category: "Generic foods",
    categoryLabel: "food",
    foodId: "food",
    image: "https://www.edamam.com/food-img/515/515af390107678fce1533a31ee4cc35b.jpeg",
    label: "test"

  },
  {

    category: "Generic foods",
    categoryLabel: "food",
    foodId: "food",
    image: "https://www.edamam.com/food-img/515/515af390107678fce1533a31ee4cc35b.jpeg",
    label: "test"

  },
  {

    category: "Generic foods",
    categoryLabel: "food",
    foodId: "food1",
    image: "https://www.edamam.com/food-img/515/515af390107678fce1533a31ee4cc35b.jpeg",
    label: "test1"

  },
  {

    category: "Generic foods",
    categoryLabel: "food",
    foodId: "food2",
    image: "https://www.edamam.com/food-img/515/515af390107678fce1533a31ee4cc35b.jpeg",
    label: "test2"
  },
  {

    category: "Generic foods",
    categoryLabel: "food",
    foodId: "food22",
    image: "https://www.edamam.com/food-img/515/515af390107678fce1533a31ee4cc35b.jpeg",
    label: "test20"
  },
  {

    category: "Generic foods",
    categoryLabel: "food",
    foodId: "food223",
    image: "https://www.edamam.com/food-img/515/515af390107678fce1533a31ee4cc35b.jpeg",
    label: "test21"
  },
  {

    category: "Generic foods",
    categoryLabel: "food",
    foodId: "food244",
    image: "https://www.edamam.com/food-img/515/515af390107678fce1533a31ee4cc35b.jpeg",
    label: "test22"
  }
]

const App = () => {
  const [data, setData] = useState<FoodItem[]>(mockData)
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
      </Routes>
    </>
  );
}

export default App;

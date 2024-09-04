import React, { useState } from 'react';
import './App.css';
import Homepage from '../Homepage/Homepage';
import Navigation from '../Navigation/Navigation';
import { FoodItem } from '../types';

function App() {
  const [toggleCart, setToggleCart] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<FoodItem[]>([]);

  return (
    <div className="App">
      <Navigation setToggleCart={setToggleCart} />
      <Homepage toggleCart={toggleCart} cartItems={cartItems} setCartItems={setCartItems}/>
    </div>
  );
}

export default App;

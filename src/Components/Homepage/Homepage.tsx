import React, { useEffect } from 'react';
import './Homepage.css';
import groceryHero from '../../resources/groceries-hero.png';
import AddButton from '../AddButton/AddButton';
import Cart from '../Cart/Cart';
import { FoodItem } from '../../utilities/types';
import { addToCart, shapeFoodData } from '../../utilities/helpers';
import imageUnavailable from '../../resources/unavailable.png';
import Footer from '../Footer/Footer';
import { getData } from '../../utilities/apiCalls';
import { API_ID, API_KEY } from '../../utilities/constants';

interface HomepageProps {
  toggleCart: boolean;
  cartItems: FoodItem[];
  setCartItems: React.Dispatch<React.SetStateAction<FoodItem[]>>;
  setToggleCart: React.Dispatch<React.SetStateAction<boolean>>;
  data: FoodItem[]
  error: string;
  setData: React.Dispatch<React.SetStateAction<FoodItem[]>>
  setError: React.Dispatch<React.SetStateAction<string>>
}


const Homepage = ({ toggleCart, cartItems, setCartItems, setToggleCart, data, error, setData, setError }: HomepageProps) => {
  const query = ['generic-foods'];
  const API_URL = `https://api.edamam.com/api/food-database/v2/parser?category=${query}&app_id=${API_ID}&app_key=${API_KEY}`;

  useEffect(() => {
    getData(query, API_URL).then((data) => {
      setData(shapeFoodData(data));
    }).catch((err) => {
      setError(err);
    });
    setToggleCart(false)
  }, []);

  return (
    <div className="home-main">
      <div className="home-section-container">
        <section>
          <img src={groceryHero} alt="banner of food" className="home-hero-image" />
        </section>
        <section className="home-info-container">
          <h1 className="home-welcome-text">Welcome to the Harvest Hub</h1>
          <p className="home-subtext">Fresh produce from local farms</p>
        </section>
        <section>
          <p className="home-shop-text">Shop Popular Items</p>
          <div className="home-items-container">
            {error ? <p>Network request error, please refresh page!</p>
              : (data?.map((item: FoodItem, index: number) => (
                <div className="home-item" key={index}>
                  <img src={item.image ?? imageUnavailable} alt={item.label} className="home-item-image" />
                  <p>{item.label}</p>
                  <AddButton addToCart={addToCart} item={item} setCartItems={setCartItems} setToggleCart={setToggleCart} />
                </div>
              )))}
          </div>
        </section>
      </div>
      {toggleCart && <Cart cartItems={cartItems} setCartItems={setCartItems} />}
      <Footer />
    </div>
  )
}

export default Homepage
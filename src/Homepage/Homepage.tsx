import React, { useEffect } from 'react';
import './Homepage.css';
import groceryHero from '../resources/groceries-hero.png'
import AddButton from '../AddButton/AddButton';
import Cart from '../Cart/Cart';
import { FoodItem } from '../types';
import { addToCart } from '../utlities';

interface HomepageProps {
  toggleCart: boolean;
  cartItems: FoodItem[];
  setCartItems: React.Dispatch<React.SetStateAction<FoodItem[]>>;
  setToggleCart: React.Dispatch<React.SetStateAction<boolean>>;
  data: FoodItem[]
  error: string;

}


const Homepage = ({ toggleCart, cartItems, setCartItems, setToggleCart, data, error }: HomepageProps) => {
  ;

  useEffect(() => {
    setToggleCart(false)
  }, [])

  return (
    <div className="home-main">
      <section>
        <img src={groceryHero} alt="banner of food" className="home-hero-image" />
      </section>
      <section className="home-info-container">
        <h1 className="home-welcome-text">Welcome to the Harvest Hub</h1>
        <p>Fresh produce from local farms</p>
      </section>
      <section>
        <p className="home-shop-text">Shop Popular Items</p>
        <div className="home-items-container">
          {!error && data?.map((item: FoodItem, index: number) => (
            <div className="home-item" key={index}>
              {item.image && (
                <>
                  <img src={item.image} alt={item.label} className="home-item-image" />
                  <p>{item.label}</p>
                  <AddButton addToCart={addToCart} item={item} setCartItems={setCartItems} setToggleCart={setToggleCart} />
                </>
              )}
            </div>
          ))}
          {error && (
            <p>Network request error, please refresh page!</p>
          )}
        </div>
      </section>
      {toggleCart && <Cart cartItems={cartItems} setCartItems={setCartItems} />}
    </div>
  )
}

export default Homepage
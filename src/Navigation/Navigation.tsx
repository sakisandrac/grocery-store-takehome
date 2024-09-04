import React from 'react';
import './Navigation.css';
import logo from '../resources/logo.png';
import cartIcon from '../resources/cart.png';
import { FoodItem } from '../types';
import { Link, useLocation } from 'react-router-dom';

interface NavigationProps {
    setToggleCart: React.Dispatch<React.SetStateAction<boolean>>;

}

const Navigation = ({ setToggleCart }: NavigationProps) => {
    const location = useLocation();
    const currentPath = location.pathname;
    return (
        <nav className="nav-main">
            <img src={logo} alt="harvest hub logo" className="nav-logo" />
            <div className="nav-left">
                {currentPath === '/' &&
                    (<div className="nav-cart-container">
                        <img onClick={() => setToggleCart(prev => !prev)} className="nav-cart" src={cartIcon} alt="cart icon" />
                    </div>)
                }
                <ul className="nav-links">
                    <Link className="nav-link" to="/">Home</Link>
                    <Link className="nav-link" to="/checkout">Checkout</Link>
                </ul>

            </div>
        </nav >

    )
}

export default Navigation
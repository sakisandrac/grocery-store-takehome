import React, { useState } from 'react';
import './Navigation.css';
import logo from '../../resources/logo.png';
import cartIcon from '../../resources/cart.png';
import { Link, useLocation } from 'react-router-dom';
import { FoodItem } from '../../utilities/types';
import { countItemsInCart } from '../../utilities/helpers';

interface NavigationProps {
    setToggleCart: React.Dispatch<React.SetStateAction<boolean>>;
    cartItems: FoodItem[];
}

const Navigation = ({ setToggleCart, cartItems }: NavigationProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const currentPath = location.pathname;

    const toggleMenu = () => setIsMenuOpen(prev => !prev);
    const cartTotal = countItemsInCart(cartItems).reduce((acc, item) => acc + item.quantity, 0);

    return (
        <nav className="nav-main">
            <Link className="nav-logo" to="/"><img src={logo} alt="harvest hub logo" className="nav-logo" /></Link>
            <div className="nav-left">
                {currentPath !== '/checkout' && (
                    <div className="nav-cart-container" onClick={() => setToggleCart(prev => !prev)}>
                        <img
                            className="nav-cart"
                            src={cartIcon}
                            alt="cart icon"
                        />
                        <span className="nav-cart-count">{cartTotal}</span>
                    </div>
                )}
                <div className="nav-menu-container">
                    <button className="nav-hamburger" onClick={toggleMenu}>☰</button>
                    <ul className={`nav-links ${isMenuOpen ? 'nav-links-open' : ''}`}>
                        <li><Link className="nav-link" to="/" onClick={toggleMenu}>Home</Link></li>
                        <li><Link className="nav-link" to="/search" onClick={toggleMenu}>Search</Link></li>
                        <li><Link className="nav-link" to="/checkout" onClick={toggleMenu}>Checkout</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navigation
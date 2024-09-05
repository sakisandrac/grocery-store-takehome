import React from 'react';
import './Cart.css';
import { CartQuantity, FoodItem } from '../../utilities/types';
import { useNavigate } from 'react-router-dom';
import { countItemsInCart, removeFromCart } from '../../utilities/utilities';
import closeIcon from '../../resources/close-icon.png';
import imageUnavailable from '../../resources/unavailable.png';
import emptyBasket from '../../resources/empty.png';

interface CartProps {
    cartItems: FoodItem[];
    setCartItems: React.Dispatch<React.SetStateAction<FoodItem[]>>;
}

const Cart = ({ cartItems, setCartItems }: CartProps) => {
    const navigate = useNavigate();

    const goToCheckout = () => {
        navigate('/checkout');
    };

    const cartSummary = countItemsInCart(cartItems);

    return (
        <div className="cart-main">
            <p className="cart-text">Items in your cart:</p>
            {cartItems.length === 0 &&
                (<div className="cart-item">
                    <p>You have not added any items yet</p>
                    <img src={emptyBasket} alt="empty basket" className="cart-item-image" />
                </div>)}
            {cartSummary?.map((item: CartQuantity, index: number) => (
                <div className="cart-item" key={index}>
                    <div className='cart-image-container'>
                        <img onClick={() => removeFromCart(item, setCartItems)} className="cart-close-icon" src={closeIcon} alt="remove items" />
                        <img src={item.item.image ?? imageUnavailable} alt={item.item.label} className="cart-item-image" /></div>
                    <p>{item.item.label}</p>
                    <p>Quantity: {item.quantity}</p>
                </div>
            ))}
            {cartItems.length > 0 && <button onClick={goToCheckout}>Checkout</button>}
        </div>
    )
}

export default Cart
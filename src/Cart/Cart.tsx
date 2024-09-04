import React, { useEffect } from 'react';
import './Cart.css';
import { CartQuantity, FoodItem } from '../types';
import { useNavigate } from 'react-router-dom';
import { countItemsInCart } from '../utlities';

interface CartProps {
    cartItems: FoodItem[];
}

const Cart = ({ cartItems }: CartProps) => {
    const navigate = useNavigate();

    const goToCheckout = () => {
        navigate('/checkout');
    };


    const cartSummary = countItemsInCart(cartItems);

    return (
        <div className="cart-main">
            <p>Items in your cart:</p>
            {!cartItems && <p>You have not added any items yet</p>}
            {cartSummary?.map((item: CartQuantity, index: number) => (
                <div className="cart-item" key={index}>
                    {item.item.image && (
                        <>
                            <img src={item.item.image} alt={item.item.label} className="cart-item-image" />
                            <p>{item.item.label}</p>
                            <p>Quantity: {item.quantity}</p>
                        </>
                    )}
                </div>
            ))}
            {cartItems.length > 0 && <button onClick={goToCheckout} className="cart-checkout-btn">Checkout</button>}
        </div>
    )
}

export default Cart
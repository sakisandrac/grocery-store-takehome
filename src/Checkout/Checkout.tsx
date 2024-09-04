import React from 'react';
import { CartQuantity, FoodItem } from '../types';
import './Checkout.css';
import { countItemsInCart } from '../utlities';

interface CheckoutProps {
    cartItems: FoodItem[]
}
const Checkout = ({ cartItems }: CheckoutProps) => {
    const cartSummary = countItemsInCart(cartItems);
    const totalQuantity = cartSummary.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <div className="checkout-main">
            <h1>Review Your Order</h1>
            {totalQuantity > 0 && cartSummary?.map((item: CartQuantity, index: number) => (
                <div key={index}>
                    {item.item.image && (
                        <>
                            <img src={item.item.image} alt={item.item.label} className="checkout-item-image" />
                            <p>{item.item.label}</p>
                            <p>Quantity: {item.quantity}</p>
                        </>
                    )}
                </div>
            ))}
            {totalQuantity === 0 && <p>There are no items in your cart!</p>}
            {totalQuantity > 0 && <p>Total number of items: {totalQuantity}</p>}
        </div>
    )
}

export default Checkout
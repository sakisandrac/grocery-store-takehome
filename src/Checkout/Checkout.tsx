import React, { useState } from 'react';
import { CartQuantity, FoodItem } from '../types';
import './Checkout.css';
import { countItemsInCart } from '../utlities';
import thankYou from '../resources/thank-you.png';

interface CheckoutProps {
    cartItems: FoodItem[]
}
const Checkout = ({ cartItems }: CheckoutProps) => {
    const [finishPurchase, setFinishPurchase] = useState<boolean>(false);

    const cartSummary = countItemsInCart(cartItems);
    const totalQuantity = cartSummary.reduce((acc, item) => acc + item.quantity, 0);
    const isCartEmpty = totalQuantity === 0;

    return (
        <div className="checkout-main">
            {finishPurchase ? (<div className="checkout-review">
                <h1>Thank you! Your items have been successfully purchased.</h1>
                <img className="checkout-image" src={thankYou} alt="groceries and thank you text" />
            </div>) : <div className="checkout-review">
                <h1>Review Your Order</h1>
                {isCartEmpty ? <p>There are no items in your cart!</p> :
                    (
                        <div className="checkout-items-container">
                            {cartSummary?.map((item: CartQuantity, index: number) => (
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
                            <p>Total number of items: {totalQuantity}</p>
                            <button className="checkout-btn" onClick={() => setFinishPurchase(prev => !prev)}>Purchase</button>
                        </div>)}
            </div>}
        </div>
    )
}

export default Checkout;
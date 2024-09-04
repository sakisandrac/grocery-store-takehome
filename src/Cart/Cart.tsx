import React, { useEffect } from 'react';
import './Cart.css';
import { FoodItem } from '../types';

interface CartProps {
    cartItems: FoodItem[];
}

interface CartQuantity {
    item: FoodItem;
    quantity: number;
}

const Cart = ({ cartItems }: CartProps) => {

    const countItemsInCart = () => {
        return Object.values(
            cartItems.reduce<{ [foodId: string]: { item: FoodItem; quantity: number } }>(
                (acc, item) => {
                    if (acc[item.foodId]) {
                        acc[item.foodId].quantity += 1;
                    } else {
                        acc[item.foodId] = { item, quantity: 1 };
                    }
                    return acc;
                },
                {}
            )
        );
    };

    const cartSummary = countItemsInCart();

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
        </div>
    )
}

export default Cart
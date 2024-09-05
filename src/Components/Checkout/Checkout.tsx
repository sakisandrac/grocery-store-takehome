import React, { useState } from 'react';
import { CartQuantity, FoodItem, FormData } from '../../utilities/types';
import './Checkout.css';
import { countItemsInCart } from '../../utilities/helpers';
import thankYou from '../../resources/thank-you.png';
import Form from '../Form/Form';
import shipping from '../../resources/shipping.png';
import imageUnavailable from '../../resources/unavailable.png';
import emptyBasket from '../../resources/empty.png';

interface CheckoutProps {
    cartItems: FoodItem[]
    setCartItems: React.Dispatch<React.SetStateAction<FoodItem[]>>
}
const Checkout = ({ cartItems, setCartItems }: CheckoutProps) => {
    const [finishPurchase, setFinishPurchase] = useState<boolean>(false);
    const [purchasedItems, setPurchasedItems] = useState<CartQuantity[]>([]);

    const cartSummary = countItemsInCart(cartItems);
    const totalQuantity = cartSummary.reduce((acc, item) => acc + item.quantity, 0);
    const isCartEmpty = totalQuantity === 0;

    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        streetAddress: '',
        city: '',
        state: '',
        paymentMethod: 'cash',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const submitPurchase = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPurchasedItems(cartSummary);
        setFinishPurchase(true);
        setCartItems([]);
    }

    return (
        <div className="checkout-main">
            {finishPurchase ? (<div className="checkout-review">
                <h1>Thank you! Your items have been successfully purchased.</h1>
                <div className="checkout-purchase-summary">
                    <p className="checkout-text">Items purchased:</p>
                    {purchasedItems.map((item: CartQuantity, index: number) => (
                        <div key={index} className="checkout-purchase-list">
                            <p>{item.item.label}</p>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                    ))}
                </div>
                <img className="checkout-image" src={thankYou} alt="groceries and thank you text" />
            </div>) :
                <div className="checkout-review">
                    <h1>Review Your Order</h1>
                    {isCartEmpty ? (<div className="cart-item">
                        <p>You have not added any items yet</p>
                        <img src={emptyBasket} alt="empty basket" className="search-image" />
                    </div>) :
                        (<div className="checkout-review-container">
                            <div className="checkout-items-container">
                                <div className="checkout-items">
                                    {cartSummary?.map((item: CartQuantity, index: number) => (
                                        <div key={index} className="checkout-item">
                                            <img src={item.item.image ?? imageUnavailable} alt={item.item.label} className="checkout-item-image" />
                                            <p>{item.item.label}</p>
                                            <p>Quantity: {item.quantity}</p>
                                        </div>
                                    ))}
                                </div>
                                <p>Total number of items: {totalQuantity}</p>
                            </div>
                            <div className='checkout-form-container'>
                                <img src={shipping} alt="enter shipping info" className="checkout-item-image" />
                                <Form formData={formData} handleChange={handleChange} submitPurchase={submitPurchase} />
                            </div>
                        </div>)}
                </div>}
        </div>
    )
}

export default Checkout;
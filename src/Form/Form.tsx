import React, { useState } from 'react';
import './Form.css';
import { FormData } from '../types';

interface FormProps {
    formData: FormData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    submitPurchase: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form = ({ formData, handleChange, submitPurchase }: FormProps) => {
    return (
        <form onSubmit={submitPurchase} className="form-main">
            <div className="form-field">
                <label htmlFor="name">Name:</label>
                <input
                    className="form-input"
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-field">
                <label htmlFor="email">Email:</label>
                <input
                    className="form-input"
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-field">
                <label htmlFor="streetAddress">Street Address:</label>
                <input
                    className="form-input"
                    type="text"
                    id="streetAddress"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-field">
                <label htmlFor="city">City:</label>
                <input
                    className="form-input"
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-field">
                <label htmlFor="state">State:</label>
                <input
                    className="form-input"
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-field">
                <label htmlFor="paymentMethod">Payment Method:</label>
                <select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    required
                >
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                </select>
            </div>
            <button className="checkout-btn" type="submit">Purchase</button>
        </form>
    );
};

export default Form
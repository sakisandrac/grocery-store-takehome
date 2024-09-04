import React from 'react';
import './AddButton.css';
import { FoodItem } from '../types';

interface AddButtonProps {
    addToCart: (item: FoodItem) => void;
    item: FoodItem;
}
const AddButton = ({ addToCart, item }: AddButtonProps) => {
    return (
        <button onClick={() => addToCart(item)} className="add-button">Add to cart</button>
    )
}

export default AddButton
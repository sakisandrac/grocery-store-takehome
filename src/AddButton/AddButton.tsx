import React from 'react';
import { FoodItem } from '../types';

interface AddButtonProps {
    addToCart: (item: FoodItem) => void;
    item: FoodItem;
}
const AddButton = ({ addToCart, item }: AddButtonProps) => {
    return (
        <button onClick={() => addToCart(item)}>Add to cart</button>
    )
}

export default AddButton
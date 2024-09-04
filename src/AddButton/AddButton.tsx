import React from 'react';
import { FoodItem } from '../types';

interface AddButtonProps {
    addToCart: (item: FoodItem, setCartItems: React.Dispatch<React.SetStateAction<FoodItem[]>>) => void;
    item: FoodItem;
    setCartItems: React.Dispatch<React.SetStateAction<FoodItem[]>>;
}
const AddButton = ({ addToCart, item, setCartItems }: AddButtonProps) => {
    return (
        <button onClick={() => addToCart(item, setCartItems)}>Add to cart</button>
    )
}

export default AddButton
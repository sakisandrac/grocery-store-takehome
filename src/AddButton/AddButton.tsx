import React from 'react';
import { FoodItem } from '../types';

interface AddButtonProps {
    addToCart: (item: FoodItem, setCartItems: React.Dispatch<React.SetStateAction<FoodItem[]>>, setToggleCart: React.Dispatch<React.SetStateAction<boolean>>) => void;
    item: FoodItem;
    setCartItems: React.Dispatch<React.SetStateAction<FoodItem[]>>;
    setToggleCart: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddButton = ({ addToCart, item, setCartItems, setToggleCart }: AddButtonProps) => {
    return (
        <button onClick={() => addToCart(item, setCartItems, setToggleCart)}>Add to cart</button>
    )
}

export default AddButton
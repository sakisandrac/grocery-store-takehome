import { CartQuantity, FoodItem, Hint } from "./types";

export const API_ID = process.env.REACT_APP_API_ID;
export const API_KEY = process.env.REACT_APP_API_KEY;

export const countItemsInCart = (cartItems: FoodItem[]) => {
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

export const addToCart = (item: FoodItem, setCartItems: React.Dispatch<React.SetStateAction<FoodItem[]>>, setToggleCart: React.Dispatch<React.SetStateAction<boolean>>) => {
    setCartItems(prev => [...prev, item])
    setToggleCart(true);
}

export const removeFromCart = (item: CartQuantity, setCartItems: React.Dispatch<React.SetStateAction<FoodItem[]>>) => {
    setCartItems(prev => prev.filter(food => food.foodId !== item.item.foodId))
}

export const shapeFoodData = (data: { hints: Hint[] }): FoodItem[] => {
    return data.hints.map((item: Hint) => ({
        foodId: item.food.foodId,
        label: item.food.label,
        brand: item.food.brand,
        category: item.food.category,
        image: item.food.image,
    }));
}
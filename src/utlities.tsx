import { FoodItem } from "./types";

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

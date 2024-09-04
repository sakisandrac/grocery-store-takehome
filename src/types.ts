export interface FoodItem {
    foodId: string;
    label: string;
    brand?: string;
    category?: string;
    image?: string;
  }
  
  export interface Hint {
    food: FoodItem;
  }
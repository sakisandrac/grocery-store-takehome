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

export interface CartQuantity {
  item: FoodItem;
  quantity: number;
}

export interface FormData {
  name: string;
  email: string;
  streetAddress: string;
  city: string;
  state: string;
  paymentMethod?: string;
}

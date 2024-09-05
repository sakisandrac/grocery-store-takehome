import { FoodItem } from './types';
import { countItemsInCart, shapeFoodData } from './helpers';

describe('shapeFoodData', () => {
    it('should shape data correctly when provided with valid data', () => {
        const mockData = {
            hints: [
                {
                    food: {
                        foodId: '1',
                        label: 'Apple',
                        brand: 'FruitBrand',
                        category: 'Fruits',
                        image: 'apple.jpg',
                    },
                },
                {
                    food: {
                        foodId: '2',
                        label: 'Banana',
                        brand: 'FruitBrand',
                        category: 'Fruits',
                        image: 'banana.jpg',
                    },
                },
            ],
        };

        const expected: FoodItem[] = [
            {
                foodId: '1',
                label: 'Apple',
                brand: 'FruitBrand',
                category: 'Fruits',
                image: 'apple.jpg',
            },
            {
                foodId: '2',
                label: 'Banana',
                brand: 'FruitBrand',
                category: 'Fruits',
                image: 'banana.jpg',
            },
        ];

        expect(shapeFoodData(mockData)).toEqual(expected);
    });

    it('should return an empty array when the hints array is empty', () => {
        const mockData = { hints: [] };
        const expected: FoodItem[] = [];

        expect(shapeFoodData(mockData)).toEqual(expected);
    });

    it('should handle missing fields', () => {
        const mockData = {
            hints: [
                {
                    food: {
                        foodId: '1',
                        label: 'Apple',
                        brand: '',
                        category: '',
                        image: '',
                    },
                },
            ],
        };

        const expected: FoodItem[] = [
            {
                foodId: '1',
                label: 'Apple',
                brand: '',
                category: '',
                image: '',
            },
        ];

        expect(shapeFoodData(mockData)).toEqual(expected);
    });
});

describe('countItemsInCart', () => {
    it('should return the correct amount of items in cart', () => {
        const mockCart: FoodItem[] = [
            { foodId: '1', label: 'Apple', brand: 'FruitBrand', category: 'Fruits', image: 'apple.jpg' },
            { foodId: '1', label: 'Apple', brand: 'FruitBrand', category: 'Fruits', image: 'apple.jpg' },
            { foodId: '2', label: 'Banana', brand: 'FruitBrand', category: 'Fruits', image: 'banana.jpg' },
        ];

        const expected = [
            {
                item: { foodId: '1', label: 'Apple', brand: 'FruitBrand', category: 'Fruits', image: 'apple.jpg' },
                quantity: 2,
            },
            {
                item: { foodId: '2', label: 'Banana', brand: 'FruitBrand', category: 'Fruits', image: 'banana.jpg' },
                quantity: 1,
            },
        ];

        expect(countItemsInCart(mockCart)).toEqual(expected);
    });

    it('should return an empty array when the cart is empty', () => {
        const mockCart: FoodItem[] = [];

        expect(countItemsInCart(mockCart)).toEqual([]);
    });
});
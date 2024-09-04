import React, { useEffect, useState } from 'react'
import { FoodItem, Hint } from '../types';
import './Search.css'
import AddButton from '../AddButton/AddButton';
import { addToCart } from '../utlities';
import Cart from '../Cart/Cart';

interface SearchProps {
    setCartItems: React.Dispatch<React.SetStateAction<FoodItem[]>>;
    cartItems: FoodItem[];
    toggleCart: boolean;
    setToggleCart: React.Dispatch<React.SetStateAction<boolean>>;
}

const Search = ({ setCartItems, cartItems, toggleCart, setToggleCart }: SearchProps) => {


    const mockData = [
        {
            category: "Generic foods",
            categoryLabel: "food",
            foodId: "food_bwrgmmqau78xrdazxx79obeezumz",
            image: "https://www.edamam.com/food-img/515/515af390107678fce1533a31ee4cc35b.jpeg",
            label: "Butter, Salted"
        },
        {

            category: "Generic foods",
            categoryLabel: "food",
            foodId: "food_bwrgmmqau78xrdazxx79obeezumz",
            image: "https://www.edamam.com/food-img/515/515af390107678fce1533a31ee4cc35b.jpeg",
            label: "Butter, Salted"

        },
        {

            category: "Generic foods",
            categoryLabel: "food",
            foodId: "food_bwrgmmqau78xrdazxx79obeezumz",
            image: "https://www.edamam.com/food-img/515/515af390107678fce1533a31ee4cc35b.jpeg",
            label: "Butter, Salted"

        },
        {

            category: "Generic foods",
            categoryLabel: "food",
            foodId: "food",
            image: "https://www.edamam.com/food-img/515/515af390107678fce1533a31ee4cc35b.jpeg",
            label: "test"

        },
        {

            category: "Generic foods",
            categoryLabel: "food",
            foodId: "food",
            image: "https://www.edamam.com/food-img/515/515af390107678fce1533a31ee4cc35b.jpeg",
            label: "test"

        }
    ]
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<FoodItem[]>(mockData);
    const [error, setError] = useState('');

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        const API_ID = process.env.REACT_APP_API_ID;
        const API_KEY = process.env.REACT_APP_API_KEY;
        const API_URL = `https://api.edamam.com/api/food-database/v2/parser?ingr=${query}&app_id=${API_ID}&app_key=${API_KEY}`;

        try {
            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error('Network error');
            }

            const data = await response.json();
            const shapedData: FoodItem[] = data.hints.map((item: Hint) => ({
                foodId: item.food.foodId,
                label: item.food.label,
                brand: item.food.brand,
                category: item.food.category,
                image: item.food.image
            }));
            setResults(shapedData);
            setError('');
        } catch (err) {
            setError('Failed to fetch data. Please try again.');
        }
    };

    useEffect(() => {
        setToggleCart(false);
    }, [])

    return (
        <div className="search-main">
            <h1>Search for Food</h1>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter food item"
                    className="search-input"
                />
                <button type="submit">Search</button>
            </form>

            {error && <p>{error}</p>}
            {results.length === 0 && <p>No results found, try a different search!</p>}

            <div className="search-results">
                {results.map((item, index) => (
                    <div key={index} className="search-results">
                        {item.image && <img src={item.image} alt={item.label} className="search-item-image" />}
                        <p>{item.label}</p>
                        <AddButton addToCart={addToCart} item={item} setCartItems={setCartItems} setToggleCart={setToggleCart} />
                    </div>
                ))}
            </div>
            {toggleCart && <Cart setCartItems={setCartItems} cartItems={cartItems} />}
        </div>
    );
}

export default Search
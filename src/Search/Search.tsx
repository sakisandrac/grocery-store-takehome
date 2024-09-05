import React, { useEffect, useState } from 'react'
import { FoodItem } from '../types';
import './Search.css';
import AddButton from '../AddButton/AddButton';
import { addToCart, API_ID, API_KEY, shapeFoodData } from '../utlities';
import Cart from '../Cart/Cart';
import imageUnavailable from '../resources/unavailable.png';
import searchIcon from '../resources/search.png';

interface SearchProps {
    setCartItems: React.Dispatch<React.SetStateAction<FoodItem[]>>;
    cartItems: FoodItem[];
    toggleCart: boolean;
    setToggleCart: React.Dispatch<React.SetStateAction<boolean>>;
}

const Search = ({ setCartItems, cartItems, toggleCart, setToggleCart }: SearchProps) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<FoodItem[]>([]);
    const [error, setError] = useState('');
    const [searchSubmitted, setSearchSubmitted] = useState<boolean>(false);

    const checkInput = (query: string) => {
        return query !== '';
    };

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (!checkInput(query)) {
            setSearchSubmitted(true);
            setError('Search cannot be blank!')
            return;
        }

        const API_URL = `https://api.edamam.com/api/food-database/v2/parser?ingr=${query}&app_id=${API_ID}&app_key=${API_KEY}`;

        try {
            const response = await fetch(API_URL);

            if (!response.ok) {
                setError('Network error');
                throw new Error('Network error');
            }

            const data = await response.json();
            setResults(shapeFoodData(data));
            setError('');
            setSearchSubmitted(true);
        } catch (err) {
            setError('Failed to fetch data. Please try again.');
        }
    };

    useEffect(() => {
        setToggleCart(false);
    }, []);

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
            {results.length === 0 && searchSubmitted ? <p>{error ? error : 'No results found please try another term'}</p> : <p>Please enter a search term</p>}
            {results.length === 0 && <img className="search-image" src={searchIcon} alt="search icon and produce" />}
            <div className="search-results">
                {results.map((item, index) => (
                    <div key={index} className="search-results-item">
                        <img src={item.image ?? imageUnavailable} alt={item.label} className="search-item-image" />
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
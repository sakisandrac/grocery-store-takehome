import React, { useEffect, useState } from 'react';
import { FoodItem } from '../../utilities/types';
import './Search.css';
import AddButton from '../AddButton/AddButton';
import Cart from '../Cart/Cart';
import imageUnavailable from '../../resources/unavailable.png';
import searchIcon from '../../resources/search.png';
import { getData } from '../../utilities/apiCalls';
import { addToCart, shapeFoodData, sortedFoodItems, uniqueBrands } from '../../utilities/helpers';
import { API_ID, API_KEY } from '../../utilities/contants';

interface SearchProps {
    setCartItems: React.Dispatch<React.SetStateAction<FoodItem[]>>;
    cartItems: FoodItem[];
    toggleCart: boolean;
    setToggleCart: React.Dispatch<React.SetStateAction<boolean>>;
}

const Search = ({ setCartItems, cartItems, toggleCart, setToggleCart }: SearchProps) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<FoodItem[]>([]);
    const [filteredResults, setFilteredResults] = useState<FoodItem[]>([]);
    const [brands, setBrands] = useState<string[]>([]);
    const [selectedBrand, setSelectedBrand] = useState<string>('');
    const [error, setError] = useState('');
    const [searchSubmitted, setSearchSubmitted] = useState<boolean>(false);
    const API_URL = `https://api.edamam.com/api/food-database/v2/parser?ingr=${query}&app_id=${API_ID}&app_key=${API_KEY}`;

    const checkInput = (query: string): boolean => {
        if (query === '') {
            setSearchSubmitted(true);
            setError('Search cannot be blank!');
            return false;
        }
        return true;
    };

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (!checkInput(query)) {
            return;
        }

        try {
            const data = await getData(query, API_URL, true);
            const shapedData = shapeFoodData(data);
            const sortedData = sortedFoodItems(shapedData);

            setResults(sortedData);
            setBrands(uniqueBrands(sortedData));
            setFilteredResults(sortedData);
            setError('');
            setSearchSubmitted(true);
        } catch (error) {
            setError('Failed to fetch data. Please try again.')
        }
    };

    const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value;
        setSelectedBrand(selected);

        if (selected) {
            const filtered = results.filter((item) => item.brand === selected);
            setFilteredResults(filtered);
        } else {
            setFilteredResults(results);
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
            {results.length > 0 && (
                <div className="filter-container">
                    <label htmlFor="brand-filter">Filter by Brand:</label>
                    <select id="brand-filter" value={selectedBrand} onChange={handleBrandChange}>
                        <option value="">All Brands</option>
                        {brands.map((brand, index) => (
                            <option key={index} value={brand}>
                                {brand}
                            </option>
                        ))}
                    </select>
                </div>)}
            {results.length === 0 && searchSubmitted &&
                <p>{error ? error : 'No results found please try another term'}</p>}
            {results.length === 0 && <img className="search-image" src={searchIcon} alt="search icon and produce" />}
            <div className="search-results">
                {filteredResults.map((item, index) => (
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
};

export default Search;

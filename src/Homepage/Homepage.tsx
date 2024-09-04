import React, { useEffect, useState } from 'react';
import './Homepage.css';
import groceryHero from '../resources/groceries-hero.png'
import AddButton from '../AddButton/AddButton';

interface FoodItem {
  foodId: string;
  label: string;
  brand?: string;
  category?: string;
  image?: string;
}

interface Hint {
  food: FoodItem;
}

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

  }
]

const Homepage = () => {
  const [data, setData] = useState<FoodItem[] | null>(mockData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const APP_ID = process.env.REACT_APP_API_ID;
  const APP_KEY = process.env.REACT_APP_API_KEY;
  const query = ['generic-foods'];

  useEffect(() => {
    // fetch(`https://api.edamam.com/api/food-database/v2/parser?category=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data.hints)
    //     const shapedData: FoodItem[] = data.hints.map((item: Hint) => ({
    //       foodId: item.food.foodId,
    //       label: item.food.label,
    //       brand: item.food.brand,
    //       category: item.food.category,
    //       image: item.food.image
    //     }));
    //     setData(shapedData);
    //   })
    //   .catch(error => {
    //     setError(error);
    //     setLoading(false);
    //   });
  }, []);

  return (
    <div>
      <section>
        <img src={groceryHero} alt="banner of food" className="home-hero-image" />
      </section>
      <section>
        <p>Shop Popular Items</p>
        <div className="home-items-container">
          {data?.map((item: any, index: number) => (
            <div className="home-item" key={index}>
              {item.image && (
                <>
                  <img src={item.image} alt={item.label} className="home-item-image" />
                  <p>{item.label}</p>
                  <AddButton />
                </>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Homepage
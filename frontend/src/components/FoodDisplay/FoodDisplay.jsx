import React, { useContext } from 'react';
import './FoodDisplay.css';
import { storeContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
// import { food_list } from '../../assets/assets'
const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(storeContext);

  if (!food_list || food_list.length === 0) {
    // console.log("Food list is empty");
    return <p>No food items available.</p>;
  }

  return (
    <div className='food-display' id='food-display'>
      <h2>Top Dishes</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (category === item.category || category === 'All') {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                price={item.price}
                description={item.description}
                image={item.image}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;

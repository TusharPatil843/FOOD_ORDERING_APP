import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets';
import { storeContext } from '../../context/StoreContext';
// import food_home from '/public/food-home.jpg'
// import { rating_stars } from '../../assets/assets'


const FoodItem = ({id,name,price,description,image}) => {

  
  const {cartItems,addToCart,removeFromCart , url} = useContext(storeContext);
  return (
    <div className='food-item' id={`food-item-${id}`}>
        <div className="food-item-img-container">
            <img className="food-item-img"src={url+"/images/"+image} alt="" />
              {
              !cartItems[id]
              ?<img onClick={() =>addToCart(id)} className="add" src={assets.add_icon_white} alt=""/>
              :
              <div className="food-item-counter">
                  <img onClick={() =>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                  <p>{cartItems[id]}</p>
                  <img onClick={() =>addToCart(id)} src={assets.add_icon_green} alt="" />
              </div>
              }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p className="food-item-name">{name}</p>
                <img src={assets.rating_stars} alt="" />
            </div>
            <p className="food-item-desc">{description}</p>
            <p className="food-item-price">${price}</p>
        </div>
      
    </div>
  )
}

export default FoodItem

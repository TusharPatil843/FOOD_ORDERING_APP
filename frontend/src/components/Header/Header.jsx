import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
      <div className="header-contents">
        <h2>Order your food online </h2>
        <p>Craving something tasty? From classic comfort food to healthy meals, we deliver it hot and fresh. Whether you're at home or work, your favorite food is just a few clicks away — fast, safe, and satisfying every time!</p> 
        <button><a href='#explore-menu'>View Menu</a></button>
      </div>
      
    </div>
  )
}

export default Header

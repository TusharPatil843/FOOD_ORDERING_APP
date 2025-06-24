import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>

      <h1>Explore delicious dishes </h1>
      <p className="explore-menu-text">Browse a wide range of freshly prepared meals made with quality ingredients and love. From spicy Indian curries to cheesy Italian pastas, and from healthy salads to indulgent desserts — we bring you a mix of flavors you'll love. Quick to order, easy to enjoy — your hunger has met its match. Taste the difference with every bite.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item , index)=> {
          return (
            <div key={index} onClick={()=>setCategory(prev=> prev === item.menu_name?"All":item.menu_name)} className="explore-menu-list-item">
              <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
              <p>{item.menu_name}</p>
            </div>
          )
        })}
        

      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu

import React from 'react'
import "./Navbar.css"
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar'>
      <NavLink to='/list' >
      <img src={assets.logo} alt="Logo" className="logo" />
      </NavLink>
      
      <img src={assets.profile_image} alt="prof" className="profile" />
    </div>
  )
}


export default Navbar

import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="logo" />
            <p>Tomato brings your favorite meals to your doorstep, hot and fresh. Whether you're craving comfort food or exploring new cuisines, we've got you covered with fast delivery, great taste, and unmatched convenience.</p>
            <div className="footer-social-icons">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <img src={assets.facebook_icon} alt="Facebook" />
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                    <img src={assets.twitter_icon} alt="Twitter" />
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                    <img src={assets.linkedin_icon} alt="LinkedIn" />
                </a>

            </div>

        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li><Link to="/" >Home</Link></li>
                <li><a href="#footer">About us</a></li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>Contact us</h2>
            <ul>
                <li><a href="tel:9022501075">9022501075</a></li>
                <li><a href="mailto:patil.tusharp09@gmail.com">patil.tusharp09@gmail.com</a></li>
            </ul>
        </div>
        </div>
        <hr />
        <p className="footer-copyrigh   t">Copyrights reserved © 2025</p>
    </div>
  )
}

export default Footer

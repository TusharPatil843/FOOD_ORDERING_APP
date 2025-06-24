import React from 'react'
import './AppDownLoad.css'
import { assets } from '../../assets/assets'
const AppDownLoad = () => {
  return (
    <div className='app-download' id='app-download'>
        <p>For better experience, download our app</p>
        <div className="app-download-platforms">
            <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
              <img src={assets.play_store} alt="Google Play Store" />
            </a>

            <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
              <img src={assets.app_store} alt="Apple App Store" />
            </a>
    
        </div>
      
    </div>
  )
}

export default AppDownLoad

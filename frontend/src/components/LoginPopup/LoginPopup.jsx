import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { storeContext } from '../../context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets'

const LoginPopup = ({setShowLogin}) => {

  const {url , setToken} = useContext(storeContext)

  const[currState , setcurrState] = useState("Login")
  const [data , setData] = useState({
    name : "",
    email : "",
    password : ""
  })

  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({...prevData, [name]: value}))
  }

  const onLogin = async(event) =>{
    event.preventDefault();

    let newUrl = url;
    if(currState === "Login"){
      newUrl += "/api/user/login"
    }
    else{
      newUrl += "/api/user/register"
    }

    const response = await axios.post(newUrl,data);

    if(response.data.success) {
      setToken(response.data.token)
      localStorage.setItem("token",response.data.token)
      setShowLogin(false)
    }
    else{
      alert(response.data.message)
    }

  }

 


  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="cross" />
        </div>
        <div className="login-popup-inputs">
        {currState === "Sign up" ? <input name='name' onChange={onChangeHandler} type="text" value={data.name} placeholder='Enter your name' required/>:""}
          <input onChange={onChangeHandler} name='email' value={data.email} type="text" placeholder='Enter your email' required/>
          <input onChange={onChangeHandler} name='password' value={data.password}  type="password" placeholder='Enter your password' required/>
        </div>
        {currState === "Sign up" ?
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>I agree to the T&Cs.</p>
        </div> :""}
        <button type='submit'>{currState === "Sign up" ? "Sign up" : "Login"}</button>
        
        {
          currState === "Login" ? 
          <p> Don't have an account? <span onClick={()=>setcurrState("Sign up")}>Sign up</span> 
          </p> :
          <p>Already have an account? <span onClick={()=>setcurrState("Login")}> Login</span> </p>
        }
      </form>
    </div>
  )
}

export default LoginPopup

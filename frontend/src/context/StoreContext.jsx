import axios from "axios";
import { createContext, useState } from "react";
// import { food_list } from "../assets/assets";
import { useContext } from "react";
import { useEffect } from "react";

export const storeContext = createContext(null)

const StoreContextProvider = (props) =>{

    const [cartItems , setCartItems] = useState({});
    const url = "http://localhost:4000"
    const[token,setToken] = useState("");
    const[food_list , setFoodList] = useState([]);

    const addToCart = async (itemId)=>{

        // THIS IS TO SHOW THE CHANGE AT USER'S SIDE
        if(!cartItems[itemId]){
            setCartItems((prev) => ({...prev, [itemId]: 1}));
        }
        else{
            setCartItems((prev) => ({...prev, [itemId]: prev[itemId] +1}));
        }

        // THIS IS FOR DATABASE SIDE
        if(token){
            await axios.post(url+"/api/cart/add",{itemId}, {headers : {token}})
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            const updated = { ...prev, [itemId]: prev[itemId] - 1 };
            if (updated[itemId] <= 0) delete updated[itemId];
            return updated;
        });
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
    }

    const loadCartData = async (token) =>{
        const response = await axios.post(url+"/api/cart/get" , {} , {headers : {token}});

        setCartItems(response.data.cartData);
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;

        for(const item in cartItems){
            if(cartItems[item] > 0){
            let itemInfo = food_list.find((product) => product._id === item);
            totalAmount += itemInfo.price * cartItems[item];
        }
        }

        return totalAmount;
    }

    const fetchFoodList = async () =>{
        const response = await axios.get(url+"/api/food/list");
        setFoodList(response.data.data)
    }

    useEffect( () =>{
       
        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"))
            }
        }

        loadData();
    },[])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }

    return (
        <storeContext.Provider value={contextValue}>
            {props.children}
        </storeContext.Provider>
    )
}

export default StoreContextProvider;
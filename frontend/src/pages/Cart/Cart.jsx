import React, { useContext , useEffect } from "react";
import "./Cart.css";
import { storeContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets"; // Uncomment if you need to use assets

const Cart = ({ setShowLogin }) => {
  const { cartItems, food_list, removeFromCart , addToCart , getTotalCartAmount , url,token} = useContext(storeContext);

  const navigate = useNavigate();

  const isCartEmpty = !food_list.some(item => cartItems[item._id] > 0);

  return (
    <div className="cart">
      {isCartEmpty ? (
        <div style={{
          minHeight: "40vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#49557e"
        }}>
          <img
            src={assets.basket_icon}
            alt="Empty Cart"
            style={{ width: 100, marginBottom: 24, opacity: 0.5 }}
          />
          <h2 style={{ marginBottom: 8 }}>Your cart is empty</h2>
          <p style={{ marginBottom: 24 }}>Looks like you haven't added anything yet.</p>
          <button
            style={{
              background: "tomato",
              color: "#fff",
              border: "none",
              borderRadius: 20,
              padding: "12px 32px",
              fontSize: 18,
              cursor: "pointer"
            }}
            onClick={() => navigate("/")}
          >
            Browse Menu
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            <div className="cart-items-title">
              <p>Items</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
            </div>
            <br />
            <hr />
            {food_list.map((item, index) => {
              if (cartItems[item._id] > 0) {
                return (
                  <div key={index}>
                    <div className="cart-items-title cart-items-item">
                      <img src={url + "/images/" + item.image} alt="img" />
                      <p>{item.name}</p>
                      <p>${item.price}</p>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <img
                          onClick={() => removeFromCart(item._id)}
                          src={assets.remove_icon_red}
                          alt="remove"
                          className="cart-qty-btn"
                          style={{ cursor: "pointer", width: "25px", height: "25px", background: "#ffeaea", borderRadius: "50%" }}
                        />
                        <span>{cartItems[item._id]}</span>
                        <img
                          onClick={() => addToCart(item._id)}
                          src={assets.add_icon_green}
                          alt="add"
                          className="cart-qty-btn"
                          style={{ cursor: "pointer", width: "25px", height: "25px", background: "#eaffea", borderRadius: "50%" }}
                        />
                      </div>
                      <p>${item.price * cartItems[item._id]}</p>
                    </div>
                    <hr />
                  </div>
                );
              }
            })}
          </div>
          <div className="cart-bottom">
            <div className="cart-total">
              <h2>Cart Totals</h2>
              <div>
                <div className="cart-total-details">
                  <p>Subtotal</p>
                  <p>${getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <p>Delivery Fee</p>
                  <p>${getTotalCartAmount() > 0 ? 3 : 0}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <b>Total</b>
                  <b>${getTotalCartAmount() > 0 ? getTotalCartAmount() + 3 : 0}</b>
                </div>
              </div>
              <button onClick={() => navigate('/order')}>Proceed To Checkout</button>
            </div>
            <div className="cart-promocode">
              <div>
                <p>Enter a Promo-Code if you have one.</p>
                <div className="cart-promocode-input">
                  <input type="text" placeholder="Promocode" />
                  <button>Apply</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

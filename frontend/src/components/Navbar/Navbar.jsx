import React, { useContext, useState, useRef } from 'react'
import './Navbar.css'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { storeContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';

const Navbar = ({setShowLogin}) => {
    const [menu, setMenu] = useState("Home");
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const searchInputRef = useRef(null);

    const { getTotalCartAmount, token, setToken, food_list } = useContext(storeContext);
    const navigate = useNavigate();
    const location = useLocation();

    // Helper to navigate to home and scroll to section
    const goToSection = (sectionId) => {
      if (location.pathname !== "/") {
        navigate("/", { replace: false });
        // Wait for navigation to finish, then scroll
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 100); // Delay to allow home to render
      } else {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    };

    const logout = () => {
      localStorage.removeItem("token");
      setToken("");
      navigate("/");
    };

    // Handle search icon click
    const handleSearchIconClick = () => {
      setShowSearch((prev) => !prev);
      setSearchQuery("");
      setSearchResults([]);
      setTimeout(() => {
        if (searchInputRef.current) searchInputRef.current.focus();
      }, 100);
    };

    // Handle search input
    const handleSearchChange = (e) => {
      const value = e.target.value;
      setSearchQuery(value);
      if (value.trim() === "") {
        setSearchResults([]);
        return;
      }
      const results = food_list.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(results);
    };

    // Optional: Scroll to item on homepage if needed
    const handleResultClick = (item) => {
      navigate("/");
      setShowSearch(false);
      setSearchQuery("");
      setSearchResults([]);
      setTimeout(() => {
        const el = document.getElementById(`food-item-${item._id}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 200);
    };

    return (
      <div className='navbar'>
        <Link to='/'>
          <img src={assets.logo} alt="Logo" className='logo' />
        </Link>
        <ul className='navbar-menu'>
          <Link to='/' onClick={() => setMenu("Home")} className={menu === 'Home' ? "active" : ""}>Home</Link>
          <span onClick={() => { setMenu("Menu"); goToSection("explore-menu"); }} className={menu === 'Menu' ? "active" : ""} style={{ cursor: "pointer" }}>Menu</span>
          <span onClick={() => { setMenu("mobile-app"); goToSection("app-download"); }} className={menu === 'mobile-app' ? "active" : ""} style={{ cursor: "pointer" }}>Get App</span>
          <span onClick={() => { setMenu("contact-us"); goToSection("footer"); }} className={menu === 'contact-us' ? "active" : ""} style={{ cursor: "pointer" }}>Contact Us</span>
        </ul>
        <div className="navbar-right">
          <div className="navbar-search-icon" style={{ position: "relative" }}>
            <img
              src={assets.search_icon}
              alt="search_icon"
              style={{ cursor: "pointer" }}
              onClick={handleSearchIconClick}
            />
            {showSearch && (
              <div className="navbar-search-bar">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search food..."
                  className="navbar-search-input"
                />
                <span
                  className="navbar-search-cancel"
                  onClick={() => {
                    setShowSearch(false);
                    setSearchQuery("");
                    setSearchResults([]);
                  }}
                  title="Cancel search"
                >
                  &#10005;
                </span>
                {searchResults.length > 0 && (
                  <ul className="navbar-search-results">
                    {searchResults.map(item => (
                      <li key={item._id} onClick={() => handleResultClick(item)}>
                        {item.name}
                      </li>
                    ))}
                  </ul>
                )}
                {searchQuery && searchResults.length === 0 && (
                  <div className="navbar-search-noresult">No items found</div>
                )}
              </div>
            )}
          </div>
          <div className="navbar-search-icon">
              <Link to='/cart'> <img src={assets.basket_icon} alt="basket_icon" /> </Link>
              <div className={getTotalCartAmount() > 0 ?"dot":""}></div>
          </div>
          {!token && <button onClick={()=> setShowLogin(true)}>Sign in</button>}
          {token && 
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="profile" />
            <ul className="nav-profile-dropdown">
              <li onClick={ ()=> navigate('/myOrders')}> <img src={assets.bag_icon} alt="" /> <p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" /> <p>Logout</p></li>
            </ul>
          </div>
            }
        </div>
      </div>
    );
};

export default Navbar;

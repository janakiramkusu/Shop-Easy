import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../styles/header.css';
import { FaHome, FaSignOutAlt, FaShoppingCart } from 'react-icons/fa';

function Header() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header">
      <Link to="/" className="logo">ShopEasy</Link>
      <nav>
        <Link to="/" className="nav-icon"><FaHome /> Home</Link>

        <div className="cart-link">
          <Link to="/cart" className="nav-icon">
            <FaShoppingCart /> Cart
          </Link>
          {totalQuantity > 0 && (
            <span className="cart-count">{totalQuantity}</span>
          )}
        </div>

        <button className="nav-icon logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </nav>
    </header>
  );
}

export default Header;

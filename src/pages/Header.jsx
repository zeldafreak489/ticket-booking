import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css'; 
import { useCart } from '../contexts/CartContext';

const Header = () => {
    // State to manage login/logout status
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const { cartItems } = useCart(); // <-- Use cart context
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0); 

    // Listen for auth changes
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setIsLoggedIn(!!user); // true if user exists, false if not
    });

      return () => unsubscribe(); // cleanup
    }, []);

    // Handle login/logout click
    const handleLoginLogout = () => {
      if (isLoggedIn) {
        signOut(auth)
          .then(() => {
            alert('Logged out!');
            navigate('/login');
          })
          .catch((error) => {
            console.error(error.message);
            alert('Error logging out');
          });
      } else {
        navigate('/login'); // Redirect to login page
      }
    };

  return (
    <header className="header">
      <h1 className="header-title">BookTix</h1>
      <p className="header-subtitle">Discover exciting events and festivals</p>

      <nav className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item"><a href="/" className="navbar-link">Home</a></li>
          <li className="navbar-item"><a href="/contact" className="navbar-link">Contact</a></li>
          <li className="navbar-item">
            <a href="/cart" className="navbar-link">
              Cart {totalItems > 0 && <span className="cart-count">({totalItems})</span>}
            </a>
          </li>
          <li className="navbar-item"><a href="/profile" className="navbar-link">Profile</a></li>
          <li className="navbar-item">
            <button onClick={handleLoginLogout} className="navbar-button">
              {isLoggedIn ? 'Logout' : 'Login'}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

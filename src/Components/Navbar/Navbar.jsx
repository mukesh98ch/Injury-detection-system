import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
   
    <nav className="navbar">
        
      <div className="navbar-brand">
        <Link to="/">Injury Tracking</Link>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link to="/list">List</Link>
        </li>
        <li className="nav-item">
          <Link to="/analytics">Analytics</Link>
        </li>
      </ul>
    </nav>
    
  );
};

export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Tender Management</Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/tenders" className="nav-links">Tenders</Link>
          </li>
          <li className="nav-item">
            <Link to="/admin" className="nav-links">Admin Panel</Link>
          </li>
          <li className="nav-item">
            <Link to="/bids" className="nav-links">Bids Management</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;

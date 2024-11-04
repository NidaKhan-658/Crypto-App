import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>CryptoApp</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink to="/" activeClassName="active-link">
              <i className="fas fa-home"></i>
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/market" activeClassName="active-link">
              <i className="fas fa-chart-line"></i>
              <span>Market</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/portfolio" activeClassName="active-link">
              <i className="fas fa-wallet"></i>
              <span>Portfolio</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/news" activeClassName="active-link">
              <i className="fas fa-newspaper"></i>
              <span>News</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" activeClassName="active-link">
              <i className="fas fa-cog"></i>
              <span>Settings</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

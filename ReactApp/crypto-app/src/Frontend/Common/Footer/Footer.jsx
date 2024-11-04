import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';
import  { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from  'react-icons/fa';


const Footer = () => {
  return (
    <footer className="footer bg-dark text-light pt-4">
      <div className="container">
        <div className="row">
          {/* About Section */}
          <div className="col-md-3 mb-3">
            <h5>About QuantumFi</h5>
            <p>QuantumFi is your trusted platform for managing, trading, and exploring cryptocurrencies.</p>
          </div>

          {/* Quick Links */}
          <div className="col-md-3 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><NavLink to="/" className="footer-link">Home</NavLink></li>
              <li><NavLink to="/market" className="footer-link">Market</NavLink></li>
              <li><NavLink to="/portfolio" className="footer-link">Portfolio</NavLink></li>
              <li><NavLink to="/support" className="footer-link">Support</NavLink></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="col-md-3 mb-3">
            <h5>Connect with Us</h5>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="me-3">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="me-3">
                <FaTwitter/>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="me-3">
                <FaLinkedinIn/>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram/>
              </a>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="col-md-3 mb-3">
            <h5>Disclaimer</h5>
            <p>Trading in cryptocurrencies involves significant risk and may not be suitable for all investors. Please seek advice from a financial advisor.</p>
          </div>
        </div>
        <div className="footer-bottom text-center pt-3">
          <p>&copy; {new Date().getFullYear()} QuantumFi. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

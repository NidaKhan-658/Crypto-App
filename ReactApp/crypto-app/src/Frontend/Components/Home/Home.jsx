import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <header className="home-header">
        <h1>Welcome to QuantumFi</h1>
        <p>Your one-stop solution for managing cryptocurrencies.</p>
      </header>

      <h2 className="mt-5">Features</h2>
      <section className="features d-flex justify-content-center gap-4 flex-wrap">
        <div className="feature-item">
          <h3>Market Overview</h3>
          <p>Stay updated with real-time market data and analytics.</p>
        </div>
        <div className="feature-item">
          <h3>Portfolio Management</h3>
          <p>Manage your cryptocurrency holdings effortlessly.</p>
        </div>
        <div className="feature-item">
          <h3>Latest News</h3>
          <p>Get the latest news and trends in the cryptocurrency world.</p>
        </div>
      </section>

      <section className="news mt-5">
        <h2>Latest News</h2>
        <ul>
          <li>Bitcoin reaches new all-time high! 🚀</li>
          <li>Ethereum 2.0 upgrade is on the way! 🔄</li>
          <li>Cardano announces exciting new partnerships! 🤝</li>
        </ul>
      </section>
    </div>
  );
};

export default Home;

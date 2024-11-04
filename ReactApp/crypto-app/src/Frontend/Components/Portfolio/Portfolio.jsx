import React, { useEffect, useState } from 'react';
import './Portfolio.css';

const Portfolio = ({ transactions }) => {
  const [holdings, setHoldings] = useState([
    { id: 1, name: 'Bitcoin', symbol: 'BTC', quantity: 0.5, price: 40000 },
    { id: 2, name: 'Ethereum', symbol: 'ETH', quantity: 2, price: 2500 },
    { id: 3, name: 'Cardano', symbol: 'ADA', quantity: 100, price: 2.1 },
    // Add more holdings as needed
  ]);

  useEffect(() => {
    if (transactions) {
      updatePortfolio(transactions);
    }
  }, [transactions]);

  const totalValue = holdings.reduce((acc, holding) => acc + (holding.quantity * holding.price), 0).toFixed(2);

  const updatePortfolio = (transaction) => {
    const { name, symbol, quantity, price } = transaction;
    setHoldings(prevHoldings => {
      // Check if the holding already exists
      const existingHolding = prevHoldings.find(holding => holding.name === name);
      if (existingHolding) {
        // Update existing holding quantity
        const updatedHoldings = prevHoldings.map(holding => {
          if (holding.name === name) {
            const newQuantity = holding.quantity + quantity;
            return {
              ...holding,
              quantity: newQuantity > 0 ? newQuantity : 0 // Ensure quantity does not go negative
            };
          }
          return holding;
        });
        return updatedHoldings;
      } else {
        // Add new holding if it's a buy transaction
        if (quantity > 0) {
          return [...prevHoldings, { id: Date.now(), name, symbol, quantity, price }];
        }
        return prevHoldings; // Return unchanged if selling non-existent holding
      }
    });
  };

  const handleRemove = (id) => {
    setHoldings(holdings.filter(holding => holding.id !== id));
  };

  return (
    <div className="portfolio">
      <header className="portfolio-header">
        <h1>Your Portfolio</h1>
        <h2>Total Value: ${totalValue}</h2>
      </header>

      <table className="portfolio-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Quantity</th>
            <th>Price (USD)</th>
            <th>Value (USD)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((holding, index) => (
            <tr key={holding.id}>
              <td>{index + 1}</td>
              <td>{holding.name}</td>
              <td>{holding.symbol}</td>
              <td>{holding.quantity}</td>
              <td>${holding.price.toLocaleString()}</td>
              <td>${(holding.quantity * holding.price).toFixed(2)}</td>
              <td>
                <button className="remove-button" onClick={() => handleRemove(holding.id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Portfolio;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Market.css";

const Market = ({ onTransaction }) => {
  const [marketData, setMarketData] = useState({});
  const [topCryptos, setTopCryptos] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [actionType, setActionType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const cryptoPerPage = 10;

  const fetchMarketData = async () => {
    try {
      const response = await axios.get(
        "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=100&tsym=USD"
      );
      const data = response.data.Data;
      setTopCryptos(data);

      const totalVolume = data.reduce(
        (sum, crypto) => sum + parseFloat(crypto.DISPLAY?.USD.VOLUME24HOURTO || 0),
        0
      );
      const totalMarketCap = data.reduce(
        (sum, crypto) => sum + parseFloat(crypto.DISPLAY?.USD.MKTCAP || 0),
        0
      );

      setMarketData({
        totalVolume: totalVolume.toLocaleString(),
        totalMarketCap: totalMarketCap.toLocaleString(),
        btcDominance: "45.7%",
        ethDominance: "18.2%",
        marketChange: "+2.3%",
      });
    } catch (error) {
      console.error("Error fetching market data:", error);
    }
  };

  useEffect(() => {
    fetchMarketData();
  }, []);

  const totalPages = Math.ceil(topCryptos.length / cryptoPerPage);
  const indexOfLastCrypto = currentPage * cryptoPerPage;
  const indexOfFirstCrypto = indexOfLastCrypto - cryptoPerPage;
  const currentCryptos = topCryptos.slice(indexOfFirstCrypto, indexOfLastCrypto);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleActionClick = (crypto, action) => {
    setSelectedCrypto(crypto);
    setActionType(action);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedCrypto(null);
    setActionType("");
    setQuantity(1);
    setError(null);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const calculateTotalPrice = () => {
    const price =
      parseFloat(
        selectedCrypto?.DISPLAY?.USD.PRICE.replace(/[^0-9.-]+/g, "")
      ) || 0;
    return (price * quantity).toFixed(2);
  };

  const handleConfirmTransaction = async () => {
    if (selectedCrypto && actionType && quantity > 0) {
      const transactionData = {
        name: selectedCrypto.CoinInfo.FullName,
        symbol: selectedCrypto.CoinInfo.Name,
        quantity: actionType === "Sell" ? -quantity : quantity,
        price: parseFloat(
          selectedCrypto.DISPLAY?.USD.PRICE.replace(/[^0-9.-]+/g, "")
        ),
      };

      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.post("http://localhost:3000/transaction", transactionData);
        console.log("Transaction successful:", response.data);

        if (onTransaction) {
          onTransaction(transactionData);
        }
        closeModal();
      } catch (err) {
        console.error("Error posting transaction:", err);
        setError("Failed to complete the transaction. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="market-overview">
      <header className="market-header">
        <h1>Market Overview</h1>
        <div className="market-stats">
          <div className="stat-item">
            <h2>Total Market Cap</h2>
            <p>${marketData.totalMarketCap}</p>
          </div>
          <div className="stat-item">
            <h2>Total Volume (24h)</h2>
            <p>${marketData.totalVolume}</p>
          </div>
          <div className="stat-item">
            <h2>BTC Dominance</h2>
            <p>{marketData.btcDominance}</p>
          </div>
          <div className="stat-item">
            <h2>ETH Dominance</h2>
            <p>{marketData.ethDominance}</p>
          </div>
          <div className="stat-item">
            <h2>Market Change (24h)</h2>
            <p className={marketData.marketChange}>{marketData.marketChange}</p>
          </div>
        </div>
      </header>

      <div className="top-cryptos">
        <h2>Top Cryptocurrencies</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Symbol</th>
              <th>Price (USD)</th>
              <th>24h Change (%)</th>
              <th>Volume (24h)</th>
              <th>Market CAP</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCryptos.map((crypto, index) => (
              <tr key={index}>
                <td>{indexOfFirstCrypto + index + 1}</td>
                <td>{crypto.CoinInfo.FullName}</td>
                <td>{crypto.CoinInfo.Name}</td>
                <td>{crypto.DISPLAY?.USD.PRICE}</td>
                <td className={crypto.DISPLAY?.USD.CHANGEPCT24HOUR}>
                  {crypto.DISPLAY?.USD.CHANGEPCT24HOUR}%
                </td>
                <td>{crypto.DISPLAY?.USD.VOLUME24HOURTO}</td>
                <td>{crypto.DISPLAY?.USD.MKTCAP}</td>
                <td>
                  <button
                    className="action-button buy"
                    onClick={() => handleActionClick(crypto, "Buy")}
                  >
                    Buy
                  </button>
                  <button
                    className="action-button sell bg-danger"
                    onClick={() => handleActionClick(crypto, "Sell")}
                  >
                    Sell
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalVisible && selectedCrypto && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{actionType} Confirmation</h2>
            <p>
              Are you sure you want to {actionType.toLowerCase()}{" "}
              <strong>{selectedCrypto.CoinInfo.FullName}</strong>?
            </p>
            <p>Price: {selectedCrypto.DISPLAY?.USD.PRICE}</p>

            <div className="quantity-input">
              <label>Quantity:</label>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
              />
            </div>

            <p>Total Price (USD): ${calculateTotalPrice()}</p>

            {error && <p className="error-message">{error}</p>}

            <div className="modal-actions">
              <button
                className="confirm-button"
                onClick={handleConfirmTransaction}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Confirm"}
              </button>
              <button className="cancel-button" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="pagination d-flex justify-content-center align-items-center">
        <button
          className="btn btn-outline-primary me-2"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-outline-primary ms-2"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Market;

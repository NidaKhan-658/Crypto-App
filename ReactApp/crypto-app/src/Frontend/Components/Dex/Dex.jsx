import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dex.css";

const DEXPage = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("All"); // New state for selected filter
  const cryptoPerPage = 10;

  const handleGetData = async () => {
    const data = await axios.get(
      "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=80&tsym=USD"
    );
    setCryptoData(data.data.Data);
  };

  useEffect(() => {
    handleGetData();
  }, []);

  // Filter the data based on the selected filter
  const getFilteredData = () => {
    if (selectedFilter === "Top Gainers") {
      return cryptoData
        .filter((crypto) => parseFloat(crypto.DISPLAY?.USD.CHANGEPCT24HOUR) > 0)
        .sort((a, b) => b.DISPLAY.USD.CHANGEPCT24HOUR - a.DISPLAY.USD.CHANGEPCT24HOUR);
    } else if (selectedFilter === "Top Losers") {
      return cryptoData
        .filter((crypto) => parseFloat(crypto.DISPLAY?.USD.CHANGEPCT24HOUR) < 0)
        .sort((a, b) => a.DISPLAY.USD.CHANGEPCT24HOUR - b.DISPLAY.USD.CHANGEPCT24HOUR);
    } else if (selectedFilter === "High Volume") {
      return cryptoData
        .filter((crypto) => parseFloat(crypto.DISPLAY?.USD.VOLUME24HOURTO) > 0)
        .sort((a, b) => b.DISPLAY.USD.VOLUME24HOURTO - a.DISPLAY.USD.VOLUME24HOURTO);
    } else {
      return cryptoData; // Default to showing all cryptos
    }
  };

  const filteredData = getFilteredData();

  // Calculate the total number of pages based on filtered data
  const totalPages = Math.ceil(filteredData.length / cryptoPerPage);

  // Define the current data to be displayed based on pagination
  const indexOfLastCrypto = currentPage * cryptoPerPage;
  const indexOfFirstCrypto = indexOfLastCrypto - cryptoPerPage;
  const currentCryptos = filteredData.slice(indexOfFirstCrypto, indexOfLastCrypto);

  // Pagination controls
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Set filter and reset pagination
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setCurrentPage(1);
  };

  return (
    <div className="dex-page">
      <header className="dex-header">
        <h1>Dex Scan</h1>
        <div className="dex-filters">
          <button
            className={`filter-button ${selectedFilter === "All" ? "active" : ""}`}
            onClick={() => handleFilterChange("All")}
          >
            All Cryptos
          </button>
          <button
            className={`filter-button ${selectedFilter === "Top Gainers" ? "active" : ""}`}
            onClick={() => handleFilterChange("Top Gainers")}
          >
            Top Gainers
          </button>
          <button
            className={`filter-button ${selectedFilter === "Top Losers" ? "active" : ""}`}
            onClick={() => handleFilterChange("Top Losers")}
          >
            Top Losers
          </button>
          <button
            className={`filter-button ${selectedFilter === "High Volume" ? "active" : ""}`}
            onClick={() => handleFilterChange("High Volume")}
          >
            High Volume
          </button>
        </div>
      </header>

      <div className="dex-table">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Symbol</th>
              <th>Price (USD)</th>
              <th>24h Change (%)</th>
              <th>Volume (24h)</th>
              <th>Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {currentCryptos.map((crypto, index) => (
              <tr key={index}>
                <td>{indexOfFirstCrypto + index + 1}</td>
                <td>{crypto.CoinInfo.FullName}</td>
                <td>{crypto.CoinInfo.Name}</td>
                <td>{crypto.DISPLAY?.USD.PRICE}</td>
                <td className={parseFloat(crypto.DISPLAY?.USD.CHANGEPCT24HOUR) >= 0 ? "positive" : "negative"}>
                  {crypto.DISPLAY?.USD.CHANGEPCT24HOUR} %
                </td>
                <td>{crypto.DISPLAY?.USD.VOLUME24HOURTO}</td>
                <td>{crypto.DISPLAY?.USD.MKTCAP}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination */}
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
    </div>
  );
};

export default DEXPage;

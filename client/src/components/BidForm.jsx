import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Biddetails() {
  const [bids, setBids] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBids();
  }, [searchTerm]);

  const fetchBids = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/bid`, {
        params: { companyName: searchTerm }
      });
      setBids(response.data);
    } catch (error) {
      setError('Error fetching bids');
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="bid-list">
      <h1>All Bids</h1>
      <input
        type="text"
        placeholder="Search by company name"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      {error && <p className="error">{error}</p>}
      <table className="bid-table">
        <thead>
          <tr>
            <th>Tender Name</th>
            <th>Company Name</th>
            <th>Cost</th>
            <th>Bid Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bids.length > 0 ? (
            bids.map((bid) => (
              <tr key={bid._id}>
                <td>{bid.tenderId ? bid.tenderId.name : 'N/A'}</td>
                <td>{bid.companyName}</td>
                <td>{bid.cost}</td>
                <td>{new Date(bid.bidTime).toLocaleString()}</td>
                <td>{bid.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>No bids available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Biddetails;

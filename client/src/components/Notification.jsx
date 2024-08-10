// components/BidList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BidList = () => {
  const [bids, setBids] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/bid')
      .then(response => setBids(response.data))
      .catch(error => setError('Error fetching bids'));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Bids</h1>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {bids.length > 0 ? (
          bids.map(bid => (
            <li key={bid._id} style={{ marginBottom: '10px' }}>
              <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
                <p><strong>Tender ID:</strong> {bid.tenderId}</p>
                <p><strong>Company Name:</strong> {bid.companyName}</p>
                <p><strong>Cost:</strong> ${bid.cost}</p>
                <p><strong>Bid Time:</strong> {new Date(bid.bidTime).toLocaleString()}</p>
                <p><strong>Status:</strong> {bid.status}</p>
              </div>
            </li>
          ))
        ) : (
          <p style={{ textAlign: 'center' }}>No bids available</p>
        )}
      </ul>
    </div>
  );
};

export default BidList;

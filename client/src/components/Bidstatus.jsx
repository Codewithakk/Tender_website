import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BidManagementPage() {
  const [bids, setBids] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all bids when the component mounts
    const fetchBids = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/bid');
        setBids(response.data);
      } catch (error) {
        setError('Error fetching bids: ' + error.message);
      }
    };

    fetchBids();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/bid/${id}/status`, { status: newStatus });
      // Update the status locally without refetching
      setBids(bids.map(bid => (bid._id === id ? { ...bid, status: newStatus } : bid)));
    } catch (error) {
      setError('Error updating bid status: ' + error.message);
    }
  };

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Bid Management</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Bid ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Tender ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Company Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Cost</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Bid Time</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Status</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {bids.map(bid => (
            <tr key={bid._id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{bid._id}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{bid.tenderId}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{bid.companyName}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{bid.cost}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{new Date(bid.bidTime).toLocaleString()}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{bid.status}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <select
                  value={bid.status}
                  onChange={(e) => handleStatusChange(bid._id, e.target.value)}
                  style={{ padding: '5px', borderRadius: '4px' }}
                >
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BidManagementPage;

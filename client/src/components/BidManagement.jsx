import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Biddetails() {
  const [bids, setBids] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBid, setSelectedBid] = useState(null);
  const [newCost, setNewCost] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBids();
  }, [searchTerm]);

  const fetchBids = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/bid', {
        params: { companyName: searchTerm }
      });
      setBids(response.data);
    } catch (error) {
      setError('Error fetching bids: ' + error.message);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleUpdate = async (id) => {
    if (!newCost) {
      setError('Please provide a new cost.');
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/bid/${id}`, { cost: newCost });
      fetchBids(); // Refresh bid list after update
      setNewCost('');
      setError(null); // Clear any previous errors
    } catch (error) {
      setError('Error updating bid: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/bid/${id}`);
      fetchBids(); // Refresh bid list after deletion
      setError(null); // Clear any previous errors
    } catch (error) {
      setError('Error deleting bid: ' + error.message);
    }
  };

  const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    header: {
      marginBottom: '20px',
      color: '#333',
    },
    input: {
      padding: '10px',
      marginBottom: '20px',
      width: '100%',
      borderRadius: '4px',
      border: '1px solid #ddd',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    th: {
      backgroundColor: '#007bff',
      color: '#fff',
      padding: '10px',
      textAlign: 'left',
    },
    td: {
      padding: '10px',
      borderBottom: '1px solid #ddd',
    },
    button: {
      padding: '8px 12px',
      border: 'none',
      borderRadius: '4px',
      color: '#fff',
      cursor: 'pointer',
      marginRight: '5px',
    },
    updateButton: {
      backgroundColor: '#28a745',
    },
    deleteButton: {
      backgroundColor: '#dc3545',
    },
    error: {
      color: '#dc3545',
      marginBottom: '20px',
    },
    updateForm: {
      marginTop: '20px',
      padding: '15px',
      borderRadius: '4px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    formInput: {
      padding: '10px',
      marginBottom: '10px',
      width: '100%',
      borderRadius: '4px',
      border: '1px solid #ddd',
    },
    submitButton: {
      backgroundColor: '#28a745',
    },
    cancelButton: {
      backgroundColor: '#6c757d',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>BIDS DONE BY USERS</h1>
      <input
        type="text"
        placeholder="Search by company name"
        value={searchTerm}
        onChange={handleSearchChange}
        style={styles.input}
      />
      {error && <p style={styles.error}>{error}</p>}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Tender Name</th>
            <th style={styles.th}>Company Name</th>
            <th style={styles.th}>Cost</th>
            <th style={styles.th}>Bid Time</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bids.length > 0 ? (
            bids.map((bid) => (
              <tr key={bid._id}>
                <td style={styles.td}>{bid.tenderId ? bid.tenderId.name : 'N/A'}</td>
                <td style={styles.td}>{bid.companyName}</td>
                <td style={styles.td}>{bid.cost}</td>
                <td style={styles.td}>{new Date(bid.bidTime).toLocaleString()}</td>
                <td style={styles.td}>{bid.status}</td>
                <td style={styles.td}>
                  <button
                    onClick={() => setSelectedBid(bid)}
                    style={{ ...styles.button, ...styles.updateButton }}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(bid._id)}
                    style={{ ...styles.button, ...styles.deleteButton }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ ...styles.td, textAlign: 'center' }}>No bids available</td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedBid && (
        <div style={styles.updateForm}>
          <h2>Update Bid</h2>
          <p><strong>Bid ID:</strong> {selectedBid._id}</p>
          <p><strong>Current Cost:</strong> {selectedBid.cost}</p>
          <input
            type="number"
            placeholder="New Cost"
            value={newCost}
            onChange={(e) => setNewCost(e.target.value)}
            style={styles.formInput}
          />
          <button
            onClick={() => handleUpdate(selectedBid._id)}
            style={{ ...styles.button, ...styles.submitButton }}
          >
            Submit Update
          </button>
          <button
            onClick={() => setSelectedBid(null)}
            style={{ ...styles.button, ...styles.cancelButton }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default Biddetails;

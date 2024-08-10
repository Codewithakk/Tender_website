import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../styles/BidManagement.css';

function BidManagement() {
  const [bids, setBids] = useState([]);
  const [newBid, setNewBid] = useState({ companyName: '', cost: '', tenderId: '', status: 'pending' });
  const [selectedBid, setSelectedBid] = useState(null);
  const [bidIdToDelete, setBidIdToDelete] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBids();
  }, []);

  const fetchBids = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/bid');
      setBids(response.data);
    } catch (error) {
      setError('Error fetching bids: ' + error.message);
    }
  };

  const handleCreate = async () => {
    try {
      await axios.post('http://localhost:5000/api/bid', newBid);
      fetchBids(); // Refresh bid list after creation
      setNewBid({ companyName: '', cost: '', tenderId: '', status: 'pending' }); // Clear the form
      setError(null); // Clear any previous errors
    } catch (error) {
      setError('Error creating bid: ' + error.message);
    }
  };

  const handleUpdate = async () => {
    if (!selectedBid) {
      setError('No bid selected for update.');
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/bid/${selectedBid._id}`, newBid);
      fetchBids(); // Refresh bid list after update
      setError(null); // Clear any previous errors
    } catch (error) {
      setError('Error updating bid: ' + error.message);
    }
  };

  const handleDelete = async () => {
    if (!bidIdToDelete) {
      setError('No bid ID provided for deletion.');
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/bid/${bidIdToDelete}`);
      fetchBids(); // Refresh bid list after deletion
      setBidIdToDelete(''); // Clear the input field
      setError(null); // Clear any previous errors
    } catch (error) {
      setError('Error deleting bid: ' + error.message);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setBids(bids.map(bid => 
      bid._id === id ? { ...bid, status: newStatus } : bid
    ));
  };

  const handleStatusUpdate = async (id) => {
    const bid = bids.find(bid => bid._id === id);
    if (bid) {
      try {
        await axios.put(`http://localhost:5000/api/bid/bids/${id}/status`, { status: bid.status });
        fetchBids(); // Refresh bid list after status update
        setError(null); // Clear any previous errors
      } catch (error) {
        setError('Error updating bid status: ' + error.message);
      }
    }
  };

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      maxWidth: '800px',
      margin: 'auto',
    },
    header: {
      textAlign: 'center',
      color: '#333',
    },
    errorMessage: {
      color: 'red',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    formContainer: {
      margin: '20px 0',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold',
    },
    input: {
      width: 'calc(100% - 16px)',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box',
    },
    submitButton: {
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      padding: '10px 20px',
      cursor: 'pointer',
      borderRadius: '4px',
      fontSize: '16px',
      transition: 'background-color 0.3s, transform 0.3s',
    },
    submitButtonHover: {
      backgroundColor: '#0056b3',
      transform: 'scale(1.05)',
    },
    deleteButton: {
      backgroundColor: '#dc3545',
      transition: 'background-color 0.3s, transform 0.3s',
    },
    deleteButtonHover: {
      backgroundColor: '#c82333',
      transform: 'scale(1.05)',
    },
    actionButton: {
      backgroundColor: '#28a745',
      color: '#fff',
      border: 'none',
      padding: '5px 10px',
      cursor: 'pointer',
      borderRadius: '4px',
      fontSize: '14px',
      margin: '0 5px',
    },
    actionButtonHover: {
      backgroundColor: '#218838',
      transform: 'scale(1.05)',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Bids Management</h1>
      {error && <p style={styles.errorMessage}>{error}</p>}

      {/* Display Bids */}
      <div>
        <h2>All Bids</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Company Name</th>
              <th>Tender ID</th>
              <th>Cost</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bids.map((bid) => (
              <tr key={bid._id}>
                <td>{bid._id}</td>
                <td>{bid.companyName}</td>
                <td>{bid.tenderId ? bid.tenderId.name : 'N/A'}</td>
                <td>{bid.cost}</td>
                <td>
                  <select
                    value={bid.status}
                    onChange={(e) => handleStatusChange(bid._id, e.target.value)}
                    style={styles.input}
                  >
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
                <td>
                  <button
                    style={styles.actionButton}
                    onClick={() => handleStatusUpdate(bid._id)}
                  >
                    Submit Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Bid Form */}
      <div style={styles.formContainer}>
        <h2>Create Bid</h2>
        <div style={styles.formGroup}>
          <label style={styles.label}>Company Name:</label>
          <input
            type="text"
            value={newBid.companyName}
            onChange={(e) => setNewBid({ ...newBid, companyName: e.target.value })}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Tender ID:</label>
          <input
            type="text"
            value={newBid.tenderId}
            onChange={(e) => setNewBid({ ...newBid, tenderId: e.target.value })}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Cost:</label>
          <input
            type="number"
            value={newBid.cost}
            onChange={(e) => setNewBid({ ...newBid, cost: e.target.value })}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Status:</label>
          <select
            value={newBid.status}
            onChange={(e) => setNewBid({ ...newBid, status: e.target.value })}
            required
            style={styles.input}
          >
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <button
          style={styles.submitButton}
          onClick={handleCreate}
        >
          Create Bid
        </button>
      </div>

      {/* Update Bid Form */}
      <div style={styles.formContainer}>
        <h2>Update Bid</h2>
        <div style={styles.formGroup}>
          <label style={styles.label}>Select Bid ID:</label>
          <input
            type="text"
            value={selectedBid ? selectedBid._id : ''}
            onChange={(e) => {
              const bidId = e.target.value;
              setSelectedBid({ _id: bidId });
            }}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Company Name:</label>
          <input
            type="text"
            value={newBid.companyName}
            onChange={(e) => setNewBid({ ...newBid, companyName: e.target.value })}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Tender ID:</label>
          <input
            type="text"
            value={newBid.tenderId}
            onChange={(e) => setNewBid({ ...newBid, tenderId: e.target.value })}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Cost:</label>
          <input
            type="number"
            value={newBid.cost}
            onChange={(e) => setNewBid({ ...newBid, cost: e.target.value })}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Status:</label>
          <select
            value={newBid.status}
            onChange={(e) => setNewBid({ ...newBid, status: e.target.value })}
            required
            style={styles.input}
          >
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <button
          style={styles.submitButton}
          onClick={handleUpdate}
        >
          Update Bid
        </button>
      </div>

      {/* Delete Bid Form */}
      <div style={styles.formContainer}>
        <h2>Delete Bid</h2>
        <div style={styles.formGroup}>
          <label style={styles.label}>Bid ID:</label>
          <input
            type="text"
            value={bidIdToDelete}
            onChange={(e) => setBidIdToDelete(e.target.value)}
            style={styles.input}
          />
        </div>
        <button
          style={{ ...styles.submitButton, ...styles.deleteButton }}
          onClick={handleDelete}
        >
          Delete Bid
        </button>
      </div>
    </div>
  );
}

export default BidManagement;

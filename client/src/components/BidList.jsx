import React from 'react';
import { Link } from 'react-router-dom';

function BidManagementNavigation() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.header}>Bid Management</h1>
        <div style={styles.buttonContainer}>
          <Link to="/admin/bid-management/create" style={styles.link}>
            <button style={styles.button}>
              Manage Bids
            </button>
          </Link>
        </div>
        <div style={styles.buttonContainer}>
          <Link to="/admin/bid-management/view" style={styles.link}>
            <button style={styles.button}>
              View Bids
            </button>
          </Link>
        </div>
        <div style={styles.buttonContainer}>
          <Link to="/admin/bid-management/status" style={styles.link}>
            <button style={styles.button}>
              Update Bid Status
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#f0f4f8', // Light gray background
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    margin: 0,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#ffffff', // White background for content area
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    padding: '30px',
    maxWidth: '500px',
    width: '100%',
  },
  header: {
    marginBottom: '30px',
    color: '#333',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginBottom: '20px',
  },
  link: {
    textDecoration: 'none',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '12px 24px',
    fontSize: '18px',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'background-color 0.3s, transform 0.2s',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '10px',
    display: 'block',
    width: '100%',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
    transform: 'scale(1.05)',
  },
};

export default BidManagementNavigation;

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/tender.css';

function TenderManagement() {
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#f4f4f4',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    header: {
      marginBottom: '20px',
      color: '#333',
      fontSize: '24px',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '10px',
    },
    button: {
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      padding: '10px 20px',
      fontSize: '16px',
      cursor: 'pointer',
      borderRadius: '4px',
      textDecoration: 'none',
      textAlign: 'center',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Tender Management</h1>
      <div style={styles.buttonContainer}>
        <Link to="/admin/tender-management/create" style={{ textDecoration: 'none' }}>
          <button
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          >
            Create Tender
          </button>
        </Link>
        <Link to="/admin/tender-management/view" style={{ textDecoration: 'none' }}>
          <button
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          >
            View Tenders
          </button>
        </Link>
      </div>
    </div>
  );
}

export default TenderManagement;

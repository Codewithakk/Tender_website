import React from 'react';
import { Link } from 'react-router-dom';

function TenderManagement() {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f8f9fa',
      padding: '20px',
    },
    heading: {
      marginBottom: '20px',
      fontSize: '24px',
      fontWeight: 'bold',
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    button: {
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      padding: '10px 20px',
      fontSize: '16px',
      cursor: 'pointer',
      textDecoration: 'none',
      textAlign: 'center',
      display: 'block',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Tender Management</h1>
      <div style={styles.buttonContainer}>
        <Link
          to="/admin/tender-management/create"
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
        >
          Create Tender
        </Link>
        <Link
          to="/admin/tender-management/view"
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
        >
          View Tenders
        </Link>
        <Link
          to="/admin/bid-management"
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
        >
          Manage Bids
        </Link>
      </div>
    </div>
  );
}

export default TenderManagement;

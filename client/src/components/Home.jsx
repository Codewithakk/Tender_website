import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const styles = {
    container: {
      textAlign: 'center',
      padding: '40px',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
    },
    heading: {
      fontSize: '36px',
      color: '#333',
      marginBottom: '20px',
    },
    paragraph: {
      fontSize: '18px',
      color: '#555',
      marginBottom: '40px',
    },
    nav: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      listStyleType: 'none',
      padding: 0,
    },
    navItem: {
      margin: '10px 0',
    },
    link: {
      textDecoration: 'none',
      color: '#fff',
      backgroundColor: '#007bff',
      padding: '10px 20px',
      borderRadius: '5px',
      fontSize: '18px',
      fontWeight: 'bold',
      transition: 'background-color 0.3s, transform 0.3s',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      display: 'inline-block',
    },
    linkHover: {
      backgroundColor: '#0056b3',
      transform: 'scale(1.05)',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to the Tender Management System</h1>
      <p style={styles.paragraph}>
        This is the home page of the application where you can navigate to different sections.
      </p>
      <nav>
        <ul style={styles.nav}>
          <li style={styles.navItem}>
            <Link
              to="/admin/tender-management/view"
              style={styles.link}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = styles.linkHover.backgroundColor;
                e.target.style.transform = styles.linkHover.transform;
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = styles.link.backgroundColor;
                e.target.style.transform = 'scale(1)';
              }}
            >
              View Tenders
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link
              to="/admin/bid-management"
              style={styles.link}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = styles.linkHover.backgroundColor;
                e.target.style.transform = styles.linkHover.transform;
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = styles.link.backgroundColor;
                e.target.style.transform = 'scale(1)';
              }}
            >
              Manage Bids
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link
              to="/admin"
              style={styles.link}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = styles.linkHover.backgroundColor;
                e.target.style.transform = styles.linkHover.transform;
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = styles.link.backgroundColor;
                e.target.style.transform = 'scale(1)';
              }}
            >
              Admin Panel
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link
              to="/user"
              style={styles.link}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = styles.linkHover.backgroundColor;
                e.target.style.transform = styles.linkHover.transform;
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = styles.link.backgroundColor;
                e.target.style.transform = 'scale(1)';
              }}
            >
              User Panel
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default HomePage;

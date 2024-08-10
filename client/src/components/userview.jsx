import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function UserPanel() {
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      minHeight: '100vh',
      flexDirection: 'column',
    },
    navbar: {
      backgroundColor: '#007bff',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    navList: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center',
    },
    navItem: {
      margin: '10px 0',
    },
    navLink: {
      color: '#fff',
      textDecoration: 'none',
      fontSize: '18px',
      fontWeight: 'bold',
      padding: '15px 30px',
      borderRadius: '10px',
      transition: 'all 0.3s ease',
      display: 'inline-block',
      backgroundColor: '#0056b3',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    navLinkHover: {
      backgroundColor: '#003d7a',
      transform: 'scale(1.1)',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
      cursor: 'pointer',
    },
    mainContent: {
      flex: 1,
      padding: '20px',
      backgroundColor: '#f8f9fa',
    },
  };

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <Link
              to="/user/tenders"
              style={styles.navLink}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = styles.navLinkHover.backgroundColor;
                e.target.style.transform = styles.navLinkHover.transform;
                e.target.style.boxShadow = styles.navLinkHover.boxShadow;
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = styles.navLink.backgroundColor;
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
              }}
            >
              Available Tenders and Submit Quotations
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link
              to="/user/quotations"
              style={styles.navLink}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = styles.navLinkHover.backgroundColor;
                e.target.style.transform = styles.navLinkHover.transform;
                e.target.style.boxShadow = styles.navLinkHover.boxShadow;
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = styles.navLink.backgroundColor;
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
              }}
            >
              Status of Quotations
            </Link>
          </li>
          {/* <li style={styles.navItem}>
            <Link
              to="/user/notifications"
              style={styles.navLink}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = styles.navLinkHover.backgroundColor;
                e.target.style.transform = styles.navLinkHover.transform;
                e.target.style.boxShadow = styles.navLinkHover.boxShadow;
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = styles.navLink.backgroundColor;
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
              }}
            >
              Notifications
            </Link>
          </li> */}
        </ul>
      </nav>
      <main style={styles.mainContent}>
        <Outlet /> {/* This will render the nested routes */}
      </main>
    </div>
  );
}

export default UserPanel;

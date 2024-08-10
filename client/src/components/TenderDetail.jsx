// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import BidForm from './BidForm';

// const TenderDetail = ({ tender }) => {
//     const [lowestQuote, setLowestQuote] = useState(null);
//     const [bids, setBids] = useState([]);
//     const [notification, setNotification] = useState('');
  
//     useEffect(() => {
//       if (tender) {
//         // Fetch the lowest quote for the tender
//         axios.get(`http://localhost:5000/api/user/tenders/${tender._id}/lowest-quote`)
//           .then(response => setLowestQuote(response.data))
//           .catch(error => console.error('Error fetching lowest quote:', error));
  
//         // Fetch all bids for the tender
//         axios.get(`http://localhost:5000/api/user/tenders/${tender._id}/bids`)
//           .then(response => {
//             setBids(response.data);
  
//             // Check if any bid was placed in the last 5 minutes
//             const now = new Date();
//             const last5Minutes = now.getTime() - 5 * 60 * 1000;
//             const recentBid = response.data.some(bid => new Date(bid.bidTime).getTime() >= last5Minutes);
//             if (recentBid) {
//               setNotification('A bid was placed in the last 5 minutes. Tender end time has been extended.');
//             }
//           })
//           .catch(error => console.error('Error fetching bids:', error));
//       }
//     }, [tender]);
  
//     return (
//       <div>
//         <h1>{tender?.name}</h1>
//         <p>{tender?.description}</p>
//         <p>Start Time: {new Date(tender?.startTime).toLocaleString()}</p>
//         <p>End Time: {new Date(tender?.endTime).toLocaleString()}</p>
  
//         <h2>Lowest Quote</h2>
//         {lowestQuote ? (
//           <div>
//             <p>Company: {lowestQuote.companyName}</p>
//             <p>Cost: {lowestQuote.cost}</p>
//             <p>Bid Time: {new Date(lowestQuote.bidTime).toLocaleString()}</p>
//           </div>
//         ) : (
//           <p>No bids yet</p>
//         )}
  
//         <BidForm tenderId={tender._id} />
  
//         {notification && <p style={{ color: 'red' }}>{notification}</p>}
  
//         <h2>Bids</h2>
//         <ul>
//           {bids.map(bid => (
//             <li key={bid._id}>
//               <p>Company: {bid.companyName}</p>
//               <p>Cost: {bid.cost}</p>
//               <p>Bid Time: {new Date(bid.bidTime).toLocaleString()}</p>
//               {bid.placedInLast5Minutes && <p><strong>Placed in last 5 minutes</strong></p>}
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   };
  
// export default TenderDetail;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function TenderDetail() {
  const { id } = useParams();
  const [tender, setTender] = useState(null);
  const [bid, setBid] = useState('');
  const [lowestBid, setLowestBid] = useState(null);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const fetchTender = async () => {
      try {
        const response = await axios.get(`/api/user/tenders/${id}`);
        setTender(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchLowestBid = async () => {
      try {
        const response = await axios.get(`/api/user/tenders/${id}/lowest-quote`);
        setLowestBid(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTender();
    fetchLowestBid();
  }, [id]);

  const handleSubmitBid = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/user/bids', { tenderId: id, cost: bid, companyName: 'Your Company' });
      alert('Bid submitted successfully');
      setBid('');
    } catch (error) {
      console.error(error);
      alert('Failed to submit bid');
    }
  };

  useEffect(() => {
    const now = new Date();
    if (tender && tender.endTime && new Date(tender.endTime) - now <= 5 * 60 * 1000) {
      setNotification('Tender is ending in less than 5 minutes!');
    }
  }, [tender]);

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      maxWidth: '800px',
      margin: 'auto',
      backgroundColor: '#f4f4f4',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    title: {
      color: '#333',
      fontSize: '28px',
      marginBottom: '10px',
    },
    description: {
      color: '#666',
      fontSize: '16px',
      marginBottom: '20px',
    },
    form: {
      width: '100%',
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontSize: '16px',
      color: '#555',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '16px',
    },
    button: {
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      padding: '10px 20px',
      fontSize: '16px',
      cursor: 'pointer',
      borderRadius: '4px',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    notification: {
      color: 'red',
      fontSize: '16px',
      marginTop: '10px',
    },
    lowestBidContainer: {
      marginTop: '20px',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      backgroundColor: '#fff',
    },
    lowestBidTitle: {
      fontSize: '20px',
      marginBottom: '10px',
    },
  };

  return (
    <div style={styles.container}>
      {tender ? (
        <>
          <h1 style={styles.title}>{tender.tenderName}</h1>
          <p style={styles.description}>{tender.tenderDescription}</p>
          <form onSubmit={handleSubmitBid} style={styles.form}>
            <label style={styles.label}>Bid Cost:</label>
            <input
              type="number"
              value={bid}
              onChange={(e) => setBid(e.target.value)}
              style={styles.input}
            />
            <button
              type="submit"
              style={styles.button}
              onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
              onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
            >
              Submit Bid
            </button>
          </form>
          {notification && <p style={styles.notification}>{notification}</p>}
          {lowestBid && (
            <div style={styles.lowestBidContainer}>
              <h2 style={styles.lowestBidTitle}>Lowest Bid</h2>
              <p>Cost: {lowestBid.cost}</p>
            </div>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default TenderDetail;


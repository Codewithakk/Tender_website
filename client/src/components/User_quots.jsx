// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const QuotationList = () => {
//   const [bids, setBids] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     // Fetch all bids from the backend
//     axios.get('http://localhost:5000/api/bid')
//       .then(response => setBids(response.data))
//       .catch(error => setError('Error fetching bids'));
//   }, []);

//   return (
//     <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//       <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Submitted Quotations</h1>
//       {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
//       <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//         <thead>
//           <tr style={{ backgroundColor: '#f4f4f4' }}>
//             <th style={{ border: '1px solid #ddd', padding: '8px' }}>Tender ID</th>
//             <th style={{ border: '1px solid #ddd', padding: '8px' }}>Company Name</th>
//             <th style={{ border: '1px solid #ddd', padding: '8px' }}>Cost</th>
//             <th style={{ border: '1px solid #ddd', padding: '8px' }}>Bid Time</th>
//           </tr>
//         </thead>
//         <tbody>
//           {bids.length > 0 ? (
//             bids.map((bid) => (
//               <tr key={bid._id}>
//                 <td style={{ border: '1px solid #ddd', padding: '8px' }}>{bid.tenderId}</td>
//                 <td style={{ border: '1px solid #ddd', padding: '8px' }}>{bid.companyName}</td>
//                 <td style={{ border: '1px solid #ddd', padding: '8px' }}>{bid.cost}</td>
//                 <td style={{ border: '1px solid #ddd', padding: '8px' }}>{new Date(bid.bidTime).toLocaleString()}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>No bids available</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default QuotationList;
// src/components/BidList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/BidList.css'; // Ensure this file contains the CSS styles

const BidQ = () => {
  const [bids, setBids] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBids();
  }, [searchTerm]);

  const fetchBids = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/bid`, {
        params: { companyName: searchTerm }
      });
      setBids(response.data);
    } catch (error) {
      setError('Error fetching bids');
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="bid-list">
      <h1>All Bids</h1>
      <input
        type="text"
        placeholder="Search by company name"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      {error && <p className="error">{error}</p>}
      <table className="bid-table">
        <thead>
          <tr>
            <th>Tender Name</th>
            <th>Company Name</th>
            <th>Cost</th>
            <th>Bid Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bids.length > 0 ? (
            bids.map((bid) => (
              <tr key={bid._id}>
                <td>{bid.tenderId ? bid.tenderId.name : 'N/A'}</td>
                <td>{bid.companyName}</td>
                <td>{bid.cost}</td>
                <td>{new Date(bid.bidTime).toLocaleString()}</td>
                <td>{bid.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>No bids available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BidQ;

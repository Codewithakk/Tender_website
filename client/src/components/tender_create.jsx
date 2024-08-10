// import React, { useState } from 'react';
// import axios from 'axios';
// import '../styles/AdminPanel.css'; // Add your CSS for styling

// function tendercreate() {
//   const [tenderName, setTenderName] = useState('');
//   const [tenderDescription, setTenderDescription] = useState('');
//   const [startTime, setStartTime] = useState('');
//   const [endTime, setEndTime] = useState('');
//   const [bufferTime, setBufferTime] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/admin/create', {
//         name: tenderName,
//         description: tenderDescription,
//         startTime,
//         endTime,
//         bufferTime
//       });
//       alert('Tender created successfully');
//       setTenderName('');
//       setTenderDescription('');
//       setStartTime('');
//       setEndTime('');
//       setBufferTime('');
//       setError('');
//     } catch (error) {
//       console.error('Error details:', error.response ? error.response.data : error.message);
//       setError('Failed to create tender: ' + (error.response ? error.response.data : error.message));
//     }
//   };

//   return (
//     <div className="admin-panel">
//       <h1>Create New Tender</h1>
//       <form onSubmit={handleSubmit}>
//         <label>Tender Name:</label>
//         <input
//           type="text"
//           value={tenderName}
//           onChange={(e) => setTenderName(e.target.value)}
//           required
//         />
//         <label>Description:</label>
//         <textarea
//           value={tenderDescription}
//           onChange={(e) => setTenderDescription(e.target.value)}
//           required
//         />
//         <label>Start Time:</label>
//         <input
//           type="datetime-local"
//           value={startTime}
//           onChange={(e) => setStartTime(e.target.value)}
//           required
//         />
//         <label>End Time:</label>
//         <input
//           type="datetime-local"
//           value={endTime}
//           onChange={(e) => setEndTime(e.target.value)}
//           required
//         />
//         <label>Buffer Time (minutes):</label>
//         <input
//           type="number"
//           value={bufferTime}
//           onChange={(e) => setBufferTime(e.target.value)}
//           required
//         />
//         <button type="submit">Create Tender</button>
//       </form>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </div>
//   );
// }

// export default tendercreate;


// // AdminPanel.jsx
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import '../styles/AdminPanel.css'; // Add your CSS for styling

// // const AdminPanel = () => {
// //   const [tender, setTender] = useState({
// //     name: '',
// //     description: '',
// //     startTime: '',
// //     endTime: '',
// //     bufferTime: ''
// //   });
// //   const [tenders, setTenders] = useState([]);
// //   const [error, setError] = useState(null);

// //   // Fetch all tenders when component mounts
// //   useEffect(() => {
// //     axios.get('http://localhost:5000/api/admin/tenders')
// //       .then(response => setTenders(response.data))
// //       .catch(error => setError('Error fetching tenders: ' + error.message));
// //   }, []);

// //   // Handle form field changes
// //   const handleChange = (e) => {
// //     setTender({
// //       ...tender,
// //       [e.target.name]: e.target.value
// //     });
// //   };

// //   // Handle form submission
// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     axios.post('http://localhost:5000/api/admin/tenders', tender)
// //       .then(response => {
// //         setTenders([...tenders, response.data]);
// //         setTender({
// //           name: '',
// //           description: '',
// //           startTime: '',
// //           endTime: '',
// //           bufferTime: ''
// //         });
// //         setError(null);
// //       })
// //       .catch(error => setError('Error creating tender: ' + error.message));
// //   };

// //   return (
// //     <div className="admin-panel">
// //       <h1>Admin Panel</h1>
      
// //       {/* Tender Creation Form */}
// //       <form onSubmit={handleSubmit}>
// //         <label>Tender Name:</label>
// //         <input
// //           type="text"
// //           name="name"
// //           value={tender.name}
// //           onChange={handleChange}
// //           required
// //         />
// //         <label>Description:</label>
// //         <textarea
// //           name="description"
// //           value={tender.description}
// //           onChange={handleChange}
// //           required
// //         />
// //         <label>Start Time:</label>
// //         <input
// //           type="datetime-local"
// //           name="startTime"
// //           value={tender.startTime}
// //           onChange={handleChange}
// //           required
// //         />
// //         <label>End Time:</label>
// //         <input
// //           type="datetime-local"
// //           name="endTime"
// //           value={tender.endTime}
// //           onChange={handleChange}
// //           required
// //         />
// //         <label>Buffer Time (minutes):</label>
// //         <input
// //           type="number"
// //           name="bufferTime"
// //           value={tender.bufferTime}
// //           onChange={handleChange}
// //           required
// //         />
// //         <button type="submit">Create Tender</button>
// //       </form>
      
// //       {/* Display error message */}
// //       {error && <p style={{ color: 'red' }}>{error}</p>}
      
// //       {/* List of Previous Tenders */}
// //       <h2>Previous Tenders</h2>
// //       <table>
// //         <thead>
// //           <tr>
// //             <th>Name</th>
// //             <th>Description</th>
// //             <th>Start Time</th>
// //             <th>End Time</th>
// //             <th>Buffer Time</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {tenders.map(tender => (
// //             <tr key={tender._id}>
// //               <td>{tender.name}</td>
// //               <td>{tender.description}</td>
// //               <td>{new Date(tender.startTime).toLocaleString()}</td>
// //               <td>{new Date(tender.endTime).toLocaleString()}</td>
// //               <td>{tender.bufferTime} minutes</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default AdminPanel;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TenderForm = ({ tender, action, onClose, onSuccess }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [bufferTime, setBufferTime] = useState('');

  useEffect(() => {
    if (action === 'update' && tender) {
      setName(tender.name);
      setDescription(tender.description);
      setStartTime(new Date(tender.startTime).toISOString().slice(0, 16));
      setEndTime(new Date(tender.endTime).toISOString().slice(0, 16));
      setBufferTime(tender.bufferTime);
    } else {
      setName('');
      setDescription('');
      setStartTime('');
      setEndTime('');
      setBufferTime('');
    }
  }, [tender, action]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tenderData = { name, description, startTime, endTime, bufferTime };

    try {
      if (action === 'update') {
        await axios.put(`http://localhost:5000/api/admin/tenders/${tender._id}`, tenderData);
      } else {
        await axios.post('http://localhost:5000/api/admin/create', tenderData);
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving tender:', error);
    }
  };

  const styles = {
    container: {
      maxWidth: '600px',
      margin: 'auto',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    heading: {
      textAlign: 'center',
      color: '#333',
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      margin: '10px 0 5px',
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '10px',
      borderRadius: '4px',
      border: '1px solid #ddd',
      boxSizing: 'border-box',
    },
    textarea: {
      width: '100%',
      padding: '10px',
      marginBottom: '10px',
      borderRadius: '4px',
      border: '1px solid #ddd',
      boxSizing: 'border-box',
      minHeight: '100px',
    },
    button: {
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      padding: '10px 20px',
      fontSize: '16px',
      cursor: 'pointer',
      borderRadius: '4px',
      margin: '5px',
    },
    buttonCancel: {
      backgroundColor: '#6c757d',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    buttonCancelHover: {
      backgroundColor: '#5a6268',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>{action === 'update' ? 'Update Tender' : 'Create Tender'}</h2>
      <form onSubmit={handleSubmit}>
        <label style={styles.label}>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />
        <label style={styles.label}>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={styles.textarea}
        />
        <label style={styles.label}>Start Time:</label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
          style={styles.input}
        />
        <label style={styles.label}>End Time:</label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
          style={styles.input}
        />
        <label style={styles.label}>Buffer Time (minutes):</label>
        <input
          type="number"
          value={bufferTime}
          onChange={(e) => setBufferTime(e.target.value)}
          required
          style={styles.input}
        />
        <div style={{ textAlign: 'center' }}>
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          >
            {action === 'update' ? 'Update Tender' : 'Create Tender'}
          </button>
          <button
            type="button"
            onClick={onClose}
            style={{ ...styles.button, ...styles.buttonCancel }}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonCancelHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.buttonCancel.backgroundColor)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TenderForm;

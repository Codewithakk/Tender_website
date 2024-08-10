import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/TenderList.css'; // Ensure this file contains the CSS styles
import QuotationForm from './QuotationForm'; // Ensure this file exists

const TenderView = () => {
  const [tenders, setTenders] = useState([]);
  const [selectedTender, setSelectedTender] = useState(null);
  const [showQuotationForm, setShowQuotationForm] = useState(false);
  const [userId, setUserId] = useState(''); // Fetch or set userId as needed

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/tenders')
      .then(response => setTenders(response.data))
      .catch(error => console.error('Error fetching tenders:', error));
  }, []);

  const handleSubmitQuotation = (tender) => {
    setSelectedTender(tender);
    setShowQuotationForm(true);
  };

  const handleCloseForm = () => {
    setShowQuotationForm(false);
    setSelectedTender(null);
  };

  return (
    <div className="tender-list">
      <h1>Available Tenders</h1>
      <table className="tender-table">
        <thead>
          <tr>
            <th>Tender ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tenders.map(tender => (
            <tr key={tender._id}>
              <td>{tender._id}</td>
              <td>{tender.name}</td>
              <td>{tender.description}</td>
              <td>{new Date(tender.startTime).toLocaleString()}</td>
              <td>{new Date(tender.endTime).toLocaleString()}</td>
              <td>
                <button
                  className="submit-quotation-button"
                  onClick={() => handleSubmitQuotation(tender)}
                >
                  Submit Quotation
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showQuotationForm && selectedTender && (
        <QuotationForm
          tender={selectedTender}
          userId={userId} // Pass userId here
          onClose={handleCloseForm}
          onSuccess={() => {
            setShowQuotationForm(false);
            axios.get('http://localhost:5000/api/admin/tenders')
              .then(response => setTenders(response.data))
              .catch(error => console.error('Error fetching tenders:', error));
          }}
        />
      )}
    </div>
  );
};

export default TenderView;

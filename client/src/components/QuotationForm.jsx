import React, { useState } from 'react';
import axios from 'axios';

const QuotationForm = ({ tender, userId, onClose, onSuccess }) => {
  const [cost, setCost] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:5000/api/bid', {
        tenderId: tender._id,
        companyName: 'User Company Name', // Replace with actual user data
        cost: parseFloat(cost),
        userId, // Include userId in the request body
      });
      setSuccess('Quotation submitted successfully!');
      onSuccess();
    } catch (err) {
      setError('Error submitting quotation: ' + err.message);
    }
  };

  return (
    <div className="quotation-form-overlay">
      <div className="quotation-form-container">
        <h2>Submit Quotation for Tender {tender.name}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="cost">Cost:</label>
            <input
              type="number"
              id="cost"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default QuotationForm;

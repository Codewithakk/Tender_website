import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/TenderList.css'; // Ensure this file contains the CSS styles
import TenderForm from './tender_create'; // Ensure this file exists

const TenderList = () => {
  const [tenders, setTenders] = useState([]);
  const [selectedTender, setSelectedTender] = useState(null);
  const [action, setAction] = useState(null); // 'create', 'update'

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/tenders')
      .then(response => setTenders(response.data))
      .catch(error => console.error('Error fetching tenders:', error));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/tenders/${id}`);
      setTenders(tenders.filter(tender => tender._id !== id));
    } catch (error) {
      console.error('Error deleting tender:', error);
    }
  };

  const handleUpdate = (tender) => {
    setSelectedTender(tender);
    setAction('update');
  };

  const handleCreate = () => {
    setSelectedTender(null);
    setAction('create');
  };

  const handleCloseForm = () => {
    setAction(null);
  };

  return (
    <div className="tender-list">
      <h1>Tender Management</h1>
      <button className="create-button" onClick={handleCreate}>Create New Tender</button>
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
                <button className="update-button" onClick={() => handleUpdate(tender)}>Update</button>
                <button className="delete-button" onClick={() => handleDelete(tender._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {(action === 'create' || action === 'update') && (
        <TenderForm
          tender={selectedTender}
          action={action}
          onClose={handleCloseForm}
          onSuccess={() => {
            setAction(null);
            axios.get('http://localhost:5000/api/admin/tenders')
              .then(response => setTenders(response.data))
              .catch(error => console.error('Error fetching tenders:', error));
          }}
        />
      )}
    </div>
  );
};

export default TenderList;

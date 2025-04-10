import React, { useState } from 'react';
import axios from 'axios';

const GWLForm = () => {
  const [formData, setFormData] = useState({
    rainfall: '',
    maxTemperature: '',
    minTemperature: '',
    morningHumidity: '',
    eveningHumidity: '',
    postMonsoon: '',
    preMonsoon: ''
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/gwl', formData);
      setPrediction(response.data);  // Display prediction
    } catch (error) {
      console.error("Error predicting GWL:", error);
      alert("Error predicting GWL. Check console for details.");
    }
  };

  // Inline style objects
  const containerStyle = {
    maxWidth: '400px',
    margin: '2rem auto',
    padding: '2rem',
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif'
  };

  const headerStyle = {
    textAlign: 'center',
    fontSize: '1.8rem',
    marginBottom: '1.5rem',
    color: '#333'
  };

  const formGroupStyle = {
    marginBottom: '1rem'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.3rem',
    fontWeight: '500',
    textTransform: 'capitalize'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '1rem'
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.7rem',
    background: '#007bff',
    color: 'white',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.3s ease'
  };

  const predictionStyle = {
    marginTop: '1.5rem',
    textAlign: 'center',
    fontSize: '1.2rem',
    color: 'green'
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Ground Water Level Predictor</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key} style={formGroupStyle}>
            <label style={labelStyle}>{key.replace(/([A-Z])/g, ' $1')}:</label>
            <input
              type="number"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>
        ))}
        <button type="submit" style={buttonStyle}>Predict</button>
      </form>

      {prediction !== null && (
        <div style={predictionStyle}>
          <h3>Predicted Ground Water Level: {prediction} (in mbgl)</h3>
        </div>
      )}
    </div>
  );
};

export default GWLForm;

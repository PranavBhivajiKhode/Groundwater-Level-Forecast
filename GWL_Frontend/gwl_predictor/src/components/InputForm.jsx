import React, { useState } from 'react';
import './InputForm.css'; // Importing CSS file

const InputForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    state: '',
    avgMaxTemp: '',
    avgMinTemp: '',
    morningHumidity: '',
    eveningHumidity: '',
    avgRainfall: '',
    period: 'Pre-Monsoon'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <h2>Groundwater Level Prediction</h2>

      <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />

      <input type="number" name="avgMaxTemp" placeholder="Avg Max Temp" value={formData.avgMaxTemp} onChange={handleChange} required />

      <input type="number" name="avgMinTemp" placeholder="Avg Min Temp" value={formData.avgMinTemp} onChange={handleChange} required />

      <input type="number" name="morningHumidity" placeholder="Morning Humidity" value={formData.morningHumidity} onChange={handleChange} required />

      <input type="number" name="eveningHumidity" placeholder="Evening Humidity" value={formData.eveningHumidity} onChange={handleChange} required />

      <input type="number" name="avgRainfall" placeholder="Avg Rainfall" value={formData.avgRainfall} onChange={handleChange} required />

      <select name="period" value={formData.period} onChange={handleChange}>
        <option value="Pre-Monsoon">Pre-Monsoon</option>
        <option value="Post-Monsoon">Post-Monsoon</option>
      </select>

      <button type="submit">Predict</button>
    </form>
  );
};

export default InputForm;

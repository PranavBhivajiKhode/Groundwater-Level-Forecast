import React, { useState } from 'react';
import InputForm from './InputForm';
import PredictionResults from './PredictionResults';

const PredictionForm = () => {
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data) => {
    setFormData(data);
  };

  return (
    <div>
      <h1>Ground Water Level Prediction</h1>
      <InputForm onSubmit={handleFormSubmit} />
      {formData && <PredictionResults data={formData} />}
    </div>
  );
};

export default PredictionForm;

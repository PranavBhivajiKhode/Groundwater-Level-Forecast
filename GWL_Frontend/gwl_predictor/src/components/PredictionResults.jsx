import React from 'react';

const PredictionResults = ({ data }) => {
  return (
    <div>
      <h2>Prediction Data</h2>
      <ul>
        <li>State: {data.state}</li>
        <li>Avg Max Temp: {data.avgMaxTemp}</li>
        <li>Avg Min Temp: {data.avgMinTemp}</li>
        <li>Morning Humidity: {data.morningHumidity}</li>
        <li>Evening Humidity: {data.eveningHumidity}</li>
        <li>Avg Rainfall: {data.avgRainfall}</li>
        <li>Period: {data.period}</li>
      </ul>
    </div>
  );
};

export default PredictionResults;

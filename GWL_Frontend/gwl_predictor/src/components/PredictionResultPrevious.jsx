import React from "react";

const PredictionResult = ({ prediction }) => {
  if (!prediction) return null;

  return (
    <div className="mt-6 text-center text-xl text-blue-800">
      Predicted Ground Water Level : <span className="font-bold">{prediction}</span>
    </div>
  );
};

export default PredictionResult;

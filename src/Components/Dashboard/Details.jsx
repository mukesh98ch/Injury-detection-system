
import React from 'react';

function InjuryDetails({ label, area, handleRemoveArea, handleDetailsChange }) {
  return (
    <div className="injury-details">
      <h3>Area {label}: {area}</h3>
      <textarea
        placeholder={`Details for ${area}`}
        onChange={(e) => handleDetailsChange(label, e.target.value)}
      />
    
    </div>
  );
}

export default InjuryDetails;

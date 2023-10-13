
import React, { useState } from 'react';
import { saveDataToLocalStorage, getDataFromLocalStorage } from '../../Utils/localStorage';
import Details from './Details'; 
import './Dashboard.css';
import BodyImage from '../../Image/bodyI.png';

function InjuryReportForm() {
  const [reporter, setReporter] = useState('');
  const [dateTimeOfInjury, setDateTimeOfInjury] = useState('');
  const [injuryAreas, setInjuryAreas] = useState([]);
  const [currentArea, setCurrentArea] = useState('');
  const [nextLabel, setNextLabel] = useState(1);

  const handleAreaClick = () => {
    if (currentArea.trim() !== '') {
    
      const newArea = { label: injuryAreas.length + 1, area: currentArea, details: '' };
      setInjuryAreas([...injuryAreas, newArea]);

      
      setCurrentArea('');
    }
  };

  const handleRemoveArea = (label) => {
    setInjuryAreas(injuryAreas.filter((area) => area.label !== label));
  };

  const handleDetailsChange = (label, details) => {
  
    const updatedAreas = injuryAreas.map((area) => (area.label === label ? { ...area, details } : area));
    setInjuryAreas(updatedAreas);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newReport = {
      reporter,
      dateTimeOfInjury,
      injuryAreas,
    };

    const existingReports = getDataFromLocalStorage('injuryReports') || [];
    const updatedReports = [...existingReports, newReport];

    saveDataToLocalStorage('injuryReports', updatedReports);

    setReporter('');
    setDateTimeOfInjury('');
    setInjuryAreas([]);
    setCurrentArea('');
    setNextLabel(1);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>Name of Reporter</label>
      <input
        type="text"
        value={reporter}
        onChange={(e) => setReporter(e.target.value)}
      />

      <label>Date & Time of Injury</label>
      <input
        type="datetime-local"
        value={dateTimeOfInjury}
        onChange={(e) => setDateTimeOfInjury(e.target.value)}
      />

      <div>
        <label>Encircle Injury Areas</label>
        <input
          type="text"
          placeholder="Enter an area (e.g., Left Hand)"
          value={currentArea}
          onChange={(e) => setCurrentArea(e.target.value)}
        />
        <button onClick={handleAreaClick}>Submit Report</button>
      </div>
     <div>
        <img src={BodyImage} Alt="Body Image"/>
     </div>
      <div>
        <ul>
          {injuryAreas.map((area) => (
            <li key={area.label}>
              <Details
                label={area.label}
                area={area.area}
                handleRemoveArea={handleRemoveArea}
                handleDetailsChange={handleDetailsChange}
              />
            </li>
          ))}
        </ul>
      </div>

      
    </form>
  );
}

export default InjuryReportForm;

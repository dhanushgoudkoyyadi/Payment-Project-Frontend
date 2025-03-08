import React, { useState } from 'react';
import './Tech.css';

function Tech() {
  const [cohort, setCohort] = useState(''); 
  const [savedCohorts, setSavedCohorts] = useState([]); 

  const handleSave = () => {
    if (cohort.trim() !== '') { 
      setSavedCohorts([...savedCohorts, cohort]); 
      setCohort(''); 
    }
  };

  return (
    <div className='tech-container'>
      <input
        type="text"
        placeholder='Enter Cohort'
        value={cohort}
        onChange={(e) => setCohort(e.target.value)} 
      />
      <button onClick={handleSave}>Save</button>
      <div>
        <h3>Saved Cohorts:</h3>
        <ul>
          {savedCohorts.map((item, index) => (
            <li key={index}>{item}</li> 
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Tech;

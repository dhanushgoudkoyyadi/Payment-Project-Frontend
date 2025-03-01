import React from 'react';
import payment from '../images/payment.png';

function SpFailed() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
      <div className="card" style={{ 
        width: '18rem', 
        backgroundColor: '#1a1a4b', 
        color: '#ffffff', 
        borderRadius: '10px', 
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        textAlign: 'center'
      }}>
        <img className="card-img-top" src={payment} alt="Payment Failed" style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} />
        <div className="card-body">
          <h2 className="card-text" style={{ color: '#00ff80' }}>Amount Not Initialized.</h2>
        </div>
      </div>
    </div>
  );
}

export default SpFailed;
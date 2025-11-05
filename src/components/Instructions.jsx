import React from 'react'

function Instructions({ onNext }) {
  return (
    <div className="container">
      <h1>🎮 Deepwoken Talent Rating System</h1>
      <div style={{ textAlign: 'center' }}>
        <h2>Instructions</h2>
        <p>You will be presented with various Deepwoken talents one by one.</p>
        <p>For each talent, rate it on a scale of <strong>1 to 10</strong> based on its usefulness in PVP builds:</p>
        
        <div style={{ margin: '30px 0', textAlign: 'left', display: 'inline-block' }}>
          <div style={{ margin: '15px 0', padding: '15px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
            <span style={{ fontWeight: 'bold', color: '#ffd700', fontSize: '1.3em', marginRight: '15px' }}>1</span>
            <span>- Never pick, completely useless</span>
          </div>
          <div style={{ margin: '15px 0', padding: '15px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
            <span style={{ fontWeight: 'bold', color: '#ffd700', fontSize: '1.3em', marginRight: '15px' }}>5</span>
            <span>- Situational, depends on build</span>
          </div>
          <div style={{ margin: '15px 0', padding: '15px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
            <span style={{ fontWeight: 'bold', color: '#ffd700', fontSize: '1.3em', marginRight: '15px' }}>10</span>
            <span>- Must pick, essential for PVP</span>
          </div>
        </div>

        <p>Your ratings will help create a community-driven tier list for Deepwoken talents!</p>
        
        <button onClick={onNext} className="btn-primary">Start Rating Talents</button>
      </div>
    </div>
  )
}

export default Instructions
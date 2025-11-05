import React from 'react'

const Results = ({ ratedCount, onRateMore }) => {
  const handleExport = () => {
    const ratings = JSON.parse(localStorage.getItem('talentRatings') || '[]')
    const dataStr = JSON.stringify(ratings, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    
    const link = document.createElement('a')
    link.href = URL.createObjectURL(dataBlob)
    link.download = 'talent_ratings.json'
    link.click()
  }

  return (
    <div className="container">
      <div className="success-message">
        <h1>✅ Thank You!</h1>
        <p>Your talent ratings have been recorded successfully.</p>
        <p>You rated <span style={{ color: '#ffd700', fontWeight: 'bold' }}>{ratedCount}</span> talents.</p>
        <p>Your contributions help build a better understanding of talent viability in PVP!</p>
        
        <div className="actions">
          <button onClick={onRateMore} className="btn-primary">Rate More Talents</button>
          <button onClick={handleExport} className="btn-secondary">Export Data</button>
        </div>
      </div>
    </div>
  )
}

export default Results

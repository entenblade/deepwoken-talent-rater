import React, { useState, useEffect } from 'react'
import talentsData from '../data/talents'

function TalentRating({ userData, onComplete }) {
  const [talents, setTalents] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [ratedCount, setRatedCount] = useState(0)

  useEffect(() => {
    // Shuffle talents for random order
    const shuffled = [...talentsData].sort(() => Math.random() - 0.5)
    setTalents(shuffled)
  }, [])

  const currentTalent = talents[currentIndex]

  const handleRating = async (rating) => {
    if (!currentTalent) return

    // Save rating to localStorage (for demo - replace with API call)
    const ratingData = {
      ...userData,
      talent_name: currentTalent.talent_name,
      category: currentTalent.category,
      requirements: currentTalent.requirements,
      description: currentTalent.description,
      rating: rating,
      timestamp: new Date().toISOString()
    }

    // Save to localStorage (replace with API call to /api/ratings)
    const existingRatings = JSON.parse(localStorage.getItem('talentRatings') || '[]')
    existingRatings.push(ratingData)
    localStorage.setItem('talentRatings', JSON.stringify(existingRatings))

    setRatedCount(prev => prev + 1)

    // Move to next talent after delay
    setTimeout(() => {
      if (currentIndex < talents.length - 1) {
        setCurrentIndex(prev => prev + 1)
      } else {
        onComplete(ratedCount + 1)
      }
    }, 500)
  }

  const handleSkip = () => {
    if (currentIndex < talents.length - 1) {
      setCurrentIndex(prev => prev + 1)
    } else {
      onComplete(ratedCount)
    }
  }

  if (!currentTalent) {
    return (
      <div className="container">
        <h1>Loading talents...</h1>
      </div>
    )
  }

  const progress = ((currentIndex + 1) / talents.length) * 100

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1>Rate Talents</h1>
        <div>
          <span style={{ color: '#64ffda', fontWeight: '600' }}>
            Talent {currentIndex + 1} of {talents.length}
          </span>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="talent-card">
        <div className="talent-header">
          <h2>{currentTalent.talent_name}</h2>
          <span className="category">{currentTalent.category}</span>
        </div>
        
        <div className="talent-requirements">
          <strong>Requirements:</strong> {currentTalent.requirements || 'None'}
        </div>
        
        <div className="talent-description">
          <p>{currentTalent.description}</p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <h3>Rate this talent for PVP usefulness:</h3>
          <div className="rating-buttons">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
              <button
                key={num}
                className="rating-btn"
                onClick={() => handleRating(num)}
              >
                {num}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cccccc', marginTop: '15px' }}>
            <span>1 - Useless</span>
            <span>10 - Essential</span>
          </div>
        </div>

        <button onClick={handleSkip} className="btn-secondary" style={{ marginTop: '20px' }}>
          Skip Talent
        </button>
      </div>
    </div>
  )
}

export default TalentRating
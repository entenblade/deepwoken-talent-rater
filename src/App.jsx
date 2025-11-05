import React, { useState } from 'react'
import Instructions from './components/Instructions'
import UserInfo from './components/UserInfo'
import TalentRating from './components/TalentRating'
import Results from './components/Results'

function App() {
  const [currentStep, setCurrentStep] = useState('instructions')
  const [userData, setUserData] = useState(null)
  const [ratedCount, setRatedCount] = useState(0)

  const handleUserInfoSubmit = (data) => {
    setUserData(data)
    setCurrentStep('rating')
  }

  const handleRatingComplete = (count) => {
    setRatedCount(count)
    setCurrentStep('results')
  }

  const handleRateMore = () => {
    setCurrentStep('rating')
  }

  return (
    <div className="app">
      {currentStep === 'instructions' && (
        <Instructions onNext={() => setCurrentStep('userInfo')} />
      )}
      {currentStep === 'userInfo' && (
        <UserInfo onSubmit={handleUserInfoSubmit} />
      )}
      {currentStep === 'rating' && (
        <TalentRating 
          userData={userData} 
          onComplete={handleRatingComplete}
        />
      )}
      {currentStep === 'results' && (
        <Results 
          ratedCount={ratedCount}
          onRateMore={handleRateMore}
        />
      )}
    </div>
  )
}

export default App
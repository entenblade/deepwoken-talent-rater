import React, { useState } from 'react'

function UserInfo({ onSubmit }) {
  const [formData, setFormData] = useState({
    discordUsername: '',
    discordUID: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.discordUsername && formData.discordUID) {
      onSubmit(formData)
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="container">
      <h1>👤 User Information</h1>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <p>Please enter your Discord information:</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="discordUsername">Discord Username:</label>
            <input
              type="text"
              id="discordUsername"
              name="discordUsername"
              value={formData.discordUsername}
              onChange={handleChange}
              placeholder="e.g., YourName#1234"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="discordUID">Discord UID:</label>
            <input
              type="text"
              id="discordUID"
              name="discordUID"
              value={formData.discordUID}
              onChange={handleChange}
              placeholder="e.g., 123456789012345678"
              required
            />
            <small style={{ color: '#cccccc', display: 'block', marginTop: '5px' }}>
              You can find this in Discord under User Settings → Advanced → Developer Mode
            </small>
          </div>
          
          <button type="submit" className="btn-primary">Start Rating Talents</button>
        </form>
      </div>
    </div>
  )
}

export default UserInfo
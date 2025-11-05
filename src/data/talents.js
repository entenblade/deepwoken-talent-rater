// This will load talents from the JSON file
let talents = []

// Load talents from JSON file
fetch('/deepwoken_talents.json')
  .then(response => response.json())
  .then(data => {
    talents = data
    console.log(`Loaded ${talents.length} talents`)
  })
  .catch(error => {
    console.error('Error loading talents:', error)
  })

export default talents
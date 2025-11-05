export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method === 'POST') {
    try {
      // In a real app, you'd save to a database
      // For now, we'll just return success
      const ratingData = req.body
      console.log('Rating received:', ratingData)
      
      res.json({ 
        success: true, 
        message: 'Rating saved successfully',
        data: ratingData 
      })
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
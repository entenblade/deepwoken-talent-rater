export default async function handler(req, res) {
  res.json({ 
    status: 'OK', 
    message: 'Deepwoken Talent Rater API is running!',
    endpoints: [
      '/api/ratings - POST/GET ratings',
      '/api/averages - GET talent averages', 
      '/api/export/ratings - Download ratings',
      '/api/export/averages - Download averages'
    ]
  });
}
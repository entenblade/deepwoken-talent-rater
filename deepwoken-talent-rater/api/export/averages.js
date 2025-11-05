const fs = require('fs').promises;
const path = require('path');

const AVERAGES_FILE = path.join(process.cwd(), 'data', 'talent_averages.json');

module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'GET') {
        try {
            const data = await fs.readFile(AVERAGES_FILE, 'utf8');
            res.setHeader('Content-Disposition', 'attachment; filename=talent_averages.json');
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        } catch (error) {
            console.error('Error exporting averages:', error);
            res.status(500).json({ error: 'Error exporting data' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
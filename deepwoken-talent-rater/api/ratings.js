const fs = require('fs').promises;
const path = require('path');

// Data file paths
const RATINGS_FILE = path.join(process.cwd(), 'data', 'user_ratings.json');
const AVERAGES_FILE = path.join(process.cwd(), 'data', 'talent_averages.json');

// Ensure data directory exists
async function ensureDataDirectory() {
    try {
        await fs.mkdir(path.join(process.cwd(), 'data'), { recursive: true });
    } catch (error) {
        console.log('Data directory already exists');
    }
}

// Initialize data files
async function initializeDataFiles() {
    try {
        await ensureDataDirectory();
        
        try {
            await fs.access(RATINGS_FILE);
        } catch {
            await fs.writeFile(RATINGS_FILE, JSON.stringify([], null, 2));
        }
        
        try {
            await fs.access(AVERAGES_FILE);
        } catch {
            await fs.writeFile(AVERAGES_FILE, JSON.stringify({}, null, 2));
        }
    } catch (error) {
        console.error('Error initializing data files:', error);
    }
}

// Update talent averages
async function updateTalentAverages(ratings) {
    const talentAverages = {};
    
    ratings.forEach(rating => {
        if (!talentAverages[rating.talent_name]) {
            talentAverages[rating.talent_name] = {
                total: 0,
                count: 0,
                ratings: [],
                category: rating.category,
                requirements: rating.requirements,
                description: rating.description
            };
        }
        talentAverages[rating.talent_name].total += rating.rating;
        talentAverages[rating.talent_name].count++;
        talentAverages[rating.talent_name].ratings.push({
            rating: rating.rating,
            user: rating.discordUsername,
            uid: rating.discordUID,
            timestamp: rating.timestamp
        });
    });
    
    const averages = {};
    Object.keys(talentAverages).forEach(talentName => {
        const talent = talentAverages[talentName];
        averages[talentName] = {
            average: parseFloat((talent.total / talent.count).toFixed(2)),
            totalRatings: talent.count,
            category: talent.category,
            requirements: talent.requirements,
            description: talent.description,
            individualRatings: talent.ratings
        };
    });
    
    await fs.writeFile(AVERAGES_FILE, JSON.stringify(averages, null, 2));
    return averages;
}

module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'POST') {
        try {
            await initializeDataFiles();
            const ratingData = req.body;
            
            if (!ratingData.discordUsername || !ratingData.discordUID || !ratingData.talent_name || !ratingData.rating) {
                return res.status(400).json({ error: 'Missing required fields' });
            }
            
            let ratings = [];
            try {
                const data = await fs.readFile(RATINGS_FILE, 'utf8');
                ratings = JSON.parse(data);
            } catch (error) {
                console.log('Creating new ratings file');
            }
            
            ratings.push(ratingData);
            await fs.writeFile(RATINGS_FILE, JSON.stringify(ratings, null, 2));
            await updateTalentAverages(ratings);
            
            res.json({ success: true, message: 'Rating saved successfully' });
        } catch (error) {
            console.error('Error saving rating:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else if (req.method === 'GET') {
        try {
            await initializeDataFiles();
            const data = await fs.readFile(RATINGS_FILE, 'utf8');
            const ratings = JSON.parse(data);
            res.json(ratings);
        } catch (error) {
            console.error('Error reading ratings:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
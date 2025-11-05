let currentTalentIndex = 0;
let userRatings = [];
let shuffledTalents = [];

// Get the current domain for API calls
const API_BASE = window.location.origin;

async function initRatingSystem() {
    await initTalentData();
    
    if (talents.length === 0) {
        alert('Error: No talents loaded. Please check if deepwoken_talents.json exists.');
        return;
    }
    
    shuffledTalents = [...talents].sort(() => Math.random() - 0.5);
    
    const savedProgress = sessionStorage.getItem('ratingProgress');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        currentTalentIndex = progress.currentIndex || 0;
        userRatings = progress.userRatings || [];
    }
    
    createRatingButtons();
    loadTalent();
    updateProgress();
}

// ... (rest of the rating.js functions remain the same, but ensure all API calls use correct URLs)

async function saveRatingToServer(ratingData) {
    const response = await fetch(`${API_BASE}/api/ratings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ratingData)
    });
    
    if (!response.ok) {
        throw new Error('Server error: ' + response.status);
    }
    
    return await response.json();
}
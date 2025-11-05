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

function createRatingButtons() {
    const ratingContainer = document.querySelector('.rating-buttons');
    ratingContainer.innerHTML = '';
    
    for (let i = 1; i <= 10; i++) {
        const button = document.createElement('button');
        button.className = 'rating-btn';
        button.textContent = i;
        button.onclick = () => rateTalent(i);
        ratingContainer.appendChild(button);
    }
}

function loadTalent() {
    if (currentTalentIndex >= shuffledTalents.length) {
        completeRating();
        return;
    }
    
    const talent = shuffledTalents[currentTalentIndex];
    document.getElementById('talentName').textContent = talent.talent_name;
    document.getElementById('talentCategory').textContent = talent.category;
    document.getElementById('talentRequirements').textContent = talent.requirements || 'None';
    document.getElementById('talentDescription').textContent = talent.description;
    
    document.querySelectorAll('.rating-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
}

async function rateTalent(rating) {
    document.querySelectorAll('.rating-btn').forEach(btn => {
        btn.classList.remove('selected');
        if (parseInt(btn.textContent) === rating) {
            btn.classList.add('selected');
        }
    });
    
    const talent = shuffledTalents[currentTalentIndex];
    const userData = {
        discordUsername: sessionStorage.getItem('discordUsername'),
        discordUID: sessionStorage.getItem('discordUID'),
        talent_name: talent.talent_name,
        category: talent.category,
        requirements: talent.requirements,
        description: talent.description,
        rating: rating,
        timestamp: new Date().toISOString()
    };
    
    userRatings.push(userData);
    
    try {
        await saveRatingToServer(userData);
    } catch (error) {
        console.error('Failed to save to server:', error);
        // Fallback to localStorage
        saveRatingToLocalStorage(userData);
    }
    
    setTimeout(() => {
        currentTalentIndex++;
        saveProgress();
        
        if (currentTalentIndex < shuffledTalents.length) {
            loadTalent();
            updateProgress();
        } else {
            completeRating();
        }
    }, 500);
}

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

function saveRatingToLocalStorage(ratingData) {
    let allRatings = JSON.parse(localStorage.getItem('talentRatings') || '[]');
    allRatings.push(ratingData);
    localStorage.setItem('talentRatings', JSON.stringify(allRatings));
}

function skipTalent() {
    currentTalentIndex++;
    saveProgress();
    
    if (currentTalentIndex < shuffledTalents.length) {
        loadTalent();
        updateProgress();
    } else {
        completeRating();
    }
}

function updateProgress() {
    const progressText = document.getElementById('progressText');
    const progressFill = document.getElementById('progressFill');
    
    const progress = ((currentTalentIndex + 1) / shuffledTalents.length) * 100;
    progressText.textContent = `Talent ${currentTalentIndex + 1} of ${shuffledTalents.length}`;
    progressFill.style.width = `${progress}%`;
}

function saveProgress() {
    const progress = {
        currentIndex: currentTalentIndex,
        userRatings: userRatings
    };
    sessionStorage.setItem('ratingProgress', JSON.stringify(progress));
}

function completeRating() {
    sessionStorage.setItem('ratedCount', userRatings.length);
    window.location.href = 'results.html';
}

document.addEventListener('DOMContentLoaded', initRatingSystem);
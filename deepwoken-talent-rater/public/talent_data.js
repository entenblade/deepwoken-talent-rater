let talents = [];

async function loadTalents() {
    try {
        const response = await fetch('./deepwoken_talents.json');
        talents = await response.json();
        console.log(`Loaded ${talents.length} talents`);
        return talents;
    } catch (error) {
        console.error('Error loading talents:', error);
        talents = [];
        return talents;
    }
}

async function initTalentData() {
    await loadTalents();
    return talents;
}
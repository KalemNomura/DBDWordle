let killerInfo;
let allKillers = [];
let points = 0;
let streak = 0; 
let numberOfTries = 0; 

// Load the killers.json file
async function loadKillers() {
    try {
        const response = await fetch('/src/json/killers.json');
        const data = await response.json();
        allKillers = data;

        // Generate a random number between 1 and 27
        const randomNumber = Math.floor(Math.random() * 27) + 1;

        // Get the killer with the random number
        const selectedKiller = data.find(killer => killer.number === randomNumber);

        // Save the killer in the killerInfo variable
        killerInfo = selectedKiller;
    } catch (error) {
        console.error('Error loading killers.json:', error);
    }
}

// Function to handle key press event
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        checkAnswer();
    }
}

// Function to check the input value with the KillerInfo
async function checkAnswer() {
    const answerInputElement = document.getElementById('answer');
    const answerInput = answerInputElement.value.toLowerCase();
    const validNames = allKillers.map(killer => killer.name.toLowerCase());

    if (validNames.includes(answerInput)) {
        const enteredKiller = allKillers.find(killer => killer.name.toLowerCase() === answerInput);
        if (killerInfo && answerInput === killerInfo.name.toLowerCase()) {
            updatePoints(50); // Points per Correct Answer
            updateStreak(true); // Update streak for correct answer
            localStorage.setItem('numberOfTries', numberOfTries); // Store number of tries
            window.location.href = 'youWin.html';
        } else {
            addKillerToTable(enteredKiller);
            scrollToBottom(); // Scroll to the bottom after adding a new 'td'
            updateStreak(false); // Do not reset streak for incorrect answer
        }
    } else {
        updateStreak(false); // Do not reset streak for invalid answer
    }
    numberOfTries++; // Increment number of tries

    //Reset Imput
    answerInputElement.value = '';
}

// Sound System for each 'td' added 
const sound = new Audio('/src/audios/checkAudio.mp3');

function addKillerToTable(killer) {
    const tbody = document.querySelector('.tabla tbody');
    const row = document.createElement('tr');

    function createTd() {
        const td = document.createElement('td');
        // Play the sound
        sound.play();
        return td;
    }

    const imgCell = createTd();
    const img = document.createElement('img');
    img.src = killer.imgs.portrait;
    img.alt = killer.name;
    img.style.width = '100px'; 
    imgCell.appendChild(img);
    row.appendChild(imgCell);

    const nameCell = createTd();
    nameCell.textContent = killer.name;
    nameCell.style.backgroundColor = killer.name === killerInfo.name ? 'green' : 'red';
    row.appendChild(nameCell);

    const genderCell = createTd();
    genderCell.textContent = killer.gender;
    genderCell.style.backgroundColor = killer.gender === killerInfo.gender ? 'green' : 'red';
    row.appendChild(genderCell);

    const nationalityCell = createTd();
    nationalityCell.textContent = killer.nationality;
    nationalityCell.style.backgroundColor = killer.nationality === killerInfo.nationality ? 'green' : 'red';
    row.appendChild(nationalityCell);

    const expansionCell = createTd();
    expansionCell.textContent = killer.dlc;
    expansionCell.style.backgroundColor = killer.dlc === killerInfo.dlc ? 'green' : 'red';
    row.appendChild(expansionCell);

    const difficultyCell = createTd();
    difficultyCell.textContent = killer.difficulty;
    difficultyCell.style.backgroundColor = killer.difficulty === killerInfo.difficulty ? 'green' : 'red';
    row.appendChild(difficultyCell);

    tbody.appendChild(row);
}

function scrollToBottom() {
    const tbody = document.querySelector('tbody');
    setTimeout(() => {
        tbody.scrollTop = tbody.scrollHeight;
    }, 0);
}

// Function to update points
function updatePoints(value) {
    points += value;
    localStorage.setItem('points', points);
    document.getElementById('points').textContent = `Points: ${points}`;
}

// Function to update the streak
function updateStreak(isCorrect) {
    if (isCorrect) {
        streak += 1;
    } else {
    }
    localStorage.setItem('streak', streak);
    updateCurrentStreak(streak);
}

// Initialize points and streak from localStorage
document.addEventListener('DOMContentLoaded', () => {
    points = parseInt(localStorage.getItem('points')) || 0;
    const pointsElement = document.getElementById('points');
    if (pointsElement) {
        pointsElement.textContent = `Points: ${points}`;
    } else {
        console.error("Element with ID 'points' not found.");
    }
    streak = parseInt(localStorage.getItem('streak')) || 0;
    updateCurrentStreak(streak);
});

// Call the function to load and log the killer information
loadKillers();
let killerInfo;
let allKillers = [];
let points = 0;
let streak = 0; // Initialize streak
let numberOfTries = 0; // Initialize number of tries

// Load the killers.json file
async function loadKillers() {
    try {
        const response = await fetch('./killers.json');
        const data = await response.json();
        allKillers = data;

        // Generate a random number between 1 and 27
        const randomNumber = Math.floor(Math.random() * 27) + 1;

        // Get the entity with the random number
        const selectedKiller = data.find(killer => killer.number === randomNumber);

        // Save the selected entity's information in a variable
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

// Function to check the input value against the selected killer's name
async function checkAnswer() {
    const answerInput = document.getElementById('answer').value.toLowerCase();
    const validNames = allKillers.map(killer => killer.name.toLowerCase());

    if (validNames.includes(answerInput)) {
        const enteredKiller = allKillers.find(killer => killer.name.toLowerCase() === answerInput);
        if (killerInfo && answerInput === killerInfo.name.toLowerCase()) {
            updatePoints(50); // Add 50 points for a correct answer
            updateStreak(true); // Update streak for correct answer
            localStorage.setItem('numberOfTries', numberOfTries); // Store number of tries
            window.location.href = 'youWin.html';
        } else {
            addKillerToTable(enteredKiller);
            scrollToBottom(); // Scroll to the bottom after adding a new 'td'
            updateStreak(false); // Do not reset streak for incorrect answer
        }
    } else {
        console.log('Invalid value');
        updateStreak(false); // Do not reset streak for invalid answer
    }
    numberOfTries++; // Increment number of tries
}

// Function to create a new table row with the killer's information
function addKillerToTable(killer) {
    const tbody = document.querySelector('.tabla tbody');
    const row = document.createElement('tr');

    const imgCell = document.createElement('td');
    const img = document.createElement('img');
    img.src = killer.imgs.portrait;
    img.alt = killer.name;
    img.style.width = '100px'; // Adjust the size as needed
    imgCell.appendChild(img);
    row.appendChild(imgCell);

    const nameCell = document.createElement('td');
    nameCell.textContent = killer.name;
    nameCell.style.backgroundColor = killer.name === killerInfo.name ? 'green' : 'red';
    row.appendChild(nameCell);

    const genderCell = document.createElement('td');
    genderCell.textContent = killer.gender;
    genderCell.style.backgroundColor = killer.gender === killerInfo.gender ? 'green' : 'red';
    row.appendChild(genderCell);

    const nationalityCell = document.createElement('td');
    nationalityCell.textContent = killer.nationality;
    nationalityCell.style.backgroundColor = killer.nationality === killerInfo.nationality ? 'green' : 'red';
    row.appendChild(nationalityCell);

    const expansionCell = document.createElement('td');
    expansionCell.textContent = killer.dlc;
    expansionCell.style.backgroundColor = killer.dlc === killerInfo.dlc ? 'green' : 'red';
    row.appendChild(expansionCell);

    const difficultyCell = document.createElement('td');
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

// Function to update streak
function updateStreak(isCorrect) {
    if (isCorrect) {
        streak += 1;
        console.log('Correct answer. Streak incremented:', streak);
    } else {
        console.log('Incorrect answer. Streak unchanged:', streak);
    }
    localStorage.setItem('streak', streak);
    updateCurrentStreak(streak);
}

// Initialize points and streak from localStorage
document.addEventListener('DOMContentLoaded', () => {
    points = parseInt(localStorage.getItem('points')) || 0;
    document.getElementById('points').textContent = `Points: ${points}`;
    streak = parseInt(localStorage.getItem('streak')) || 0;
    updateCurrentStreak(streak);
});

// Call the function to load and log the killer information
loadKillers();
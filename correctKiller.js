let killerInfo;
let allKillers = [];

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

        // Log the selected killer's information
        console.log('Selected Killer Information:');
        console.log('Name:', killerInfo.name);
        console.log('Gender:', killerInfo.gender);
        console.log('Nationality:', killerInfo.nationality);
        console.log('Expansion:', killerInfo.dlc);
        console.log('Dificulty:', killerInfo.difficulty);
        console.log('Portrait:', killerInfo.imgs.portrait);
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
        if (killerInfo && answerInput === killerInfo.name.toLowerCase()) {
            window.location.href = 'youWin.html';
        } else {
            console.log('incorrect');
        }
    } else {
        console.log('Invalid value');
    }
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
    row.appendChild(nameCell);

    const genderCell = document.createElement('td');
    genderCell.textContent = killer.gender;
    row.appendChild(genderCell);

    const nationalityCell = document.createElement('td');
    nationalityCell.textContent = killer.nationality;
    row.appendChild(nationalityCell);

    const expansionCell = document.createElement('td');
    expansionCell.textContent = killer.dlc;
    row.appendChild(expansionCell);

    const difficultyCell = document.createElement('td');
    difficultyCell.textContent = killer.difficulty;
    row.appendChild(difficultyCell);

    tbody.appendChild(row);
}

// Function to check the input value against the selected killer's name
async function checkAnswer() {
    const answerInput = document.getElementById('answer').value.toLowerCase();
    const validNames = allKillers.map(killer => killer.name.toLowerCase());

    if (validNames.includes(answerInput)) {
        const enteredKiller = allKillers.find(killer => killer.name.toLowerCase() === answerInput);
        if (killerInfo && answerInput === killerInfo.name.toLowerCase()) {
            window.location.href = 'youWin.html';
        } else {
            console.log('incorrect');
            addKillerToTable(enteredKiller);
        }
    } else {
        console.log('Invalid value');
    }
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

// Function to check the input value against the selected killer's name
async function checkAnswer() {
    const answerInput = document.getElementById('answer').value.toLowerCase();
    const validNames = allKillers.map(killer => killer.name.toLowerCase());

    if (validNames.includes(answerInput)) {
        const enteredKiller = allKillers.find(killer => killer.name.toLowerCase() === answerInput);
        if (killerInfo && answerInput === killerInfo.name.toLowerCase()) {
            window.location.href = 'youWin.html';
        } else {
            console.log('incorrect');
            addKillerToTable(enteredKiller);
        }
    } else {
        console.log('Invalid value');
    }
}

function scrollToBottom() {
    const tbody = document.querySelector('tbody');
    setTimeout(() => {
        tbody.scrollTop = tbody.scrollHeight;
    }, 0);
}

// Function to check the input value against the selected killer's name
async function checkAnswer() {
    const answerInput = document.getElementById('answer').value.toLowerCase();
    const validNames = allKillers.map(killer => killer.name.toLowerCase());

    if (validNames.includes(answerInput)) {
        const enteredKiller = allKillers.find(killer => killer.name.toLowerCase() === answerInput);
        if (killerInfo && answerInput === killerInfo.name.toLowerCase()) {
            window.location.href = 'youWin.html';
        } else {
            console.log('incorrect');
            addKillerToTable(enteredKiller);
            scrollToBottom(); // Scroll to the bottom after adding a new 'td'
        }
    } else {
        console.log('Invalid value');
    }
}

// Call the function to load and log the killer information
loadKillers();
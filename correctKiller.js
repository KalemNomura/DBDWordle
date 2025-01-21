let killerInfo;

// Load the killers.json file
async function loadKillers() {
    try {
        const response = await fetch('./killers.json');
        const data = await response.json();

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
    const answerInput = document.getElementById('answer').value;
    if (killerInfo && answerInput.toLowerCase() === killerInfo.name.toLowerCase()) {
        window.location.href = 'youWin.html';
    } else {
        console.log('incorrect');
    }
}

// Call the function to load and log the killer information
loadKillers();
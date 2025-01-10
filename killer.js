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
        const killerInfo = selectedKiller;

        // Log the selected killer's information
        console.log('Selected Killer Information:');
        console.log('Name:', killerInfo.name);
        console.log('Number:', killerInfo.number);
        console.log('Description:', killerInfo.description);
    } catch (error) {
        console.error('Error loading killers.json:', error);
    }
}

// Call the function to load and log the killer information ERROR
loadKillers();
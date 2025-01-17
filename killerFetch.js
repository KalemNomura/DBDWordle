let killers = [];

document.getElementById('answer').addEventListener('input', function(event) {
    const input = event.target.value.toLowerCase();
    const filteredKillers = killers.filter(killer => killer.name.toLowerCase().includes(input));
    updateSuggestions(filteredKillers);
});

document.getElementById('answer').addEventListener('keydown', handleKeyDown);

export async function fetchKillersData() {
    try {
        const response = await fetch('./killers.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const killers = await response.json();
        return killers;
    } catch (error) {
        console.error('Error fetching killers data:', error);
    }
}

function updateSuggestions(filteredKillers) {
    const suggestions = document.getElementById('suggestions');
    suggestions.innerHTML = '';

    filteredKillers.forEach((killer, index) => {
        const suggestionItem = document.createElement('div');
        suggestionItem.classList.add('search-result');
        suggestionItem.dataset.index = index;
        suggestionItem.textContent = killer.name;
        console.log(`Adding click event listener to: ${killer.name}`); // Debugging line
        suggestionItem.addEventListener('click', function() {
            console.log(`Suggestion clicked: ${killer.name}`); // Debugging line
            document.getElementById('answer').value = killer.name;
            suggestions.innerHTML = ''; // Hide suggestions after selection
            showKillerInfo(killer.name.toLowerCase()); // Autocomplete and show info
        });
        suggestions.appendChild(suggestionItem);
    });

    console.log('Suggestions updated:', suggestions.innerHTML); // Debugging line
}

function handleKeyDown(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('answer').value.toLowerCase();
        showKillerInfo(input);
    }
}

function showKillerInfo(input) {
    const matchedKiller = killers.find(killer => killer.name.toLowerCase() === input);
    if (matchedKiller) {
        addKillerToTable(matchedKiller);
    } else {
        alert('No matching killer found');
    }
}

function addKillerToTable(killer) {
    const tableBody = document.querySelector('table tbody');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td><img src="${killer.imgs.portrait}" alt="${killer.name}" style="width:100%; height:100%; object-fit: cover;"></td>
        <td>${killer.name}</td>
        <td>${killer.gender}</td>
        <td>${killer.nationality}</td>
        <td>${killer.dlc}</td>
        <td>${killer.difficulty}</td>
    `;

    tableBody.appendChild(row);
}

async function init() {
    killers = await fetchKillersData();
    console.log('Killers data loaded:', killers); // Debugging line
    // Additional initialization code if needed
}

init();
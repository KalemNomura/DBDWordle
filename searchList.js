import { fetchKillersData } from './killerFetch.js';

let killers = [];

function updateSuggestions(filteredKillers) {
    const suggestions = document.getElementById('suggestions');
    suggestions.innerHTML = '';

    filteredKillers.forEach((killer, index) => {
        const suggestionItem = document.createElement('div');
        suggestionItem.classList.add('search-result');
        suggestionItem.dataset.index = index;
        suggestionItem.textContent = killer.name;
        suggestionItem.addEventListener('click', function() {
            console.log(`Suggestion clicked: ${killer.name}`); // Debugging line
            document.getElementById('answer').value = killer.name;
            suggestions.innerHTML = ''; // Hide suggestions after selection
            showKillerInfo(killer.name.toLowerCase()); // Autocomplete and show info
        });
        suggestions.appendChild(suggestionItem);
    });
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
        <td><img src="${killer.portrait}" alt="${killer.name}" style="width:100%; height:100%; object-fit: cover;"></td>
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
import { fetchKillersData } from './killerFetch.js';

let currentIndex = -1;
let filteredKillers = [];
let killers = [];

document.getElementById('answer').addEventListener('input', function(event) {
    const input = event.target.value.toLowerCase();
    filteredKillers = killers.filter(killer => killer.name.toLowerCase().includes(input));
    updateSuggestions(filteredKillers);
});

document.getElementById('answer').addEventListener('keydown', handleKeyDown);

function updateSuggestions(filteredKillers) {
    const suggestions = document.getElementById('suggestions');
    suggestions.innerHTML = '';

    filteredKillers.forEach((killer, index) => {
        const suggestionItem = document.createElement('div');
        suggestionItem.classList.add('search-result');
        suggestionItem.dataset.index = index;

        // Only include the killer's name in the suggestion item
        suggestionItem.textContent = killer.name;

        suggestions.appendChild(suggestionItem);
    });

    currentIndex = -1; // Reset the current index
}

function handleKeyDown(event) {
    const suggestions = document.getElementById('suggestions');
    const suggestionItems = suggestions.getElementsByClassName('search-result');

    if (event.key === 'ArrowDown') {
        currentIndex = (currentIndex + 1) % suggestionItems.length;
        updateSelection(suggestionItems);
    } else if (event.key === 'ArrowUp') {
        currentIndex = (currentIndex - 1 + suggestionItems.length) % suggestionItems.length;
        updateSelection(suggestionItems);
    } else if (event.key === 'Enter' && currentIndex >= 0) {
        const input = document.getElementById('answer');
        input.value = filteredKillers[currentIndex].name;
        suggestions.innerHTML = ''; // Hide suggestions after selection
        input.focus(); // Keep focus on the input
        addKillerToTable(filteredKillers[currentIndex]); // Add selected killer to table
    }
}

function updateSelection(suggestionItems) {
    Array.from(suggestionItems).forEach((item, index) => {
        if (index === currentIndex) {
            item.classList.add('selected');
        } else {
            item.classList.remove('selected');
        }
    });
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

// Fetch the killers data and initialize the killers array
fetchKillersData().then(data => {
    killers = data;
});
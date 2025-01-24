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
        event.target.value = suggestionItems[currentIndex].textContent;
        suggestions.innerHTML = ''; // Clear suggestions
    }
}

function updateSelection(suggestionItems) {
    Array.from(suggestionItems).forEach((item, index) => {
        if (index === currentIndex) {
            item.classList.add('selected');
            item.scrollIntoView({ block: 'nearest' });
        } else {
            item.classList.remove('selected');
        }
    });
}

document.addEventListener('click', function(event) {
    const suggestions = document.getElementById('suggestions');
    const input = document.getElementById('answer');
    if (!suggestions.contains(event.target) && event.target !== input) {
        suggestions.innerHTML = ''; // Hide suggestions
    }
});

document.getElementById('suggestions').addEventListener('click', function(event) {
    const target = event.target.closest('.search-result');
    if (target) {
        const index = target.dataset.index;
        const input = document.getElementById('answer');
        input.value = filteredKillers[index].name;
        suggestions.innerHTML = ''; // Hide suggestions after selection
        input.focus(); // Keep focus on the input
    }
});

async function init() {
    killers = await fetchKillersData();
    // Additional initialization code if needed
}

init();
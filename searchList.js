import { fetchKillersData } from './killerFetch.js';

let killers = [];

async function init() {
    killers = await fetchKillersData();
}

function handleKeyPress(event) {
    const input = event.target.value.toLowerCase();
    const suggestions = document.getElementById('suggestions');
    suggestions.innerHTML = '';

    if (input.length > 0) {
        const filteredKillers = killers.filter(killer => 
            killer.name.toLowerCase().includes(input)
        );

        filteredKillers.forEach(killer => {
            const div = document.createElement('div');
            div.className = 'search-result';
            div.innerHTML = `
                <p>${killer.name}</p>
            `;
            suggestions.appendChild(div);
        });
    }
}

document.getElementById('answer').addEventListener('input', handleKeyPress);

document.addEventListener('click', function(event) {
    const suggestions = document.getElementById('suggestions');
    const input = document.getElementById('answer');
    if (!suggestions.contains(event.target) && event.target !== input) {
        suggestions.innerHTML = ''; // Hide suggestions
    }
});

init();
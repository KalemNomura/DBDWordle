document.addEventListener('DOMContentLoaded', function() {
    const playerCountIcon = document.getElementById('playerCount');
    const currentPlayers = document.getElementById('currentPlayers');
    let previousCount = null;

    function getRandomPlayerCount() {
        if (previousCount === null) {
            return Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
        } else {
            let newCount;
            do {
                newCount = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
            } while (Math.abs(newCount - previousCount) > 5);
            return newCount;
        }
    }

    playerCountIcon.addEventListener('click', function() {
        if (currentPlayers.style.display === 'none' || currentPlayers.textContent === '') {
            const randomCount = getRandomPlayerCount();
            currentPlayers.textContent = `There are currently ${randomCount} concurrent players`;
            currentPlayers.style.display = 'block';
            previousCount = randomCount;
        } else {
            currentPlayers.style.display = 'none';
        }
    });

    // Initially hide the player count text
    currentPlayers.style.display = 'none';
});
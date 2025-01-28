// Function to update the current streak
function updateCurrentStreak(streak) {

    var currentStreakElement = document.getElementById('currentStreak');
    
    currentStreakElement.innerHTML = 'Your current number of correct answers is ' + streak;
}

// Function to toggle the visibility of the current streak
function toggleCurrentStreak() {
    var currentStreakElement = document.getElementById('currentStreak');
    if (currentStreakElement.style.display === 'none' || currentStreakElement.style.display === '') {
        currentStreakElement.style.display = 'block';
    } else {
        currentStreakElement.style.display = 'none';
    }
}

// Add event listener to the fire icon
document.querySelector('.fas.fa-fire').addEventListener('click', toggleCurrentStreak);
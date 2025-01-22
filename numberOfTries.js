let numberOfTries = 0;

// Function to increment the number of tries
function incrementTries() {
    numberOfTries++;
    localStorage.setItem('numberOfTries', numberOfTries);
}

// Function to reset the number of tries
function resetTries() {
    numberOfTries = 0;
    localStorage.setItem('numberOfTries', numberOfTries);
}

// Function to get the number of tries from localStorage
function getNumberOfTries() {
    return localStorage.getItem('numberOfTries') || 0;
}

// Export the functions to be used in other scripts
module.exports = { incrementTries, resetTries, getNumberOfTries };
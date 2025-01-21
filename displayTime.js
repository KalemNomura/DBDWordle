// Retrieve and display the elapsed time
const elapsedTime = localStorage.getItem('elapsedTime');
if (elapsedTime) {
    const hours = Math.floor(elapsedTime / 3600000);
    const minutes = Math.floor((elapsedTime % 3600000) / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    document.getElementById('timeTaken').textContent = `Time taken: ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
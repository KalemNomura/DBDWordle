let stopwatchInterval;
let elapsedTime = 0;
let isRunning = false;

window.onload = () => {
    const storedTime = localStorage.getItem('elapsedTime');
    if (storedTime) {
        elapsedTime = parseInt(storedTime, 10);
        updateDisplay();
    }
};

function toggleStopwatch() {
    const stopwatchDiv = document.querySelector('.stopwatch');
    if (stopwatchDiv.style.display === 'none' || stopwatchDiv.style.display === '') {
        stopwatchDiv.style.display = 'block';
    } else {
        stopwatchDiv.style.display = 'none';
    }
}

function stopAndStoreTime() {
    isRunning = false;
    clearInterval(stopwatchInterval);
    localStorage.setItem('elapsedTime', elapsedTime);
}

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        stopwatchInterval = setInterval(() => {
            elapsedTime += 1000;
            updateDisplay();
        }, 1000);
        document.getElementById('startStopBtn').textContent = 'Stop';
    } else {
        stopAndStoreTime();
        document.getElementById('startStopBtn').textContent = 'Start';
    }
}

function resetStopwatch() {
    isRunning = false;
    clearInterval(stopwatchInterval);
    elapsedTime = 0;
    updateDisplay();
    document.getElementById('startStopBtn').textContent = 'Start';
}

function updateDisplay() {
    const display = document.getElementById('display');
    const hours = Math.floor(elapsedTime / 3600000);
    const minutes = Math.floor((elapsedTime % 3600000) / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    display.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

document.getElementById('startStopBtn').addEventListener('click', startStopwatch);
document.getElementById('resetBtn').addEventListener('click', resetStopwatch);
function toggleShop() {
    const shopDiv = document.querySelector('.shop');
    if (shopDiv.style.display === 'none' || shopDiv.style.display === '') {
        shopDiv.style.display = 'block';
    } else {
        shopDiv.style.display = 'none';
    }
}

function updateBackground(imagePath) {
    const points = parseInt(localStorage.getItem('points')) || 0;
    const defaultImagePath = '/imgs/background.webp'; // Replace with the actual default image path

    // Normalize paths by removing leading slashes
    const normalizedImagePath = imagePath.replace(/^\//, '');
    const normalizedDefaultImagePath = defaultImagePath.replace(/^\//, '');

    console.log('Points:', points);
    console.log('Image Path:', normalizedImagePath);
    console.log('Default Image Path:', normalizedDefaultImagePath);

    if (normalizedImagePath === normalizedDefaultImagePath || points >= 100) {
        document.body.style.backgroundImage = `url('${imagePath}')`;
        localStorage.setItem('backgroundImage', imagePath); // Save the path to localStorage
        if (normalizedImagePath !== normalizedDefaultImagePath) {
            updatePoints(-100); // Subtract 100 points only if it's not the default image
        }
    } else {
        // Show the points modal
        const pointsModal = document.getElementById('pointsModal');
        if (pointsModal) {
            console.log('Showing points modal');
            pointsModal.style.display = 'flex';
            console.log('Modal display style:', pointsModal.style.display);
        } else {
            console.error('Points modal not found');
        }
    }
}

// Close the points modal when the close button is clicked
document.getElementById('closePointsModal').addEventListener('click', () => {
    const pointsModal = document.getElementById('pointsModal');
    if (pointsModal) {
        pointsModal.style.display = 'none';
        console.log('Closing points modal');
    } else {
        console.error('Points modal not found');
    }
});

// Check localStorage for a saved background image on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedImagePath = localStorage.getItem('backgroundImage');
    if (savedImagePath) {
        document.body.style.backgroundImage = `url('${savedImagePath}')`;
    }
});
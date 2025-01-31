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
    const defaultImagePath = '/src/imgs/background.webp'; 
    const currentBackgroundImage = localStorage.getItem('backgroundImage') || defaultImagePath;

    // Normalize paths by removing leading slashes
    const normalizedImagePath = imagePath.replace(/^\//, '');
    const normalizedDefaultImagePath = defaultImagePath.replace(/^\//, '');
    const normalizedCurrentBackgroundImage = currentBackgroundImage.replace(/^\//, '');

    if (normalizedImagePath === normalizedDefaultImagePath || points >= 100) {
        if (normalizedImagePath !== normalizedCurrentBackgroundImage) {
            document.body.style.backgroundImage = `url('${imagePath}')`;
            localStorage.setItem('backgroundImage', imagePath); // Save the path to localStorage
            if (normalizedImagePath !== normalizedDefaultImagePath) {
                updatePoints(-100); 
            }
        }
    } else {
        // Show the points modal
        const pointsModal = document.getElementById('pointsModal');
        if (pointsModal) {
            pointsModal.style.display = 'flex';
        } else {
            console.error('Points modal not found');
        }
    }
}

document.getElementById('closePointsModal').addEventListener('click', () => {
    const pointsModal = document.getElementById('pointsModal');
    if (pointsModal) {
        pointsModal.style.display = 'none';
    } else {
        console.error('Points modal not found');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const savedBackgroundImage = localStorage.getItem('backgroundImage');
    if (savedBackgroundImage) {
        document.body.style.backgroundImage = `url('${savedBackgroundImage}')`;
    }
});
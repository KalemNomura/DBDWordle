function toggleShop() {
    const shopDiv = document.querySelector('.shop');
    if (shopDiv.style.display === 'none' || shopDiv.style.display === '') {
        shopDiv.style.display = 'block';
    } else {
        shopDiv.style.display = 'none';
    }
}

function updateBackground(imagePath) {
    console.log(`Updating background to: ${imagePath}`); // Debugging line
    document.body.style.backgroundImage = `url('${imagePath}')`;
    localStorage.setItem('backgroundImage', imagePath); // Save the path to localStorage
}

// Check localStorage for a saved background image on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedImagePath = localStorage.getItem('backgroundImage');
    if (savedImagePath) {
        document.body.style.backgroundImage = `url('${savedImagePath}')`;
    }
});
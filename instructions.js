function initializeRulesModal() {
    // Get elements
    const rulesButton = document.getElementById('rulesButton');
    const rulesModal = document.getElementById('rulesModal');
    const closeModal = document.getElementById('closeModal');

    // Show modal when button is clicked
    rulesButton.addEventListener('click', () => {
        rulesModal.style.display = 'flex';
    });

    // Close modal when "Close" button is clicked
    closeModal.addEventListener('click', () => {
        rulesModal.style.display = 'none';
    });

    // Close modal when clicking outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target === rulesModal) {
            rulesModal.style.display = 'none';
        }
    });
}

// Initialize the modal functionality when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeRulesModal);

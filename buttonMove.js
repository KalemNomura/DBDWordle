document.getElementById('No').addEventListener('click', function() {
    const button = this;
    const maxMove = 50; // Maximum pixels to move
    const randomX = Math.floor(Math.random() * maxMove) - (maxMove / 2);
    const randomY = Math.floor(Math.random() * maxMove) - (maxMove / 2);
    const currentLeft = button.offsetLeft;
    const currentTop = button.offsetTop;
    button.style.position = 'absolute';
    button.style.left = (currentLeft + randomX) + 'px';
    button.style.top = (currentTop + randomY) + 'px';
});
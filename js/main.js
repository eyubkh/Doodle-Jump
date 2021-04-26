document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const doodler = document.createElement('div');

    function createDoodler() {
        grid.appendChild(doodler);
        doodler.className = 'gird_doodler';
    }
    createDoodler();
});

export function changeDisplay() {

    const displayGrid = document.querySelector('#grid-layout');
    const displayList = document.querySelector('#list-layout');
    const cards = document.querySelector('#news-container');

    if (displayGrid && displayList && cards) {

        displayGrid.addEventListener('click',() => {
            displayGrid.className = "active-layout";
            displayList.className = "";
            if (cards.classList.contains('list')) {
                cards.classList.toggle('grid');
                cards.classList.toggle('list');
            }
            
        })

        displayList.addEventListener('click',() => {
            displayList.className = "active-layout";
            displayGrid.className = "";
            if (cards.classList.contains('grid')) {
                cards.classList.toggle('grid');
                cards.classList.toggle('list');
            }
        })
    }
}

import { createAnimalSumTemplate } from './gettemplate.js';

const url = './data/endangered.json';
const animalDialog = document.querySelector('#animal-dialog')
const animalsContainer = document.querySelector('#endangered');

export async function getEndangeredAnimals() { // For sum Home page

    if (animalsContainer) {

        try {
            const response = await fetch(url);
            const data = await response.json();
            // console.table(data.endangered); // temporary testing of data response
            displayAnimalsSum(data.endangered);

        } catch (error) {
            console.error('Error fetching endangered animals:', error);
            animalsContainer.innerHTML = `<p>Error loading endangered animals: ${error.message}</p>`;
        }
    }
}

function displayAnimalsSum(animals) {

    animalsContainer.innerHTML = "";

    animals.forEach(element => {

        let card = createAnimalSumTemplate(element, animalDialog);

        animalsContainer.appendChild(card);
        
    });
}

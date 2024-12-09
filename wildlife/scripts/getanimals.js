const animalDialog = document.querySelector('#animal-dialog')

import { createAnimalSumTemplate } from './gettemplate.js';

const apiKey = 'b/HsPxzC6d/nQjQijbvvJw==SMa0npBggCcaYMXG';
const apiUrl = 'https://api.api-ninjas.com/v1/animals?name=';

const animalsContainer = document.querySelector('#animals-container');
let displayedAnimals = [];

export async function getAllAnimalsSum() {
    displayedAnimals = [];

    if (animalsContainer) {
    
        try {
            // Load the animals from the animals.json file
            const response = await fetch('./data/animals.json');
            const data = await response.json();
            animalsContainer.innerHTML = "";

            // Loop through the animals and make API requests
            for (const animal of data.animals) {
                const animalData = await fetch(`${apiUrl}${animal}`, {
                    headers: { 'X-Api-Key': apiKey }
                });

                if (animalData.ok) {
                    const animalInfo = await animalData.json();
                    // console.log(animalInfo); // temporary testing of data response
                    displayAnimalsSum(animalInfo);
                } else {
                    console.error(`Failed to fetch data for ${animal}:`, animalData.status);
                }
            }
        } catch (error) {
            console.error('Error fetching animal data:', error);
        }
    }
}

function displayAnimalsSum(animals) {

    animals.forEach(element => {

        displayedAnimals.push(element);

        let card = createAnimalSumTemplate(element, animalDialog);

        animalsContainer.appendChild(card);
        
    });
}

const searchBar = document.querySelector('#animal-search');
const suggestionsContainer = document.querySelector('#suggestions-container');

// Set a search bar for the animals
export function setSearchBar() {

    if (animalsContainer) {

        searchBar.addEventListener('input', () => {

    const query = searchBar.value.toLowerCase();

    if (query) {
        // Filtering shown animals
        const suggestions = displayedAnimals.filter(animal =>

            animal.name.toLowerCase().includes(query)
        
        ).slice(0, 4); // Show just 4 matching names

        // Empty the suggestions
        suggestionsContainer.innerHTML = '';


        suggestions.forEach(animal => {
            const suggestion = document.createElement('div');
            suggestion.className = 'suggestion';
            suggestion.textContent = animal.name;

            // Click on a suggestion
            suggestion.addEventListener('click', () => {

                const card = Array.from(animalsContainer.children).find(

                    card => card.querySelector('h3').textContent === animal.name

                );

                if (card) {

                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    searchBar.value = ''; // Empty the search bar
                    suggestionsContainer.innerHTML = ''; // Empty the suggestions container
                }
            });

            suggestionsContainer.appendChild(suggestion);
        });
        
    } else {
        suggestionsContainer.innerHTML = ''; // Empty the suggestions if there's no match
    }
});
    }
}

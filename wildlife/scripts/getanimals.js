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

function createAnimalSumTemplate(animal) {

        /*
        Card             | div
        Name             | h3
        Scientific Name  | p
        Slogan           | p
        Diet             | p
        Location         | p
        */

    let card = document.createElement('div');

    let title = document.createElement('h3');
    title.textContent = animal.name;
    card.appendChild(title);

    let scientificName = document.createElement('p')
    scientificName.innerHTML = `<b>Scientific name</b>: <i>${animal.taxonomy.scientific_name}</i>`;
    card.appendChild(scientificName);

    let slogan = document.createElement('p');
    slogan.textContent = animal.characteristics.slogan;
    card.appendChild(slogan);

    let diet = document.createElement('p');
    diet.innerHTML = `<b>Diet</b>: ${animal.characteristics.diet}.`;
    card.appendChild(diet);

    let animalLocation = document.createElement('p');
    animalLocation.innerHTML = `<b>Location</b>: ${animal.locations.join(", ")}.`;
    card.appendChild(animalLocation);

    // "Know more" button
    let knowMoreButton = document.createElement('button');
    knowMoreButton.textContent = 'Know More';
    knowMoreButton.classList.add('know-more-button');
    knowMoreButton.addEventListener('click', () => {
        openAnimalDialog(animal);  // Call the function to open the dialog
    });
    card.appendChild(knowMoreButton);
    
    return card;
}


function displayAnimalsSum(animals) {

    animals.forEach(element => {
        displayedAnimals.push(element);
        let card = createAnimalSumTemplate(element);
        animalsContainer.appendChild(card);
    });

}

const animalDialog = document.querySelector('#animal-dialog')

function openAnimalDialog(animal) {

    animalDialog.innerHTML = "";
    animalDialog.appendChild(createDialogTemplate(animal));
    // Append the dialog to the body and open it
    animalDialog.showModal();
}

function createDialogTemplate(animal) {

    /*
    Card             | dialog
    Animal name      | h2
    Scientific Name  | p
    Taxonomy         | h3
    List             | ul
        a. Kingdom   | li
        b. Phylum    | li
        c. Class     | li
        d. Order     | li
        e. Family    | li
        f. Genus     | li
    Diet             | p
    Prey             | p
    Location         | p
    Close            | button

    Locate on map? Read about this feature
    */

    let card = document.createElement('div');

    let animalName = document.createElement('h3');
    animalName.textContent = animal.name;
    card.appendChild(animalName);

    let scientificName = document.createElement('p')
    scientificName.innerHTML = `<b>Scientific name</b>: <i>${animal.taxonomy.scientific_name}</i>`;
    card.appendChild(scientificName);

    let divInfo = document.createElement('div');

    let taxDiv = document.createElement('div');

    let taxonomy = document.createElement('ul');

    let taxTitle = document.createElement('h4');
    taxTitle.textContent = "Taxonomy";
    // divInfo.appendChild(taxTitle);
    taxDiv.appendChild(taxTitle);

    let  kingdom = document.createElement('li');
    kingdom.innerHTML = `<b>Kingdom</b>: ${animal.taxonomy.kingdom}.`;
    taxonomy.appendChild(kingdom);

    let  phylum = document.createElement('li');
    phylum.innerHTML = `<b>Phylum</b>: ${animal.taxonomy.phylum}.`;
    taxonomy.appendChild(phylum);

    let  taxClass = document.createElement('li');
    taxClass.innerHTML = `<b>Class</b>: ${animal.taxonomy.class}.`;
    taxonomy.appendChild(taxClass);

    let  taxOrder = document.createElement('li');
    taxOrder.innerHTML = `<b>Order</b>: ${animal.taxonomy.order}.`;
    taxonomy.appendChild(taxOrder);

    let  taxFamily = document.createElement('li');
    taxFamily.innerHTML = `<b>Family</b>: ${animal.taxonomy.family}.`;
    taxonomy.appendChild(taxFamily);

    let  genus = document.createElement('li');
    genus.innerHTML = `<b>Genus</b>: ${animal.taxonomy.genus}.`;
    taxonomy.appendChild(genus);

    taxDiv.appendChild(taxonomy);

    divInfo.appendChild(taxDiv);

    // card.appendChild(taxonomy);

    let divBehavior = document.createElement('div');
    divBehavior.setAttribute('class', 'animal-behavior');

    let diet = document.createElement('p');
    diet.innerHTML = `<b>Diet</b>: ${animal.characteristics.diet}.`;
    // card.appendChild(diet);
    divBehavior.appendChild(diet);

    let prey = document.createElement('p');

    if (animal.characteristics.prey){
        prey.innerHTML = `<b>Prey</b>: ${animal.characteristics.prey}.`;
    } else if (animal.characteristics.main_prey) {
        prey.innerHTML = `<b>Prey</b>: ${animal.characteristics.main_prey}.`;
    } else {
        prey.innerHTML = "<b>Prey</b>: Unknown.";
    }

    // card.appendChild(prey);
    divBehavior.appendChild(prey);

    let animalLocation = document.createElement('p');
    animalLocation.innerHTML = `<b>Location</b>: ${animal.locations.join(", ")}.`;
    // card.appendChild(animalLocation);
    divBehavior.appendChild(animalLocation);

    divInfo.appendChild(divBehavior);

    card.appendChild(divInfo);

    let button = document.createElement('button');
    button.setAttribute('class', 'close-dialog');
    button.textContent = "✖";

    button.addEventListener("click", () => {
        animalDialog.close();
    });

    card.appendChild(button);
    
    return card;
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

const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

const cards = document.querySelector('#cards');

async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    // console.table(data.prophets); // temporary testing of data response
    displayProphets(data.prophets); // note that we reference the prophets array of the JSON data object, not just the object
}

getProphetData();


const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        // Create elements to add to the div.cards element
        let card = document.createElement('section');
        let fullName = document.createElement('h2');
        let birthDate = document.createElement('p');
        let birthPlace = document.createElement('p');
        
        let portrait = document.createElement('img');

        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;
        birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;

        card.appendChild(fullName);
        card.appendChild(birthDate);
        card.appendChild(birthPlace);

        if (prophet.death) {
            let deathDate = document.createElement('p');
            deathDate.textContent = `Date of Death: ${prophet.death}`;
            card.appendChild(deathDate);
        }

        // Aesthetic

        let numberSuffix;

        switch (prophet.order) {
            case 1 || 21:
                numberSuffix = "st";
                break;
        
            case 2 || 22:
                numberSuffix = "nd";
                break;
            
            case 3 || 23:
                numberSuffix = "rd";
                break;

            default:
                numberSuffix = "th"
                break;
        }


        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname} - ${prophet.order}${numberSuffix} Latter-day President`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');


        card.appendChild(portrait);

        cards.appendChild(card);
    }); // end of arrow function and forEach loop
}




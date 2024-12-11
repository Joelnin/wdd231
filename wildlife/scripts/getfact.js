const url = './data/facts.json';
const factsContainer = document.querySelector('#facts-container');

export async function getFacts() { // For sum Home page

    if (factsContainer) {

        try {
            const response = await fetch(url);
            const data = await response.json();
            // console.table(data.facts); // temporary testing of data response
            displayFact(data.facts);

        } catch (error) {
            console.error('Error fetching interesting facts:', error);
            factsContainer.innerHTML = `<p>Error loading interesting facts: ${error.message}</p>`;
        }
    }
}

function displayFact(facts) {

    let random = Math.floor(Math.random() * facts.length);

    let fact = document.createElement('span');

    fact.textContent = facts[random].fact;

    factsContainer.innerHTML = "";
    factsContainer.appendChild(fact);
}
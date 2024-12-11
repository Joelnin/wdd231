import { capitalize, decodeSpecialChars } from './grammar.js';

export function createArticleTemplate(article) {

    /*
    Card          | article
    Image         | img (not posible for 500kb limit, read about this)
    Title         | h3
    Descripción   | p
    Source        | p
    SourceURL     | a
    */
    
    let card = document.createElement('article');

    let divImg = document.createElement('div');
    divImg.setAttribute('class', 'art-img')

    if (article.urlToImage) {
        let img = document.createElement('img');

        img.setAttribute('src',`images/${article.urlToImage}`);
        img.setAttribute('alt',`${article.title} Image`);
        img.setAttribute('height', '300');
        img.setAttribute('width', '300');
        img.setAttribute('loading', 'lazy');

        divImg.appendChild(img);
    }

    let divInfo = document.createElement('div');
    divInfo.setAttribute('class', 'art-info')

    let title = document.createElement('h3');
    title.textContent = article.title;
    divInfo.appendChild(title);
    // card.appendChild(title);

    let description = document.createElement('p');

    if (article.description) {
    
        description.textContent = article.description;
    
    } else {
        description.textContent = "There's no description available.";
    }

    divInfo.appendChild(description);
    // card.appendChild(description);

    let source = document.createElement('p');

    source.textContent = `Source: ${article.source.name}`;
    divInfo.appendChild(source);
    // card.appendChild(source);

    let sourceURL = document.createElement('a');

    sourceURL.setAttribute('href', `${article.url}`);
    sourceURL.setAttribute('target', '_blank');
    sourceURL.textContent = "Read Article";
    divInfo.appendChild(sourceURL);
    // card.appendChild(sourceURL);

    card.appendChild(divImg);
    card.appendChild(divInfo);

    return card;
}

// This template is for summary of animals and more info

export function createAnimalSumTemplate(animal, dialog) {

    /*
    Card             | div
    Name             | h3
    Picture (if)     | img
    Scientific Name  | p
    Slogan           | p
    Diet             | p
    Location         | p
    */

    let card = document.createElement('div');

    let title = document.createElement('h3');
    title.textContent = animal.name;
    card.appendChild(title);

    if (animal.picture) {
        let img = document.createElement('img');

        img.setAttribute('src',`images/${animal.picture}`);
        img.setAttribute('alt',`${animal.name} Picture`);
        img.setAttribute('height', '300');
        img.setAttribute('width', '300');
        img.setAttribute('loading', 'lazy');

        card.appendChild(img);
    }

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
        openAnimalDialog(animal, dialog);  // Call the function to open the dialog
    });
    card.appendChild(knowMoreButton);

    return card;
}

function openAnimalDialog(animal, dialog) {

    dialog.innerHTML = "";
    dialog.appendChild(createAnimalDialogTemplate(animal, dialog));
    // Append the dialog to the body and open it
    dialog.showModal();
}

function createAnimalDialogTemplate(animal, dialog) {

    /*
    Card             | dialog
    Animal name      | h3
    Picture (if)     | img
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

    if (animal.picture) {
        let img = document.createElement('img');

        img.setAttribute('src',`images/${animal.picture}`);
        img.setAttribute('alt',`${animal.name} Picture`);
        img.setAttribute('height', '300');
        img.setAttribute('width', '300');
        img.setAttribute('loading', 'lazy');

        card.appendChild(img);
    }

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
        dialog.close();
    });

    card.appendChild(button);
    
    return card;
}

export function createInfoTemplate(info) {

    let div = document.createElement('div');

    if (info.username) {
        let userName = document.createElement('p');
        userName.textContent = `Hello, ${capitalize(info.username.replace("+"," "))}`;

        div.appendChild(userName);
    }

    if (info.conemail) {
        let email = document.createElement('p');
        email.textContent = `Email: ${info.conemail.replace("%40","@")}`;
        div.appendChild(email);
    }

    let purpose = document.createElement('p');
    purpose.textContent = `Purpose: ${capitalize(info.purpose.replace("+"," "))}`;
    div.appendChild(purpose);

    let message = document.createElement('p');
    message.textContent = `Your message: ${decodeSpecialChars(info.message.replaceAll("+"," "))}`;
    div.appendChild(message);

    let date = document.createElement('p');

    date.textContent = `Message sent on ${getDateFormat(info.hiddendate)}`;
    div.appendChild(date);

    return div;
}

function getDateFormat(date) {
    let dateRaw = date.split('+');
    // console.log(dateRaw);

    /*
    dateRaw
    0: Day (Wed)
    1: Month (Nov)
    2: Day Number (27)
    3: Year (2024)
    4: Hour (18) %3A Minutes (42) %3A Seconds (40)
    5: GMT (GMT-0400)
    */

    let day = dateRaw[0];
    let month = dateRaw[1];
    let dayNum = dateRaw[2];
    let year = dateRaw[3];

    let timeRaw = dateRaw[4].split('%3A');
    let timeFormat = `${timeRaw[0]}:${timeRaw[1]}`;

    let GMT = dateRaw[5];

    return `${day} - ${month}/${dayNum}/${year} at ${timeFormat} (${GMT})`;
}


export function createArticleSumTemplate(article) {

    /*
    Card          | article
    Image         | img 
    Title         | h3
    Source        | p
    SourceURL     | a
    */
    
    let card = document.createElement('article');

    let divImg = document.createElement('div');
    divImg.setAttribute('class', 'art-img')

    if (article.urlToImage) {
        let img = document.createElement('img');

        img.setAttribute('src',`images/${article.urlToImage}`);
        img.setAttribute('alt',`${article.title} Image`);
        img.setAttribute('height', '300');
        img.setAttribute('width', '300');
        img.setAttribute('loading', 'lazy');

        divImg.appendChild(img);
    }

    let divInfo = document.createElement('div');
    divInfo.setAttribute('class', 'art-info')

    let title = document.createElement('h3');
    title.textContent = article.title;
    divInfo.appendChild(title);
    // card.appendChild(title);

    let source = document.createElement('p');

    source.textContent = `Source: ${article.source.name}`;
    divInfo.appendChild(source);
    // card.appendChild(source);

    let sourceURL = document.createElement('a');

    sourceURL.setAttribute('href', `${article.url}`);
    sourceURL.setAttribute('target', '_blank');
    sourceURL.textContent = "Read Article";
    divInfo.appendChild(sourceURL);
    // card.appendChild(sourceURL);

    card.appendChild(divImg);
    card.appendChild(divInfo);

    return card;

}
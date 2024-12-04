const url = './data/interesting-pictures.json';
const interestingPictures = document.querySelector('#interesting');

async function getInterestingData() {

    try {
        const response = await fetch(url);
        const data = await response.json();
        // console.table(data.pictures); // temporary testing of data response
        displayPictures(data.pictures);
    
    } catch (error) {
        console.error('Error fetching interesting pictures:', error);
    }
}

getInterestingData();

function capitalize(phrase) {
    let words = phrase.split(" ");

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }
    
    return words.join(" ");
}

function createImageTemplate(picture) {

//     Figure (figure):
//     Image (img)
//     Caption (figcaption)

    let figure = document.createElement('figure');

    let img = document.createElement('img');

    img.setAttribute('src', `images/${picture.img.imagefile}`);
    img.setAttribute('alt', picture.img.alt);
    img.setAttribute('width', "400");
    img.setAttribute('height', "350");
    
    if (picture.index < 1) { // First image auto for better performance
        img.setAttribute('loading', 'auto');
    } else {
        img.setAttribute('loading', 'lazy');
    }

    figure.appendChild(img);

    let caption = document.createElement('figcaption');

    caption.textContent = picture.caption;

    figure.appendChild(caption);

    return figure;
}

function displayPictures(pictures) {
    pictures.forEach((picture) => {

        let card = createImageTemplate(picture);

        interestingPictures.appendChild(card);

    }); // end of arrow function and forEach loop
}






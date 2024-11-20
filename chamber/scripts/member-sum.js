const url = './data/members.json';
const cards = document.querySelector('#business-sum');

async function getMembersData() {

    try {
        const response = await fetch(url);
        const data = await response.json();
        // console.table(data.members); // temporary testing of data response
        displayMembers(data.members.filter(member => (member.level > 1)));
    
    } catch (error) {
        console.error('Error fetching members:', error);
    }
}

getMembersData();

function createCardTemplate(member) {
    let card = document.createElement('section'); // Card space

    card.setAttribute('class', 'card-sum'); // Class for each card

    let ul = document.createElement('ul');

    let commerceName = document.createElement('h3'); // Next is the name of the commerce
    commerceName.textContent = member.name;

    card.appendChild(commerceName);

    let commerceLogo = document.createElement('img'); // Logo for the commerce
    
    // Logo info
    commerceLogo.setAttribute('src', `images/${member.logofile}`);
    commerceLogo.setAttribute('alt', `${member.name} Logo`)
    commerceLogo.setAttribute('loading', 'lazy');
    commerceLogo.setAttribute('width', '300');
    commerceLogo.setAttribute('height', '180');
    
    card.appendChild(commerceLogo); // Adding logo

    let webPage = document.createElement('li'); // Next is the website
    webPage.innerHTML = `<a href="${member.url}"><b>Website</b></a>`;
    webPage.setAttribute('class', 'site');

    ul.appendChild(webPage);

    let commerceAddress = document.createElement('li'); // Next is the address
    commerceAddress.textContent = member.address;

    commerceAddress.setAttribute('class', 'address');

    ul.appendChild(commerceAddress);
    
    let phone = document.createElement('li'); // Next the Phone number
    phone.textContent = `${member.phone}`;
    phone.setAttribute('class', 'phone');

    ul.appendChild(phone);

    let membershipLevel = document.createElement('li'); // Last the membership with conditions

    membershipLevel.innerHTML = `Member Level is ${member.level}`;

    ul.appendChild(membershipLevel);

    card.appendChild(ul);

    return card;
}

const displayMembers = (members) => {

    for (let i = 0; i < 3; i++) {

        let random = Math.floor(Math.random() * members.length);
        
        let memberSum = members[random];

        members.splice(random, 1);

        let card = createCardTemplate(memberSum);

        cards.appendChild(card);
    }

}; // end of arrow function and forEach loop


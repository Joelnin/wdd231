const url = './data/members.json';
const cards = document.querySelector('#members-cards');

async function getMembersData() {

    try {
        const response = await fetch(url);
        const data = await response.json();
        // console.table(data.members); // temporary testing of data response
        displayMembers(data.members);
    
    } catch (error) {
        console.error('Error fetching members:', error);
    }
}
    
getMembersData();


function createCardTemplate(member) {
    let card = document.createElement('section'); // Card space

    card.setAttribute('class', 'card'); // Class for each card

    let commerceLogo = document.createElement('img'); // Logo for the commerce
    
    // Logo info
    commerceLogo.setAttribute('src', `images/${member.logofile}`);
    commerceLogo.setAttribute('alt', `${member.name} Logo`)
    commerceLogo.setAttribute('loading', 'lazy');
    commerceLogo.setAttribute('width', '300');
    commerceLogo.setAttribute('height', '180');
    
    card.appendChild(commerceLogo); // Adding logo
    
    let commerceName = document.createElement('h2'); // Next is the name of the commerce
    commerceName.textContent = member.name;

    card.appendChild(commerceName);

    let webPage = document.createElement('p'); // Next is the website
    webPage.innerHTML = `<a href="${member.url}">Website</a>`;

    card.appendChild(webPage);

    let commerceAddress = document.createElement('p'); // Next is the address
    commerceAddress.textContent = member.address;

    card.appendChild(commerceAddress);
    
    let phone = document.createElement('p'); // Next the Phone number
    phone.textContent = `${member.phone}`;

    card.appendChild(commerceAddress);

    let membershipLevel = document.createElement('p'); // Last the membership with conditions
    let membership;

        switch(member.level) {

            case 2:
                membership = 'Silver';
                break;

            case 3:
                membership = 'Gold';
                break;

            default:
                membership = "Member";
                break;
        }

    membershipLevel.innerHTML = `<b>Level</b> <br> ${membership}`;
    membershipLevel.setAttribute('class', 'membership')

    card.appendChild(membershipLevel);

    return card;
}

const displayMembers = (members) => {
    members.forEach((member) => {

        let card = createCardTemplate(member);

        cards.appendChild(card);

    }); // end of arrow function and forEach loop
}

const displayGrid = document.querySelector('#grid-layout');
const displayList = document.querySelector('#list-layout');

displayGrid.addEventListener('click',() => {
    displayGrid.className = "active-layout";
    displayList.className = "";
    cards.className = 'grid';
})

displayList.addEventListener('click',() => {
    displayList.className = "active-layout";
    displayGrid.className = "";
    cards.className = 'list';
})

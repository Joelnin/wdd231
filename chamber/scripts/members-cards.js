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

    let ul = document.createElement('ul');

    let commerceLogo = document.createElement('img'); // Logo for the commerce
    
    // Logo info
    commerceLogo.setAttribute('src', `images/${member.logofile}`);
    commerceLogo.setAttribute('alt', `${member.name} Logo`)

    if (member.index < 1) { // First image auto for better performance
        commerceLogo.setAttribute('loading', 'auto');
    } else {
        commerceLogo.setAttribute('loading', 'lazy');
    }
    
    commerceLogo.setAttribute('width', '300');
    commerceLogo.setAttribute('height', '180');
    
    card.appendChild(commerceLogo); // Adding logo
    
    let commerceName = document.createElement('h3'); // Next is the name of the commerce
    commerceName.textContent = member.name;

    card.appendChild(commerceName);

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

    ul.appendChild(membershipLevel);

    card.appendChild(ul);

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

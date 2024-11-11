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
    
const displayMembers = (members) => {
    members.forEach((member) => {
        let card = document.createElement('section');
        let div1 = document.createElement('div');
        let commerceName = document.createElement('h2');
        let div2 = document.createElement('div');
        let commerceAddress = document.createElement('p');
        let phone = document.createElement('p');
        let webPage = document.createElement('p');
        let webPageURL = document.createElement('a');
        let membershipLevel = document.createElement('p');
        let commerceLogo = document.createElement('img');

        commerceName.textContent = `${member.name}`;
        commerceAddress.textContent = `${member.address}`;
        phone.textContent = `${member.phone}`;

        webPageURL.setAttribute('href', member.url);
        webPageURL.textContent = 'Website';

        webPage.appendChild(webPageURL);

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

        membershipLevel.setAttribute('class', `membership${member.level}`)

        commerceLogo.setAttribute('src', `images/${member.logofile}`);
        commerceLogo.setAttribute('alt', `${member.name} Logo`)
        commerceLogo.setAttribute('loading', 'lazy');
        commerceLogo.setAttribute('width', '300');
        commerceLogo.setAttribute('height', '200');


        div1.appendChild(commerceLogo);
        div1.appendChild(commerceName);
        div1.appendChild(webPage);

        div2.appendChild(commerceAddress);
        div2.appendChild(phone);

        card.appendChild(div1);
        card.appendChild(div2);
        card.appendChild(membershipLevel);

        card.setAttribute('class', 'card');

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

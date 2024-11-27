const url = './data/memberships.json';

async function getMembershipsData() {

    try {
        const response = await fetch(url);
        const data = await response.json();
        // console.table(data.memberships); // temporary testing of data response
        displayMemberships(data.memberships);
    
    } catch (error) {
        console.error('Error fetching memberships:', error);
    }
}

getMembershipsData();

function capitalize(phrase) {
    let words = phrase.split(" ");

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }
    
    return words.join(" ");
}

const levelModal = document.querySelector('#levelModal')
const membershipLevels = document.querySelector('#membership-levels');

function createMembershipCard(membership) {
    /*
    Title (h4)
    Button (button)
    */

    let aside = document.createElement('aside');

    let title = document.createElement('h4')
    title.textContent = `${capitalize(membership.type)} Membership Level`;

    aside.appendChild(title);

    let button = document.createElement('button');
    button.textContent = "Learn More";

    aside.appendChild(button);

    button.addEventListener('click', () => {
        levelModal.innerHTML = "";
        let div = createDialogTemplate(membership);
        levelModal.appendChild(div);
        levelModal.showModal();
    });

    return aside;
}

function createDialogTemplate(membership) {

    /*
    Title (h3)
    List with benefits (p > ul)
    Price (p)
    Close (button)
    */

    let div = document.createElement('div');

    let title = document.createElement('h3');
    title.textContent = `${capitalize(membership.type)} Membership`;
    div.appendChild(title);

    let listTitle = document.createElement('h4');
    listTitle.textContent = "Benefits:";
    div.appendChild(listTitle);

    let ul = document.createElement('ul');

    membership.benefits.forEach(benefit => {
        let li = document.createElement('li');
        li.textContent = benefit;
        ul.appendChild(li);
    });

    div.appendChild(ul);

    let price = document.createElement('p');
    price.innerHTML = `<b>Price</b>: ${capitalize(membership.price)}`;
    div.appendChild(price);

    let button = document.createElement('button');
    button.textContent = "✖";
    button.addEventListener("click", () => {
        levelModal.close();
    });

    div.appendChild(button);

    return div;
}

const displayMemberships = (memberships) => {
    memberships.forEach((membership) => {

        let card = createMembershipCard(membership);

        membershipLevels.appendChild(card);
    });  // end of arrow function and forEach loop
}

// Timestamp
document.querySelector('#today').value = new Date();
currentUrl = window.location.search.substring(1,window.location.search.length);
// console.log(currentUrl);

function capitalize(phrase) {
    let words = phrase.split(" ");

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }
    
    return words.join(" ");
}

//Break the form key:value pairs
let formData = currentUrl.split('&');
// console.table(formData)

function getData(data) {
    let keyValuePairs = {};
    formData.forEach((element) => {
        // console.log(element);

        keyValue = element.split('=');
        key = keyValue[0];
        value = keyValue[1];

        if (value != "") {
            keyValuePairs[key] = value;
        }
    });

    // console.table(keyValuePairs);

    return(keyValuePairs);
}

function createInfoTemplate(info) {

    let div = document.createElement('div');

    let applicantName = document.createElement('p');
    applicantName.textContent = `Application from ${capitalize(info.first)} ${capitalize(info.last)}`;

    if (info.organizationtitle) {
        let applicantTitle = document.createElement('span');
        applicantTitle.textContent = ` (${info.organizationtitle})`;
        applicantName.appendChild(applicantTitle);
    }

    div.appendChild(applicantName);

    let email = document.createElement('p');
    email.textContent = `Email: ${info.email.replace("%40","@")}`;
    div.appendChild(email);

    let phone = document.createElement('p');
    phone.textContent = `Cell Phone: ${info.phone}`;
    div.appendChild(phone);

    let businessName = document.createElement('p');
    businessName.textContent = `Organization Name: ${info.organization}`;
    div.appendChild(businessName);

    let membership = document.createElement('p');
    membership.textContent = `Membership Level: ${capitalize(info.level)}`;
    div.appendChild(membership);

    if (info.description) {
        let description  = document.createElement('p');
        description.textContent = `Business Description: ${info.description}`;
        div.appendChild(description);
    }

    let date = document.createElement('p');

    date.textContent = `Form submitted on ${getDateFormat(info.hiddendate)}`;
    div.appendChild(date);

    return div;
}

function getDateFormat(date) {
    dateRaw = date.split('+');
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


const showFormData = document.querySelector('#results');

function displayData() {
    let data = getData(currentUrl);
    let results = createInfoTemplate(data);

    showFormData.appendChild(results);

}

displayData();

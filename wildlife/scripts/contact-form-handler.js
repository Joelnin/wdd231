import { capitalize } from './grammar.js';

const currentUrl = window.location.search.substring(1,window.location.search.length);

// console.log(currentUrl);

//Break the form key:value pairs
let formData = currentUrl.split('&');
// console.table(formData)

function getData(data) {
    let keyValuePairs = {};
    data.forEach((element) => {
        // console.log(element);

        let keyValue = element.split('=');
        let key = keyValue[0];
        let value = keyValue[1];

        if (value != "") {
            keyValuePairs[key] = value;
        }
    });

    // console.table(keyValuePairs);

    return(keyValuePairs);
}

function createInfoTemplate(info) {

    let div = document.createElement('div');

    if (info.username) {
        let userName = document.createElement('p');
        userName.textContent = `Hello, ${capitalize(info.username)}`;

        div.appendChild(userName);
    }

    let email = document.createElement('p');
    email.textContent = `Email: ${info.conemail.replace("%40","@")}`;
    div.appendChild(email);


    let purpose = document.createElement('p');
    purpose.textContent = `Purpose: ${capitalize(info.purpose.replace("+"," "))}`;
    div.appendChild(purpose);

    let message = document.createElement('p');
    message.textContent = `Your message: ${info.message.replaceAll("+"," ")}`;
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

export function displayData() {
    const showFormData = document.querySelector('#results');

    if (showFormData) {

        let data = getData(formData);
        let results = createInfoTemplate(data);

        showFormData.appendChild(results);
}}
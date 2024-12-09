import { createInfoTemplate } from "./gettemplate.js";

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

export function displayData() {
    const showFormData = document.querySelector('#results');

    if (showFormData) {

        let data = getData(formData);
        let results = createInfoTemplate(data);

        showFormData.appendChild(results);
}}
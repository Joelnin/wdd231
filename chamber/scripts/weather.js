const currentWeather = document.querySelector('#current-weather');
const weatherCast = document.querySelector('#weather-cast');

function capitalize(phrase) {
    let words = phrase.split(" ");

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].slice(1);

    }
    
    return words.join(" ");
}

const lat = "10.45397";
const lon = "-64.18256";
const apiKey = "14582543b6ef781d5367488ca0ac4d04";

const urlWeather = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

async function fetchFromApi() {

    try {
        const response = await fetch(urlWeather);
        const data = await response.json();
        console.table(data); // temporary testing of data response
        displayResults(data);

    } catch (error) {
        console.log(error);
    }
}

fetchFromApi();

function currentWeatherTemplate(data) {

    /*
    Temperature  | XX °F
    Description  | Description Capitalize
    High Temp.   | XX °F
    Low Temp.    | XX °F
    Humidity     | XX %
    Sunrise Hour | X:XXam
    Sunset Hour  | X:XXpm (12h time)
    */

    let temperature = document.createElement('p');
    temperature.innerHTML = `<b>${data.list[0].main.temp.toFixed(0)}</b> °F`;

    let description = document.createElement('p');
    description.textContent = capitalize(data.list[0].weather[0].description);

    let high = document.createElement('p');
    high.innerHTML = `<b>High:</b> ${data.list[0].main.temp_max.toFixed(0)} °F`;

    let low = document.createElement('p');
    low.innerHTML = `<b>Low:</b> ${data.list[0].main.temp_min.toFixed(0)} °F`;

    let humidity = document.createElement('p');
    humidity.innerHTML = `<b>Humidity:</b> ${data.list[0].main.humidity.toFixed(0)} %`;

    let sunrise = document.createElement('p');
    sunrise.innerHTML = `<b>Sunrise:</b> ${getHours12hTime(data.city.sunrise)}am`;

    let sunset = document.createElement('p');
    sunset.innerHTML = `<b>Sunset:</b> ${getHours12hTime(data.city.sunset)}pm`;

    currentWeather.appendChild(temperature);
    currentWeather.appendChild(description);
    currentWeather.appendChild(high);
    currentWeather.appendChild(low);
    currentWeather.appendChild(humidity);
    currentWeather.appendChild(sunrise);
    currentWeather.appendChild(sunset);
}


function getHours12hTime(time) {

    let date = new Date(time * 1000);

    let hours = date.getHours();
    let minutes = date.getMinutes();

    // Hours is in militar time, must convert to standard time
    if (hours > 12) {
        hours = hours - 12;
    }

    return `${hours}:${minutes}`;
}

function weatherCastTemplate(data) {

    const weekDays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    let day = new Date();

    let weather1 = document.createElement('p');
    weather1.innerHTML = `Today: <b>${data.list[0].main.temp.toFixed(0)} °F</b>`;
    weatherCast.appendChild(weather1);

    let weather2 = document.createElement('p');
    weather2.innerHTML = `${weekDays[day.getDay() + 1]}: <b>${data.list[8].main.temp.toFixed(0)} °F</b>`;
    weatherCast.appendChild(weather2);

    let weather3 = document.createElement('p');
    weather3.innerHTML = `${weekDays[day.getDay() + 2]}: <b>${data.list[16].main.temp.toFixed(0)} °F</b>`;
    weatherCast.appendChild(weather3);
}

function displayResults(data) {
    currentWeather.innerHTML = "";
    weatherCast.innerHTML = "";

    currentWeatherTemplate(data);
    weatherCastTemplate(data);
}

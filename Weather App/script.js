
const apiKey = "7d3c9f4699ded7fa5d25cf5612c67cea";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

let searchButtonElement = document.querySelector('.search-button');
let inputElement = document.querySelector('.input');
let weatherIcon = document.querySelector('.weather-icon');
let weatherContainer = document.querySelector('.weather');
let errorMsgBox = document.querySelector('.error')

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();
    console.log(data);

    if (response.status == 404) {
        errorMsgBox.style.display = "block";
        weatherContainer.style.display = "none" ;
    } else {

        let cityElement = document.querySelector('.city');
        cityElement.innerHTML = data.name;
        let tempElement = document.querySelector('.temp');
        tempElement.innerHTML = `${Math.round(data.main.temp)}°C`;
        let humidityElement = document.querySelector('.humidity');
        humidityElement.innerHTML = `${data.main.humidity}%`;
        let windElement = document.querySelector('.wind');
        windElement.innerHTML = `${data.wind.speed} km/h`;

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png"
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png"
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png"
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png"
        }
        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png"
        }

        weatherContainer.style.display = 'block';
        errorMsgBox.style.display = "none";


    }
}

checkWeather();

searchButtonElement.addEventListener("click", () => {
    checkWeather(inputElement.value);
});
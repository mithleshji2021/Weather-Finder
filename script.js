const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const errorMessage = document.querySelector("#error");
const weatherImg = document.querySelector("#weather-img");
const temp = document.querySelector("#temp");
const cityNameDisplay = document.querySelector("#weather-city");
const countryNameDisplay = document.querySelector("#weather-country");
const humidityPercentage = document.querySelector("#humidity-percentage");
const weatherConditionDescription = document.querySelector("#weather-condition-description");
const cardBody = document.querySelector(".card-body");
const convertBtn = document.querySelector("#convert-btn");
const temperatureUnit = document.querySelector("#temperature-unit");

const apiKey = "e06739a9f36f5f38b4c405e2f63b426d";

// getting weather data from api

async function getWeatherData() {
    errorMessage.style.display = "none";
    const city = searchInput.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get(url);

        const iconCode = response.data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        weatherImg.src = iconUrl;
        

        cardBody.style.display = "block";
        convertBtn.style.display = "block";
        temp.innerHTML = Math.round(response.data.main.temp);
        temperatureUnit.innerHTML = "°C";
        convertBtn.innerHTML = "Convert to Fahrenheit";
        
        cityNameDisplay.innerHTML = response.data.name;
        countryNameDisplay.innerHTML = response.data.sys.country;
        humidityPercentage.innerHTML = response.data.main.humidity;
        weatherConditionDescription.innerHTML = response.data.weather[0].description;


    } catch (error) {
        errorMessage.style.display = "block";

    }

}

// on click of search button
searchBtn.addEventListener("click", () => {
    if (searchInput.value.length > 0) {
        getWeatherData();
    }
});

// on keypress of enter button
searchInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        searchBtn.click(); // Simulate a button click
    }
});




// Get current location

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // getWeatherData(lat, lon); // Fetch weather data using coordinates    

            (async function getWeatherData(lat, lon) {

                const apiKey = 'e06739a9f36f5f38b4c405e2f63b426d';
                const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

                try {
                    const response = await axios.get(url);

                    const iconCode = response.data.weather[0].icon;
                    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
                    weatherImg.src = iconUrl;

                    cardBody.style.display = "block";
                    convertBtn.style.display = "block";
                    const tempCelsius = response.data.main.temp - 273.15;
                    temp.innerHTML = Math.round(tempCelsius);
                    temperatureUnit.innerHTML = "°C";
                    convertBtn.innerHTML = "Convert to Fahrenheit";
                    cityNameDisplay.innerHTML = response.data.name;
                    countryNameDisplay.innerHTML = response.data.sys.country;
                    humidityPercentage.innerHTML = response.data.main.humidity;
                    weatherConditionDescription.innerHTML = response.data.weather[0].description;

                } catch (error) {
                    console.error('Error getting city from latitude and longitude:', error);
                }
            })(lat, lon);


        },
        error => {
            console.error('Error getting location:', error);
        }
    );
}

convertBtn.addEventListener("click", () => {
    const textLength = convertBtn.textContent.length
    
    if (textLength === 21) {
        const tempCelsius = temp.textContent;

        const tempFahrenheit = (tempCelsius * 9 / 5) + 32;
        temp.innerHTML = Math.round(tempFahrenheit);
        convertBtn.innerHTML = "Convert to Celsius";
        temperatureUnit.innerHTML = "°F";
        
    }
    else if (convertBtn.textContent.length === 18) {
        
        const tempFahrenheit = temp.textContent;
        const farenheitToCelsius = (tempFahrenheit - 32) * 5 / 9;
        temp.innerHTML = Math.round(farenheitToCelsius);
        convertBtn.innerHTML = "Convert to Fahrenheit";
        temperatureUnit.innerHTML = "°C";

    }
})







































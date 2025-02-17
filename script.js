
const apiKey = 'a96aa1da9b62573bca8ed31ab3bb8f28';
const searchButton = document.getElementById('search');
const cityInput = document.getElementById('city');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');

if (!searchButton) {
    console.error("Search button not found!");
} else {
    console.log("Search button found!");
}

searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    console.log(`Searching weather for: ${city}`);
    if (city) {
        fetchWeather(city);
    } else {
        alert('Please enter a city name!');
    }
});

function fetchWeather(city) {
    console.log(`Fetching weather for: ${city}`);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    fetch(url)
        .then(response => {
            console.log("Response received:", response);
            return response.json();
        })
        .then(data => {
            if (data.cod === 200) {
                console.log("Weather data received:", data);
                cityName.textContent = `Weather in ${data.name}`;
                temperature.textContent = `Temperature: ${Math.ceil(data.main.temp)}°C`;
                description.textContent = `Condition: ${data.weather[0].description}`;
            } else {
                console.error("Error in weather data:", data);
                alert('City not found. Please try again.');
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            alert("Error fetching data. Please try again.");
        });
}

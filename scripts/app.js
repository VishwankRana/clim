const searchBtn = document.querySelector(".searchButton");
const cityInput = document.querySelector(".cityInput");

searchBtn.addEventListener('click', function () {
    const cityName = cityInput.value.trim();
    if (cityName === "") {
        alert("Please enter a city name.");
        return;
    }
    fetchWeatherData(cityName, apiKey);
});

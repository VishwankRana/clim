const apiKey = "ca411eac476999f60ad773d3f341f7e5";

async function fetchWeatherData(cityName, apiKey) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        const temperature = weatherData.main.temp;
        const feelsLike = weatherData.main.feels_like;
        const pressure = weatherData.main.pressure;
        const humidity = weatherData.main.humidity;
        const wind = weatherData.wind.speed;
        const wind_deg = weatherData.wind.deg;
        const wind_gust = weatherData.wind.gust || "N/A";
        const description = weatherData.weather[0]?.description || "No description";
        const capitalizedDescription = description.charAt(0).toUpperCase() + description.slice(1);
        const visibility = weatherData.visibility || "N/A";
        const sunrise = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString();
        const sunset = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString();
        const lat = weatherData.coord.lat;
        const lon = weatherData.coord.lon;

        document.querySelectorAll(".temperature, .pressure, .humidity, .wind, .description, .visibility, .sunrise, .sunset, .air").forEach(el => el.innerHTML = "");

        document.querySelector(".temperature").innerHTML = `<div class="temperatureContainer">${temperature}°C (Feels like ${feelsLike}°C)</div>`;
        document.querySelector(".pressure").innerHTML = `<div class="pressureContainer">Pressure: ${pressure} hPa</div>`;
        document.querySelector(".humidity").innerHTML = `<div class="humidityContainer">Humidity: ${humidity}%</div>`;
        document.querySelector(".wind").innerHTML = `
            <div class="windContainer">
                <div class="windSpeedContainer">Wind Speed: ${wind} m/s</div>
                <div class="windGustContainer">Direction: ${wind_deg}°</div>
                <div class="windDirectionContainer">Gust: ${wind_gust} m/s</div>
            </div>`;

        document.querySelector(".description").innerHTML = `<div class="descriptionContainer">Description: ${capitalizedDescription}</div>`;
        document.querySelector(".visibility").innerHTML = `<div class="visibilityContainer">Visibility: ${visibility} meters</div>`;
        document.querySelector(".sunrise").innerHTML = `
            <div class="sunriseContainer">Sunrise: ${sunrise}</div>
            <div class="sunsetContainer">Sunset: ${sunset}</div>`;

        fetchAirPollutionData(lat, lon, apiKey);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

async function fetchAirPollutionData(lat, lon, apiKey) {
    const pollutionUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    try {
        const response = await fetch(pollutionUrl);
        const data = await response.json();
        const air = data.list[0];
        const aqi = air.main.aqi;
        const pm25 = air.components.pm2_5;
        const pm10 = air.components.pm10;
        const co = air.components.co;

        const aqiMeaning = {
            1: "Good",
            2: "Fair",
            3: "Moderate",
            4: "Poor",
            5: "Very Poor"
        };

        document.querySelector(".airPollution").innerHTML = `
            <div class="airQualityContainer">Air Quality Index: ${aqi} (${aqiMeaning[aqi]})</div>
            <div class="pm25Container">PM2.5: ${pm25} μg/m³</div>
            <div class="pm10Container">PM10: ${pm10} μg/m³</div>
            <div class="coContainer">CO: ${co} μg/m³</div>`;
    } catch (error) {
        console.error("Error fetching air pollution data:", error);
    }
}

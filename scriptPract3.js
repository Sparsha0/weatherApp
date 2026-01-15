document.addEventListener('DOMContentLoaded', ()=>{
    const getWeatherBtn = document.getElementById('get-weather-btn');
    const displayCityName = document.getElementById('city-name');
    const displayTemperature = document.getElementById('temperature');
    const displayDescription = document.getElementById('description');
    const errorMessage = document.getElementById('error-message');
    const displayWeatherInfo = document.getElementById('weather-info');
    const cityInput = document.getElementById('city-input');

     const API_KEY = "72dd6f0210bd7c17dbd2baa6497e69e4"; 




    getWeatherBtn.addEventListener('click',async()=>{
        const city = cityInput.value.trim();

        if(!city){
            return;
        }

        try{
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);

        }
        catch{
            showError();
        }
    });


    async function fetchWeatherData(city){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

        const response = await fetch(url);

        if(!response.ok){
            throw new Error("City Not found");
        }

        return await response.json();


    }

    function displayWeatherData(data){
        console.log(data);
        const {name, main, weather} = data;
        displayCityName.textContent = name;
        displayTemperature.textContent = `Temperature: ${main.temp}°C`;
        displayDescription.textContent = `Condition: ${weather[0].description}`;

        displayWeatherInfo.classList.remove("hidden");
        errorMessage.classList.add("hidden");

    }



    function showError(){
        displayWeatherInfo.classList.add("hidden");
        errorMessage.classList.remove("hidden");
    }
})
document.addEventListener('DOMContentLoaded', ()=>{
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temparatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");


    const API_KEY = "72dd6f0210bd7c17dbd2baa6497e69e4"; // env variables

    getWeatherBtn.addEventListener('click', async()=>{
        const city = cityInput.value.trim()
        if(!city) return;

        //it may throw an error
        //server/database is always in another continent

        try{
         const weather =  fetchWeatherData(city);
         displayWeatherData(weatherData);
        }
        catch(error){
            showError();
        }
    })

    async function fetchWeatherData(city){
        //gets the data

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;


        const response = await fetch(url);
        console.log(typeof response);
        console.log("Response", response);

        if(!response.ok){
            throw new Error("City Not found");
        }
        const data = await response.json()
        return data
    }

    function displayWeatherData(weatherData){
        console.log(weatherData);
    }

    function showError(){
        weatherInfo.classList.add('hidden');
        errorMessage.classList.remove('hidden');

    }



})
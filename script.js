const apiKey = "53117cf1c52fabd94b3b73f5b375e416";
const weatherDataEL = document.getElementById("weather-data");
const city_input = document.getElementById("city");
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityValue = city_input.value;
    GetWeatherData(cityValue);
})

async function GetWeatherData(cityValue) {
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error("Network response is not ok")
        }
        const data = await response.json();
        const temprature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)} `,
                `Humidity: ${data.main.humidity}%`,
                `Wind speed: ${data.wind.speed}m/s`
        ]

        weatherDataEL.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="">`;
        weatherDataEL.querySelector(".temperature").textContent = `${temprature}°C`;
        weatherDataEL.querySelector(".decript").textContent = description;
        weatherDataEL.querySelector(".detail").innerHTML = details.map((detail)=>`<div>${detail}</div>`).join("")
    } catch (Error){
        weatherDataEL.querySelector(".icon").innerHTML = "";
        weatherDataEL.querySelector(".temperature").textContent = ""
        weatherDataEL.querySelector(".decript").textContent = "Invalid City";
        weatherDataEL.querySelector(".detail").innerHTML ="" ;       
    }

}
import { dayOfTheWeek, monthOfTheYear, formatTime, parseDate } from "../utils/helpers.js";
import { weatherIcons } from "./weatherIcon.js";

 export function updateBackground(code, is_day) { 
    let timeOfDay = is_day ? "day" : "night";
    let app = document.querySelector(".weather-app")   
    if (code === 1000) {
        app.style.setProperty("background-image", `url('css/media/${timeOfDay}sunny.webp')`, "important");
    } else if ([1003,1006,1009,1030,1069,1087,1135,1273,1276,1279,1282].includes(code)) {
        app.style.setProperty("background-image", `url('css/media/${timeOfDay}cloudy.webp')`, "important");
    } else if ([1063,1069,1072,1150,1153,1180,1183,1186,1189,1192,1195,1204,1207,1240,1243,1246,1249,1252].includes(code)) {
        app.style.setProperty("background-image", `url('css/media/${timeOfDay}rainy.webp')`, "important");
    } else {
        app.style.setProperty("background-image", `url('css/media/${timeOfDay}snowy.webp')`, "important");
    }
}

export function renderWeather(data) {
    
    //container elements
    const weather = document.querySelector(".weather");
    const cityTime = document.querySelector(".city-time")
    const { y, m, d } = parseDate(data.location.localtime);
    const tempOutput = document.querySelector(".temp");
    const iconOutput = document.querySelector(".icon");
    const conditionOutput = document.querySelector(".condition");
    const nameOutput = document.querySelector(".name");
    const timeOutput = document.querySelector(".time");
    const dateOutput = document.querySelector(".date");
    //custom icons
    const code = data.current.condition.code;
    const isDay = data.current.is_day;
    const defultApiIcon = `https:${data.current.condition.icon}`;
    const customIcon = weatherIcons[code]?.[isDay? "day" : "night"];
    const iconPath = customIcon || defultApiIcon;
    //container animation
    weather.classList.remove("reload");
    cityTime.classList.remove("reload");
    void weather.offsetWidth;
    void cityTime.offsetWidth;
    weather.classList.add("reload");
    cityTime.classList.add("reload");


    tempOutput.innerHTML = Math.floor(data.current.temp_c)+"&#176";
    iconOutput.setAttribute("src", iconPath);
    conditionOutput.innerHTML = data.current.condition.text;
    nameOutput.innerHTML = data.location.name;
    timeOutput.innerHTML = formatTime(data.location.localtime);
    dateOutput.innerHTML = `${dayOfTheWeek(y, m, d)}, ${monthOfTheYear(y, m, d)}`;
    

    //current detail
    const currentDetails = document.querySelector(".currentDetails")
    const cloudOutput = document.querySelector(".cloud");
    const humidityOutput = document.querySelector(".Humidity");
    const WindOutput = document.querySelector(".Wind");
    const uvOutput = document.querySelector(".uv");
    const sunriseOutput = document.querySelector(".sunrise");
    const sunsetOutput = document.querySelector(".sunset");

    currentDetails.classList.remove("fade");
    void currentDetails.offsetWidth;
    currentDetails.classList.add("fade")
    cloudOutput.innerHTML = data.current.cloud+"%";
    humidityOutput.innerHTML = data.current.humidity+"%";
    WindOutput.innerHTML = Math.floor(data.current.wind_kph)+" km/h";
    uvOutput.innerHTML = data.current.uv;
    sunriseOutput.innerHTML = data.forecast.forecastday[0].astro.sunrise;
    sunsetOutput.innerHTML = data.forecast.forecastday[0].astro.sunset;
}

export function showError(message) {
    const root = document.querySelector(".weather-app");
    const errorBox = document.createElement("div");
    errorBox.className = "error";
    errorBox.innerHTML = `<div class="error-box">
            <h2>warning!</h2>
            <p> ${message} </p>
        </div>`
    errorBox.style.display = "flex";
    root.append(errorBox);
    setTimeout(() => {
    errorBox.style.transition = "opacity 0.4s ease";
    errorBox.style.opacity = "0";
    setTimeout(() => errorBox.remove(), 400);
  }, 2000);
}


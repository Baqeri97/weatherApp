export function dayOfTheWeek(y, m, d) { 
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekday[new Date(`${y}-${m}-${d}`).getDay()];
}
export function monthOfTheYear(y, m, d) { 
    const months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    return months[new Date(`${y}-${m}-${d}`).getMonth()];
}
export function formatTime(localtime) {
    return localtime.substr(11, 5);
}

export function parseDate(localtime) {
    const y = parseInt(localtime.substr(0, 4));
    const m = parseInt(localtime.substr(5, 2));
    const d = parseInt(localtime.substr(8, 2));
    return { y, m, d };
}
// preLoad

const preloaderDiv = document.createElement("div");
preloaderDiv.classList.add("preload")
const spinner = document.createElement("div");
spinner.classList.add("spinner");
preloaderDiv.append(spinner)
const weatherApp = document.querySelector(".weather-app")

export function showPreloader() {
    if (!weatherApp.contains(preloaderDiv)) {
        weatherApp.appendChild(preloaderDiv);
    }
    preloaderDiv.style.display = "flex";
}

export function hidePreloader() {
    preloaderDiv.style.display = "none";
}

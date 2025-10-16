 import { containerUi, panelUi} from "./ui/skeleton.js";
 import { fetchWeather } from "./api/weatherApi.js";
 import { renderWeather, updateBackground, showError } from "./ui/ui.js";
 import { renderHourlyForecast, renderDailyForecast} from "./ui/forecast.js";
 import { showPreloader, hidePreloader } from "./utils/helpers.js";

 document.addEventListener("DOMContentLoaded", async () => {
    const keyApi = "d43c62e39caf43268c5142922250809";
    const divRoot = document.querySelector(".weather-app");
    const mainUi = containerUi();
    const Panelui = panelUi();
    divRoot.innerHTML += mainUi;
    divRoot.innerHTML += Panelui;
    const searchBtn = document.querySelector(".submit");
    const cityInput = document.querySelector(".search");
    searchBtn.addEventListener("click", async (e) => {
        e.preventDefault()
        showPreloader();
        try {
            const data = await fetchWeather(cityInput.value, keyApi);
            updateBackground(data.current.condition.code, data.current.is_day);            
            renderWeather(data);
            renderHourlyForecast(data);
            renderDailyForecast(data);
            cityInput.value= "";
        } catch (error) {
            const message = error.message || String(error);
            showError(message);
            cityInput.value= "";
        } finally {
            hidePreloader();
        }
});
});


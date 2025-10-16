import { weatherIcons } from "./weatherIcon.js";
import { dayOfTheWeek, formatTime, parseDate } from "../utils/helpers.js";

export function renderHourlyForecast(data){
    const hourlyContainer = document.querySelector(".hourlyContainer");
    hourlyContainer.innerHTML= "";
    hourlyContainer.classList.remove("fade");
    let hour = data.forecast.forecastday[0].hour; 
    hour.forEach((item , index)=>{
        if(index % 3 === 0){
            let time = formatTime(item.time);
            const code = item.condition.code;
            const isDay = item.is_day;
            const defultApiIcon = `https:${item.condition.icon}`;
            const customIcon = weatherIcons[code]?.[isDay? "day" : "night"];
            const iconPath = customIcon || defultApiIcon;       
            let li = document.createElement("li");
            li.className = "card";
            li.innerHTML = `<h5 class="hour">${time}</h5>
                    <img class="hicon" src="${iconPath}">
                    <p class="hcondition">${item.condition.text}</p>
                    <p class="htemp">${Math.floor(item.temp_c)+"&#176"}</p>`;
            hourlyContainer.append(li);
            void hourlyContainer.offsetWidth;
            hourlyContainer.classList.add("fade")
        }
    });
}

export function renderDailyForecast(data){
    const dailyContainer = document.querySelector(".dailyContainer");
    dailyContainer.innerHTML = "";
    dailyContainer.classList.remove("fade");
    let days = data.forecast.forecastday;
    days.forEach((item)=>{
        let { y, m, d } = parseDate(item.date);
        let getDay = dayOfTheWeek(y, m, d);
        const code = item.day.condition.code;
        const defultApiIcon = `https:${item.day.condition.icon}`;
        const customIcon = weatherIcons[code]?.["day"];
        const iconPath = customIcon || defultApiIcon;
        let li = document.createElement("li");
        li.className = "card";
        li.innerHTML = `<h5 class="daily">${getDay}</h5>
                <img class="dicon" src="${iconPath}">
                 <p class="dcondition">${item.day.condition.text}</p>
                    <div>
                        <p class="maxtemp">${Math.floor(item.day.maxtemp_c)+"&#176"}</p>
                        <p class="mintemp">${Math.floor(item.day.mintemp_c)+"&#176"}</p>
                    </div>`;
        dailyContainer.append(li);
        void dailyContainer.offsetWidth;
        dailyContainer.classList.add("fade")
        
    })
}
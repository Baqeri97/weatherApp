 const tempOutPut = document.querySelector(".temp");
 const icon = document.querySelector(".icon");
 const conditionOutPut = document.querySelector(".condition");
 const nameOutPut = document.querySelector(".name");
 const timeOutPut = document.querySelector(".time");
 const dateOutPut = document.querySelector(".date");
 const form = document.querySelector(".locationInput");
 const search = document.querySelector(".search");
 const btn = document.querySelector(".submit");
 const cities = document.querySelectorAll(".city");
 const cloudOutPut = document.querySelector(".cloud");
 const humidityOutPut = document.querySelector(".Humidity");
 const WindOutPut = document.querySelector(".Wind");
 const uvOutPut = document.querySelector(".uv");
 const sunriseOutPut = document.querySelector(".sunrise");
 const sunsetOutPut = document.querySelector(".sunset");
 const app = document.querySelector(".weather-app"); 
 const keyApi = "d43c62e39caf43268c5142922250809";

 // default city 
    var cityInput = "Tehran";

  //change city by clicking quick buttons
  cities.forEach((city) => {
      city.addEventListener("click", (e) => {
          cityInput = e.target.innerHTML;
          getWeather();
          app.style.opacity = "1";
      });
  })
 // search form submit
  btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (search.value.length === 0) {
          alert("Enter a city...");
      } else {
          cityInput = search.value;
          getWeather()
          search.value = "";
          app.style.opacity = "1";
      }   
  });
  
  
 async function getWeather() {
     var weatherResult = await(await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${keyApi}&q=${cityInput}`)).json();
     tempOutPut.innerHTML = Math.floor(weatherResult.current.temp_c) + "&#176";
     nameOutPut.innerHTML = weatherResult.location.name;
     conditionOutPut.innerHTML = weatherResult.current.condition.text;
     icon.src = "https:" + weatherResult.current.condition.icon;
     cloudOutPut.innerHTML = weatherResult.current.cloud + "%";
     humidityOutPut.innerHTML = weatherResult.current.humidity + "%";
     WindOutPut.innerHTML = Math.floor(weatherResult.current.wind_kph) + " km/h";
     uvOutPut.innerHTML = weatherResult.current.uv;
     sunriseOutPut.innerHTML = weatherResult.forecast.forecastday[0].astro.sunrise;
     sunsetOutPut.innerHTML = weatherResult.forecast.forecastday[0].astro.sunset;
     const localTime = weatherResult.location.localtime;
     const y = parseInt(localTime.substr(0, 4));
     const m = parseInt(localTime.substr(5, 2));
     const d = parseInt(localTime.substr(8, 2));
     const time = localTime.substr(11, 5);
     dateOutPut.innerHTML = `${dayOfTheWeek(d, m, y)} ${monthOfTheYear(d, m, y)}`;
     timeOutPut.innerHTML = time;
     let timeOfDay = weatherResult.current.is_day ? "day" : "night";
     const code = weatherResult.current.condition.code;
       
        
// background images
      if (code === 1000) {
          app.style.backgroundImage = `url(../css/media/${timeOfDay}sunny.jpg)`;
          btn.style.background = "#181e27";
      } else if (
          [1003, 1006, 1009, 1030, 1069, 1087, 1135, 1273, 1276, 1279, 1282].includes(code)
      ) {
          app.style.backgroundImage = `url(../css/media/${timeOfDay}cloudy.jpg)`;
          btn.style.background = timeOfDay === "night" ? "#181e27" : "#fa6d1b";
      } else if (
          [1063, 1069, 1072, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195,
           1204, 1207, 1240, 1243, 1246, 1249, 1252].includes(code)
      ) {
          app.style.backgroundImage = `url(../css/media/${timeOfDay}rainy.jpg)`;
          btn.style.background = timeOfDay === "night" ? "#325c80" : "#647d75";
      } else {
          app.style.backgroundImage = `url(../css/media/${timeOfDay}snowy.jpg)`;
          btn.style.background = timeOfDay === "night" ? "#1b1b1b" : "#4d72aa";
      }

 }

 //get day
 function dayOfTheWeek(day, month, year) {
      const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      return weekday[new Date(`${year}-${month}-${day}`).getDay()];
  }
 
  // get month
  function monthOfTheYear(day, month, year){
      const months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
      return months[new Date(`${year}-${month}-${day}`).getMonth()];
  }

 
 getWeather()
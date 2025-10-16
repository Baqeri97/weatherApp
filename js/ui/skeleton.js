export function containerUi(){
    return `<div class="container">
            <h3 class="brand">the weather</h3>
            <div>
                <div class="weather">
                    <h1 class="temp"></h1>
                    <img class="icon">
                    <span class="condition"></span>
                </div>
                <div class="city-time">
                    <h2 class="name"></h2>
                    <small>
                        <span class="time"></span>
                        <span class="date"></span>
                    </small>
                </div>
            </div>
        </div>`
}
export function panelUi(){
    return `<div class="panel">
            <form id="locationInput">
                <input type="text" class="search" placeholder="search location...">
                <button class="submit" type="submit">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>

            
            <div class="currentDetails">
                <ul>
                    <li>
                        <span>Wind</span>
                        <span class="Wind"></span>
                    </li>
                    <li>
                        <span>Cloudy</span>
                        <span class="cloud"></span>
                    </li>
                    <li>
                        <span>Humidity</span>
                        <span class="Humidity"></span>
                    </li>
                </ul>
                <ul>
                    <li>
                        <span>sunrise</span>
                        <span class="sunrise"></span>
                    </li>
                    <li>
                        <span>sunset</span>
                        <span class="sunset"></span>
                    </li>
                    <li>
                        <span>UV index</span>
                        <span class="uv"></span>
                    </li>
                </ul>
            </div>
            
            <ul class="hourlyContainer">
            </ul>
            
            <ul class="dailyContainer">
            </ul>
        </div>`
}

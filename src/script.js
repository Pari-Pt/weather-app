let now = new Date();

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let date = now.getDate();

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${hours}:${minutes}`;

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day}, ${date} ${month}`;


function defaultCity(city) {
  let units = "metric";
  let apiKey = "ea283403784bc63466a22fcf17ab8227";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}
defaultCity("Porto");

function citySearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search");
  searchInput.value = searchInput.value.toLowerCase();

  if (searchInput.value.length > 0) {
    let units = "metric";
    let apiKey = "ea283403784bc63466a22fcf17ab8227";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showTemp);
  } else {
    alert("Please search for a city 😀");
  }
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", citySearch);

function showTemp(fetchedTemp) {
  let h1 = document.querySelector("#current-city");
  h1.innerHTML = `${fetchedTemp.data.name}`;

  let searchInput = document.querySelector("#city-search");
  if (searchInput.value.length <= 8) {
    document.getElementsByClassName("city-name")[0].style.fontSize = "60px";
  } else {
    document.getElementsByClassName("city-name")[0].style.fontSize = "40px";
  }

  let localCityName = fetchedTemp.data.name;
  let localCityElement = document.querySelector("#current-city");
  localCityElement.innerHTML = `${localCityName}`;

  if (localCityName.length <= 8) {
    document.getElementsByClassName("city-name")[0].style.fontSize = "60px";
  } else {
    document.getElementsByClassName("city-name")[0].style.fontSize = "40px";
  }

  tempC = Math.round(fetchedTemp.data.main.temp);
  let currentTempElement = document.querySelector("#current-temp");
  currentTempElement.innerHTML = `${tempC}°C`;

  let geolocateCityTemp = Math.round(fetchedTemp.data.main.temp);
  let geolocateCityTempElement = document.querySelector("#current-temp");
  geolocateCityTempElement.innerHTML = `${geolocateCityTemp}°C`;

  weatherIcon = fetchedTemp.data.weather[0].icon;
  let weatherIconElement = document.querySelector("#feat-icon");
  weatherIconElement.setAttribute(
    `src`,
    `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`
  );

  let weatherDesc = fetchedTemp.data.weather[0].description;
  let weatherDescElement = document.querySelector("#current-description");
  weatherDescElement.innerHTML = `${weatherDesc}`;
  weatherIconElement.setAttribute(`alt`, `${weatherDesc}`);

  let citySearchHumidity = Math.round(fetchedTemp.data.main.humidity);
  let citySearchHumidityElement = document.querySelector("#humidity");
  citySearchHumidityElement.innerHTML = `Humidity: ${citySearchHumidity}%`;

  let citySearchWindSpeed = Math.round(fetchedTemp.data.wind.speed * 3.6);
  let citySearchWindSpeedElement = document.querySelector("#wind-speed");
  citySearchWindSpeedElement.innerHTML = `Wind: ${citySearchWindSpeed}km/h`;

  displaySunset(fetchedTemp.data.sys.sunset * 1000);
  convertTimezone(fetchedTemp.data.timezone * 1000);
  getForecast(fetchedTemp.data.coord);
  changeBackground();
}

function changeBackground() {
  let background = document.querySelector("#primary-card");
  if (weatherIcon.includes("n")) {
    background.classList.remove("day-time");
    background.classList.add("night-time");
  } else {
    background.classList.remove("night-time");
    background.classList.add("day-time");
  }
  displayThemeButton();
}

function displayThemeButton() {
  let themelessMonths = [
    "Jan",
    "Feb",
    "Mar",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
  ];
 

  if (themelessMonths.includes(month)) {
    let themelessMonthButton = document.querySelector(".bg-theme-button");
    themelessMonthButtonHTML = "😜";
    themelessMonthButton.innerHTML = themelessMonthButtonHTML;

    function notifyTheme() {
      alert("Click this button in Apr/Oct/Nov/Dec for special themes!");
    }
    themelessMonthButton.addEventListener("click", notifyTheme);
  }

  if (month === "Apr") {
    let bunnyButton = document.querySelector(".bg-theme-button");
    bunnyButton.setAttribute("id", "bunny-button");
    bunnyButton = document.getElementById("bunny-button");
    let bunnyButtonHTML = "🐇";
    bunnyButton.innerHTML = bunnyButtonHTML;

    function displayEaster() {
      let background = document.querySelector("#primary-card");
      if (background.classList.contains("night-time")) {
        background.classList.add("easter-mode");
        background.classList.remove("night-time");
      } else {
        background.classList.add("easter-mode");
        background.classList.remove("day-time");
      }
      let themeGridElement = document.querySelector(".theme-grid");
      let themeGridElementHTML = `
  <div class="row">
  <div class="col"><img
      src="images/easterchick.png"
      alt="Easter Chick"
      width="250px"
      height="190px"
      id="easter-chick-img"
      />
     </div>
      `;
      themeGridElement.innerHTML = themeGridElementHTML;

      let easterBannerElement = document.querySelector(".bottom-banner");
      easterBannerElement.classList.add("easter-banner");

      let easterBannerElementHTML = `<img
      src="images/easterbanner.png"
      alt="Happy Easter"
      width="270px"
      height="150px"
      id="easter-banner"
      />
      `;
      easterBannerElement.innerHTML = easterBannerElementHTML;

      bunnyButtonHTML = "🎨";
      bunnyButton.innerHTML = bunnyButtonHTML;
      bunnyButton.setAttribute("id", "theme-button");

      function removeEaster() {
        themeGridElementHTML = "";
        themeGridElement.innerHTML = themeGridElementHTML;
        background.classList.remove("easter-mode");

        easterBannerElement.classList.remove("easter-banner");
        easterBannerElementHTML = "";
        easterBannerElement.innerHTML = easterBannerElementHTML;

        bunnyButtonHTML = "🐇";
        bunnyButton.innerHTML = bunnyButtonHTML;

        changeBackground();
      }
      bunnyButton.addEventListener("click", removeEaster);
    }
    bunnyButton.addEventListener("click", displayEaster);
  }
  if (month === "Oct") {
    let pumpkinButton = document.querySelector(".bg-theme-button");
    pumpkinButton.setAttribute("id", "pumpkin-button");
    pumpkinButton = document.getElementById("pumpkin-button");
    let pumpkinButtonHTML = "🎃";
    pumpkinButton.innerHTML = pumpkinButtonHTML;

    function displayHalloween() {
      let background = document.querySelector("#primary-card");
      if (background.classList.contains("night-time")) {
        background.classList.add("halloween-mode");
        background.classList.remove("night-time");
      } else {
        background.classList.add("halloween-mode");
        background.classList.remove("day-time");
      }

      let halloweenBannerElement = document.querySelector(".bottom-banner");
      halloweenBannerElement.classList.add("halloween-banner");
      let halloweenBannerElementHTML = `<img
      src="images/halloweenbanner.png"
      alt="Halloween"
      width="300px"
      height="200px"
      id="halloween-banner"
      />
      `;

      halloweenBannerElement.innerHTML = halloweenBannerElementHTML;

      pumpkinButtonHTML = "🎨";
      pumpkinButton.innerHTML = pumpkinButtonHTML;
      pumpkinButton.setAttribute("id", "theme-button");

      let halloweenFooter = document.getElementById("footer");
      halloweenFooter.style.color = "#33c432";

      function removeHalloween() {
        halloweenBannerElementHTML = "";
        halloweenBannerElement.innerHTML = halloweenBannerElementHTML;
        background.classList.remove("halloween-mode");

        halloweenBannerElement.classList.remove("halloween-banner");
        pumpkinButtonHTML = "🎃";
        pumpkinButton.innerHTML = pumpkinButtonHTML;

        halloweenFooter.style.color = "rgb(33, 37, 41)";
        changeBackground();
      }
      pumpkinButton.addEventListener("click", removeHalloween);
    }
    pumpkinButton.addEventListener("click", displayHalloween);
  }

  if (month === "Nov" || month === "Dec") {
    let santaButton = document.querySelector(".bg-theme-button");
    santaButton.setAttribute("id", "santa-button");
    santaButton = document.getElementById("santa-button");
    let santaButtonHTML = "🎅";
    santaButton.innerHTML = santaButtonHTML;

    function displayChristmas() {
      let background = document.querySelector("#primary-card");

      if (background.classList.contains("night-time")) {
        background.classList.add("christmas-mode");
        background.classList.remove("night-time");
      } else {
        background.classList.add("christmas-mode");
        background.classList.remove("day-time");
      }

      let themeGridElement = document.querySelector(".theme-grid");
      let themeGridElementHTML = `
  <div class="row">
  <div class="col"><img
      src="images/christmas-tree.svg"
      alt="Christmas Tree"
      width="120px"
      height="100px"
      id="tree-1"
      />
      </div>
      <div class="col">
      <img
      src="images/christmas-tree.svg"
      alt="Christmas Tree"
      width="120px"
      height="100px"
      id="tree-2"
      class="flip-horizontally"
      />
      </div>
      
      
      `;
      themeGridElement.innerHTML = themeGridElementHTML;

      let christmasBannerElement = document.querySelector(".bottom-banner");
      christmasBannerElement.classList.add("christmas-banner");
      let christmasBannerElementHTML = `
      <img src="images/christmasbanner.png"
      alt="Merry Christmas"
      width="200px"
      height="100px"
      />`;
      christmasBannerElement.innerHTML = christmasBannerElementHTML;

      santaButton.setAttribute("id", "theme-button");

      santaButtonHTML = "🎨";
      santaButton.innerHTML = santaButtonHTML;

      function removeChristmas() {
        themeGridElementHTML = "";
        themeGridElement.innerHTML = themeGridElementHTML;
        background.classList.remove("christmas-mode");

        christmasBannerElementHTML = "";
        christmasBannerElement.innerHTML = christmasBannerElementHTML;
        christmasBannerElement.classList.remove("christmas-banner");
        santaButtonHTML = "🎅";
        santaButton.innerHTML = santaButtonHTML;
        changeBackground();
      }
      santaButton.addEventListener("click", removeChristmas);
    }
    santaButton.addEventListener("click", displayChristmas);
  }
}

function displaySunset(timestamp) {
  let citySunset = new Date(timestamp);
  hours = citySunset.getHours();
  minutes = citySunset.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let citySunsetElement = document.querySelector("#sunset-time");
  citySunsetElement.innerHTML = `Sunset: ${hours}:${minutes} UTC`;
}

function convertTimezone(timezone) {
  let cityTimezone = new Date(new Date().getTime() + timezone);
  let hours = cityTimezone.getHours();
  let minutes = cityTimezone.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  day = days[cityTimezone.getDay()];
  date = cityTimezone.getDate();
  month = months[cityTimezone.getMonth()];
  let convertedDate = document.querySelector("#current-date");
  convertedDate.innerHTML = `${day}, ${date} ${month}`;

  let cityTimezoneElement = document.querySelector("#current-time");
  cityTimezoneElement.innerHTML = `${hours}:${minutes}`;
}

function getForecast(coordinates) {
  let apiKey = "ea283403784bc63466a22fcf17ab8227";
  let exclusions = "minutely,hourly,alerts";
  forecastApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=${exclusions}&appid=${apiKey}&units=metric`;

  axios.get(forecastApiUrl).then(displayForecast);
}

function displayForecast(response) {
  forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      maxTempC = Math.round(forecastDay.temp.max);
      minTempC = Math.round(forecastDay.temp.min);
      forecastHTML =
        forecastHTML +
        `<div class="row row-cols-4 forecast-info border-bottom align-items-center">
          <div class="col weekday">${formatForecastDate(forecastDay.dt)}</div>
           <div class="col" id="forecast-icon-celsius">
            <img src="https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" class="forecast-icon" alt="${
          forecastDay.weather[0].description
        }"/>
          </div>
          <div class="col forecast-description">
        ${forecastDay.weather[0].description}
        </div>
        <div class="col">
        
        <span class="max-temp"><sub>H &nbsp</sub>${maxTempC}</span>
        <span>-</span>
        <span class="min-temp">${minTempC}<sub>&nbsp L</sub></span>
          </div>
        
        </div>
        `;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function formatForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let units = "metric";
  let apiKey = "ea283403784bc63466a22fcf17ab8227";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  degCButton.classList.add("inactive");
  degFButton.classList.remove("inactive");

  axios.get(apiUrl).then(showTemp);
}

let currentLocButton = document.querySelector("#locator-button");
currentLocButton.addEventListener("click", getCurrentPosition);

function showFahrenheit() {
  degFButton.classList.add("inactive");
  degCButton.classList.remove("inactive");
  let currentTempElement = document.querySelector("#current-temp");
  let tempF = Math.round(tempC * 1.8 + 32);
  currentTempElement.innerHTML = `${tempF}°F`;

  convertForecastFahrenheit();
}

function convertForecastFahrenheit() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      maxTempC = Math.round(forecastDay.temp.max);
      minTempC = Math.round(forecastDay.temp.min);
      maxTempF = Math.round(maxTempC * 1.8 + 32);
      minTempF = Math.round(minTempC * 1.8 + 32);

      forecastHTML =
        forecastHTML +
        `<div class="row row-cols-4 forecast-info border-bottom align-items-center">
          <div class="col weekday">${formatForecastDate(forecastDay.dt)}</div>
           <div class="col" id="forecast-icon-fahrenheit">
            <img src="https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" class="forecast-icon" alt="${
          forecastDay.weather[0].description
        }"/>
          </div>
          <div class="col forecast-description">
        ${forecastDay.weather[0].description}
        </div>
        <div class="col">
        
        <span class="max-temp"><sub>H &nbsp</sub>${maxTempF}</span>
        <span>-</span>
        <span class="min-temp">${minTempF}<sub>&nbsp L</sub></span>
          </div>
        
        </div>
        `;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

let degFButton = document.querySelector("#deg-f-button");
degFButton.addEventListener("click", showFahrenheit);

function showCelsius() {
  let currentTempElement = document.querySelector("#current-temp");
  currentTempElement.innerHTML = `${tempC}°C`;
  degCButton.classList.add("inactive");
  degFButton.classList.remove("inactive");

  axios.get(forecastApiUrl).then(displayForecast);
}

let degCButton = document.querySelector("#deg-c-button");
degCButton.addEventListener("click", showCelsius);

let forecastApiUrl = null;
let tempC = null;
let maxTempC = null;
let minTempC = null;
let maxTempF = null;
let minTempF = null;
let weatherIcon = null;
let forecast = null;

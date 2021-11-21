//Display the current date and time
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

// Default city set to Porto

function defaultCity(city) {
  let units = "metric";
  let apiKey = "ea283403784bc63466a22fcf17ab8227";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}
defaultCity("Porto");

//Search engine
//Lowercase
//If search is greater than 0 characters then the API will call
//If not, then an alert will appear

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

//Process and display fetched temp,
//Process and display max and min temps
//Searched City name displayed as per API call
//Display local city name when geolocation used

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

  //degCButton.classList.add("inactive");
  //degFButton.classList.remove("inactive");
  displaySunset(fetchedTemp.data.sys.sunset * 1000);
  convertTimezone(fetchedTemp.data.timezone * 1000);
  getForecast(fetchedTemp.data.coord);
  changeBackground();
  displayThemeButton();
}
//what();
//function what(){
// document.getElementById('hello').innerHTML = '<p>hi</p>';
//Function to change background colour scheme depending on if the icon code contains "d" or "n"
function changeBackground() {
  //debugger;
  let background = document.querySelector("#primary-card");
  if (weatherIcon.includes("n")) {
    background.classList.remove("day-time");
    background.classList.add("night-time");
  } else {
    background.classList.remove("night-time");
    background.classList.add("day-time");
  }
}

function displayThemeButton() {
  //let themeButton = document.querySelector("#theme-button");
  debugger;
  if (month === "Nov" || month === "Dec") {
    // debugger;
    let santaButton = document.querySelector(".bg-theme-button");
    santaButton.setAttribute("id", "santa-button");
    santaButton = document.getElementById("santa-button");
    let santaButtonHTML = "🎅";
    santaButton.innerHTML = santaButtonHTML;

    function displayChristmas() {
      debugger;
      let background = document.querySelector("#primary-card");
      background.classList.add("christmas-mode");

      let themeGridElement = document.querySelector(".theme-grid");
      let themeGridElementHTML = `
  <div class="row">
  <div class="col"><img
      src="images/christmas-tree.svg"
      alt="Christmas Tree"
      width="160px"
      height="100px"
      id="tree-1"
      />
      </div>
      <div class="col">
      <img
      src="images/christmas-tree.svg"
      alt="Christmas Tree"
      width="160px"
      height="100px"
      id="tree-2"
      class="flip-horizontally"
      /></div>
      `;
      themeGridElement.innerHTML = themeGridElementHTML;
      //let themeButton = document.querySelector(".bg-theme-button");
      santaButton.setAttribute("id", "theme-button");
      //themeButton = document
      // .getElementById("santa-button")
      // .setAttribute("id", "theme-button");
      // themeButton = document.getElementById("theme-button");
      // let themeButtonHTML = "🎨";
      //themeButton.innerHTML = themeButtonHTML;
      //themeButton.addEventListener("click", removeChristmas);
      santaButtonHTML = "🎨";
      santaButton.innerHTML = santaButtonHTML;

      function removeChristmas() {
        //debugger;
        //let background = document.querySelector("#primary-card");
        themeGridElementHTML = "";
        themeGridElement.innerHTML = themeGridElementHTML;
        background.classList.remove("christmas-mode");

        //let santaButton = document.querySelector(".bg-theme-button");
        //santaButton.setAttribute("id", "santa-button");
        santaButtonHTML = "🎅";
        santaButton.innerHTML = santaButtonHTML;
        displayThemeButton();
        //santaButton.addEventListener("click", displayThemeButton);
      }
      santaButton.addEventListener("click", removeChristmas);
    }
    santaButton.addEventListener("click", displayChristmas);
  }
}

//Function to change background theme if Christmas button is clicked

//Function to remove Christmas theme and return to Day/Night background setting

//____________Here??
//displayThemeButton();

// let santaButton = document.getElementById("theme-button");
// santaButton.setAttribute("id", "santa-button");

//let santaButtonHTML = "🎅";
//santaButton.innerHTML = santaButtonHTML;
//santaButton.addEventListener("click", displayChristmas);

//Sunset

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

//Timezone change

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

//Fetch Forecast Data
function getForecast(coordinates) {
  let apiKey = "ea283403784bc63466a22fcf17ab8227";
  let exclusions = "minutely,hourly,alerts";
  forecastApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=${exclusions}&appid=${apiKey}&units=metric`;

  axios.get(forecastApiUrl).then(displayForecast);
}

//Display Forecast Data

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
          <div class="col">${formatForecastDate(forecastDay.dt)}</div>
           <div class="col" id="forecast-icon-celsius">
            <img src="https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" class="sunny-icon" alt="${
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

//Format Forecast Day

function formatForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

//Retrieve current position coordinates
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

// Real data degC and degF conversions with button activity triggers

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
      //minTempC = Math.round(forecastDay.temp.min);
      forecastHTML =
        forecastHTML +
        `<div class="row row-cols-4 forecast-info border-bottom align-items-center">
          <div class="col">${formatForecastDate(forecastDay.dt)}</div>
           <div class="col" id="forecast-icon-fahrenheit">
            <img src="https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" class="sunny-icon" alt="${
          forecastDay.weather[0].description
        }"/>
          </div>
          <div class="col forecast-description">
        ${forecastDay.weather[0].description}
        </div>
        <div class="col">
        
        <span class="max-temp">${maxTempF}</span>
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

//let themeButton = document
//.getElementById("theme-button")
//.addEventListener("click", removeChristmas);
//document.getElementById("try").addEventListener("click", function(){

let forecastApiUrl = null;
let tempC = null;
let maxTempC = null;
let minTempC = null;
let maxTempF = null;
let minTempF = null;
let weatherIcon = null;
let forecast = null;

//let background = document.querySelector(".main-card");
//let themeGridElement = document.querySelector(".theme-grid");
//let themeGridElementHTML = null;

//let removeChristmasButton = null;
//let themeButtonHTML = null;
//let removeChristmasButtonHTML = null;
//let displayChristmasButton = null;
//let displayChristmasButtonHTML = null;
//let easterButton = null;
//let halloweenButton = null;

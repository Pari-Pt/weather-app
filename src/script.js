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

  let weatherIcon = fetchedTemp.data.weather[0].icon;
  let weatherIconElement = document.querySelector("#feat-icon");
  weatherIconElement.setAttribute(
    `src`,
    `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
  );

  let weatherDesc = fetchedTemp.data.weather[0].description;
  let weatherDescElement = document.querySelector("#description");
  weatherDescElement.innerHTML = `${weatherDesc}`;

  let citySearchHumidity = Math.round(fetchedTemp.data.main.humidity);
  let citySearchHumidityElement = document.querySelector("#humidity");
  citySearchHumidityElement.innerHTML = `Humidity: ${citySearchHumidity}%`;

  let citySearchWindSpeed = Math.round(fetchedTemp.data.wind.speed * 3.6);
  let citySearchWindSpeedElement = document.querySelector("#wind-speed");
  citySearchWindSpeedElement.innerHTML = `Wind: ${citySearchWindSpeed}km/h`;

  let sunsetTime = fetchedTemp.data.sys.sunset * 1000;
  displaySunset(sunsetTime);

  convertTimezone(fetchedTemp.data.timezone * 1000);
}

//Timezone change
function convertTimezone(timezone) {
  let cityTimezone = new Date(new Date().getTime() + timezone);
  hours = cityTimezone.getHours();
  minutes = cityTimezone.getMinutes();
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
  citySunsetElement.innerHTML = `Sunset: ${hours}:${minutes}`;
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

  axios.get(apiUrl).then(showTemp);
}

let currentLocButton = document.querySelector("#locator-button");
currentLocButton.addEventListener("click", getCurrentPosition);

// Real data degC and degF conversions with button activity triggers

function showFahrenheit() {
  let currentTempElement = document.querySelector("#current-temp");
  let tempF = Math.round(tempC * 1.8 + 32);
  currentTempElement.innerHTML = `${tempF}°F`;
  degFButton.classList.add("inactive");
  degCButton.classList.remove("inactive");
}

let degFButton = document.querySelector("#deg-f-button");
degFButton.addEventListener("click", showFahrenheit);

function showCelsius() {
  let currentTempElement = document.querySelector("#current-temp");
  currentTempElement.innerHTML = `${tempC}°C`;
  degCButton.classList.add("inactive");
  degFButton.classList.remove("inactive");
}

let degCButton = document.querySelector("#deg-c-button");
degCButton.addEventListener("click", showCelsius);

let tempC = null;

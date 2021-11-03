<h1 align="center">Weather Application</h1>
<h3>About</h3>
<p>This Application has been coded to fetch and display live weather data by means of OpenWeatherMap APIs* and Geolocation.
<br>
 <em>*API stands for Application Programming Interface, a type of software that allows applications to communicate with each other.</em></p>
<h3 align="left">How to use this Application</h3>
<h4>Components</h4>
<p>Upon launching the App, the user is presented with a default city "Porto" with its corresponding live weather data:
 <ul>
  <li>
   Temperature
  </li>
  <li>
   Maximum(High) and Minimum(Low) Temperatures
  </li>
  <li>
   Current Date and Time
  </li>
  <li>
   Wind Speed in km/h
  </li>
  <li>
   Humidity %
  </li>
  <li>
   A 5 day weather forecast
  </li>
  <li>
   Several icons to illustrate the weather situation
  </li>
  <li>
   A simple sentence regarding the weather situation e.g. "It's a chilly day!".
  </li>
  </ul>
  </p>
  The user is also able to interact with the following on the right hand side of the Application:
  <ul>
 <li>
 A Search Engine
 </li>
 <li>
 A "Current Location" button
 </li>
 <li>
  A "°C" units button
 </li>
 <li>
  A "°F" units button
 </li>
 </ul>
 </p>
 <h4>Searching for a city</h4>
 <p>The user may search for a city by inputting the name of a city into the search engine and submitting/pressing enter. The city name is then called by the API, and the current weather data for that city shall be displayed. Depending on the weather, and the time of day, the Application may appear different. For example, if it has already passed sunset in the searched city, the background of the App shall be darker than if it was daytime. In addition, the icons on the Application will change depending on the weather conditions. For example, if it was raining in the searched city, the icon with a cloud and rain would be displayed.
<br>     
If no characters are submitted into the search engine, an alert will be displayed requesting the user to search for a city.
<br>
If the city in which the user submitted is not found, the display will not change.
</p>
 
<h4>"Current Location" button</h4>
 <p>The "Current Location" button, when pressed, will request permission for the user's location. In order for this facility, the user needs to grant permission. Once granted, Geolocation is used to pinpoint the coordinates (longitude and latitude) of the user's device. This information is then fed into a API call, which in turn responds with and displays the current weather data for the city associated with those coordinates. 
 </p>

 <h4>Units</h4>
 <p>The Application displays the weather data in metric units (°C for temperature and km/h for wind speed). However, if the user prefers, it is to display temperatures in °F by pressing the "°F" button. Temperatures can be returned to metric by pressing the "°C" button.</p>

<h3>Built with</h3>
<p>This Application was built with the following technologies:
 <ul>
  <li>
   HTML5
  </li>
  <li>
   Cascading Style Sheets (CSS3)
  </li>
  <li>
   JavaScript
  </li>
  <li>
   Bootstrap
  </li>
  <li>
   APIs and Geolocation
  </li>
  </ul>
  </p>
  
 <h3>Future Updates</h3>
<div>[] Responsive on a multitude of devices</div>
<div>[] React JS implementation</div>

<h3>About the Programmer - Seonah Nathali</h3>
<p>Seonah Nathali is an up-and-coming front-end web developer studying at SheCodes. Keen to develop and demonstrate her skills,  enrolled on the Pro course, and is developing her skills in preparation for a career-change. Previously a forensic scientist and crime investigator, she has a multitude of transferable skills which, combined with her passion for programming would be an asset to any team or organisation.
 <br>
GitHub: https://github.com/Seo-Pt/
 <br>
SheCodes: https://www.shecodesfoundation.org/students/337-seonah-nathali
 <br>
LinkedIn: https://www.linkedin.com/in/seonah-n-a1a676218/
 </p>

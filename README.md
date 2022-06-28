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
   Current Date and Time
  </li>
  <li>
   Humidity %
  </li>
  <li>
   Wind Speed in km/h
  </li>
  <li>
   Sunset time (UTC)
  </li>
  <li>
   A 5 day weather forecast
  </li>
  <li>
   Several icons to illustrate the weather situation
  </li>
  <li>
   A description regarding the weather situation e.g. "Clear Sky".
  </li>
  </ul>
  
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
 <li>
  A Theme button
 </li>
 </ul>
 

<h4>Searching for a city</h4>
<p>The user may search for a city by inputting the name of a city into the search engine and submitting/pressing enter. The city name is then called by the API, and the current weather data for that city shall be displayed. Depending on the weather, and the time of day, the Application may appear different. For example, if it has already passed sunset in the searched city, the background of the App shall be darker than if it was daytime. In addition, the icons on the Application will change depending on the weather conditions. For example, if it was raining in the searched city, the icon with a cloud and rain would be displayed.
<br>     
If 0 characters are submitted into the search engine, an alert will be displayed requesting the user to search for a city.
<br>
If the city in which the user submitted is not found, the display will not change.
</p>
<div> <em> Currently there are a set of functions working to produce the accurate time for the searched city based on timezone calculations. This is currently undergoing testing and may not be present in the final version of this Application </em> </div>
 
<h4>"Current Location" button</h4>
<p>The "Current Location" button, when pressed, will request permission for the user's location. In order for this facility to be executed, the user needs to grant permission. Once granted, Geolocation is used to pinpoint the coordinates (longitude and latitude) of the user's device. This information is then fed into a API call, which in turn responds and displays the current weather data for the city associated with those coordinates. 
 </p>

<h4>Units</h4>
 <p>The Application displays the weather data in metric units (°C for temperature and km/h for wind speed). However, if the user prefers, it is possible to display temperatures in °F by pressing the "°F" button. Temperatures can be returned to metric by pressing the "°C" button. The button corresponding to the equipped unit shall appear darker with no pointer appearing during hover. When the other unit button is pressed, the reverse shall occur.</p>

<h4>Themes</h4>
Three festive themes were implemented based on the current Month:
<ol>
 <li>
  April - Easter
 </li>
 <li>
  October - Halloween
 </li>
 <li>
  November/December - Christmas
  </li>
   </ol>
If the current month is included in the above theme list, then the Theme Button will appear with either a "Bunny", "Pumpkin" or "Santa" icon.
If the current month is not included in the above theme list, then a happy face emoji will display within the Theme Button. If this button is clicked, an alert will display indicating that there are special themes available in the above-listed months.

Once a theme has been activated, cities can be searched as normal while maintaining the theme. If the user wishes to remove the theme, they need to <strong>click the button twice</strong> <em>This is a small bug which will be rectified after gaining a stronger understanding of functions and how to circumvent certain situations</em>

<h4>Built with</h4>
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
  
 <h4>Future Updates</h4>
<div>[] Responsive on a multitude of devices</div>
<div>[] React JS implementation</div>
<div>[] Color palette button to customise background as the user wishes</div>

<h2>About the Programmer - Pari S. Nathali</h2>
<p>Pari Nathali is an up-and-coming front-end web developer studying Pro at SheCodes. Keen to develop and demonstrate her skills, she is developing her skills in preparation for a career-change. Previously a forensic scientist and crime investigator, she has a multitude of transferable skills which, combined with her passion for programming would be an asset to any team or organisation.
 <br>
GitHub: https://github.com/Pari-Pt/
 <br>
SheCodes: https://www.shecodesfoundation.org/students/337-seonah-nathali
 <br>
LinkedIn: https://www.linkedin.com/in/pari-pt/
 </p>

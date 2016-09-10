// Code goes here
'use strict'


searchButton.addEventListener('click', searchWeather);

function searchWeather(){
  
  loading.style.display = 'block';
  weatherBox.style.display = 'none';
  
  console.log(searchCity.value);
  var cityName = searchCity.value;
  if(cityName.trim().length == 0){
    return alert('Please enter a valid city name!');
  }
  var http = new XMLHttpRequest();
  var apiKey = 'a4b8fa415f7df2c50f4697c34677763e';
  var url = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + '&units=metric&appid=' + apiKey;
  var method = 'GET';
  
  http.open(method, url);
  http.onreadystatechange = function(){
    
    if(http.readyState === XMLHttpRequest.DONE && http.status === 200){
    
      var data = (JSON.parse(http.responseText));
      var weatherData = new Weather(cityName, data.weather[0].description.toUpperCase());
      weatherData.temperature = data.main.temp;
      console.log(weatherData);
      updateWeather(weatherData);
      
      
    } else if (http.readyState === XMLHttpRequest.DONE && http.status !== 200){
      alert('Error! Something went wrong!');
    }
    
  };
  
  http.send();
  
}

function updateWeather(weatherData){
  
  weatherCity.textContent = weatherData.cityName;
  weatherDescription.textContent = weatherData.description;
  weatherTemperature.textContent = weatherData.temperature;
  
  loading.style.display = 'none';
  weatherBox.style.display = 'block';
}


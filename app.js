// Tutorial by http://youtube.com/CodeExplained
// api key : f967223836cad8203a272c039342cb21


//ELEMENTS TO DISPLAY
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification p");


var img = { "01d" : "sunnycat.gif",
			"01n" : "clearnightcat.gif",
			"02d" : "partcloudcat.gif",
			"02n" : "cloudcat.gif",
			"03d" : "partcloudcat.gif",
			"03n" : "clearnightcat.gif",
			"04d" : "cloudcat.gif",
			"04n" : "cloudcat.gif",
			"09d" : "lightraincat.gif",
			"09n" : "nightraincat.jpg",
			"10d" : "raincat.gif",
			"10n" : "lightraincat.gif",
			"11d" : "badraincat.gif",
			"11n" : "badraincat.gif",
			"13d" : "snowcat.gif",
			"13n" : "nightsnowcat.gif",
			"50d" : "windycat.gif",
			"50n" : "windycat.gif",
			};



//APP DATA
const weather = {};

weather.temperature = {
	unit : "celcius"
}

// APP CONST AND VARS

const KELVIN = 273;

// API KEY

const key = "f967223836cad8203a272c039342cb21";

// CHECK IF USERS BROWSER SUPPORTS GEOLOCATION

if('geolocation' in navigator){
	navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
	notificationElement.style.display = "block";
	notificationElement.innerHTML = '<p>Browser does not support geolocation</p>';
}

//SET USERS POSITION

function setPosition(position){
	let latitude = position.coords.latitude;
	let longitude = position.coords.longitude;

getWeather(latitude, longitude);

}

//SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION

function showError(error){
	notificationElement.style.display = "block";
	notificationElement.innerHTML = '<p> ${error.message} </p>';
}


//GET WEATHER

function getWeather(latitude, longitude){
	console.log('lat: '+latitude);
	console.log('lon: '+longitude);
	let api = 'http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid='+key;


fetch(api)
	.then(function(response){
		let data = response.json();
		return data;

		})

		.then(function(data){
			weather.temperature.value = Math.floor(data.main.temp - KELVIN);
			weather.description = data.weather[0].description;
			weather.iconID = data.weather[0].icon;
			console.log(data);
			weather.city = data.name;
			weather.country = data.sys.country;
		})
			.then(function(){
				displayweather();
		});
}

// DISPLAY UI

function displayweather(){
	//var src = 'icons/'+weather.iconID+'.png';
	var src = 'caticons/'+img[weather.iconID];
	console.log(src);
	console.log(weather.iconID);
	iconElement.innerHTML = '<img src="'+src+'"/>';
	tempElement.innerHTML = weather.temperature.value+'°<span>C</span>';
	descElement.innerHTML = weather.description;
	locationElement.innerHTML = weather.city+', '+weather.country;

}

// C to F CONVERSION

function celsiusToFahrenheit(temperature){
	return (temperature * 9/5) + 32;
}

// WHEN USER CLICKS ON TEMPERATURE DISPLAY

tempElement.addEventListener("click", function(){
		if(weather.temperature.value == undefined) return;

		if(weather.temperature.unit == "celcius"){
			let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
			fahrenheit = Math.floor(fahrenheit);

			tempElement.innerHTML = fahrenheit+'°<span>F</span>';
			weather.temperature.unit = "fahrenheit";

		}else{

			tempElement.innerHTML = weather.temperature.value+'°<span>C</span>';
			weather.temperature.unit = "celcius"
		}

});



















var cityInput = $("#city-input");
var cityList = $("#city-list");
var searchBtn = $("#search-btn");
var todayCityDate = $("#today-city-date");
var todayTemp = $("#today-temp");
var todayWind = $("#today-wind");
var todayHumidity = $("#today-humidity");

var citySearch = function () {
    var requestURL = "https://api.openweathermap.org/data/2.5/forecast" + "?q=" + cityInput.val() + "&appid=" + config.apiKey;
    var todayURL = "https://api.openweathermap.org/data/2.5/weather" + "?q=" + cityInput.val() + "&appid=" + config.apiKey;
    fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })
    fetch(todayURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        updateTodayCard(data, cityInput.val());
        console.log(data);
    })
    var cityBtnElement = $("<button></button>").html(cityInput.val());
    cityBtnElement.addClass("btn btn-secondary btn-padding");
    cityList.append(cityBtnElement);
}

function updateTodayCard(values, name) {
    var today = moment().format("M/D/YYYY");
    todayCityDate.html(name + " " + today);
    todayTemp.html("Temp: " + convertKelvinToF(values.main.temp) + "°F" );
    todayWind.html("Wind: " + values.wind.speed + " MPH");
    todayHumidity.html("Humidity: " + values.main.humidity + " %");
}

function convertKelvinToF(temp) {
    return (1.8 * (temp - 273) + 32).toFixed(2);
}

searchBtn.click(citySearch);
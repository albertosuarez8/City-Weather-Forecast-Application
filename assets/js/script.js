var cityInput = $("#city-input");
var cityList = $("#city-list");
var searchBtn = $("#search-btn");
var todayCityDate = $("#today-city-date");
var todayTemp = $("#today-temp");
var todayWind = $("#today-wind");
var todayHumidity = $("#today-humidity");
var idFutureDayList = ["#first-day", "#second-day", "#third-day", "#fourth-day", "#fifth-day"];

var citySearch = function () {
    var requestURL = "https://api.openweathermap.org/data/2.5/forecast" + "?q=" + cityInput.val() + "&appid=" + config.apiKey;
    var todayURL = "https://api.openweathermap.org/data/2.5/weather" + "?q=" + cityInput.val() + "&appid=" + config.apiKey;
    fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        fiveDayForecastCards(data.list);
    })
    fetch(todayURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        updateTodayCard(data, cityInput.val());
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

function fiveDayForecastCards(values) {
    var temp = 0
    for (let i = 5; i < values.length; i++) {
        $(idFutureDayList[temp] + "-title").html(moment().add(temp + 1, "days").format("M/D/YYYY"));
        $(idFutureDayList[temp] + "-temp").html("Temp: " + convertKelvinToF(values[i].main.temp) + "°F");
        $(idFutureDayList[temp] + "-wind").html("Wind: " + values[i].wind.speed + " MPH");
        $(idFutureDayList[temp] + "-humidity").html("Humidity: " + values[i].main.humidity + " %");
        temp++;
        i = i + 7;
    }
}

function convertKelvinToF(temp) {
    return (1.8 * (temp - 273) + 32).toFixed(2);
}

searchBtn.click(citySearch);
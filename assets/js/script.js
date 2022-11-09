var cityInput = $("#city-input");
var cityList = $("#city-list");
var searchBtn = $("#search-btn");

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
        console.log(data);
    })
    var cityBtnElement = $("<button></button>").html(cityInput.val());
    cityBtnElement.addClass("btn btn-secondary btn-padding");
    cityList.append(cityBtnElement);
}

searchBtn.click(citySearch);
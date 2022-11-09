var apiKey = "506cdd229659f05510c67db0a4c3f0d4"
var cityInput = $("#city-input");
var cityList = $("#city-list");
var searchBtn = $("#search-btn");
var todayCityDate = $("#today-city-date");
var todayTemp = $("#today-temp");
var todayWind = $("#today-wind");
var todayHumidity = $("#today-humidity");
var idFutureDayList = ["#first-day", "#second-day", "#third-day", "#fourth-day", "#fifth-day"];
var cityBtnList = [];

var citySearch = function () {
    var requestURL = "https://api.openweathermap.org/data/2.5/forecast" + "?q=" + cityInput.val() + "&appid=" + apiKey;
    var todayURL = "https://api.openweathermap.org/data/2.5/weather" + "?q=" + cityInput.val() + "&appid=" + apiKey;
    fetch(requestURL)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function (data) {
            fiveDayForecastCards(data.list);
        })
    fetch(todayURL)
        .then(function (response) {
            if (!response.ok) {
                alert("Invalid City Name")
                throw response.json();
            }
            return response.json();
        })
        .then(function (data) {
            var cityInputLowercase = cityInput.val().toLowerCase()
            updateTodayCard(data, cityInput.val());
            if (!cityBtnList.includes(cityInputLowercase)) {
                cityBtnList.push(cityInputLowercase);
                var cityBtnElement = $("<button></button>").html(cityInput.val().charAt(0).toUpperCase() + cityInput.val().slice(1).toLowerCase());
                cityBtnElement.addClass("btn btn-secondary btn-padding");
                cityList.append(cityBtnElement);
                cityBtnElement.click(cityBtn);
                listOfBtns(cityInputLowercase);
            }
        })
}

function updateTodayCard(values, name) {
    var today = moment().format("M/D/YYYY");
    todayCityDate.html(name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() + " " + today);
    todayTemp.html("Temp: " + convertKelvinToF(values.main.temp) + "°F");
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

function listOfBtns(cityInputLowercase) {
    var localStorageValue = localStorage.getItem("buttons");
    if (localStorageValue) {
        var parsedValue = JSON.parse(localStorageValue);
        parsedValue.push(cityInputLowercase)
        localStorage.setItem("buttons", JSON.stringify(parsedValue));
    } else {
        localStorage.setItem("buttons", JSON.stringify([cityInputLowercase]));
    }
}

function checkLocalStorage() {
    var localStorageValue = localStorage.getItem("buttons");
    if (localStorageValue) {
        var parsedValue = JSON.parse(localStorageValue);
        for (city in parsedValue) {
            cityBtnList.push(parsedValue[city]);
            var cityBtnElement = $("<button></button>").html(parsedValue[city].charAt(0).toUpperCase() + parsedValue[city].slice(1).toLowerCase());
            cityBtnElement.addClass("btn btn-secondary btn-padding");
            cityList.append(cityBtnElement);
            cityBtnElement.click(cityBtn);
        }
    }
}

function cityBtn(event) {
    var btnText = event.target.innerHTML
    var requestURL = "https://api.openweathermap.org/data/2.5/forecast" + "?q=" + btnText + "&appid=" + apiKey;
    var todayURL = "https://api.openweathermap.org/data/2.5/weather" + "?q=" + btnText + "&appid=" + apiKey;
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
            updateTodayCard(data, btnText);
        })
}

checkLocalStorage();
searchBtn.click(citySearch);
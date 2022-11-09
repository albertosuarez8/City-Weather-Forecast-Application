var cityInput = $("#city-input");
var cityList = $("#city-list");
var searchBtn = $("#search-btn");

var citySearch = function () {
    var cityBtnElement = $("<button></button>").html(cityInput.val());
    cityBtnElement.addClass("btn btn-secondary btn-padding");
    cityList.append(cityBtnElement);
}

searchBtn.click(citySearch);
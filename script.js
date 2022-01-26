var btnTranslate = document.querySelector("#btn-data");
var cityInput = document.querySelector("#city-input");
var currentTemperature = document.querySelector("#current-temperature");
var feelsLike = document.querySelector("#temp-feels-like");
var cloudDescription = document.querySelector("#cloud-description");
var humidityLevel = document.querySelector("#humidity");

if (window.matchMedia("(max-width: 700px)").matches)
    document.body.style.backgroundImage = "url('default-small.jpg')";

else
    document.body.style.backgroundImage = "url('default.jpg')";


var serverURL = "https://api.openweathermap.org/data/2.5/weather"

function getTranslationURL(city) {
    return serverURL + "?" + "q=" + city + "&units=metric&appid=b8192e87371ef413c693f463a53946f7"
}

function errorHandler(error) {
    console.log("error occured", error);
}

function clickHandler() {

    var inputCity = cityInput.value;

    // calling server
    fetch(getTranslationURL(inputCity))
        .then(response => response.json())
        .then(json => {
            var temperature = json.main.temp;
            if (temperature >= 20) {
                if (window.matchMedia("(max-width: 700px)").matches)
                    document.body.style.backgroundImage = "url('summer-small.jpg')";

                else
                    document.body.style.backgroundImage = "url('summer.jpg')";

            } else if (temperature < 20) {
                if (window.matchMedia("(max-width: 700px)").matches)
                    document.body.style.backgroundImage = "url('winter-small.jpg')";
                else
                document.body.style.backgroundImage = "url('winter.jpg')";
            }
            var tempFeelsLike = json.main.feels_like;
            var clouds = json.clouds.all;
            var humidity = json.main.humidity;
            currentTemperature.innerHTML = temperature + "°C";
            feelsLike.innerHTML = tempFeelsLike + "°C";
            cloudDescription.innerHTML = clouds + "%";
            humidityLevel.innerHTML = humidity + "%";
        })
        .catch(errorHandler);



};

function backgroundImage() {
    document.body.style.backgroundColor = "#f3f3f3";
    document.body.style.backgroundImage = "url('img_tree.png')";
}

btnTranslate.addEventListener("click", clickHandler)
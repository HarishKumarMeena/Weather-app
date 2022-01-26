var btnTranslate = document.querySelector("#btn-data");
var cityInput = document.querySelector("#city-input");
var currentTemperature = document.querySelector("#current-temperature");
var feelsLike = document.querySelector("#temp-feels-like");
var cloudDescription = document.querySelector("#cloud-description");
var humidityLevel = document.querySelector("#humidity");




if (window.matchMedia("(max-width: 700px)").matches)
{
    document.body.style.backgroundSize = "cover";
document.body.style.objectFit = "cover";
    document.body.style.backgroundImage = "url('images/default-small.jpg')";
    document.body.style.backgroundRepeat = "no-repeat";
}
    

else
    document.body.style.backgroundImage = "url('images/default.jpg')";
    

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
                    document.body.style.backgroundImage = "url('images/summer-small.jpg')";

                else
                    document.body.style.backgroundImage = "url('images/summer.jpg')";

            } else if (temperature < 20) {
                if (window.matchMedia("(max-width: 700px)").matches)
                    document.body.style.backgroundImage = "url('images/winter-small.jpg')";
                else
                    document.body.style.backgroundImage = "url('images/winter.jpg')";
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


btnTranslate.addEventListener("click", clickHandler)
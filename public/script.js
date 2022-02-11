// Variables
const kelvin = 273;
var longitude;
var latitude;
let cityList = [];


// DOM Declarations
const submitButton = document.querySelector("#check-weather");
const cityContainer = document.querySelector("#city");


// On Window Load
window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async position => {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;

            GetWeatherData(latitude, longitude);
        })
    }
})


//Get Weather Data from API
async function GetWeatherData(lat, lon) {

    const requestWeatherObject = { lat, lon };
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestWeatherObject)
    };

    const fetch_response = await fetch('/apiGetWeatherData', options);
    const data = await fetch_response.json();
    // console.log(data);

    ShowWeatherData(data)
}


// Display Weather Card
function ShowWeatherData(data) {

    if(data) {
        const temp = Math.floor(data.main.temp - kelvin) + "°C";
        const summary = data.weather[0]["description"];
        const city = data.name;
        const country = data.sys.country;
        const iconId = data.weather[0]["icon"];
        const icon = `https://openweathermap.org/img/wn/${iconId}@2x.png`;

        if ( !(cityList.includes(city + country)) ) {
            
            cityList.push(city + country);
            const containerCard = document.createElement("div");
            containerCard.classList.add('col');

            const markup = `
                <div class="container">
                    <div class="front">
                        <div class="content">
                            <div class="city">${city}</div>
                            <div class="country">${country}</div>
                        </div>
                    </div>
                    <div class="back">
                        <div class="content">
                            <button type="button" class="remove-card" id="remove-card"></button>
                            <figure>
                                <img class="weather-icon" src=${icon} alt=${data.weather[0]["main"]}>
                                <figcaption class="summary">${summary}</figcaption>
                            </figure>
                            <div class="temp">${temp}</div>
                        </div>
                    </div>
                </div>`;
            containerCard.innerHTML = markup;
            document.getElementsByClassName('grid-container')[0].appendChild(containerCard);
        }
        else {
            window.alert("You have already searched this city.");
        }
    }
};

async function GetWeatherData(lat, lon) {

    const requestWeatherObject = { lat, lon };
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestWeatherObject)
    };

    const fetch_response = await fetch('/apiGetWeatherData', options);
    const data = await fetch_response.json();

    ShowWeatherData(data)
}


// Add New Card
submitButton.addEventListener("click", async () => {
    const city = cityContainer.value;

    const requestCityCoordinatesObject = { city };
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestCityCoordinatesObject)
    };

    const fetch_response = await fetch('/apiGetCityCoordinates', options);
    const data = await fetch_response.json();

    if (data[0] != undefined) {
        GetWeatherData(data[0].lat, data[0].lon);
        cityContainer.value = "";
    }
    else {
        window.alert("Please search for a valid city.");
    }
});


// Remove Card Button
document.addEventListener('click', function(e) {
    if (e.target && e.target.id == "remove-card") {

        const city = e.target.closest(".container").getElementsByClassName("city")[0].textContent;
        const country = e.target.closest(".container").getElementsByClassName("country")[0].textContent;
        cityList = cityList.filter(a => {return a !== city+country});

        e.target.closest(".col").remove();
    }
});
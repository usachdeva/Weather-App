const searchBtn = document.querySelector("#search-city");
const cityInput = document.querySelector("#search");
const cityHeadCard = document.querySelector("#required-city h2");
const cityTemp = document.querySelector("#city-temp");
const cityWind = document.querySelector("#city-wind");
const cityHumidity = document.querySelector("#city-humidity");

const formSubmitHandler = (event) => {
    event.preventDefault();

    const cityName = cityInput.value.trim().toLowerCase();

    if (cityName) {
        selectedCityWeather(cityName);
        cityInput.value = "";
    } else {
        alert("Enter the city name");
    }
};

const selectedCityWeather = (cityName) => {
    cityHeadCard.textContent = cityName.toUpperCase();

    const apiKey = `cc1961620c07d9c2d3b1a593bf9ec1b1`;
    const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric`;
    const userUrl = baseUrl + `&appid=${apiKey}`;

    fetch(userUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                cityTemp.textContent = ` ${data.main.temp} C`;
                cityWind.textContent = ` ${data.wind.speed} MPH`;
                cityHumidity.textContent = ` ${data.main.humidity} %`;
                console.log(data.weather[0].icon);

                // creating the icon
                const icon = document.createElement("img");

                icon.setAttribute("id", "wincon");
                icon.setAttribute(
                    "src",
                    `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
                );
                icon.setAttribute("alt", "Example Image");

                cityHeadCard.append(icon);
            });
        } else {
            alert("error in city name");
        }
    });
};

searchBtn.addEventListener("click", formSubmitHandler);

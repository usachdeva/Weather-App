const searchBtn = document.querySelector("#search-city");
const cityInput = document.querySelector("#search");
const cityHeadCard = document.querySelector("#required-city h2");
const cityTemp = document.querySelector("#city-temp");
const cityWind = document.querySelector("#city-wind");
const cityHumidity = document.querySelector("#city-humidity");
const cityBtn = document.querySelectorAll(".btn");

const apiKey = `cc1961620c07d9c2d3b1a593bf9ec1b1`;

const formSubmitHandler = (event) => {
    event.preventDefault();

    const cityName = cityInput.value.trim().toLowerCase();

    if (cityName) {
        inputCityWeather(cityName);
        cityInput.value = "";
    } else {
        alert("Enter the city name");
    }
};

const inputCityWeather = (cityName) => {
    cityHeadCard.textContent = cityName.toUpperCase();

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

                // adding date
                const dateText = document.createElement("span");
                dateText.setAttribute("id", "today-date");
                const dateTextContent = dayjs
                    .unix(data.dt)
                    .format("DD/MM/YYYY");
                dateText.textContent = dateTextContent;

                // creating the icon
                const icon = document.createElement("img");

                icon.setAttribute("id", "wincon");
                icon.setAttribute(
                    "src",
                    `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
                );
                icon.setAttribute("alt", "Example Image");

                cityHeadCard.append(dateText);
                cityHeadCard.append(icon);
            });
        } else {
            alert("error in city name");
        }
    });
};

// for 5-day forecast

// search button
searchBtn.addEventListener("click", formSubmitHandler);

// weather for different buttons with cities
cityBtn.forEach((button) => {
    button.addEventListener("click", function () {
        const buttonText = this.textContent;
        inputCityWeather(buttonText);
    });
});

// checking dayjs
console.log(dayjs.unix(1712797734).format("DD/MM/YYYY"));

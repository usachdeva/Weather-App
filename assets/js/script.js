const searchBtn = document.querySelector("#search-city");
const cityInput = document.querySelector("#search");
const cityHeadCard = document.querySelector("#required-city h2");
const cityTemp = document.querySelector("#city-temp");
const cityWind = document.querySelector("#city-wind");
const cityHumidity = document.querySelector("#city-humidity");
const cityBtns = document.querySelectorAll(".city-btn");
// const cityBtn = document.querySelector("");
const rowDiv = document.querySelector(".row-cols-1");
const btnsDiv = document.querySelector("#city-buttons");

const apiKey = `cc1961620c07d9c2d3b1a593bf9ec1b1`;

// creating a search history button
const addNewBtn = (city) => {
    let newBtn = document.createElement("button");
    newBtn.setAttribute("class", "btn btn-secondary my-2 city-btn");
    newBtn.textContent = city;

    btnsDiv.insertBefore(newBtn, btnsDiv.firstChild);
};

const formSubmitHandler = (event) => {
    event.preventDefault();

    const cityName = cityInput.value.trim().toLowerCase();

    if (cityName) {
        inputCityWeather(cityName);
        fiveDayForecast(cityName);
        cityInput.value = "";
        addNewBtn(cityName);
    } else {
        alert("Enter the city name");
    }
};

const inputCityWeather = (cityName) => {
    cityHeadCard.textContent = cityName.toUpperCase();

    const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial`;
    const userUrl = baseUrl + `&appid=${apiKey}`;

    fetch(userUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                rowDiv.innerHTML = "";

                // console.log(data);
                cityTemp.textContent = ` ${data.main.temp} F`;
                cityWind.textContent = ` ${data.wind.speed} MPH`;
                cityHumidity.textContent = ` ${data.main.humidity} %`;
                // console.log(data.weather[0].icon);

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
const fiveDayForecast = (cityName) => {
    const fiveDay = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial`;
    const fiveDayUrl = fiveDay + `&appid=${apiKey}`;

    fetch(fiveDayUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            let previousDate = "";

            let lists = data.list;
            for (let list of lists) {
                let date = list.dt_txt;
                let currentDate = dayjs(date).format("DD/MM/YYYY");
                if (currentDate != previousDate) {
                    console.log(currentDate);
                    previousDate = currentDate;

                    let columnDiv = document.createElement("div");
                    columnDiv.classList.add("col");

                    let cardDiv = document.createElement("div");
                    cardDiv.classList.add("card");

                    let cardBody = document.createElement("div");
                    cardBody.classList.add("card-body-dates");

                    let cardHeadText = document.createElement("h5");
                    cardHeadText.textContent = currentDate;

                    let cardTempText = document.createElement("p");
                    cardTempText.textContent = `Temp: ${list.main.temp} F`;

                    let cardWindText = document.createElement("p");
                    cardWindText.textContent = `Wind: ${list.wind.speed} MPH`;

                    let cardHumidityText = document.createElement("p");
                    cardHumidityText.textContent = `Humidity: ${list.main.humidity}%`;

                    const icon = document.createElement("img");

                    icon.setAttribute("class", "wincon-day");
                    icon.setAttribute(
                        "src",
                        `https://openweathermap.org/img/wn/${list.weather[0].icon}@2x.png`
                    );
                    icon.setAttribute("alt", "Example Image");

                    cardBody.appendChild(cardHeadText);
                    cardBody.appendChild(icon);
                    cardBody.appendChild(cardTempText);
                    cardBody.appendChild(cardWindText);
                    cardBody.appendChild(cardHumidityText);

                    cardDiv.appendChild(cardBody);

                    columnDiv.appendChild(cardDiv);

                    rowDiv.appendChild(columnDiv);
                }
            }
        });
};

// search button
searchBtn.addEventListener("click", formSubmitHandler);

// weather for different buttons with cities for already created buttons
// cityBtn.forEach((button) => {
//     button.addEventListener("click", function () {
//         event.preventDefault();

//         console.log("city", this);

//         const buttonText = this.textContent;
//         inputCityWeather(buttonText);

//         fiveDayForecast(buttonText);
//     });
// });

// checking
btnsDiv.addEventListener("click", (event) => {
    event.preventDefault();

    console.log(event.target);

    const buttonText = event.target.textContent;
    inputCityWeather(buttonText);

    fiveDayForecast(buttonText);
});

// checking dayjs
// console.log(dayjs.unix(1712797734).format("DD/MM/YYYY"));

// {
/* <div class="col">
                <div class="card h-100">
                    <div class="card-body-dates px-2">
                        <h5>Atlanta</h5>
                        <p>Temp:<span id="city-temp1"></span></p>
                        <p>Wind:<span id="city-wind1"></span></p>
                        <p>Humidity:<span id="city-humidity1"></span></p>
                    </div>
                </div>
            </div> */
// }

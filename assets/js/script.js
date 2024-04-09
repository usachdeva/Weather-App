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

  const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=cc1961620c07d9c2d3b1a593bf9ec1b1`;

  fetch(baseUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        console.log(data.main);
        cityTemp.textContent = ` ${data.main.temp}F`;
        cityWind.textContent = ` ${data.wind.speed}MPH`;
        cityHumidity.textContent = ` ${data.main.humidity}%`;
      });
    } else {
      alert("error in city name");
    }
  });
};

searchBtn.addEventListener("click", formSubmitHandler);

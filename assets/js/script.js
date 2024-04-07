const requestUrl = "https://openweathermap.org/api";

// checking
fetch(requestUrl)
  .then(function (response) {
    return response.json;
  })
  .then(function (data) {
    console.log(data);
  });

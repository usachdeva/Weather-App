const requestUrl =
  "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=cc1961620c07d9c2d3b1a593bf9ec1b1";

// checking
fetch(requestUrl)
  .then(function (response) {
    if (response.ok) {
      console.log("response found");
    }
    return response.json;
  })
  .then(function (data) {
    for (let d of data) {
      console.log(d);
    }
  });

let today = dayjs().format("DD/MM/YYYY");

$("#today-date").text(today);

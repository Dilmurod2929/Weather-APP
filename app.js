const api = {
  key: "30ddf2325ad59a2d1deffecd96ef4c44",
  baseurl: `https://api.openweathermap.org/data/2.5/`,
};

const searchBox = document.querySelector(".search-box");

searchBox.addEventListener(`keypress`, setQuery);

function setQuery(e) {
  if (e.keyCode == 13) {
    getResults(searchBox.value);
    console.log(searchBox.value);
  }
}

function getResults(query) {
  fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector(".city");
  city.innerHTML = `${weather.name}, ${weather.sys.country}`;
  let now = new Date();
  const data = document.querySelector(".date");
  data.innerHTML = dateBuilder(now);
  let temp = document.querySelector(".temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}°C`;
  let weatherEl = document.querySelector(".weather");
  weatherEl.innerHTML = weather.weather[0].main;
  let hilow = document.querySelector(".hi-ow");
  hilow.innerHTML = `${Math.floor(weather.main.temp_min)} °C  /  ${Math.round(
    weather.main.temp_max
  )} °C`;
}

function dateBuilder(s) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thusrday",
    "Friday",
    "Saturday",
  ];
  let day = days[s.getDay()];
  let date = s.getDate();
  let month = months[s.getMonth()];
  let year = s.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

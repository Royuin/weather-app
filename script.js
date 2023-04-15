const tempNode = document.querySelector('.temp');
const feelsLike = document.querySelector('.feels-like');
const locationNode = document.querySelector('.location');
const conditionNode = document.querySelector('.condition-text');
const conditionIcon = document.querySelector('.condition-icon');
const windSpeedNode = document.querySelector('.wind-speed');
const humidityNode = document.querySelector('.humidity');

function displayWeatherData(data) {
  tempNode.textContent = data.current.temp_c + '\u00B0C';
  feelsLike.textContent = `Feels like ${data.current.feelslike_c} \u00B0C`;

  locationNode.textContent =
    `${data.location.name}, ` +
    `${data.location.region}, ` +
    `${data.location.country} `;

  conditionNode.textContent = data.current.condition.text;
  conditionIcon.src = data.current.condition.icon;

  windSpeedNode.textContent = `Wind speed ${data.current.wind_kph} km/h`;

  humidityNode.textContent = `Humidity ${data.current.humidity}%`;
}

async function getWeatherData(location) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=a2a56f72ff4949fabf611158231204&q=${location}&aqi=no`,
    {
      mode: 'cors',
    }
  ).then(function (response) {
    return response.json();
  });
  console.log(response);
  displayWeatherData(response);
}

getWeatherData('chicago');

const submitBtn = document.querySelector('.submit-button');

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const inputValue = document.getElementById('location').value;
  getWeatherData(inputValue);
});

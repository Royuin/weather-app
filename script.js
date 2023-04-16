const tempNode = document.querySelector('.temp');
const feelsLike = document.querySelector('.feels-like');
const locationNode = document.querySelector('.location');
const conditionNode = document.querySelector('.condition-text');
const conditionIcon = document.querySelector('.condition-icon');
const windSpeedNode = document.querySelector('.wind-speed');
const humidityNode = document.querySelector('.humidity');
const timeNode = document.querySelector('.time');
const tempBtn = document.querySelector('.temp-button');

function displayWeatherDataCelsius(data) {
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

  timeNode.textContent = data.location.localtime;
}

function displayWeatherDataFahrenheit(data) {
  tempNode.textContent = data.current.temp_f + '\u00B0F';
  feelsLike.textContent = `Feels like ${data.current.feelslike_f} \u00B0F`;

  locationNode.textContent =
    `${data.location.name}, ` +
    `${data.location.region}, ` +
    `${data.location.country} `;

  conditionNode.textContent = data.current.condition.text;
  conditionIcon.src = data.current.condition.icon;

  windSpeedNode.textContent = `Wind speed ${data.current.wind_mph} mph`;

  humidityNode.textContent = `Humidity ${data.current.humidity}%`;

  timeNode.textContent = data.location.localtime;
}

async function getWeatherData(location, measurement) {
  const errorMessage = document.querySelector('.error');
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=3857d376c23d4bca9d400035231604&q=${location}&aqi=no`,
      {
        mode: 'cors',
      }
    ).then(function (response) {
      return response.json();
    });

    errorMessage.style.display = 'none';

    if (measurement === 'C') {
      displayWeatherDataCelsius(response);
    } else if (measurement === 'F') {
      displayWeatherDataFahrenheit(response);
    }
  } catch (e) {
    errorMessage.style.display = 'flex';
  }
}

getWeatherData('chicago', 'F');

const submitBtn = document.querySelector('.submit-button');

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const inputValue = document.getElementById('location').value;
  getWeatherData(inputValue, tempBtn.textContent);
});

tempBtn.addEventListener('click', () => {
  const measurement = tempBtn.textContent;
  const location = locationNode.textContent;
  if (measurement === 'C') {
    getWeatherData(location, 'F');
    tempBtn.textContent = 'F';
  } else if (measurement === 'F') {
    getWeatherData(location, 'C');
    tempBtn.textContent = 'C';
  }
});

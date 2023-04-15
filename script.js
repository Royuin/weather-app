const tempNode = document.querySelector('.temp');
const feelsLike = document.querySelector('.feels-like');
const locationNode = document.querySelector('.location');

function displayWeatherData(data) {
  tempNode.textContent = data.current.temp_c + '\u00B0C';
  feelsLike.textContent += data.current.feelslike_c + '\u00B0C';

  locationNode.textContent +=
    `${data.location.name}, ` +
    `${data.location.region}, ` +
    `${data.location.country} `;
}
const getWeatherData = async (location) => {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=a2a56f72ff4949fabf611158231204&q=${location}&aqi=no`,
    {
      mode: 'cors',
    }
  ).then(function (response) {
    return response.json();
  });
  displayWeatherData(response);
};

getWeatherData('chicago');

console.log(getWeatherData('montana'));

const submitBtn = document.querySelector('.submit-button');

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const inputValue = document.getElementById('location').value;
  getWeatherData(inputValue);
});

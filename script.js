async function getWeatherData(location) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=a2a56f72ff4949fabf611158231204&q=${location}&aqi=no`,
    {
      mode: 'cors',
    }
  ).then(function (response) {
    return response.json();
  });
  console.log(
    response.location.name,
    response.location.region,
    response.location.country
  );
  console.log(
    response.current.temp_c + '\u00B0C',
    response.current.temp_f + '\u00B0F'
  );
}

getWeatherData('chicago');

const submitBtn = document.querySelector('.submit-button');

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const inputValue = document.getElementById('location').value;
  getWeatherData(inputValue);
});

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
}

getWeatherData('chicago');

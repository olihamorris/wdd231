const apiKey = '0617997f62f982fe9873287fd4047de0';  // Replace with your API key
const city = 'Benin%City';
const units = 'metric';
const tempElement = document.getElementById('current-temp');
const descElement = document.getElementById('weather-desc');
const iconElement = document.getElementById('weather-icon');
const forecastContainer = document.getElementById('forecast-cards');

// Fetch current weather
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`)
  .then(response => {
    if (!response.ok) throw new Error('Weather data not available');
    return response.json();
  })
  .then(data => {
    const temperature = data.main.temp.toFixed(1);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${iconCode}.png`;
    tempElement.textContent = `${temperature} °C`;
    descElement.textContent = description;
    iconElement.setAttribute('src', iconURL);
    iconElement.setAttribute('alt', description);
  })
  .catch(error => {
    console.error('Error fetching current weather:', error);
    tempElement.textContent = 'N/A';
    descElement.textContent = 'Unavailable';
  });

// Fetch 3-day forecast
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`)
  .then(response => {
    if (!response.ok) throw new Error('Forecast data not available');
    return response.json();
  })
  .then(data => {
    const forecastDays = {};
    const today = new Date().getDate();
    data.list.forEach(item => {
      const date = new Date(item.dt_txt);
      const hour = date.getHours();
      const day = date.getDate();
      if (hour === 12 && day !== today && !forecastDays[day]) {
        forecastDays[day] = item;
      }
    });
    Object.values(forecastDays).slice(0, 3).forEach(forecast => {
      const date = new Date(forecast.dt_txt);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const temp = forecast.main.temp.toFixed(1);
      const icon = forecast.weather[0].icon;
      const desc = forecast.weather[0].description;
      const iconURL = `https://openweathermap.org/img/wn/${icon}.png`;
      const card = document.createElement('div');
      card.classList.add('forecast-card');
      card.innerHTML = `
        <h4>${dayName}</h4>
        <img src="${iconURL}" alt="${desc}">
        <p>${temp} °C</p>
        <p>${desc}</p>
      `;
      forecastContainer.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Error fetching forecast data:', error);
    forecastContainer.innerHTML = '<p>Forecast unavailable.</p>';
  });


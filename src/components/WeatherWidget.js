import React, { useEffect, useState } from 'react';

const WeatherWidget = () => {
  const [city, setCity] = useState('Pune');
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState('metric');

  const API_KEY = '35741238aefa27b8712055bdf83dcbe8'; // Add your OpenWeatherMap API key

  useEffect(() => {
    fetchWeather(city);
  }, [city, unit]);

  const fetchWeather = async (cityName) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&appid=${API_KEY}`
      );
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      console.log('Error fetching weather', err);
    }
  };

  return (
    <div className="weather-widget">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={() => setUnit(unit === 'metric' ? 'imperial' : 'metric')}>
        {unit === 'metric' ? '°F' : '°C'}
      </button>
      {weather && weather.main && (
        <div className="weather-info">
          <h3>{weather.name}</h3>
          <p>{weather.weather[0].main}</p>
          <p>{Math.round(weather.main.temp)}°{unit === 'metric' ? 'C' : 'F'}</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;

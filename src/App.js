import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [time, setTime] = useState(new Date());
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [city, setCity] = useState("Pune");
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState("metric"); // 'metric' for Celsius

  // Clock
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Theme
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Greeting
  const getGreeting = () => {
    const hour = time.getHours();
    if (hour >= 5 && hour < 12) return "Good Morning";
    else if (hour >= 12 && hour < 17) return "Good Afternoon";
    else if (hour >= 17 && hour < 21) return "Good Evening";
    else return "Good Night";
  };

  // Fetch Weather
  const fetchWeather = async () => {
    try {
      const key = "35741238aefa27b8712055bdf83dcbe8"; // Replace with your OpenWeatherMap API Key
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${key}`
      );
      const data = await res.json();
      if (data.main) setWeather(data);
    } catch (err) {
      console.error("Weather fetch error:", err);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [city, unit]);

  return (
    <div className="dashboard">
      <div className="clock-section">
        <div className="clock">
          {time.toLocaleTimeString("en-GB", { hour12: false })}
        </div>
        <div className="date">
          {time.toLocaleDateString("en-GB", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
        <div className="greeting">{getGreeting()}</div>
        <button className="theme-toggle" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          Switch to {theme === "light" ? "Dark" : "Light"} Theme
        </button>
      </div>

      <div className="weather-card">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="unit-toggle" onClick={() => setUnit(unit === "metric" ? "imperial" : "metric")}>
          Switch to {unit === "metric" ? "°F" : "°C"}
        </button>

        {weather && (
          <>
            <h3>{weather.name}</h3>
            <div className="temp">{Math.round(weather.main.temp)}° {unit === "metric" ? "C" : "F"}</div>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt="Weather icon"
            />
            <div className="condition">{weather.weather[0].main}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;

/**
 * LocalFind Weather Widget
 * Fetches real-time weather for Rasauli, UP from Open-Meteo (free, no API key)
 * Auto-refreshes every 15 minutes to stay current
 * @version 4.3.9
 */
(function() {
  'use strict';

  const WEATHER_API = 'https://api.open-meteo.com/v1/forecast?latitude=26.92&longitude=81.17&current_weather=true';
  const REFRESH_INTERVAL = 15 * 60 * 1000; // 15 minutes (matches Open-Meteo update cycle)

  const widget = document.getElementById('weather-widget');
  if (!widget) return;

  function getWeatherInfo(code, isDay) {
    if (code === 0) return { icon: isDay ? '☀️' : '🌙', text: isDay ? 'Clear & sunny' : 'Clear night' };
    if (code <= 3) return { icon: isDay ? '⛅' : '☁️', text: 'Partly cloudy' };
    if (code <= 48) return { icon: '🌫️', text: 'Foggy' };
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return { icon: '🌧️', text: 'Rainy' };
    if (code <= 77 || code === 85 || code === 86) return { icon: '❄️', text: 'Snowing' };
    if (code >= 95) return { icon: '⛈️', text: 'Thunderstorm' };
    return { icon: '🌡️', text: 'Weather' };
  }

  function getReaction(code, temp) {
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82) || code >= 95) {
      return "Don't forget your umbrella! ☂️";
    }
    if (temp >= 40) return "Extreme heat — stay indoors! 🔥";
    if (temp >= 35) return "Stay hydrated! 🥤";
    if (temp >= 30) return "Perfect for a cold drink! 🍦";
    if (temp >= 20) return "Great weather to explore! 🚶‍♂️";
    if (temp >= 10) return "A bit chilly outside! 🧥";
    return "Bundle up! 🧣";
  }

  async function fetchWeather() {
    try {
      const res = await fetch(WEATHER_API);
      if (!res.ok) throw new Error('Weather API failed');
      const data = await res.json();
      const current = data.current_weather;
      const temp = Math.round(current.temperature);
      if (isNaN(temp)) throw new Error('Invalid temperature data');
      const code = current.weathercode;
      const isDay = current.is_day === 1;

      const { icon, text } = getWeatherInfo(code, isDay);
      const reaction = getReaction(code, temp);

      widget.innerHTML = `
        <div class="weather-temp">${icon} ${temp}°C <span class="weather-loc">Rasauli, UP</span></div>
        <div class="weather-reaction">${text} • ${reaction}</div>
      `;
      widget.classList.add('loaded');
    } catch (error) {
      console.error('Weather fetch failed:', error);
      widget.style.display = 'none';
    }
  }

  // Fetch immediately on page load
  fetchWeather();

  // Auto-refresh every 15 minutes for real-time data
  setInterval(fetchWeather, REFRESH_INTERVAL);
})();

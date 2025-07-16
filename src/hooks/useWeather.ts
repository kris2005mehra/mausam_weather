import { useState, useEffect } from 'react';
import axios from 'axios';
import { WeatherData, GeoLocation } from '../types/weather';

const API_KEY = '55c72e07184d4e8ca29102018250607';
const BASE_URL = 'https://api.weatherapi.com/v1';

export const useWeather = (location: GeoLocation | null) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${BASE_URL}/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=6&aqi=yes&alerts=yes`
      );

      const data = response.data;

      const processedWeather: WeatherData = {
        location: {
          name: data.location.name,
          country: data.location.country,
          lat: data.location.lat,
          lon: data.location.lon,
        },
        current: {
          temp: data.current.temp_c,
          feels_like: data.current.feelslike_c,
          humidity: data.current.humidity,
          pressure: data.current.pressure_mb,
          visibility: data.current.vis_km,
          uv_index: data.current.uv,
          wind_speed: data.current.wind_kph / 3.6, // Convert to m/s
          wind_deg: data.current.wind_degree,
          weathercode: data.current_weather.weathercode,
          is_day: data.current_weather.is_day,
          weather: {
            main: data.current.condition.text.split(' ')[0],
            description: data.current.condition.text.toLowerCase(),
            icon: data.current.condition.icon.split('/').pop()?.replace('.png', '') || '01d',
          },
        },
        forecast: data.forecast.forecastday.slice(1, 6).map((day: any) => ({
          date: day.date,
          temp: {
            min: day.day.mintemp_c,
            max: day.day.maxtemp_c,
          },
          weather: {
            main: day.day.condition.text.split(' ')[0],
            description: day.day.condition.text.toLowerCase(),
            icon: day.day.condition.icon.split('/').pop()?.replace('.png', '') || '01d',
          },
          humidity: day.day.avghumidity,
          wind_speed: day.day.maxwind_kph / 3.6, // Convert to m/s
        })),
      };

      setWeather(processedWeather);
    } catch (err: any) {
      setError('Failed to fetch weather data');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCity = async (city: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&days=6&aqi=yes&alerts=yes`
      );
      
      const data = response.data;
      await fetchWeatherByCoords(data.location.lat, data.location.lon);
    } catch (err: any) {
      setError('City not found');
      console.error('City search error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location) {
      fetchWeatherByCoords(location.lat, location.lon);
    }
  }, [location]);

  return { weather, loading, error, fetchWeatherByCity };
};
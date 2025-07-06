import React, { useState, useEffect } from 'react';
import { Wind, Droplets, Eye, Thermometer, MapPin, Calendar, Sun, Gauge } from 'lucide-react';
import { useGeolocation } from '../hooks/useGeolocation';
import { useWeather } from '../hooks/useWeather';
import { getWeatherCondition, formatTemperature, getWeatherIcon } from '../utils/weather';
import WeatherBackground from './WeatherBackground';
import WeatherMascot from './WeatherMascot';
import WeatherAlerts from './WeatherAlerts';
import Search from './Search';
import ThemeToggle from './ThemeToggle';
import Forecast from './Forecast';

const WeatherDashboard: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [dismissedAlerts, setDismissedAlerts] = useState<number[]>([]);
  const { location, loading: locationLoading, getCurrentLocation } = useGeolocation();
  const { weather, loading: weatherLoading, error, fetchWeatherByCity } = useWeather(location);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    } else {
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const toggleUnit = () => {
    setUnit(unit === 'C' ? 'F' : 'C');
  };

  const dismissAlert = (index: number) => {
    setDismissedAlerts(prev => [...prev, index]);
  };

  const weatherCondition = weather 
    ? getWeatherCondition(weather.current.weather.main, weather.current.weather.icon)
    : { type: 'clear' as const, intensity: 'light' as const };

  const loading = locationLoading || weatherLoading;
  const activeAlerts = weather?.alerts?.filter((_, index) => !dismissedAlerts.includes(index)) || [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <WeatherBackground condition={weatherCondition} isDark={isDark} />
        <div className={`text-center z-10 ${isDark ? 'text-white' : 'text-gray-800'}`}>
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-current border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-current/20 rounded-full mx-auto animate-pulse"></div>
            <div className="absolute inset-2 w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-auto animate-pulse opacity-20"></div>
          </div>
          <h2 className="text-2xl font-bold mb-4 animate-pulse">Fetching weather data...</h2>
          <p className="text-lg opacity-70 animate-pulse">Please wait a moment</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <WeatherBackground condition={weatherCondition} isDark={isDark} />
        <div className={`text-center z-10 max-w-md mx-auto px-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
          <div className="text-8xl mb-8 animate-bounce">😔</div>
          <h2 className="text-3xl font-bold mb-6">Oops! Something went wrong</h2>
          <p className="text-xl mb-8 opacity-80">Unable to load weather data</p>
          <button
            onClick={getCurrentLocation}
            className={`px-10 py-4 rounded-2xl backdrop-blur-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
              isDark 
                ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20 shadow-lg shadow-white/10' 
                : 'bg-black/10 hover:bg-black/20 text-gray-800 border border-black/20 shadow-lg shadow-black/10'
            }`}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <WeatherBackground condition={weatherCondition} isDark={isDark} />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-8 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="text-4xl animate-bounce">🌤️</div>
            <h1 className={`text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg ${
              isDark ? 'drop-shadow-white/20' : 'drop-shadow-black/20'
            }`}>
              Mausam
            </h1>
          </div>
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
        </header>

        {/* Search Section with Proper Spacing */}
        <div className="px-8 mb-12">
          <Search
            onSearch={fetchWeatherByCity}
            onLocationClick={getCurrentLocation}
            loading={loading}
            isDark={isDark}
          />
        </div>

        {/* Main Content */}
        <main className="flex-1 px-8 pb-12">
          {weather && (
            <div className="max-w-7xl mx-auto space-y-12">
              {/* Weather Alerts */}
              {activeAlerts.length > 0 && (
                <WeatherAlerts
                  alerts={activeAlerts}
                  isDark={isDark}
                  onDismiss={dismissAlert}
                />
              )}

              {/* Hero Section */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Current Weather Card */}
                <div className="xl:col-span-2">
                  <div className={`backdrop-blur-xl rounded-3xl p-8 border transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl ${
                    isDark 
                      ? 'bg-white/5 border-white/10 text-white shadow-xl shadow-white/5' 
                      : 'bg-white/20 border-white/30 text-gray-800 shadow-xl shadow-black/5'
                  }`}>
                    {/* Glow Effect */}
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500 blur-xl`}></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-6 h-6 opacity-70" />
                          <h2 className="text-3xl font-bold">
                            {weather.location.name}
                          </h2>
                          <span className="text-xl opacity-70">
                            {weather.location.country}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm opacity-70">
                            {new Date().toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-8">
                          <div className="relative">
                            <img
                              src={getWeatherIcon(weather.current.weather.icon)}
                              alt={weather.current.weather.description}
                              className="w-28 h-28 drop-shadow-2xl animate-float"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
                          </div>
                          <div>
                            <div className="text-7xl font-light mb-3 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                              {formatTemperature(weather.current.temp, unit)}
                            </div>
                            <button
                              onClick={toggleUnit}
                              className={`text-sm opacity-70 hover:opacity-100 transition-all duration-300 underline decoration-dotted hover:scale-105 ${
                                isDark ? 'hover:text-blue-300' : 'hover:text-blue-600'
                              }`}
                            >
                              Switch to °{unit === 'C' ? 'F' : 'C'}
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-semibold capitalize mb-3">
                            {weather.current.weather.description}
                          </p>
                          <p className="text-xl opacity-70">
                            Feels like {formatTemperature(weather.current.feels_like, unit)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Weather Mascot */}
                <div className="flex justify-center xl:justify-start">
                  <WeatherMascot
                    weatherMain={weather.current.weather.main}
                    temperature={weather.current.temp}
                    isDark={isDark}
                  />
                </div>
              </div>

              {/* Weather Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                {[
                  { icon: Wind, label: 'Wind Speed', value: `${Math.round(weather.current.wind_speed)} m/s`, color: 'from-blue-400 to-cyan-500' },
                  { icon: Droplets, label: 'Humidity', value: `${weather.current.humidity}%`, color: 'from-cyan-400 to-blue-500' },
                  { icon: Eye, label: 'Visibility', value: `${weather.current.visibility} km`, color: 'from-purple-400 to-pink-500' },
                  { icon: Thermometer, label: 'Pressure', value: `${weather.current.pressure} mb`, color: 'from-orange-400 to-red-500' },
                  { icon: Sun, label: 'UV Index', value: `${weather.current.uv_index}`, color: 'from-yellow-400 to-orange-500' },
                  { icon: Gauge, label: 'Wind Direction', value: `${weather.current.wind_deg}°`, color: 'from-green-400 to-emerald-500' },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className={`relative backdrop-blur-xl rounded-2xl p-6 border transition-all duration-500 hover:scale-105 hover:shadow-2xl group ${
                      isDark 
                        ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' 
                        : 'bg-white/20 border-white/30 text-gray-800 hover:bg-white/30'
                    }`}
                  >
                    {/* Glow Effect */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white shadow-lg`}>
                          <stat.icon className="w-6 h-6" />
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{stat.value}</div>
                        </div>
                      </div>
                      <div className="text-sm opacity-70 font-medium">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Forecast Section */}
              <div className={`relative backdrop-blur-xl rounded-3xl p-8 border transition-all duration-500 hover:shadow-2xl ${
                isDark 
                  ? 'bg-white/5 border-white/10 text-white' 
                  : 'bg-white/20 border-white/30 text-gray-800'
              }`}>
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-50 blur-xl"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-bold">5-Day Forecast</h3>
                  </div>
                  <Forecast
                    forecast={weather.forecast}
                    unit={unit}
                    isDark={isDark}
                  />
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className={`p-8 text-center ${isDark ? 'text-white' : 'text-gray-800'}`}>
          <div className={`inline-flex items-center space-x-3 px-8 py-4 rounded-2xl backdrop-blur-xl border transition-all duration-300 hover:scale-105 ${
            isDark ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white/20 border-white/30 hover:bg-white/30'
          }`}>
            <span className="text-sm font-medium">Made with</span>
            <span className="text-red-500 animate-pulse text-lg">❤️</span>
            <span className="text-sm font-medium">by Kris</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default WeatherDashboard;
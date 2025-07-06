import React from 'react';
import { ForecastDay } from '../types/weather';
import { formatDate, formatTemperature, getWeatherIcon } from '../utils/weather';

interface ForecastProps {
  forecast: ForecastDay[];
  unit: 'C' | 'F';
  isDark: boolean;
}

const Forecast: React.FC<ForecastProps> = ({ forecast, unit, isDark }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      {forecast.map((day, index) => (
        <div
          key={index}
          className={`relative p-6 rounded-2xl text-center transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group ${
            isDark 
              ? 'bg-white/5 hover:bg-white/10 border border-white/10' 
              : 'bg-white/20 hover:bg-white/30 border border-white/30'
          }`}
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
          
          <div className="relative z-10">
            <div className="text-sm font-semibold mb-4 opacity-80">
              {formatDate(day.date)}
            </div>
            
            <div className="mb-6 relative">
              <img
                src={getWeatherIcon(day.weather.icon)}
                alt={day.weather.description}
                className="w-16 h-16 mx-auto drop-shadow-lg animate-float"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full blur-lg animate-pulse opacity-50"></div>
            </div>
            
            <div className="text-xs opacity-70 mb-4 capitalize font-medium">
              {day.weather.description}
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {formatTemperature(day.temp.max, unit)}
              </div>
              <div className="text-sm opacity-60">
                {formatTemperature(day.temp.min, unit)}
              </div>
            </div>
            
            <div className="pt-4 border-t border-current/10">
              <div className="flex justify-between text-xs opacity-60">
                <span className="flex items-center space-x-1">
                  <span>💧</span>
                  <span>{day.humidity}%</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span>💨</span>
                  <span>{Math.round(day.wind_speed)}m/s</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Forecast;
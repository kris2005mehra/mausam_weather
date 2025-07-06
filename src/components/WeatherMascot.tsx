import React from 'react';
import { getMascotExpression } from '../utils/weather';

interface WeatherMascotProps {
  weatherMain: string;
  temperature: number;
  isDark: boolean;
}

const WeatherMascot: React.FC<WeatherMascotProps> = ({ weatherMain, temperature, isDark }) => {
  const getMascotAnimation = () => {
    switch (weatherMain.toLowerCase()) {
      case 'clear':
        return 'animate-bounce';
      case 'rain':
      case 'drizzle':
        return 'animate-pulse';
      case 'snow':
        return 'animate-bounce';
      case 'thunderstorm':
        return 'animate-pulse';
      default:
        return 'animate-pulse';
    }
  };

  const getMascotMessage = () => {
    if (temperature > 30) return "It's scorching hot! Stay hydrated! 🔥";
    if (temperature > 25) return "Perfect weather for outdoor activities! 😊";
    if (temperature > 20) return "Nice and comfortable! 🌤️";
    if (temperature > 15) return "A bit cool, perfect for a walk! 🚶‍♂️";
    if (temperature > 10) return "Getting chilly, grab a jacket! 🧥";
    if (temperature > 0) return "Bundle up, it's cold! 🧤";
    return "Freezing! Stay warm inside! ❄️";
  };

  const getMascotColor = () => {
    if (temperature > 30) return 'from-red-400 to-orange-400';
    if (temperature > 20) return 'from-yellow-400 to-orange-400';
    if (temperature > 10) return 'from-green-400 to-blue-400';
    return 'from-blue-400 to-purple-400';
  };

  return (
    <div className={`relative p-8 rounded-3xl backdrop-blur-xl border transition-all duration-500 hover:scale-105 ${
      isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-white/20 border-white/30 text-gray-800'
    }`}>
      {/* Animated background glow */}
      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${getMascotColor()} opacity-20 animate-pulse`}></div>
      
      <div className="relative z-10 flex flex-col items-center space-y-4">
        <div className={`text-8xl ${getMascotAnimation()} filter drop-shadow-lg`}>
          {getMascotExpression(weatherMain)}
        </div>
        
        <div className="text-center max-w-xs">
          <div className="text-lg font-bold mb-2">
            Weather Buddy
          </div>
          <div className="text-sm font-medium leading-relaxed opacity-90">
            {getMascotMessage()}
          </div>
        </div>
        
        {/* Temperature indicator */}
        <div className={`px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r ${getMascotColor()} text-white`}>
          {temperature > 25 ? '🌡️ Hot' : temperature > 15 ? '🌡️ Mild' : temperature > 5 ? '🌡️ Cool' : '🌡️ Cold'}
        </div>
      </div>
    </div>
  );
};

export default WeatherMascot;
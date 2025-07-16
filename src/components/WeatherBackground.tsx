import React from 'react';
import { WeatherCondition } from '../types/weather';

interface WeatherBackgroundProps {
  condition: WeatherCondition;
  isDark: boolean;
}

const WeatherBackground: React.FC<WeatherBackgroundProps> = ({ condition, isDark }) => {
  const getBackgroundStyle = () => {
    const baseClass = 'fixed inset-0 transition-all duration-1000 ease-in-out overflow-hidden';
    
    if (isDark) {
      switch (condition.type) {
        case 'clear':
          return `${baseClass} bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900`;
        case 'hot':
          return `${baseClass} bg-gradient-to-br from-orange-900 via-red-900 to-pink-900`;
        case 'windy':
          return `${baseClass} bg-gradient-to-br from-teal-900 via-cyan-900 to-blue-900`;
        case 'rain':
          return `${baseClass} bg-gradient-to-br from-gray-900 via-blue-900 to-slate-900`;
        case 'snow':
          return `${baseClass} bg-gradient-to-br from-blue-900 via-slate-800 to-gray-900`;
        case 'thunderstorm':
          return `${baseClass} bg-gradient-to-br from-purple-900 via-gray-900 to-black`;
        case 'fog':
          return `${baseClass} bg-gradient-to-br from-gray-800 via-slate-700 to-gray-900`;
        case 'night':
          return `${baseClass} bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900`;
        default:
          return `${baseClass} bg-gradient-to-br from-slate-800 via-gray-800 to-slate-900`;
      }
    } else {
      switch (condition.type) {
        case 'clear':
          return `${baseClass} bg-gradient-to-br from-yellow-300 via-orange-400 to-pink-400`;
        case 'hot':
          return `${baseClass} bg-gradient-to-br from-red-400 via-orange-500 to-yellow-400`;
        case 'windy':
          return `${baseClass} bg-gradient-to-br from-cyan-300 via-teal-400 to-blue-500`;
        case 'rain':
          return `${baseClass} bg-gradient-to-br from-gray-500 via-blue-400 to-slate-600`;
        case 'snow':
          return `${baseClass} bg-gradient-to-br from-blue-200 via-white to-gray-300`;
        case 'thunderstorm':
          return `${baseClass} bg-gradient-to-br from-purple-600 via-gray-700 to-slate-800`;
        case 'fog':
          return `${baseClass} bg-gradient-to-br from-gray-300 via-slate-400 to-gray-500`;
        case 'night':
          return `${baseClass} bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500`;
        default:
          return `${baseClass} bg-gradient-to-br from-blue-300 via-gray-400 to-slate-500`;
      }
    }
  };

  const renderHotAnimation = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Intense Sun */}
      <div className="absolute top-16 right-16 w-40 h-40 rounded-full bg-gradient-to-br from-yellow-200 to-red-500 animate-pulse shadow-2xl">
        <div className="absolute inset-0 rounded-full bg-yellow-100 animate-ping opacity-40"></div>
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-yellow-100 to-orange-400 animate-spin-slow"></div>
      </div>
      
      {/* Intense Sun Rays */}
      {[...Array(16)].map((_, i) => (
        <div
          key={i}
          className="absolute top-20 right-20 w-2 h-32 bg-gradient-to-t from-yellow-400 via-orange-400 to-transparent origin-bottom animate-pulse"
          style={{
            transform: `rotate(${i * 22.5}deg) translateY(-80px)`,
            animationDelay: `${i * 0.05}s`,
          }}
        />
      ))}
      
      {/* Heat Waves */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-orange-300/30 to-transparent animate-pulse"
          style={{
            left: `${i * 12.5}%`,
            animationDelay: `${i * 0.2}s`,
            animationDuration: '2s',
          }}
        />
      ))}
      
      {/* Floating Heat Particles */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute w-3 h-3 bg-orange-300 rounded-full opacity-60 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );

  const renderWindyAnimation = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Wind Lines */}
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute h-0.5 bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-60"
          style={{
            left: '-100px',
            top: `${Math.random() * 100}%`,
            width: `${100 + Math.random() * 200}px`,
            animationName: 'windFlow',
            animationDuration: `${0.5 + Math.random() * 1}s`,
            animationDelay: `${Math.random() * 2}s`,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear',
          }}
        />
      ))}
      
      {/* Swaying Trees/Grass Effect */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute bottom-0 w-1 bg-gradient-to-t from-green-600 to-green-400 origin-bottom"
          style={{
            left: `${Math.random() * 100}%`,
            height: `${20 + Math.random() * 40}px`,
            animationName: 'sway',
            animationDuration: `${0.5 + Math.random() * 1}s`,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in-out',
            animationDirection: 'alternate',
          }}
        />
      ))}
      
      {/* Flying Leaves */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute text-green-600 opacity-70"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${12 + Math.random() * 8}px`,
            animationName: 'flyingLeaves',
            animationDuration: `${2 + Math.random() * 3}s`,
            animationDelay: `${Math.random() * 2}s`,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in-out',
          }}
        >
          🍃
        </div>
      ))}
    </div>
  );
  const renderSunAnimation = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated Sun */}
      <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 animate-pulse shadow-2xl">
        <div className="absolute inset-0 rounded-full bg-yellow-200 animate-ping opacity-30"></div>
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-yellow-200 to-orange-300 animate-spin-slow"></div>
      </div>
      
      {/* Sun Rays */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute top-24 right-24 w-1 h-20 bg-gradient-to-t from-yellow-300 to-transparent origin-bottom animate-pulse"
          style={{
            transform: `rotate(${i * 30}deg) translateY(-60px)`,
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
      
      {/* Floating Light Particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-yellow-200 rounded-full opacity-60 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );

  const renderRainAnimation = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Rain Drops */}
      {[...Array(200)].map((_, i) => (
        <div
          key={i}
          className="absolute w-0.5 bg-gradient-to-b from-blue-200 via-blue-300 to-transparent opacity-70 animate-rain"
          style={{
            left: `${Math.random() * 100}%`,
            height: `${20 + Math.random() * 40}px`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${0.5 + Math.random() * 1}s`,
          }}
        />
      ))}
      
      {/* Rain Clouds */}
      <div className="absolute top-10 left-20 w-40 h-20 bg-gray-600 rounded-full opacity-60 animate-float">
        <div className="absolute -top-4 left-8 w-24 h-16 bg-gray-500 rounded-full"></div>
        <div className="absolute -top-2 right-8 w-20 h-14 bg-gray-700 rounded-full"></div>
      </div>
      
      {/* Lightning Effect */}
      <div className="absolute inset-0 bg-blue-200 opacity-0 animate-lightning"></div>
    </div>
  );

  const renderSnowAnimation = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Snowflakes */}
      {[...Array(150)].map((_, i) => (
        <div
          key={i}
          className="absolute text-white opacity-80 animate-snow"
          style={{
            left: `${Math.random() * 100}%`,
            fontSize: `${8 + Math.random() * 16}px`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        >
          ❄
        </div>
      ))}
      
      {/* Snow Ground Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/30 to-transparent"></div>
    </div>
  );

  const renderThunderstormAnimation = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Lightning Bolts */}
      <div className="absolute inset-0 bg-yellow-200 opacity-0 animate-lightning"></div>
      <div className="absolute top-20 left-1/4 w-1 h-40 bg-yellow-300 opacity-0 animate-lightning-bolt"></div>
      <div className="absolute top-32 right-1/3 w-1 h-32 bg-yellow-300 opacity-0 animate-lightning-bolt" style={{ animationDelay: '1s' }}></div>
      
      {/* Heavy Rain */}
      {[...Array(100)].map((_, i) => (
        <div
          key={i}
          className="absolute w-0.5 bg-gradient-to-b from-blue-300 to-transparent opacity-80 animate-heavy-rain"
          style={{
            left: `${Math.random() * 100}%`,
            height: `${15 + Math.random() * 25}px`,
            animationDelay: `${Math.random() * 1.5}s`,
            animationDuration: `${0.3 + Math.random() * 0.7}s`,
          }}
        />
      ))}
      
      {/* Storm Clouds */}
      <div className="absolute top-5 left-10 w-60 h-30 bg-gray-800 rounded-full opacity-80 animate-pulse">
        <div className="absolute -top-6 left-12 w-32 h-20 bg-gray-700 rounded-full"></div>
        <div className="absolute -top-4 right-12 w-28 h-18 bg-gray-900 rounded-full"></div>
      </div>
    </div>
  );

  const renderFogAnimation = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Fog Layers */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-300/40 to-transparent animate-pulse"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-gray-200/30 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute inset-0 bg-gradient-to-r from-gray-400/20 to-transparent animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      {/* Floating Fog Particles */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute w-8 h-8 bg-gray-300 rounded-full opacity-20 animate-float-slow"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );

  const renderNightAnimation = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Stars */}
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-yellow-200 rounded-full opacity-80 animate-twinkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 60}%`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
      
      {/* Moon */}
      <div className="absolute top-16 right-16 w-24 h-24 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-200 shadow-2xl animate-pulse">
        <div className="absolute inset-2 rounded-full bg-yellow-50 opacity-50"></div>
      </div>
      
      {/* Shooting Stars */}
      <div className="absolute top-20 left-1/4 w-20 h-0.5 bg-gradient-to-r from-yellow-200 to-transparent animate-shooting-star"></div>
    </div>
  );

  const renderCloudsAnimation = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated Clouds */}
      <div className="absolute top-20 left-10 w-48 h-24 bg-white/30 rounded-full animate-float-slow">
        <div className="absolute -top-4 left-8 w-32 h-20 bg-white/25 rounded-full"></div>
        <div className="absolute -top-2 right-8 w-28 h-18 bg-white/35 rounded-full"></div>
      </div>
      
      <div className="absolute top-40 right-20 w-40 h-20 bg-white/25 rounded-full animate-float-slow" style={{ animationDelay: '2s' }}>
        <div className="absolute -top-3 left-6 w-24 h-16 bg-white/20 rounded-full"></div>
      </div>
      
      <div className="absolute top-60 left-1/3 w-36 h-18 bg-white/20 rounded-full animate-float-slow" style={{ animationDelay: '4s' }}></div>
    </div>
  );

  const renderWeatherEffect = () => {
    switch (condition.type) {
      case 'clear':
        return renderSunAnimation();
      case 'hot':
        return renderHotAnimation();
      case 'windy':
        return renderWindyAnimation();
      case 'rain':
        return renderRainAnimation();
      case 'snow':
        return renderSnowAnimation();
      case 'thunderstorm':
        return renderThunderstormAnimation();
      case 'fog':
        return renderFogAnimation();
      case 'night':
        return renderNightAnimation();
      case 'clouds':
        return renderCloudsAnimation();
      default:
        return renderSunAnimation();
    }
  };

  return (
    <div className={getBackgroundStyle()}>
      {renderWeatherEffect()}
      
      {/* Ambient Glow Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20"></div>
    </div>
  );
};

export default WeatherBackground;
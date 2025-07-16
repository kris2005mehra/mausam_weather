import { WeatherCondition } from '../types/weather';

export const getWeatherCondition = (weatherCode: number, temperature: number, windSpeed: number, isDay: boolean): WeatherCondition => {
  // If it's night time, show night background
  if (!isDay) {
    return { type: 'night', intensity: 'light' };
  }
  
  // Check for high wind conditions first (windy background)
  if (windSpeed > 10) { // Wind speed > 10 m/s is quite windy
    return { type: 'windy', intensity: 'moderate' };
  }
  
  // Check for hot weather (sunny/hot background)
  if (temperature > 28) { // Hot weather > 28°C
    return { type: 'hot', intensity: 'heavy' };
  }
  
  // Map WMO weather codes to conditions
  if (weatherCode === 0) {
    return { type: 'clear', intensity: 'light' };
  }
  if (weatherCode >= 1 && weatherCode <= 3) {
    return { type: 'clouds', intensity: 'light' };
  }
  if (weatherCode >= 45 && weatherCode <= 48) {
    return { type: 'fog', intensity: 'moderate' };
  }
  if (weatherCode >= 51 && weatherCode <= 67) {
    return { type: 'rain', intensity: 'moderate' };
  }
  if (weatherCode >= 71 && weatherCode <= 86) {
    return { type: 'snow', intensity: 'moderate' };
  }
  if (weatherCode >= 95 && weatherCode <= 99) {
    return { type: 'thunderstorm', intensity: 'heavy' };
  }
  
  // Default to clear if unknown
  return { type: 'clear', intensity: 'light' };
};

export const formatTemperature = (temp: number, unit: 'C' | 'F'): string => {
  if (unit === 'F') {
    return `${Math.round((temp * 9/5) + 32)}°F`;
  }
  return `${Math.round(temp)}°C`;
};

export const getWeatherIcon = (iconCode: string): string => {
  // WeatherAPI.com provides full URLs, but we'll use a mapping for consistency
  const iconMap: { [key: string]: string } = {
    '113': '01d', // Sunny/Clear
    '116': '02d', // Partly cloudy
    '119': '03d', // Cloudy
    '122': '04d', // Overcast
    '143': '50d', // Mist
    '176': '09d', // Patchy rain possible
    '179': '13d', // Patchy snow possible
    '182': '13d', // Patchy sleet possible
    '185': '09d', // Patchy freezing drizzle possible
    '200': '11d', // Thundery outbreaks possible
    '227': '13d', // Blowing snow
    '230': '13d', // Blizzard
    '248': '50d', // Fog
    '260': '50d', // Freezing fog
    '263': '09d', // Patchy light drizzle
    '266': '09d', // Light drizzle
    '281': '09d', // Freezing drizzle
    '284': '09d', // Heavy freezing drizzle
    '293': '09d', // Patchy light rain
    '296': '09d', // Light rain
    '299': '09d', // Moderate rain at times
    '302': '10d', // Moderate rain
    '305': '10d', // Heavy rain at times
    '308': '10d', // Heavy rain
    '311': '09d', // Light freezing rain
    '314': '09d', // Moderate or heavy freezing rain
    '317': '09d', // Light sleet
    '320': '09d', // Moderate or heavy sleet
    '323': '13d', // Patchy light snow
    '326': '13d', // Light snow
    '329': '13d', // Patchy moderate snow
    '332': '13d', // Moderate snow
    '335': '13d', // Patchy heavy snow
    '338': '13d', // Heavy snow
    '350': '13d', // Ice pellets
    '353': '09d', // Light rain shower
    '356': '09d', // Moderate or heavy rain shower
    '359': '10d', // Torrential rain shower
    '362': '13d', // Light sleet showers
    '365': '13d', // Moderate or heavy sleet showers
    '368': '13d', // Light snow showers
    '371': '13d', // Moderate or heavy snow showers
    '374': '13d', // Light showers of ice pellets
    '377': '13d', // Moderate or heavy showers of ice pellets
    '386': '11d', // Patchy light rain with thunder
    '389': '11d', // Moderate or heavy rain with thunder
    '392': '11d', // Patchy light snow with thunder
    '395': '11d', // Moderate or heavy snow with thunder
  };

  // Extract numeric code from icon string if it exists
  const numericCode = iconCode.replace(/[^0-9]/g, '');
  return `https://openweathermap.org/img/wn/${iconMap[numericCode] || '01d'}@2x.png`;
};

export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  });
};

export const getMascotExpression = (weatherMain: string): string => {
  const mainLower = weatherMain.toLowerCase();
  
  if (mainLower.includes('clear') || mainLower.includes('sunny')) {
    return '😊';
  }
  if (mainLower.includes('rain') || mainLower.includes('drizzle') || mainLower.includes('shower')) {
    return '🌂';
  }
  if (mainLower.includes('snow') || mainLower.includes('blizzard') || mainLower.includes('sleet')) {
    return '❄️';
  }
  if (mainLower.includes('thunder') || mainLower.includes('storm')) {
    return '⛈️';
  }
  if (mainLower.includes('mist') || mainLower.includes('fog') || mainLower.includes('haze')) {
    return '🌫️';
  }
  if (mainLower.includes('cloud') || mainLower.includes('overcast')) {
    return '☁️';
  }
  
  return '🌤️';
};
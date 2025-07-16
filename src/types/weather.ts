export interface WeatherData {
  location: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  };
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    visibility: number;
    uv_index: number;
    wind_speed: number;
    wind_deg: number;
    weather: {
      main: string;
      description: string;
      icon: string;
    };
  };
  forecast: ForecastDay[];
  alerts?: WeatherAlert[];
}

export interface ForecastDay {
  date: string;
  temp: {
    min: number;
    max: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  };
  humidity: number;
  wind_speed: number;
}

export interface WeatherAlert {
  headline: string;
  description: string;
  severity: string;
  urgency: string;
  areas: string;
  category: string;
  certainty: string;
  event: string;
  note: string;
  effective: string;
  expires: string;
  desc: string;
  instruction: string;
}

export interface WeatherCondition {
  type: 'clear' | 'rain' | 'snow' | 'thunderstorm' | 'clouds' | 'fog' | 'night' | 'windy' | 'hot';
  intensity: 'light' | 'moderate' | 'heavy';
}

export interface GeoLocation {
  lat: number;
  lon: number;
  city?: string;
  country?: string;
}
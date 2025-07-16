# 🌤️ Mausam - Beautiful Weather Experience

A stunning, production-ready weather application with immersive animated backgrounds that change based on real-time weather conditions. Built with React, TypeScript, and Tailwind CSS.

## 🌟 Features

### 🎨 Dynamic Animated Backgrounds
- **☀️ Sunny Weather**: Animated sun with rotating rays and floating light particles
- **🌧️ Rainy Weather**: Realistic rain drops with storm clouds and lightning effects
- **❄️ Snowy Weather**: Beautiful snowflakes falling with ground accumulation
- **⛈️ Thunderstorms**: Lightning bolts with heavy rain and storm clouds
- **🌫️ Foggy Weather**: Layered fog effects with floating particles
- **🌙 Night Time**: Twinkling stars, moon, and shooting stars
- **☁️ Cloudy Weather**: Floating animated clouds
- **🔥 Hot Weather**: Intense sun with heat waves and orange gradients
- **💨 Windy Weather**: Wind lines, swaying trees, and flying leaves

### ✨ Premium UI/UX
- **Glass Morphism**: Beautiful frosted glass effects with backdrop blur
- **Glow Effects**: Animated glow effects on hover and focus
- **Smooth Animations**: 60fps animations with 500ms transitions
- **Gradient Text**: Stunning gradient text effects
- **Micro-interactions**: Thoughtful hover states and animations
- **Responsive Design**: Perfect on all devices from mobile to desktop

### 🌍 Weather Features
- **Real-time Weather Data**: Powered by WeatherAPI.com
- **5-Day Forecast**: Detailed weather predictions
- **Current Conditions**: Temperature, humidity, wind speed, pressure, UV index
- **Location Search**: Search any city worldwide
- **Geolocation**: Automatic location detection
- **Weather Alerts**: Important weather warnings and notifications
- **Unit Toggle**: Switch between Celsius and Fahrenheit
- **Weather Mascot**: Interactive weather buddy with contextual messages

### 🎯 Technical Features
- **TypeScript**: Full type safety and IntelliSense
- **React Hooks**: Modern React patterns with custom hooks
- **Responsive Grid**: CSS Grid and Flexbox layouts
- **Error Handling**: Graceful error states with retry functionality
- **Loading States**: Beautiful animated loading indicators
- **Theme Toggle**: Dark/Light mode with system preference detection
- **Performance Optimized**: Lazy loading and optimized animations
## 📸 ScreenShots
<img width="1460" height="824" alt="Screenshot 2025-07-16 at 3 49 52 PM" src="https://github.com/user-attachments/assets/1070e8f5-6571-4a1e-9948-f000dbb5545d" />
<img width="1460" height="824" alt="Screenshot 2025-07-16 at 3 50 13 PM" src="https://github.com/user-attachments/assets/04f70ddd-2fb9-43ae-a2b4-d680e86c3fce" />
<img width="1460" height="824" alt="Screenshot 2025-07-16 at 3 50 34 PM" src="https://github.com/user-attachments/assets/2bb8381e-503b-4c29-8c6e-63eb6340a493" />

## 🚀 Live Demo

**🌐 Live Site**: [https://shiny-frangipane-a7e6f0.netlify.app](https://shiny-frangipane-a7e6f0.netlify.app)

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- WeatherAPI.com API key

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/mausam-weather-app.git
cd mausam-weather-app
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Get API Key
1. Visit [WeatherAPI.com](https://www.weatherapi.com/)
2. Sign up for a free account
3. Get your API key from the dashboard

### 4. Configure Environment
Create a `.env` file in the root directory:
```env
VITE_WEATHER_API_KEY=your_api_key_here
```

### 5. Start Development Server
```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:5173` to see the app in action!

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── WeatherDashboard.tsx    # Main dashboard component
│   ├── WeatherBackground.tsx   # Animated backgrounds
│   ├── Search.tsx             # Search functionality
│   ├── Forecast.tsx           # 5-day forecast
│   ├── WeatherMascot.tsx      # Weather buddy
│   ├── WeatherAlerts.tsx      # Weather warnings
│   └── ThemeToggle.tsx        # Dark/light mode toggle
├── hooks/               # Custom React hooks
│   ├── useWeather.ts          # Weather data fetching
│   └── useGeolocation.ts      # Location services
├── types/               # TypeScript type definitions
│   └── weather.ts             # Weather data types
├── utils/               # Utility functions
│   └── weather.ts             # Weather helper functions
├── index.css           # Global styles and animations
└── main.tsx           # App entry point
```

## 🎨 Customization

### Adding New Weather Conditions
1. Update `WeatherCondition` type in `src/types/weather.ts`
2. Add condition logic in `src/utils/weather.ts`
3. Create animation in `src/components/WeatherBackground.tsx`
4. Add corresponding CSS animations in `src/index.css`

### Styling
The app uses Tailwind CSS with custom animations. Key files:
- `src/index.css` - Custom animations and utilities
- `tailwind.config.js` - Tailwind configuration
- Component files - Tailwind classes for styling

### API Integration
Weather data is fetched using:
- **Primary**: WeatherAPI.com for current weather and forecasts
- **Backup**: Can be easily switched to OpenWeatherMap or other providers

## 🌐 Deployment

### Netlify (Recommended)
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Set environment variables in Netlify dashboard

### Vercel
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables

### Manual Deployment
```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 Weather Conditions Supported

| Condition | Background Animation | Triggers |
|-----------|---------------------|----------|
| ☀️ Clear/Sunny | Animated sun with rays | Clear skies, low clouds |
| 🔥 Hot Weather | Intense sun with heat waves | Temperature > 28°C |
| 💨 Windy | Wind lines and swaying trees | Wind speed > 10 m/s |
| 🌧️ Rain | Rain drops with clouds | Light to heavy rain |
| ⛈️ Thunderstorm | Lightning and heavy rain | Thunderstorms |
| ❄️ Snow | Falling snowflakes | Snow conditions |
| 🌫️ Fog | Layered fog effects | Mist and fog |
| ☁️ Cloudy | Floating clouds | Overcast conditions |
| 🌙 Night | Stars and moon | Nighttime hours |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## ⭐ Star this repository if you found it helpful!

[Live Demo](https://shiny-frangipane-a7e6f0.netlify.app) • [Report Bug](https://github.com/yourusername/mausam-weather-app/issues) • [Request Feature](https://github.com/yourusername/mausam-weather-app/issues)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<div align="center">
  
Made with ❤️ by **Kris**

</div>

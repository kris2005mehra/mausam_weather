import React from 'react';
import { AlertTriangle, Info, X } from 'lucide-react';
import { WeatherAlert } from '../types/weather';

interface WeatherAlertsProps {
  alerts: WeatherAlert[];
  isDark: boolean;
  onDismiss: (index: number) => void;
}

const WeatherAlerts: React.FC<WeatherAlertsProps> = ({ alerts, isDark, onDismiss }) => {
  if (!alerts || alerts.length === 0) return null;

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'severe':
      case 'extreme':
        return 'from-red-500 to-red-600';
      case 'moderate':
        return 'from-orange-500 to-orange-600';
      case 'minor':
        return 'from-yellow-500 to-yellow-600';
      default:
        return 'from-blue-500 to-blue-600';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'severe':
      case 'extreme':
        return <AlertTriangle className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-4 mb-8">
      {alerts.map((alert, index) => (
        <div
          key={index}
          className={`relative backdrop-blur-xl rounded-2xl p-6 border transition-all duration-300 ${
            isDark 
              ? 'bg-white/5 border-white/10 text-white' 
              : 'bg-white/20 border-white/30 text-gray-800'
          }`}
        >
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${getSeverityColor(alert.severity)} opacity-10`}></div>
          
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full bg-gradient-to-r ${getSeverityColor(alert.severity)} text-white`}>
                  {getSeverityIcon(alert.severity)}
                </div>
                <div>
                  <h3 className="text-lg font-bold">{alert.headline}</h3>
                  <p className="text-sm opacity-70 capitalize">
                    {alert.severity} • {alert.urgency} • {alert.certainty}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onDismiss(index)}
                className={`p-2 rounded-full transition-colors ${
                  isDark ? 'hover:bg-white/10' : 'hover:bg-black/10'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-3">
              <p className="text-sm leading-relaxed">{alert.desc}</p>
              {alert.instruction && (
                <div className={`p-4 rounded-xl ${
                  isDark ? 'bg-white/5' : 'bg-black/5'
                }`}>
                  <p className="text-sm font-medium mb-1">Instructions:</p>
                  <p className="text-sm">{alert.instruction}</p>
                </div>
              )}
              <div className="flex flex-wrap gap-4 text-xs opacity-70">
                <span>Effective: {new Date(alert.effective).toLocaleString()}</span>
                <span>Expires: {new Date(alert.expires).toLocaleString()}</span>
                {alert.areas && <span>Areas: {alert.areas}</span>}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeatherAlerts;
import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`relative p-4 rounded-2xl backdrop-blur-xl border transition-all duration-500 transform hover:scale-110 hover:shadow-2xl group ${
        isDark 
          ? 'bg-white/10 hover:bg-white/20 text-yellow-300 border-white/20' 
          : 'bg-black/10 hover:bg-black/20 text-orange-500 border-black/20'
      }`}
      aria-label="Toggle theme"
    >
      {/* Glow effect */}
      <div className={`absolute inset-0 rounded-2xl transition-all duration-500 opacity-0 group-hover:opacity-100 blur-xl ${
        isDark 
          ? 'bg-yellow-300/30' 
          : 'bg-orange-500/30'
      }`}></div>
      
      <div className="relative w-7 h-7">
        <Sun className={`absolute inset-0 w-7 h-7 transition-all duration-500 ${
          isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
        }`} />
        <Moon className={`absolute inset-0 w-7 h-7 transition-all duration-500 ${
          isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
        }`} />
      </div>
    </button>
  );
};

export default ThemeToggle;
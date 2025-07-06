import React, { useState } from 'react';
import { Search as SearchIcon, MapPin, Loader } from 'lucide-react';

interface SearchProps {
  onSearch: (city: string) => void;
  onLocationClick: () => void;
  loading: boolean;
  isDark: boolean;
}

const Search: React.FC<SearchProps> = ({ onSearch, onLocationClick, loading, isDark }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery('');
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative group">
        <div className={`relative rounded-3xl backdrop-blur-xl border transition-all duration-500 hover:shadow-2xl ${
          isFocused 
            ? (isDark ? 'bg-white/15 border-white/30 shadow-2xl shadow-white/10' : 'bg-white/40 border-white/50 shadow-2xl shadow-black/10')
            : (isDark ? 'bg-white/5 border-white/10' : 'bg-white/20 border-white/30')
        }`}>
          {/* Glow Effect */}
          <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}></div>
          
          <div className="relative z-10 flex items-center">
            <div className="pl-8 pr-6">
              {loading ? (
                <div className="relative">
                  <Loader className="w-6 h-6 text-blue-400 animate-spin" />
                  <div className="absolute inset-0 w-6 h-6 bg-blue-400/20 rounded-full animate-ping"></div>
                </div>
              ) : (
                <SearchIcon className={`w-6 h-6 transition-colors duration-300 ${
                  isFocused ? 'text-blue-400' : 'text-gray-400'
                }`} />
              )}
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search for any city..."
              className={`flex-1 py-6 bg-transparent outline-none text-xl placeholder:text-gray-400 transition-all duration-300 ${
                isDark ? 'text-white' : 'text-gray-800'
              } ${isFocused ? 'placeholder:text-blue-400/70' : ''}`}
              disabled={loading}
            />
            <button
              type="button"
              onClick={onLocationClick}
              disabled={loading}
              className={`mr-6 p-4 rounded-2xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg ${
                isDark 
                  ? 'hover:bg-white/20 text-white hover:text-blue-300' 
                  : 'hover:bg-black/20 text-gray-600 hover:text-blue-600'
              }`}
              title="Use current location"
            >
              <MapPin className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* Search suggestions */}
        <div className={`absolute top-full left-0 right-0 mt-4 opacity-0 group-focus-within:opacity-100 transition-all duration-500 transform translate-y-2 group-focus-within:translate-y-0`}>
          <div className={`backdrop-blur-xl rounded-2xl border p-6 ${
            isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-white/20 border-white/30 text-gray-800'
          }`}>
            <p className="text-sm opacity-70 flex items-center space-x-2">
              <span className="text-lg">💡</span>
              <span>Try searching for cities like "New York", "London", "Tokyo", or "Mumbai"</span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Search;
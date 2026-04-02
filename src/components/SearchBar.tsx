'use client';

import { Search } from 'lucide-react';
import { useState, FormEvent } from 'react';

interface SearchBarProps {
  onSearch: (keyword: string) => void;
}

const SUGGESTIONS = ['AI', '金利', '為替', '戦争', '原油', '銀行', '半導体', 'ドル'];

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(value.trim());
  };

  const handleSuggestion = (kw: string) => {
    setValue(kw);
    onSearch(kw);
  };

  const handleClear = () => {
    setValue('');
    onSearch('');
  };

  return (
    <div className="space-y-2">
      <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
          />
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="キーワードで検索 (例: AI, 金利, 為替)..."
            className="
              w-full bg-gray-900 border border-gray-700 rounded
              pl-8 pr-3 py-2 text-xs text-white placeholder-gray-600
              focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50
              transition-colors
            "
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-2 rounded transition-colors whitespace-nowrap"
        >
          検索
        </button>
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="text-gray-500 hover:text-white text-xs px-2 py-2 rounded transition-colors"
          >
            クリア
          </button>
        )}
      </form>

      {/* Quick suggestions */}
      <div className="flex flex-wrap gap-1.5">
        {SUGGESTIONS.map((kw) => (
          <button
            key={kw}
            type="button"
            onClick={() => handleSuggestion(kw)}
            className="
              text-[10px] bg-gray-800 border border-gray-700 text-gray-400
              hover:bg-gray-700 hover:text-white hover:border-gray-600
              px-2 py-0.5 rounded transition-colors
            "
          >
            {kw}
          </button>
        ))}
      </div>
    </div>
  );
}

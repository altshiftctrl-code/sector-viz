'use client';

import { WorldEvent } from '@/data/mockData';

interface MarketCardProps {
  event: WorldEvent;
}

const impactConfig = {
  positive: {
    badge: 'bg-green-500/20 text-green-400 border border-green-500/40',
    label: '▲ ポジティブ',
    glow: 'hover:border-green-500/50',
  },
  negative: {
    badge: 'bg-red-500/20 text-red-400 border border-red-500/40',
    label: '▼ ネガティブ',
    glow: 'hover:border-red-500/50',
  },
  neutral: {
    badge: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40',
    label: '◆ ニュートラル',
    glow: 'hover:border-yellow-500/50',
  },
};

export default function MarketCard({ event }: MarketCardProps) {
  const cfg = impactConfig[event.impact];

  return (
    <div
      className={`
        bg-gray-900 border border-gray-700 rounded-lg p-4
        transition-all duration-200 cursor-pointer
        hover:bg-gray-800 ${cfg.glow} hover:shadow-lg hover:shadow-black/40
        flex flex-col gap-3
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-white leading-snug flex-1">
          {event.title}
        </h3>
        <span
          className={`text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 ${cfg.badge}`}
        >
          {cfg.label}
        </span>
      </div>

      {/* Description */}
      <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
        {event.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between gap-2 mt-auto">
        {/* Region badge */}
        <span className="text-[10px] bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded">
          {event.region}
        </span>

        {/* Related sectors */}
        <div className="flex flex-wrap justify-end gap-1">
          {event.relatedSectors.slice(0, 3).map((s) => (
            <span
              key={s}
              className="text-[9px] bg-gray-700 text-gray-300 px-1.5 py-0.5 rounded"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

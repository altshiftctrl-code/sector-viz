'use client';

import { X } from 'lucide-react';
import { Node } from 'reactflow';
import { nodeDetails, SectorNodeData } from '@/data/mockData';

interface SidePanelProps {
  node: Node<SectorNodeData> | null;
  onClose: () => void;
}

const typeConfig = {
  event: { label: 'EVENT', color: 'text-blue-400 bg-blue-500/20 border-blue-500/40' },
  sector: { label: 'SECTOR', color: 'text-green-400 bg-green-500/20 border-green-500/40' },
  commodity: { label: 'COMMODITY', color: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/40' },
};

const trendConfig = {
  up: { icon: '↑', color: 'text-green-400' },
  down: { icon: '↓', color: 'text-red-400' },
  neutral: { icon: '→', color: 'text-yellow-400' },
};

export default function SidePanel({ node, onClose }: SidePanelProps) {
  if (!node) {
    return (
      <div className="w-80 flex-shrink-0 bg-gray-900/50 border border-gray-800 rounded-lg p-4 flex items-center justify-center">
        <p className="text-xs text-gray-600 text-center">
          ノードをクリックして<br />詳細を表示
        </p>
      </div>
    );
  }

  const { data } = node;
  const detail = nodeDetails[node.id];
  const typeCfg = typeConfig[data.type];
  const trendCfg = trendConfig[data.trend];

  return (
    <div className="w-80 flex-shrink-0 bg-gray-900 border border-gray-700 rounded-lg flex flex-col overflow-hidden">
      {/* Panel header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-gray-950">
        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
          NODE DETAIL
        </span>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-white transition-colors p-0.5 rounded"
          aria-label="Close panel"
        >
          <X size={16} />
        </button>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Title row */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${typeCfg.color}`}
            >
              {typeCfg.label}
            </span>
            <span className={`text-sm font-bold ${trendCfg.color}`}>
              {trendCfg.icon} {data.change}
            </span>
          </div>
          <h2 className="text-base font-bold text-white">{data.label}</h2>
        </div>

        {/* Description */}
        <div>
          <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-1">
            概要
          </p>
          <p className="text-xs text-gray-300 leading-relaxed">
            {detail?.description ?? data.description}
          </p>
        </div>

        {/* Key stocks */}
        {detail?.keyStocks && detail.keyStocks.length > 0 && (
          <div>
            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-2">
              関連銘柄 / ティッカー
            </p>
            <div className="flex flex-wrap gap-1.5">
              {detail.keyStocks.map((stock) => (
                <span
                  key={stock}
                  className="text-[10px] bg-gray-800 border border-gray-700 text-gray-200 px-2 py-0.5 rounded font-mono"
                >
                  {stock}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-gray-800" />

        {/* Outlook */}
        {detail?.outlook && (
          <div>
            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-1">
              アウトルック
            </p>
            <p className="text-xs text-gray-300 leading-relaxed italic">
              {detail.outlook}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

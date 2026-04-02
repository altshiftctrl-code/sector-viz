'use client';

import { useState, useEffect, useCallback } from 'react';
import { Node } from 'reactflow';
import { worldEvents, initialNodes, initialEdges, SectorNodeData } from '@/data/mockData';
import MarketCard from '@/components/MarketCard';
import SidePanel from '@/components/SidePanel';
import SearchBar from '@/components/SearchBar';
import dynamic from 'next/dynamic';

// Dynamically import SectorGraph to avoid SSR issues with ReactFlow
const SectorGraph = dynamic(() => import('@/components/SectorGraph'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-gray-950 rounded-lg border border-gray-800">
      <span className="text-xs text-gray-600 font-mono animate-pulse">LOADING GRAPH...</span>
    </div>
  ),
});

export default function Home() {
  const [currentTime, setCurrentTime] = useState('');
  const [selectedNode, setSelectedNode] = useState<Node<SectorNodeData> | null>(null);
  const [searchKeyword, setSearchKeyword] = useState('');

  // Clock
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('ja-JP', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZone: 'Asia/Tokyo',
        }) + ' JST'
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const handleNodeSelect = useCallback((node: Node<SectorNodeData>) => {
    setSelectedNode(node);
  }, []);

  const handleSearch = useCallback((kw: string) => {
    setSearchKeyword(kw);
  }, []);

  const handleClosePanel = useCallback(() => {
    setSelectedNode(null);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-screen-2xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse [animation-delay:0.3s]" />
              <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse [animation-delay:0.6s]" />
            </div>
            <div>
              <h1 className="text-sm font-black tracking-widest text-white uppercase">
                SECTOR NEXUS
              </h1>
              <p className="text-[9px] text-gray-500 tracking-widest uppercase font-mono">
                セクター相関可視化システム
              </p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-4 text-[10px] font-mono text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                LIVE
              </span>
              <span className="text-gray-400">{currentTime}</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono">
              <span className="text-gray-600">NODES</span>
              <span className="text-blue-400 font-semibold">{initialNodes.length}</span>
              <span className="text-gray-600 ml-2">EDGES</span>
              <span className="text-blue-400 font-semibold">{initialEdges.length}</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <main className="flex-1 max-w-screen-2xl mx-auto w-full px-6 py-6 space-y-6">

        {/* ── Market news section ─────────────────────────────────────────── */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-4 bg-blue-500 rounded" />
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              注目の世界情勢
            </h2>
            <div className="flex-1 border-t border-gray-800" />
            <span className="text-[10px] font-mono text-gray-600">
              MARKET INTELLIGENCE
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {worldEvents.map((evt) => (
              <MarketCard key={evt.id} event={evt} />
            ))}
          </div>
        </section>

        {/* ── Graph section ───────────────────────────────────────────────── */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-4 bg-green-400 rounded" />
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              セクター連鎖マップ
            </h2>
            <div className="flex-1 border-t border-gray-800" />
            <div className="flex items-center gap-3 text-[10px] font-mono">
              <span className="flex items-center gap-1">
                <span className="w-2 h-0.5 bg-blue-500 inline-block" />
                <span className="text-gray-600">EVENT</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-0.5 bg-green-400 inline-block" />
                <span className="text-gray-600">SECTOR</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-0.5 bg-yellow-400 inline-block" />
                <span className="text-gray-600">COMMODITY</span>
              </span>
            </div>
          </div>

          {/* Search + graph + side panel */}
          <div className="flex gap-4">
            {/* Left: search + graph */}
            <div className="flex-1 flex flex-col gap-3 min-w-0">
              <SearchBar onSearch={handleSearch} />

              {/* Graph canvas */}
              <div style={{ height: '520px' }}>
                <SectorGraph
                  nodes={initialNodes}
                  edges={initialEdges}
                  searchKeyword={searchKeyword}
                  onNodeSelect={handleNodeSelect}
                />
              </div>
            </div>

            {/* Right: side panel */}
            <div className="flex-shrink-0" style={{ width: '320px' }}>
              <SidePanel node={selectedNode} onClose={handleClosePanel} />
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-800 bg-gray-950">
        <div className="max-w-screen-2xl mx-auto px-6 py-3 flex items-center justify-between">
          <p className="text-[9px] text-gray-700 font-mono">
            SECTOR NEXUS &mdash; このデータは情報提供のみを目的としており、投資助言ではありません。
          </p>
          <p className="text-[9px] text-gray-700 font-mono">
            PROTOTYPE v0.1.0 &mdash; MOCK DATA ONLY
          </p>
        </div>
      </footer>
    </div>
  );
}

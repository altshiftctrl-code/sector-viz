'use client';

import { useCallback, useMemo } from 'react';
import ReactFlow, {
  Node,
  Edge,
  NodeTypes,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  NodeProps,
  Handle,
  Position,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { SectorNodeData, NodeType } from '@/data/mockData';

// ─── Node styling maps ────────────────────────────────────────────────────────

const borderColor: Record<NodeType, string> = {
  event: '#3b82f6',     // blue-500
  sector: '#4ade80',    // green-400
  commodity: '#facc15', // yellow-400
};

const bgColor: Record<NodeType, string> = {
  event: 'rgba(59,130,246,0.10)',
  sector: 'rgba(74,222,128,0.08)',
  commodity: 'rgba(250,204,21,0.08)',
};

const typeLabel: Record<NodeType, string> = {
  event: 'EVENT',
  sector: 'SECTOR',
  commodity: 'CMDTY',
};

const trendIcon = { up: '↑', down: '↓', neutral: '→' };
const trendColor = { up: '#4ade80', down: '#f87171', neutral: '#facc15' };

// ─── Custom node component ────────────────────────────────────────────────────

function SectorNode({ data, selected }: NodeProps<SectorNodeData>) {
  const bc = borderColor[data.type];
  const bg = bgColor[data.type];

  const borderStyle = selected
    ? `2px solid ${bc}`
    : `1px solid ${bc}66`;

  const boxShadow = selected
    ? `0 0 12px ${bc}99, 0 0 24px ${bc}44`
    : 'none';

  return (
    <div
      style={{
        background: bg,
        border: borderStyle,
        boxShadow,
        borderRadius: '8px',
        padding: '8px 12px',
        minWidth: '130px',
        maxWidth: '170px',
        backdropFilter: 'blur(4px)',
        transition: 'all 0.2s ease',
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: bc, border: 'none', width: 7, height: 7 }}
      />

      {/* Type badge */}
      <div
        style={{
          fontSize: '8px',
          fontFamily: 'monospace',
          color: bc,
          marginBottom: '4px',
          letterSpacing: '0.08em',
          opacity: 0.9,
        }}
      >
        {typeLabel[data.type]}
      </div>

      {/* Label */}
      <div
        style={{
          fontSize: '11px',
          fontWeight: 700,
          color: '#f1f5f9',
          lineHeight: 1.3,
          marginBottom: '6px',
        }}
      >
        {data.label}
      </div>

      {/* Trend + change */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '10px',
          fontFamily: 'monospace',
          color: trendColor[data.trend],
          fontWeight: 600,
        }}
      >
        <span>{trendIcon[data.trend]}</span>
        <span>{data.change}</span>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        style={{ background: bc, border: 'none', width: 7, height: 7 }}
      />
    </div>
  );
}

const nodeTypes: NodeTypes = {
  sectorNode: SectorNode,
};

// ─── Main component ───────────────────────────────────────────────────────────

interface SectorGraphProps {
  nodes: Node<SectorNodeData>[];
  edges: Edge[];
  searchKeyword: string;
  onNodeSelect: (node: Node<SectorNodeData>) => void;
}

export default function SectorGraph({
  nodes: propNodes,
  edges: propEdges,
  searchKeyword,
  onNodeSelect,
}: SectorGraphProps) {
  // Inject custom node type
  const typedNodes = useMemo(
    () =>
      propNodes.map((n) => ({
        ...n,
        type: 'sectorNode',
      })),
    [propNodes]
  );

  const [nodes, , onNodesChange] = useNodesState(typedNodes);
  const [edges, , onEdgesChange] = useEdgesState(propEdges);

  // Apply search highlight via style override
  const displayNodes = useMemo(() => {
    if (!searchKeyword) {
      return nodes.map((n) => ({ ...n, selected: false }));
    }

    const kw = searchKeyword.toLowerCase();
    return nodes.map((n) => {
      const label = n.data?.label?.toLowerCase() ?? '';
      const matches = label.includes(kw);
      return {
        ...n,
        selected: matches,
        style: matches
          ? {}
          : { opacity: 0.35, filter: 'grayscale(60%)' },
      };
    });
  }, [nodes, searchKeyword]);

  const handleNodeClick = useCallback(
    (_: React.MouseEvent, node: Node<SectorNodeData>) => {
      onNodeSelect(node);
    },
    [onNodeSelect]
  );

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#030712',
        borderRadius: '8px',
        border: '1px solid #1f2937',
        overflow: 'hidden',
      }}
    >
      <ReactFlow
        nodes={displayNodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onNodeClick={handleNodeClick}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.3}
        maxZoom={2}
        defaultEdgeOptions={{
          style: { stroke: '#4b5563', strokeWidth: 1.5 },
          animated: true,
        }}
        proOptions={{ hideAttribution: true }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#1f2937"
        />
        <Controls
          style={{
            background: '#111827',
            border: '1px solid #374151',
            borderRadius: '6px',
          }}
        />
        <MiniMap
          nodeStrokeWidth={2}
          nodeColor={(n: Node<SectorNodeData>) => {
            const t: NodeType = n.data?.type ?? 'sector';
            return borderColor[t];
          }}
          style={{
            background: '#030712',
            border: '1px solid #1f2937',
            borderRadius: '6px',
          }}
          maskColor="rgba(0,0,0,0.6)"
        />
      </ReactFlow>
    </div>
  );
}

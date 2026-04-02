import { Node, Edge } from 'reactflow';

// ─── World Events ────────────────────────────────────────────────────────────

export interface WorldEvent {
  id: string;
  title: string;
  description: string;
  impact: 'positive' | 'negative' | 'neutral';
  relatedSectors: string[];
  region: string;
}

export const worldEvents: WorldEvent[] = [
  {
    id: 'evt-1',
    title: 'ホルムズ海峡の緊張',
    description:
      'イランと米国の対立が再燃し、ホルムズ海峡の航行リスクが高まっている。原油タンカーの通過が制限される懸念が広がっている。',
    impact: 'negative',
    relatedSectors: ['エネルギー株', '海運株', '原油先物'],
    region: '中東',
  },
  {
    id: 'evt-2',
    title: '米雇用統計（予想上振れ）',
    description:
      '米国非農業部門雇用者数が予想を大幅に上回った。労働市場の強さからFRBの利上げ継続観測が強まり、ドル高・株安の展開。',
    impact: 'negative',
    relatedSectors: ['銀行株', '金融株', 'ドル/円'],
    region: '北米',
  },
  {
    id: 'evt-3',
    title: '生成AIの進化加速',
    description:
      '主要テック企業が次世代LLMを相次いでリリース。データセンター向け電力需要と半導体需要が急増しており、関連銘柄が急騰している。',
    impact: 'positive',
    relatedSectors: ['半導体', 'データセンター', 'クラウド'],
    region: 'グローバル',
  },
  {
    id: 'evt-4',
    title: '中国不動産市場の低迷',
    description:
      '中国の大手不動産デベロッパーの債務問題が長期化。鉄鋼・セメント需要の低下が続き、資源輸出国経済への波及が懸念される。',
    impact: 'negative',
    relatedSectors: ['鉄鋼', '資源株', '新興国通貨'],
    region: 'アジア',
  },
];

// ─── Node detail data ─────────────────────────────────────────────────────────

export interface NodeDetail {
  description: string;
  keyStocks: string[];
  outlook: string;
}

export const nodeDetails: Record<string, NodeDetail> = {
  'node-ai-boom': {
    description:
      '生成AIの普及・進化によって半導体・クラウドインフラへの設備投資が急増。NVIDIAを中心としたエコシステムが形成されている。',
    keyStocks: ['NVDA', 'AMD', 'TSM', 'MSFT', 'GOOGL'],
    outlook:
      '短期的には過熱感あり。中長期的には電力・冷却・通信インフラへの波及が続く見通し。',
  },
  'node-datacenter': {
    description:
      'AI推論・学習ワークロードの増大でハイパースケーラーのデータセンター建設投資が前年比40%超に達している。',
    keyStocks: ['EQIX', 'DLR', 'AMT', 'CCI'],
    outlook:
      'PUE（電力使用効率）改善と冷却技術が競争軸。液冷サーバー関連に注目。',
  },
  'node-power': {
    description:
      'データセンター増設による電力需要急増が送配電網に負荷をかけており、電力株・公益株が見直されている。',
    keyStocks: ['NEE', 'SO', 'D', 'AEP', '東京電力'],
    outlook:
      '再エネ化の遅れがボトルネック。原子力復権の議論が加速しており、SMR関連にも注目。',
  },
  'node-copper': {
    description:
      '送電線・データセンター配線・EV用バッテリーで銅の需要が構造的に増加。チリ・ペルーからの供給制約も重なる。',
    keyStocks: ['FCX', 'SCCO', 'BHP', '住友金属鉱山'],
    outlook:
      '中国不動産低迷による建設需要減少がヘッドウィンド。グリーン需要が中長期の下値を支える。',
  },
  'node-hormuz': {
    description:
      'ホルムズ海峡はGulf産油国原油輸出の約20%が通過する戦略的海峡。緊張高まりで原油先物に上昇プレッシャー。',
    keyStocks: ['原油先物(WTI)', 'Brent先物'],
    outlook: '地政学的緊張が継続する場合、WTIは$90を試す展開も想定される。',
  },
  'node-crude': {
    description:
      '原油価格はサウジの自主減産とホルムズリスクにより下値が堅い。インフレ再燃リスクへの警戒感も強まっている。',
    keyStocks: ['XOM', 'CVX', 'BP', 'Shell', 'INPEX'],
    outlook:
      '中国需要回復が鈍く上値も限定的。地政学リスクプレミアムが相場を左右。',
  },
  'node-energy': {
    description:
      '原油高恩恵でエネルギーメジャーの利益が拡大。配当利回りの高さから機関投資家の資金流入が続いている。',
    keyStocks: ['XOM', 'CVX', 'COP', 'Pioneer', 'JXTG'],
    outlook:
      'ESG圧力による設備投資抑制が長期的な供給制約を生む。配当投資として引き続き魅力あり。',
  },
  'node-shipping': {
    description:
      'タンカー運賃はスポット・タイム双方で上昇。スエズ運河迂回による航路長期化も船腹需給を引き締めている。',
    keyStocks: ['FRO', 'STNG', '日本郵船', '商船三井', '川崎汽船'],
    outlook:
      'バルチック指数との相関低下。タンカー需給は2025年まで引き締まり継続予想。',
  },
  'node-jobs': {
    description:
      '米国の非農業部門雇用者数（NFP）が市場予想を30万人上回り、労働市場の底堅さを示した。',
    keyStocks: ['USD/JPY', 'US10Y'],
    outlook: 'FRBのピボット後退観測が強まり、高金利長期化シナリオが再浮上。',
  },
  'node-rates': {
    description:
      '雇用統計上振れを受けFRBが年内追加利上げを示唆。米10年債利回りが5%を再び試す展開。',
    keyStocks: ['TBT', 'TMV', 'SHY', 'IEF'],
    outlook:
      '逆イールド解消のタイミングが景気後退の先行指標として注目されている。',
  },
  'node-banks': {
    description:
      '利ざや改善で米銀の純金利マージン（NIM）が拡大。ただし商業用不動産（CRE）エクスポージャーが懸念材料。',
    keyStocks: ['JPM', 'BAC', 'WFC', 'GS', '三菱UFJ'],
    outlook:
      'CRE損失認識が本格化する場合、地銀を中心に信用コスト増加リスクあり。',
  },
  'node-dollar': {
    description:
      '米ドルは金利優位を背景に主要通貨に対して全面高。ドル高は新興国の対外債務コストを押し上げている。',
    keyStocks: ['DXY', 'UUP', 'USD/JPY', 'EUR/USD'],
    outlook:
      '円は政策金利差から1ドル155円台へ。日銀の為替介入警戒水準が焦点。',
  },
  'node-china-re': {
    description:
      '恒大・碧桂園など大手デベロッパーが相次いでデフォルト。中国の家計資産の約70%が不動産に集中しており影響が広範。',
    keyStocks: ['中国不動産ETF', 'KWEB', 'FXI'],
    outlook:
      '政府の救済策が断片的で不十分。地方政府財政の悪化が2025年も継続見通し。',
  },
  'node-steel': {
    description:
      '中国の不動産・インフラ投資低迷で鉄鋼需要が急減。供給過剰から鉄鋼価格が下落し生産者マージンが圧迫されている。',
    keyStocks: ['宝山鋼鉄', 'POSCO', '新日鉄', 'ArcelorMittal'],
    outlook:
      '中国政府のインフラ財政刺激策が鍵。インドの需要増が中長期的な下値支持。',
  },
  'node-resources': {
    description:
      '中国需要低迷を受け鉄鉱石・石炭・LNG価格が軒並み下落。資源輸出に依存するオーストラリア・ブラジルの経済に打撃。',
    keyStocks: ['RIO', 'BHP', 'VALE', 'FMG'],
    outlook:
      '中国経済の構造転換（製造業→消費）の進捗次第。エネルギー転換向け鉱物資源は例外的な強さを維持。',
  },
  'node-em-fx': {
    description:
      'ドル高・中国経済鈍化のダブルパンチで新興国通貨が軟調。ブラジルレアル・南アフリカランド・インドネシアルピアが対ドルで下落。',
    keyStocks: ['EEM', 'VWO', 'ブラジルETF', 'インドETF'],
    outlook:
      '米利下げ開始が新興国資金流入の再開トリガー。インドは例外的な独自強さを維持。',
  },
  'node-semi': {
    description:
      'AI需要に牽引されHBM・HPC向け半導体が超好況。一方でスマホ・PC向けは在庫調整が長引いている。',
    keyStocks: ['NVDA', 'AMD', 'INTC', 'ASML', 'TSM', '東京エレクトロン'],
    outlook:
      'AI加速器の供給不足が2025年末まで継続見通し。先端ロジック向けEUV装置の台数が競争力の鍵。',
  },
  'node-cloud': {
    description:
      'AWS・Azure・GCPの生成AIサービスが急拡大。エンタープライズのAIエージェント導入が支出を押し上げている。',
    keyStocks: ['AMZN', 'MSFT', 'GOOGL', 'ORCL'],
    outlook:
      'マルチクラウド・エッジAI展開が次の成長ドライバー。コスト競争よりも差別化機能競争へ移行中。',
  },
  'node-evbattery': {
    description:
      'EV普及に伴いリチウム・コバルト・ニッケルの需要が増大。全固体電池の量産化競争も激化している。',
    keyStocks: ['ALB', 'SQM', 'LTHM', 'パナソニック', 'CATL'],
    outlook:
      'リチウム価格は供給増で一時調整。2026年以降の全固体電池量産が電池材料需要を再加速させる見込み。',
  },
  'node-green-energy': {
    description:
      '太陽光・洋上風力・グリーン水素への投資が各国補助金を追い風に拡大。IRAにより米国内の再エネ投資が急増。',
    keyStocks: ['ENPH', 'FSLR', 'SEDG', 'NEE', '三菱重工'],
    outlook:
      '中国製パネルの低価格攻勢が西側メーカーのマージンを圧迫。関税政策が競争環境を大きく左右。',
  },
};

// ─── React Flow Nodes ─────────────────────────────────────────────────────────

export type NodeType = 'event' | 'sector' | 'commodity';

export interface SectorNodeData {
  label: string;
  type: NodeType;
  description: string;
  trend: 'up' | 'down' | 'neutral';
  change: string;
}

export const initialNodes: Node<SectorNodeData>[] = [
  // AI Chain
  {
    id: 'node-ai-boom',
    position: { x: 60, y: 80 },
    data: {
      label: 'AIブーム',
      type: 'event',
      description: '生成AI技術の進化が産業構造を変革しつつある。',
      trend: 'up',
      change: '+12.4%',
    },
  },
  {
    id: 'node-semi',
    position: { x: 280, y: 20 },
    data: {
      label: '半導体',
      type: 'sector',
      description: 'AI需要でHBM・HPC向け半導体が急騰。',
      trend: 'up',
      change: '+18.7%',
    },
  },
  {
    id: 'node-datacenter',
    position: { x: 280, y: 120 },
    data: {
      label: 'データセンター需要',
      type: 'sector',
      description: 'ハイパースケーラーの設備投資が前年比40%超。',
      trend: 'up',
      change: '+9.1%',
    },
  },
  {
    id: 'node-cloud',
    position: { x: 500, y: 20 },
    data: {
      label: 'クラウド株',
      type: 'sector',
      description: 'AWS・Azure・GCPがAIサービスで急成長。',
      trend: 'up',
      change: '+11.2%',
    },
  },
  {
    id: 'node-power',
    position: { x: 500, y: 140 },
    data: {
      label: '電力供給株',
      type: 'sector',
      description: 'データセンター電力需要急増で公益株が見直される。',
      trend: 'up',
      change: '+4.2%',
    },
  },
  {
    id: 'node-copper',
    position: { x: 720, y: 80 },
    data: {
      label: '銅・インフラ資材',
      type: 'commodity',
      description: '電力網・データセンター配線用銅の需要が構造的に増加。',
      trend: 'up',
      change: '+3.8%',
    },
  },
  {
    id: 'node-green-energy',
    position: { x: 720, y: 200 },
    data: {
      label: 'グリーンエネルギー',
      type: 'sector',
      description: '再エネへの投資が補助金追い風で拡大。',
      trend: 'up',
      change: '+6.5%',
    },
  },
  {
    id: 'node-evbattery',
    position: { x: 920, y: 80 },
    data: {
      label: 'EV・電池材料',
      type: 'commodity',
      description: 'EV普及でリチウム・コバルト需要が増加。',
      trend: 'neutral',
      change: '-0.9%',
    },
  },

  // Hormuz Chain
  {
    id: 'node-hormuz',
    position: { x: 60, y: 320 },
    data: {
      label: 'ホルムズ海峡緊張',
      type: 'event',
      description: '中東地政学リスクが原油供給に影響。',
      trend: 'down',
      change: 'リスク高',
    },
  },
  {
    id: 'node-crude',
    position: { x: 280, y: 300 },
    data: {
      label: '原油価格上昇',
      type: 'commodity',
      description: '地政学プレミアムでWTIが$85超。',
      trend: 'up',
      change: '+6.7%',
    },
  },
  {
    id: 'node-energy',
    position: { x: 500, y: 280 },
    data: {
      label: 'エネルギー株',
      type: 'sector',
      description: '原油高でエネルギーメジャーの利益が拡大。',
      trend: 'up',
      change: '+5.3%',
    },
  },
  {
    id: 'node-shipping',
    position: { x: 500, y: 380 },
    data: {
      label: '海運株',
      type: 'sector',
      description: 'タンカー運賃がスポット・タイム双方で上昇。',
      trend: 'up',
      change: '+8.1%',
    },
  },

  // Jobs / Rates Chain
  {
    id: 'node-jobs',
    position: { x: 60, y: 540 },
    data: {
      label: '米雇用統計上振れ',
      type: 'event',
      description: 'NFPが予想を30万人上回り、労働市場の強さを示した。',
      trend: 'neutral',
      change: '+339K',
    },
  },
  {
    id: 'node-rates',
    position: { x: 280, y: 510 },
    data: {
      label: '金利上昇予測',
      type: 'sector',
      description: '米10年債利回りが5%を再び試す展開。',
      trend: 'up',
      change: '+0.32%',
    },
  },
  {
    id: 'node-banks',
    position: { x: 500, y: 490 },
    data: {
      label: '銀行株・金融株',
      type: 'sector',
      description: '利ざや改善でNIMが拡大、ただしCRE懸念あり。',
      trend: 'up',
      change: '+2.9%',
    },
  },
  {
    id: 'node-dollar',
    position: { x: 720, y: 510 },
    data: {
      label: 'ドル高',
      type: 'commodity',
      description: '金利優位を背景にドルが全面高。',
      trend: 'up',
      change: '+1.4%',
    },
  },
  {
    id: 'node-em-fx',
    position: { x: 920, y: 510 },
    data: {
      label: '新興国通貨安',
      type: 'commodity',
      description: 'ドル高・中国鈍化で新興国通貨が軟調。',
      trend: 'down',
      change: '-3.2%',
    },
  },

  // China RE Chain
  {
    id: 'node-china-re',
    position: { x: 60, y: 720 },
    data: {
      label: '中国不動産低迷',
      type: 'event',
      description: '恒大・碧桂園などが相次ぎデフォルト。',
      trend: 'down',
      change: '-22.5%',
    },
  },
  {
    id: 'node-steel',
    position: { x: 280, y: 700 },
    data: {
      label: '鉄鋼・素材株',
      type: 'sector',
      description: '中国建設需要急減で鉄鋼価格が下落。',
      trend: 'down',
      change: '-7.3%',
    },
  },
  {
    id: 'node-resources',
    position: { x: 500, y: 680 },
    data: {
      label: '資源株',
      type: 'sector',
      description: '鉄鉱石・石炭価格が中国需要低迷で下落。',
      trend: 'down',
      change: '-5.8%',
    },
  },
];

// ─── React Flow Edges ─────────────────────────────────────────────────────────

export const initialEdges: Edge[] = [
  // AI Chain
  { id: 'e-ai-semi', source: 'node-ai-boom', target: 'node-semi', animated: true },
  { id: 'e-ai-dc', source: 'node-ai-boom', target: 'node-datacenter', animated: true },
  { id: 'e-semi-cloud', source: 'node-semi', target: 'node-cloud', animated: true },
  { id: 'e-dc-power', source: 'node-datacenter', target: 'node-power', animated: true },
  { id: 'e-power-copper', source: 'node-power', target: 'node-copper', animated: true },
  { id: 'e-power-green', source: 'node-power', target: 'node-green-energy', animated: true },
  { id: 'e-copper-ev', source: 'node-copper', target: 'node-evbattery', animated: true },

  // Hormuz Chain
  { id: 'e-hormuz-crude', source: 'node-hormuz', target: 'node-crude', animated: true },
  { id: 'e-crude-energy', source: 'node-crude', target: 'node-energy', animated: true },
  { id: 'e-crude-shipping', source: 'node-crude', target: 'node-shipping', animated: true },

  // Jobs / Rates Chain
  { id: 'e-jobs-rates', source: 'node-jobs', target: 'node-rates', animated: true },
  { id: 'e-rates-banks', source: 'node-rates', target: 'node-banks', animated: true },
  { id: 'e-banks-dollar', source: 'node-banks', target: 'node-dollar', animated: true },
  { id: 'e-dollar-emfx', source: 'node-dollar', target: 'node-em-fx', animated: true },

  // China RE Chain
  { id: 'e-chinare-steel', source: 'node-china-re', target: 'node-steel', animated: true },
  { id: 'e-steel-resources', source: 'node-steel', target: 'node-resources', animated: true },
  { id: 'e-resources-emfx', source: 'node-resources', target: 'node-em-fx', animated: true },

  // Cross-chain links
  { id: 'e-dollar-crude', source: 'node-dollar', target: 'node-crude', animated: true },
  { id: 'e-energy-shipping2', source: 'node-energy', target: 'node-shipping', animated: true },
  { id: 'e-copper-resources', source: 'node-copper', target: 'node-resources', animated: true },
];

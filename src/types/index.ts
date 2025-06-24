export interface Asset {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap?: number;
  volume?: number;
  type: 'stock' | 'crypto';
  chartData: Array<{ time: string; price: number }>;
}

export interface Holding {
  id: string;
  asset: Asset;
  quantity: number;
  avgBuyPrice: number;
  currentValue: number;
  totalReturn: number;
  totalReturnPercent: number;
}

export interface Order {
  id: string;
  asset: Asset;
  type: 'buy' | 'sell';
  quantity: number;
  price: number;
  timestamp: Date;
  status: 'completed' | 'pending' | 'cancelled';
  total: number;
}

export interface Portfolio {
  totalValue: number;
  totalReturn: number;
  totalReturnPercent: number;
  cashBalance: number;
  holdings: Holding[];
}

export interface AppState {
  currentView: 'dashboard' | 'watchlist' | 'portfolio' | 'orders' | 'trade';
  assets: Asset[];
  watchlist: Asset[];
  portfolio: Portfolio;
  orders: Order[];
  setCurrentView: (view: AppState['currentView']) => void;
  addToWatchlist: (asset: Asset) => void;
  removeFromWatchlist: (assetId: string) => void;
  executeTrade: (trade: { assetId: string; type: 'buy' | 'sell'; quantity: number; price: number }) => void;
}
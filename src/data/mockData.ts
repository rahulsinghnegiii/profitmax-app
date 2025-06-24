import { Asset, Portfolio, Order } from '../types';

export const mockAssets: Asset[] = [
  {
    id: '1',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 189.25,
    change: 2.15,
    changePercent: 1.15,
    marketCap: 2980000000000,
    volume: 52341000,
    type: 'stock',
    chartData: [
      { time: '09:30', price: 187.10 },
      { time: '10:00', price: 188.50 },
      { time: '10:30', price: 187.80 },
      { time: '11:00', price: 189.25 },
      { time: '11:30', price: 189.25 },
    ]
  },
  {
    id: '2',
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 2841.50,
    change: -12.30,
    changePercent: -0.43,
    marketCap: 1780000000000,
    volume: 1234000,
    type: 'stock',
    chartData: [
      { time: '09:30', price: 2853.80 },
      { time: '10:00', price: 2848.20 },
      { time: '10:30', price: 2845.10 },
      { time: '11:00', price: 2841.50 },
      { time: '11:30', price: 2841.50 },
    ]
  },
  {
    id: '3',
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 43250.00,
    change: 1850.00,
    changePercent: 4.47,
    marketCap: 847000000000,
    volume: 28500000000,
    type: 'crypto',
    chartData: [
      { time: '09:30', price: 41400.00 },
      { time: '10:00', price: 42100.00 },
      { time: '10:30', price: 42800.00 },
      { time: '11:00', price: 43250.00 },
      { time: '11:30', price: 43250.00 },
    ]
  },
  {
    id: '4',
    symbol: 'ETH',
    name: 'Ethereum',
    price: 2543.75,
    change: -45.20,
    changePercent: -1.75,
    marketCap: 305000000000,
    volume: 15200000000,
    type: 'crypto',
    chartData: [
      { time: '09:30', price: 2588.95 },
      { time: '10:00', price: 2565.40 },
      { time: '10:30', price: 2552.80 },
      { time: '11:00', price: 2543.75 },
      { time: '11:30', price: 2543.75 },
    ]
  },
  {
    id: '5',
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    price: 248.50,
    change: 8.75,
    changePercent: 3.65,
    marketCap: 789000000000,
    volume: 95400000,
    type: 'stock',
    chartData: [
      { time: '09:30', price: 239.75 },
      { time: '10:00', price: 242.30 },
      { time: '10:30', price: 245.80 },
      { time: '11:00', price: 248.50 },
      { time: '11:30', price: 248.50 },
    ]
  },
  {
    id: '6',
    symbol: 'NVDA',
    name: 'NVIDIA Corp.',
    price: 875.20,
    change: 15.40,
    changePercent: 1.79,
    marketCap: 2150000000000,
    volume: 42100000,
    type: 'stock',
    chartData: [
      { time: '09:30', price: 859.80 },
      { time: '10:00', price: 865.50 },
      { time: '10:30', price: 871.20 },
      { time: '11:00', price: 875.20 },
      { time: '11:30', price: 875.20 },
    ]
  }
];

export const mockPortfolio: Portfolio = {
  totalValue: 145680.50,
  totalReturn: 12450.30,
  totalReturnPercent: 9.34,
  cashBalance: 25430.20,
  holdings: [
    {
      id: '1',
      asset: mockAssets[0], // AAPL
      quantity: 50,
      avgBuyPrice: 175.20,
      currentValue: 9462.50,
      totalReturn: 1702.50,
      totalReturnPercent: 21.95
    },
    {
      id: '2',
      asset: mockAssets[2], // BTC
      quantity: 1.5,
      avgBuyPrice: 38200.00,
      currentValue: 64875.00,
      totalReturn: 7575.00,
      totalReturnPercent: 13.21
    },
    {
      id: '3',
      asset: mockAssets[4], // TSLA
      quantity: 25,
      avgBuyPrice: 220.40,
      currentValue: 6212.50,
      totalReturn: 702.50,
      totalReturnPercent: 12.75
    },
    {
      id: '4',
      asset: mockAssets[5], // NVDA
      quantity: 10,
      avgBuyPrice: 780.30,
      currentValue: 8752.00,
      totalReturn: 1949.00,
      totalReturnPercent: 33.33
    }
  ]
};

export const mockOrders: Order[] = [
  {
    id: '1',
    asset: mockAssets[0],
    type: 'buy',
    quantity: 50,
    price: 175.20,
    timestamp: new Date('2024-01-15T10:30:00'),
    status: 'completed',
    total: 8760.00
  },
  {
    id: '2',
    asset: mockAssets[2],
    type: 'buy',
    quantity: 1.5,
    price: 38200.00,
    timestamp: new Date('2024-01-12T14:20:00'),
    status: 'completed',
    total: 57300.00
  },
  {
    id: '3',
    asset: mockAssets[4],
    type: 'buy',
    quantity: 25,
    price: 220.40,
    timestamp: new Date('2024-01-10T09:45:00'),
    status: 'completed',
    total: 5510.00
  },
  {
    id: '4',
    asset: mockAssets[1],
    type: 'sell',
    quantity: 5,
    price: 2850.00,
    timestamp: new Date('2024-01-08T16:15:00'),
    status: 'completed',
    total: 14250.00
  }
];
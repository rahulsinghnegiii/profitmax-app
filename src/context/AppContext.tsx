import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AppState, Asset, Portfolio, Order } from '../types';
import { mockAssets, mockPortfolio, mockOrders } from '../data/mockData';

const AppContext = createContext<AppState | undefined>(undefined);

export const useApp = (): AppState => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppState['currentView']>('dashboard');
  const [assets] = useState<Asset[]>(mockAssets);
  const [watchlist, setWatchlist] = useState<Asset[]>([mockAssets[0], mockAssets[2], mockAssets[4]]);
  const [portfolio, setPortfolio] = useState<Portfolio>(mockPortfolio);
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const addToWatchlist = (asset: Asset) => {
    if (!watchlist.find(item => item.id === asset.id)) {
      setWatchlist([...watchlist, asset]);
    }
  };

  const removeFromWatchlist = (assetId: string) => {
    setWatchlist(watchlist.filter(asset => asset.id !== assetId));
  };

  const executeTrade = (trade: { assetId: string; type: 'buy' | 'sell'; quantity: number; price: number }) => {
    const asset = assets.find(a => a.id === trade.assetId);
    if (!asset) return;

    const newOrder: Order = {
      id: Date.now().toString(),
      asset,
      type: trade.type,
      quantity: trade.quantity,
      price: trade.price,
      timestamp: new Date(),
      status: 'completed',
      total: trade.quantity * trade.price
    };

    setOrders([newOrder, ...orders]);

    // Update portfolio
    setPortfolio(prevPortfolio => {
      const existingHolding = prevPortfolio.holdings.find(h => h.asset.id === asset.id);
      let newHoldings = [...prevPortfolio.holdings];
      let newCashBalance = prevPortfolio.cashBalance;

      if (trade.type === 'buy') {
        newCashBalance -= newOrder.total;
        if (existingHolding) {
          const totalQuantity = existingHolding.quantity + trade.quantity;
          const totalCost = (existingHolding.quantity * existingHolding.avgBuyPrice) + newOrder.total;
          const newAvgPrice = totalCost / totalQuantity;
          
          newHoldings = newHoldings.map(h => 
            h.asset.id === asset.id 
              ? {
                  ...h,
                  quantity: totalQuantity,
                  avgBuyPrice: newAvgPrice,
                  currentValue: totalQuantity * asset.price,
                  totalReturn: (totalQuantity * asset.price) - totalCost,
                  totalReturnPercent: ((totalQuantity * asset.price) - totalCost) / totalCost * 100
                }
              : h
          );
        } else {
          newHoldings.push({
            id: Date.now().toString(),
            asset,
            quantity: trade.quantity,
            avgBuyPrice: trade.price,
            currentValue: trade.quantity * asset.price,
            totalReturn: (trade.quantity * asset.price) - newOrder.total,
            totalReturnPercent: ((trade.quantity * asset.price) - newOrder.total) / newOrder.total * 100
          });
        }
      } else {
        newCashBalance += newOrder.total;
        if (existingHolding) {
          const newQuantity = existingHolding.quantity - trade.quantity;
          if (newQuantity <= 0) {
            newHoldings = newHoldings.filter(h => h.asset.id !== asset.id);
          } else {
            newHoldings = newHoldings.map(h => 
              h.asset.id === asset.id 
                ? {
                    ...h,
                    quantity: newQuantity,
                    currentValue: newQuantity * asset.price,
                    totalReturn: (newQuantity * asset.price) - (newQuantity * h.avgBuyPrice),
                    totalReturnPercent: ((newQuantity * asset.price) - (newQuantity * h.avgBuyPrice)) / (newQuantity * h.avgBuyPrice) * 100
                  }
                : h
            );
          }
        }
      }

      const totalValue = newHoldings.reduce((sum, h) => sum + h.currentValue, 0) + newCashBalance;
      const totalCost = newHoldings.reduce((sum, h) => sum + (h.quantity * h.avgBuyPrice), 0);
      const totalReturn = totalValue - totalCost - newCashBalance;

      return {
        ...prevPortfolio,
        holdings: newHoldings,
        cashBalance: newCashBalance,
        totalValue,
        totalReturn,
        totalReturnPercent: totalCost > 0 ? (totalReturn / totalCost) * 100 : 0
      };
    });
  };

  const value: AppState = {
    currentView,
    assets,
    watchlist,
    portfolio,
    orders,
    setCurrentView,
    addToWatchlist,
    removeFromWatchlist,
    executeTrade
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
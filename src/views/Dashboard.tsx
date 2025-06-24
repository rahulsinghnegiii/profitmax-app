import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import AssetCard from '../components/AssetCard';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const Dashboard: React.FC = () => {
  const { assets, portfolio, watchlist } = useApp();

  const marketData = [
    { name: '9:30', value: 98500 },
    { name: '10:00', value: 99200 },
    { name: '10:30', value: 98800 },
    { name: '11:00', value: 99800 },
    { name: '11:30', value: 100200 },
  ];

  const isPortfolioPositive = portfolio.totalReturn >= 0;
  const topAssets = assets.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3 mb-3">
            <DollarSign className="text-emerald-500 w-6 h-6" />
            <h3 className="text-gray-300 font-medium">Total Portfolio Value</h3>
          </div>
          <p className="text-white text-3xl font-bold">
            ${portfolio.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3 mb-3">
            {isPortfolioPositive ? (
              <TrendingUp className="text-emerald-500 w-6 h-6" />
            ) : (
              <TrendingDown className="text-red-500 w-6 h-6" />
            )}
            <h3 className="text-gray-300 font-medium">Total Return</h3>
          </div>
          <p className={`text-3xl font-bold ${isPortfolioPositive ? 'text-emerald-500' : 'text-red-500'}`}>
            {isPortfolioPositive ? '+' : ''}${portfolio.totalReturn.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
          <p className={`text-sm ${isPortfolioPositive ? 'text-emerald-400' : 'text-red-400'}`}>
            {isPortfolioPositive ? '+' : ''}{portfolio.totalReturnPercent.toFixed(2)}%
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3 mb-3">
            <PieChart className="text-blue-500 w-6 h-6" />
            <h3 className="text-gray-300 font-medium">Cash Balance</h3>
          </div>
          <p className="text-white text-3xl font-bold">
            ${portfolio.cashBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {/* Market Overview Chart */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-white font-semibold text-lg mb-4">Market Overview</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={marketData}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Assets */}
      <div>
        <h3 className="text-white font-semibold text-lg mb-4">Top Assets</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {topAssets.map(asset => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      </div>

      {/* Watchlist Preview */}
      {watchlist.length > 0 && (
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Your Watchlist</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {watchlist.slice(0, 3).map(asset => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
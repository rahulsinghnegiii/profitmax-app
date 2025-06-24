import React from 'react';
import { Plus, Minus, TrendingUp, TrendingDown } from 'lucide-react';
import { Asset } from '../types';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface AssetCardProps {
  asset: Asset;
  onAdd?: () => void;
  onRemove?: () => void;
  showActions?: boolean;
  isInWatchlist?: boolean;
}

const AssetCard: React.FC<AssetCardProps> = ({ 
  asset, 
  onAdd, 
  onRemove, 
  showActions = false,
  isInWatchlist = false
}) => {
  const isPositive = asset.change >= 0;

  return (
    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-all duration-200 hover:shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-white font-semibold text-lg">{asset.symbol}</h3>
          <p className="text-gray-400 text-sm">{asset.name}</p>
        </div>
        
        {showActions && (
          <div className="flex space-x-2">
            {isInWatchlist ? (
              <button
                onClick={onRemove}
                className="p-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
              >
                <Minus className="w-4 h-4 text-white" />
              </button>
            ) : (
              <button
                onClick={onAdd}
                className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 transition-colors"
              >
                <Plus className="w-4 h-4 text-white" />
              </button>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-white text-2xl font-bold">
            ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
          <div className={`flex items-center space-x-1 ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span className="font-medium">
              {isPositive ? '+' : ''}{asset.change.toFixed(2)} ({isPositive ? '+' : ''}{asset.changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
        
        <div className="w-20 h-12">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={asset.chartData}>
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke={isPositive ? '#10b981' : '#ef4444'} 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {asset.volume && (
        <div className="text-gray-400 text-sm">
          Volume: ${(asset.volume / 1000000).toFixed(1)}M
        </div>
      )}
    </div>
  );
};

export default AssetCard;
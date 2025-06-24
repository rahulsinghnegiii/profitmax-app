import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownLeft, DollarSign } from 'lucide-react';
import { useApp } from '../context/AppContext';

const TradeForm: React.FC = () => {
  const { assets, executeTrade } = useApp();
  const [selectedAssetId, setSelectedAssetId] = useState(assets[0]?.id || '');
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [quantity, setQuantity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedAsset = assets.find(asset => asset.id === selectedAssetId);
  const total = selectedAsset && quantity ? parseFloat(quantity) * selectedAsset.price : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAsset || !quantity || parseFloat(quantity) <= 0) return;

    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      executeTrade({
        assetId: selectedAssetId,
        type: tradeType,
        quantity: parseFloat(quantity),
        price: selectedAsset.price
      });
      
      setQuantity('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h3 className="text-white font-semibold text-lg mb-6">Execute Trade</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Trade Type Toggle */}
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Trade Type
          </label>
          <div className="flex rounded-lg overflow-hidden border border-gray-600">
            <button
              type="button"
              onClick={() => setTradeType('buy')}
              className={`flex-1 py-3 px-4 flex items-center justify-center space-x-2 transition-colors ${
                tradeType === 'buy' 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>Buy</span>
            </button>
            <button
              type="button"
              onClick={() => setTradeType('sell')}
              className={`flex-1 py-3 px-4 flex items-center justify-center space-x-2 transition-colors ${
                tradeType === 'sell' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <ArrowDownLeft className="w-4 h-4" />
              <span>Sell</span>
            </button>
          </div>
        </div>

        {/* Asset Selection */}
        <div>
          <label htmlFor="asset" className="block text-gray-300 text-sm font-medium mb-2">
            Select Asset
          </label>
          <select
            id="asset"
            value={selectedAssetId}
            onChange={(e) => setSelectedAssetId(e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {assets.map(asset => (
              <option key={asset.id} value={asset.id}>
                {asset.symbol} - {asset.name}
              </option>
            ))}
          </select>
        </div>

        {/* Selected Asset Info */}
        {selectedAsset && (
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">{selectedAsset.symbol}</p>
                <p className="text-gray-400 text-sm">{selectedAsset.name}</p>
              </div>
              <div className="text-right">
                <p className="text-white font-bold text-lg">
                  ${selectedAsset.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
                <p className={`text-sm ${selectedAsset.change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                  {selectedAsset.change >= 0 ? '+' : ''}{selectedAsset.changePercent.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Quantity Input */}
        <div>
          <label htmlFor="quantity" className="block text-gray-300 text-sm font-medium mb-2">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            step="0.01"
            min="0"
            placeholder="Enter quantity"
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Total Display */}
        {total > 0 && (
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Total {tradeType === 'buy' ? 'Cost' : 'Proceeds'}:</span>
              <div className="flex items-center space-x-1">
                <DollarSign className="w-5 h-5 text-emerald-500" />
                <span className="text-white font-bold text-lg">
                  {total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!selectedAsset || !quantity || parseFloat(quantity) <= 0 || isSubmitting}
          className={`w-full py-4 rounded-lg font-medium transition-colors ${
            tradeType === 'buy'
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
              : 'bg-red-600 hover:bg-red-700 text-white'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isSubmitting ? 'Processing...' : `${tradeType === 'buy' ? 'Buy' : 'Sell'} ${selectedAsset?.symbol || ''}`}
        </button>
      </form>
    </div>
  );
};

export default TradeForm;
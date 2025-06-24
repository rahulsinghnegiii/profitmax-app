import React from 'react';
import { useApp } from '../context/AppContext';
import TradeForm from '../components/TradeForm';
import AssetCard from '../components/AssetCard';

const Trade: React.FC = () => {
  const { assets, portfolio } = useApp();

  return (
    <div className="space-y-6">
      <h2 className="text-white text-2xl font-bold">Trade</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trade Form */}
        <TradeForm />

        {/* Account Info */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-white font-semibold text-lg mb-4">Account Overview</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Available Cash</span>
              <span className="text-emerald-500 font-bold text-xl">
                ${portfolio.cashBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Portfolio Value</span>
              <span className="text-white font-bold">
                ${portfolio.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Active Holdings</span>
              <span className="text-white font-bold">
                {portfolio.holdings.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Available Assets */}
      <div>
        <h3 className="text-white font-semibold text-lg mb-4">Available Assets</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assets.map(asset => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trade;
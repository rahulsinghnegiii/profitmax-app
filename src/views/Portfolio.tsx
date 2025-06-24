import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PortfolioChart from '../components/PortfolioChart';

const Portfolio: React.FC = () => {
  const { portfolio } = useApp();

  return (
    <div className="space-y-6">
      <h2 className="text-white text-2xl font-bold">Portfolio</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Portfolio Chart */}
        <PortfolioChart portfolio={portfolio} />

        {/* Portfolio Summary */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-white font-semibold text-lg mb-4">Portfolio Summary</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Total Value</span>
              <span className="text-white font-bold text-xl">
                ${portfolio.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Total Return</span>
              <div className={`flex items-center space-x-1 ${
                portfolio.totalReturn >= 0 ? 'text-emerald-500' : 'text-red-500'
              }`}>
                {portfolio.totalReturn >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="font-bold">
                  {portfolio.totalReturn >= 0 ? '+' : ''}${portfolio.totalReturn.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Return Percentage</span>
              <span className={`font-bold ${
                portfolio.totalReturnPercent >= 0 ? 'text-emerald-500' : 'text-red-500'
              }`}>
                {portfolio.totalReturnPercent >= 0 ? '+' : ''}{portfolio.totalReturnPercent.toFixed(2)}%
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Cash Balance</span>
              <span className="text-white font-bold">
                ${portfolio.cashBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-white font-semibold text-lg">Holdings</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-750">
              <tr>
                <th className="text-left p-4 text-gray-300 font-medium">Asset</th>
                <th className="text-right p-4 text-gray-300 font-medium">Quantity</th>
                <th className="text-right p-4 text-gray-300 font-medium">Avg Buy Price</th>
                <th className="text-right p-4 text-gray-300 font-medium">Current Price</th>
                <th className="text-right p-4 text-gray-300 font-medium">Current Value</th>
                <th className="text-right p-4 text-gray-300 font-medium">P&L</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {portfolio.holdings.map(holding => {
                const isPositive = holding.totalReturn >= 0;
                
                return (
                  <tr key={holding.id} className="hover:bg-gray-750 transition-colors">
                    <td className="p-4">
                      <div>
                        <p className="text-white font-medium">{holding.asset.symbol}</p>
                        <p className="text-gray-400 text-sm">{holding.asset.name}</p>
                      </div>
                    </td>
                    <td className="p-4 text-right text-white">
                      {holding.quantity}
                    </td>
                    <td className="p-4 text-right text-white">
                      ${holding.avgBuyPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-4 text-right text-white">
                      ${holding.asset.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-4 text-right text-white font-medium">
                      ${holding.currentValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-4 text-right">
                      <div className={`${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                        <p className="font-medium">
                          {isPositive ? '+' : ''}${holding.totalReturn.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </p>
                        <p className="text-sm">
                          {isPositive ? '+' : ''}{holding.totalReturnPercent.toFixed(2)}%
                        </p>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
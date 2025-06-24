import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Portfolio } from '../types';

interface PortfolioChartProps {
  portfolio: Portfolio;
}

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4'];

const PortfolioChart: React.FC<PortfolioChartProps> = ({ portfolio }) => {
  const data = [
    ...portfolio.holdings.map((holding, index) => ({
      name: holding.asset.symbol,
      value: holding.currentValue,
      color: COLORS[index % COLORS.length]
    })),
    {
      name: 'Cash',
      value: portfolio.cashBalance,
      color: '#6b7280'
    }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium">{data.name}</p>
          <p className="text-emerald-500">
            ${data.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
          <p className="text-gray-400 text-sm">
            {((data.value / portfolio.totalValue) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h3 className="text-white font-semibold text-lg mb-4">Portfolio Allocation</h3>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-2">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-gray-300 text-sm">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioChart;
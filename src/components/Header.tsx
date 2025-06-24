import React from 'react';
import { TrendingUp, Bell, User } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 border-b border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <TrendingUp className="text-emerald-500 w-8 h-8" />
            <h1 className="text-white text-xl font-bold">ProfitMax</h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
            <Bell className="text-gray-300 w-5 h-5" />
          </button>
          <button className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
            <User className="text-gray-300 w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
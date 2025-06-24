import React from 'react';
import { Home, Eye, Briefcase, FileText, ArrowUpDown, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { currentView, setCurrentView } = useApp();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'watchlist', label: 'Watchlist', icon: Eye },
    { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
    { id: 'orders', label: 'Orders', icon: FileText },
    { id: 'trade', label: 'Trade', icon: ArrowUpDown },
  ] as const;

  const handleNavigation = (view: typeof currentView) => {
    setCurrentView(view);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />
      )}
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-gray-800 border-r border-gray-700 transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:z-0`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-700 lg:hidden">
          <h2 className="text-white font-semibold">Navigation</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="mt-8">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-colors ${
                  isActive 
                    ? 'bg-emerald-600 text-white border-r-4 border-emerald-400' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
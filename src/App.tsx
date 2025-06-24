import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './views/Dashboard';
import Watchlist from './views/Watchlist';
import Portfolio from './views/Portfolio';
import Orders from './views/Orders';
import Trade from './views/Trade';

const AppContent: React.FC = () => {
  const { currentView } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'watchlist':
        return <Watchlist />;
      case 'portfolio':
        return <Portfolio />;
      case 'orders':
        return <Orders />;
      case 'trade':
        return <Trade />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 lg:ml-64">
          <div className="p-6">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden mb-6 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <Menu className="text-white w-6 h-6" />
            </button>
            
            {renderCurrentView()}
          </div>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
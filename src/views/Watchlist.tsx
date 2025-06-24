import React from 'react';
import { Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import AssetCard from '../components/AssetCard';

const Watchlist: React.FC = () => {
  const { assets, watchlist, addToWatchlist, removeFromWatchlist } = useApp();

  const availableAssets = assets.filter(asset => 
    !watchlist.find(watchedAsset => watchedAsset.id === asset.id)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-white text-2xl font-bold">Watchlist</h2>
        <div className="flex items-center space-x-2 text-gray-400">
          <Plus className="w-5 h-5" />
          <span>Add more assets below</span>
        </div>
      </div>

      {/* Current Watchlist */}
      {watchlist.length > 0 ? (
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Watching ({watchlist.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {watchlist.map(asset => (
              <AssetCard
                key={asset.id}
                asset={asset}
                showActions={true}
                isInWatchlist={true}
                onRemove={() => removeFromWatchlist(asset.id)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 text-center">
          <div className="text-gray-400 mb-4">
            <Plus className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Your watchlist is empty</p>
            <p className="text-sm">Add assets from the list below to start tracking them</p>
          </div>
        </div>
      )}

      {/* Available Assets */}
      {availableAssets.length > 0 && (
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Available Assets</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableAssets.map(asset => (
              <AssetCard
                key={asset.id}
                asset={asset}
                showActions={true}
                isInWatchlist={false}
                onAdd={() => addToWatchlist(asset)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Watchlist;
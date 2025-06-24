import React from 'react';
import { useApp } from '../context/AppContext';
import OrderList from '../components/OrderList';

const Orders: React.FC = () => {
  const { orders } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-white text-2xl font-bold">Order History</h2>
        <div className="text-gray-400">
          {orders.length} {orders.length === 1 ? 'order' : 'orders'}
        </div>
      </div>

      {orders.length > 0 ? (
        <OrderList orders={orders} />
      ) : (
        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 text-center">
          <div className="text-gray-400">
            <p>No orders yet</p>
            <p className="text-sm">Your trade history will appear here</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
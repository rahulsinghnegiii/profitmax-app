import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Clock, CheckCircle } from 'lucide-react';
import { Order } from '../types';

interface OrderListProps {
  orders: Order[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700">
      <div className="p-6 border-b border-gray-700">
        <h3 className="text-white font-semibold text-lg">Recent Orders</h3>
      </div>
      
      <div className="divide-y divide-gray-700">
        {orders.map(order => {
          const isBuy = order.type === 'buy';
          
          return (
            <div key={order.id} className="p-4 hover:bg-gray-750 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${isBuy ? 'bg-emerald-600' : 'bg-red-600'}`}>
                    {isBuy ? (
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    ) : (
                      <ArrowDownLeft className="w-4 h-4 text-white" />
                    )}
                  </div>
                  
                  <div>
                    <p className="text-white font-medium">
                      {isBuy ? 'Bought' : 'Sold'} {order.quantity} {order.asset.symbol}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {order.timestamp.toLocaleDateString()} at {order.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-white font-medium">
                    ${order.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </p>
                  <div className="flex items-center space-x-1 text-sm">
                    {order.status === 'completed' ? (
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Clock className="w-4 h-4 text-yellow-500" />
                    )}
                    <span className={`capitalize ${
                      order.status === 'completed' ? 'text-emerald-500' : 'text-yellow-500'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-2 pt-2 border-t border-gray-700">
                <p className="text-gray-400 text-sm">
                  Total: ${order.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderList;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Receipt,
  RotateCcw,
  Navigation,
  Clock,
  ArrowRight,
  CheckCircle2,
  Package,
} from 'lucide-react';
import { useOrder, ORDER_STATUSES } from '../context/OrderContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { formatCurrency, formatDate } from '../utils/helpers';

export const OrderHistoryPage = () => {
  const { orders } = useOrder();
  const { addToCart, setIsCartDrawerOpen } = useCart();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('all');

  const filteredOrders = orders.filter((o) => {
    if (activeTab === 'active') {
      return o.status !== 'delivered';
    }
    if (activeTab === 'delivered') {
      return o.status === 'delivered';
    }
    return true;
  });

  const handleReorder = (order) => {
    if (!order.items || order.items.length === 0) return;

    order.items.forEach((ci) => {
      addToCart(ci.item, ci.customization, ci.quantity);
    });

    addToast(`Reordered ${order.items.length} items from ${order.restaurantName}!`, 'success');
    setIsCartDrawerOpen(true);
  };

  const getStatusBadge = (statusKey) => {
    const statusObj = ORDER_STATUSES.find((s) => s.key === statusKey);
    const title = statusObj ? statusObj.title : statusKey;

    if (statusKey === 'delivered') {
      return (
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Delivered</span>
        </span>
      );
    }

    return (
      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-brand-50 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300 flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
        <span>{title}</span>
      </span>
    );
  };

  return (
    <div className="min-h-screen py-6 sm:py-8">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black font-display text-slate-900 dark:text-white tracking-tight">
              Order History
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Review your culinary journeys, track active deliveries, and reorder favorites in 1-click
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 rounded-2xl border border-slate-200 dark:border-slate-800 self-start sm:self-auto">
            {['all', 'active', 'delivered'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition ${
                  activeTab === tab
                    ? 'bg-slate-900 dark:bg-brand-500 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab === 'all' ? 'All Orders' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Order Cards List */}
        {filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.orderId}
                className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 border border-slate-100 dark:border-slate-800 shadow-soft hover:shadow-card transition space-y-4"
              >
                {/* Top Row: Restaurant info, ID, Status */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={order.restaurantImage}
                      alt={order.restaurantName}
                      className="w-12 h-12 rounded-2xl object-cover border border-slate-100 dark:border-slate-800"
                    />
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                        {order.restaurantName}
                      </h3>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 dark:text-slate-500">
                        <span>{formatDate(order.createdAt)}</span>
                        <span>•</span>
                        <span className="font-mono font-bold text-slate-600 dark:text-slate-300">
                          #{order.orderId}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="self-start sm:self-auto">
                    {getStatusBadge(order.status)}
                  </div>
                </div>

                {/* Items Summary preview */}
                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>
                        <strong className="text-slate-800 dark:text-slate-200">{item.quantity}x</strong>{' '}
                        {item.item?.name}
                        {item.customization?.size && (
                          <span className="text-slate-400 dark:text-slate-500">
                            {' '}
                            ({item.customization.size.name})
                          </span>
                        )}
                      </span>
                      <span className="font-medium text-slate-800 dark:text-slate-200">
                        {formatCurrency(item.totalPrice)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom Row: Total & Action Buttons */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs text-slate-400 dark:text-slate-500">Total Paid: </span>
                    <span className="text-sm sm:text-base font-black text-slate-900 dark:text-white font-display">
                      {formatCurrency(order.pricing?.grandTotal)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Track Button (if active or just viewing) */}
                    <Link
                      to={`/orders/${order.orderId}`}
                      className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition flex items-center justify-center gap-1.5"
                    >
                      <Navigation className="w-3.5 h-3.5 text-brand-500" />
                      <span>{order.status === 'delivered' ? 'View Timeline' : 'Track Live'}</span>
                    </Link>

                    {/* 1-Click Reorder Button */}
                    <button
                      onClick={() => handleReorder(order)}
                      className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold shadow-2xs transition flex items-center justify-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reorder</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 text-center border border-slate-100 dark:border-slate-800 shadow-soft">
            <Package className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800 dark:text-white">No orders found</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-6">
              You don't have any orders under this category.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-brand-500 text-white font-bold text-xs shadow-glow transition hover:bg-brand-600"
            >
              <span>Explore Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

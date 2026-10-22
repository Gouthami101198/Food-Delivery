import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Clock,
  MapPin,
  ArrowRight,
  Receipt,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useOrder } from '../context/OrderContext';
import { formatCurrency, formatDate } from '../utils/helpers';

export const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { getOrderById, activeOrder } = useOrder();

  const order = getOrderById(orderId) || activeOrder;

  useEffect(() => {
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
      });
    } catch (e) {
      // Confetti fallback
    }
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen py-16 flex items-center justify-center">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-md text-center border border-slate-100 dark:border-slate-800 shadow-soft">
          <p className="text-4xl mb-3">📦</p>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Order Not Found</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            We couldn't locate this order. It might have been cleared from local history.
          </p>
          <Link
            to="/"
            className="px-6 py-2.5 rounded-2xl bg-brand-500 text-white font-bold text-xs shadow-glow transition hover:bg-brand-600"
          >
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 sm:py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white dark:bg-slate-900 rounded-3xl sm:rounded-4xl p-5 sm:p-10 border border-slate-100 dark:border-slate-800 shadow-float text-center space-y-6"
        >
          {/* Celebratory Check Icon */}
          <div className="relative inline-flex items-center justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-500 dark:text-emerald-400 flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 stroke-[2.5]" />
            </div>
            <span className="absolute -inset-2 rounded-full bg-emerald-400 opacity-20 animate-ping pointer-events-none" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-[11px] sm:text-xs font-black uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
              Payment & Order Confirmed
            </span>
            <h1 className="text-2xl sm:text-4xl font-black font-display text-slate-900 dark:text-white tracking-tight">
              Order Placed Successfully!
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Your order <strong className="text-slate-900 dark:text-white font-mono">#{order.orderId}</strong> has
              been dispatched to the restaurant. Get ready for a delicious feast!
            </p>
          </div>

          {/* Quick ETA highlight card */}
          <div className="p-4 rounded-2xl bg-brand-50/80 dark:bg-brand-950/40 border border-brand-100 dark:border-brand-900/50 flex items-center justify-center gap-4 max-w-md mx-auto">
            <Clock className="w-6 h-6 text-brand-500 flex-shrink-0" />
            <div className="text-left">
              <p className="text-[11px] font-bold text-brand-800 dark:text-brand-300 uppercase tracking-wider">
                Estimated Delivery
              </p>
              <p className="text-sm font-black text-brand-900 dark:text-brand-200">
                {order.estimatedArrival || 'Approx. 25-30 min'}
              </p>
            </div>
          </div>

          {/* Receipt Breakdown Box */}
          <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-left space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-700/80 pb-3">
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">{order.restaurantName}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{formatDate(order.createdAt)}</p>
              </div>
              <span className="font-mono text-xs font-bold bg-white dark:bg-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200">
                #{order.orderId}
              </span>
            </div>

            {/* Delivery Destination */}
            <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
              <MapPin className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200">Delivering to: </span>
                <span>{order.customer?.address}</span>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-2 pt-2 border-t border-slate-200/80 dark:border-slate-700/80">
              {order.items?.map((item, idx) => (
                <div key={idx} className="flex justify-between text-xs text-slate-700 dark:text-slate-300">
                  <span>
                    {item.quantity}x {item.item?.name}
                  </span>
                  <span className="font-semibold">{formatCurrency(item.totalPrice)}</span>
                </div>
              ))}
            </div>

            {/* Total Paid */}
            <div className="flex justify-between text-sm font-black text-slate-900 dark:text-white pt-3 border-t border-slate-200 dark:border-slate-700">
              <span>Total Paid</span>
              <span className="text-brand-600 font-display text-base">
                {formatCurrency(order.pricing?.grandTotal)}
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to={`/orders/${order.orderId}`}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-brand-600 to-amber-500 text-white font-bold text-xs shadow-glow flex items-center justify-center gap-2 hover:brightness-105 transition"
            >
              <span>Track Live Delivery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/orders"
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition"
            >
              View Order History
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

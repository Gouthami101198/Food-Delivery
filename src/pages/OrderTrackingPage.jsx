import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Receipt, Clock, Phone, Sparkles } from 'lucide-react';
import { useOrder } from '../context/OrderContext';
import { OrderStatusTimeline } from '../components/tracking/OrderStatusTimeline';
import { DeliveryMapMock } from '../components/tracking/DeliveryMapMock';
import { DriverCard } from '../components/tracking/DriverCard';
import { StepSimulatorControls } from '../components/tracking/StepSimulatorControls';
import { formatCurrency, formatDate } from '../utils/helpers';

export const OrderTrackingPage = () => {
  const { orderId } = useParams();
  const { getOrderById, activeOrder, updateOrderStatus, advanceOrderStatus } = useOrder();

  const order = getOrderById(orderId) || activeOrder;

  if (!order) {
    return (
      <div className="min-h-screen py-16 flex items-center justify-center">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-md text-center border border-slate-100 dark:border-slate-800 shadow-soft">
          <p className="text-4xl mb-3">📍</p>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No active order to track</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Please place an order or select one from your order history.
          </p>
          <Link
            to="/orders"
            className="px-6 py-2.5 rounded-2xl bg-brand-500 text-white font-bold text-xs shadow-glow transition hover:bg-brand-600"
          >
            Go to Order History
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 sm:py-8">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 space-y-6 sm:space-y-8">
        {/* Breadcrumb Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/orders"
              className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black font-display text-slate-900 dark:text-white tracking-tight">
                  Track Delivery
                </h1>
                <span className="font-mono text-xs font-bold bg-slate-900 dark:bg-slate-800 text-white px-2.5 py-0.5 rounded-full border border-transparent dark:border-slate-700">
                  #{order.orderId}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {order.restaurantName} • Placed {formatDate(order.createdAt)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800/60">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live GPS Connected</span>
            </span>
          </div>
        </div>

        {/* Step Simulator Test Tool */}
        <StepSimulatorControls
          orderId={order.orderId}
          currentStatus={order.status}
          onUpdateStatus={updateOrderStatus}
          onAdvanceStatus={advanceOrderStatus}
        />

        {/* Main Grid: Left Map + Timeline, Right Details & Driver */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Column: Progress Timeline & Simulated Map */}
          <div className="lg:col-span-7 space-y-6">
            {/* Real-time Milestone Timeline */}
            <OrderStatusTimeline currentStatusKey={order.status} />

            {/* Map Visual Simulation */}
            <DeliveryMapMock
              status={order.status}
              estimatedArrival={order.estimatedArrival}
            />
          </div>

          {/* Right Column: Driver Card, Order Receipt & Delivery Info */}
          <div className="lg:col-span-5 space-y-6">
            {/* Driver Profile */}
            <DriverCard driver={order.driver} />

            {/* Order Items & Receipt */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-100 dark:border-slate-800 shadow-soft space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-brand-500" />
                  <span>Order Items</span>
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                  {order.items?.length} items
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="flex items-start justify-between text-xs">
                    <div className="flex items-start gap-2 min-w-0">
                      <span className="font-bold text-brand-600">{item.quantity}x</span>
                      <div>
                        <p className="font-bold text-slate-800 dark:text-slate-200">{item.item?.name}</p>
                        {item.customization?.size && (
                          <p className="text-[10px] text-slate-400 dark:text-slate-500">
                            {item.customization.size.name}
                          </p>
                        )}
                        {item.customization?.addOns?.map((a) => (
                          <p key={a.id} className="text-[10px] text-brand-600 dark:text-brand-400">
                            +{a.name}
                          </p>
                        ))}
                      </div>
                    </div>
                    <span className="font-black text-slate-900 dark:text-white">
                      {formatCurrency(item.totalPrice)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Delivery Address */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs space-y-1">
                <p className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-500" />
                  <span>Delivery Address</span>
                </p>
                <p className="text-slate-600 dark:text-slate-400 pl-5">{order.customer?.address}</p>
                {order.customer?.deliveryNotes && (
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 italic pl-5">
                    "{order.customer.deliveryNotes}"
                  </p>
                )}
              </div>

              {/* Pricing Totals */}
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {formatCurrency(order.pricing?.subtotal)}
                  </span>
                </div>
                {order.pricing?.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                    <span>Discount</span>
                    <span>-{formatCurrency(order.pricing.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {order.pricing?.deliveryFee === 0 ? 'FREE' : formatCurrency(order.pricing?.deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-900 dark:text-white pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span>Total Paid</span>
                  <span className="text-brand-600 font-display text-base">
                    {formatCurrency(order.pricing?.grandTotal)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

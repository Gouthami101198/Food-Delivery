import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, ShoppingBag, ArrowRight, Truck, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CartItem } from '../components/cart/CartItem';
import { CouponInput } from '../components/cart/CouponInput';
import { formatCurrency } from '../utils/helpers';

export const CartPage = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discount,
    deliveryFee,
    platformFee,
    estimatedTax,
    grandTotal,
    totalItemCount,
  } = useCart();

  const navigate = useNavigate();

  const freeDeliveryThreshold = 299;
  const amountForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const freeDeliveryProgress = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

  return (
    <div className="min-h-screen py-8">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black font-display text-slate-900 dark:text-white tracking-tight">
                Review Your Cart
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {totalItemCount} {totalItemCount === 1 ? 'dish' : 'dishes'} selected for delivery
              </p>
            </div>
          </div>

          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Cart</span>
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 text-center border border-slate-100 dark:border-slate-800 shadow-soft max-w-lg mx-auto transition-colors">
            <div className="w-20 h-20 rounded-3xl bg-brand-50 dark:bg-brand-950/40 text-brand-500 flex items-center justify-center text-3xl mx-auto mb-4">
              🛒
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
              Your cart is empty
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Looks like you haven't added any dishes to your order yet.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-glow transition"
            >
              <span>Explore Top Kitchens</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            {/* Left Column: Cart Items & Free Delivery Progress */}
            <div className="lg:col-span-7 space-y-4">
              {/* Free delivery threshold meter */}
              <div className="bg-brand-50 dark:bg-brand-950/30 rounded-2xl p-4 border border-brand-100 dark:border-brand-900/40 transition-colors">
                <div className="flex items-center justify-between text-xs font-bold text-brand-900 dark:text-brand-300 mb-2">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-brand-500" />
                    {amountForFreeDelivery === 0 ? (
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                        🎉 Free Delivery Unlocked!
                      </span>
                    ) : (
                      <span>
                        Add <strong>{formatCurrency(amountForFreeDelivery)}</strong> more for FREE
                        delivery
                      </span>
                    )}
                  </span>
                  <span>{freeDeliveryProgress.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-brand-200 dark:bg-brand-900/50 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-brand-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${freeDeliveryProgress}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {cart.map((cartItem) => (
                  <CartItem
                    key={cartItem.cartItemId}
                    itemData={cartItem}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                  />
                ))}
              </div>
            </div>

            {/* Right Column: Coupon & Order Summary Breakdown */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              {/* Coupon Box */}
              <CouponInput />

              {/* Price Breakdown */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-100 dark:border-slate-800 shadow-soft space-y-4 transition-colors">
                <h3 className="font-display font-black text-base text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
                  Bill Summary
                </h3>

                <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex justify-between">
                    <span>Item Subtotal</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {formatCurrency(subtotal)}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                      <span>Promo Discount</span>
                      <span>-{formatCurrency(discount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {deliveryFee === 0 ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">FREE</span>
                      ) : (
                        formatCurrency(deliveryFee)
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Platform & Hygiene Fee</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {formatCurrency(platformFee)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>GST & Restaurant Taxes (5%)</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {formatCurrency(estimatedTax)}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between text-base font-black text-slate-900 dark:text-white">
                    <span>To Pay</span>
                    <span className="text-brand-600 dark:text-brand-400 font-display text-lg">
                      {formatCurrency(grandTotal)}
                    </span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  type="button"
                  onClick={() => navigate('/checkout')}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 to-amber-500 text-white font-bold text-sm shadow-glow flex items-center justify-center gap-2 hover:brightness-105 transition"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Safety Guarantee */}
                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 dark:text-slate-500 pt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>256-bit encrypted checkout & contactless delivery</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

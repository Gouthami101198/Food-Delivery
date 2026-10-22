import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Truck,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { CartItem } from './CartItem';
import { CouponInput } from './CouponInput';
import { formatCurrency } from '../../utils/helpers';

export const CartDrawer = () => {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    discount,
    deliveryFee,
    platformFee,
    estimatedTax,
    grandTotal,
    totalItemCount,
  } = useCart();

  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCartDrawerOpen(false);
    navigate('/checkout');
  };

  const handleViewCart = () => {
    setIsCartDrawerOpen(false);
    navigate('/cart');
  };

  const freeDeliveryThreshold = 299;
  const amountForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const freeDeliveryProgress = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

  if (!isCartDrawerOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartDrawerOpen(false)}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Drawer panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 26, stiffness: 280 }}
          className="relative w-full max-w-full sm:max-w-md bg-white dark:bg-slate-900 border-l border-slate-100 dark:border-slate-800 shadow-2xl h-full flex flex-col z-10 transition-colors"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                  Your Delicious Bag
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free delivery progress bar */}
          {cart.length > 0 && (
            <div className="bg-brand-50/70 dark:bg-brand-950/40 p-3 border-b border-brand-100 dark:border-brand-900/50 text-xs">
              <div className="flex items-center justify-between font-semibold text-brand-900 dark:text-brand-200 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-brand-500" />
                  {amountForFreeDelivery === 0 ? (
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                      🎉 You unlocked FREE Delivery!
                    </span>
                  ) : (
                    <span>
                      Add <strong>{formatCurrency(amountForFreeDelivery)}</strong> more for FREE
                      delivery
                    </span>
                  )}
                </span>
                <span className="text-[11px] text-brand-700 dark:text-brand-400 font-bold">
                  {freeDeliveryProgress.toFixed(0)}%
                </span>
              </div>
              <div className="w-full bg-brand-200/60 dark:bg-brand-900/40 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-brand-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${freeDeliveryProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Body items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-20 h-20 rounded-3xl bg-amber-50 dark:bg-amber-950/50 text-amber-500 flex items-center justify-center text-3xl mb-4 shadow-soft">
                  🍛
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                  Your cart is empty
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mb-6">
                  Good food is always cooking! Explore top biryanis, tiffins, and dhaba curries.
                </p>
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="px-6 py-2.5 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-glow transition"
                >
                  Explore Kitchens
                </button>
              </div>
            ) : (
              <>
                {/* List of items */}
                <div className="space-y-2.5">
                  {cart.map((cartItem) => (
                    <CartItem
                      key={cartItem.cartItemId}
                      itemData={cartItem}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeFromCart}
                    />
                  ))}
                </div>

                {/* Coupon Code Section */}
                <CouponInput />
              </>
            )}
          </div>

          {/* Footer Breakdown & Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80 space-y-3">
              {/* Detailed Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{formatCurrency(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span>Discount</span>
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
                  <span className="font-semibold text-slate-900 dark:text-white">{formatCurrency(platformFee)}</span>
                </div>

                <div className="flex justify-between">
                  <span>GST & Restaurant Taxes (5%)</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{formatCurrency(estimatedTax)}</span>
                </div>

                <div className="flex justify-between text-sm font-black text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span>Total Amount</span>
                  <span className="text-base text-brand-600 dark:text-brand-400 font-display">
                    {formatCurrency(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleViewCart}
                  className="py-3 px-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition"
                >
                  View Details
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleCheckout}
                  className="py-3 px-4 rounded-2xl bg-gradient-to-r from-brand-600 to-amber-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-glow hover:brightness-105 transition"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

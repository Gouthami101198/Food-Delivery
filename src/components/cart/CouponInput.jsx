import React, { useState } from 'react';
import { Tag, Check, X, Sparkles, AlertCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { coupons } from '../../data/offers';
import { formatCurrency } from '../../utils/helpers';

export const CouponInput = () => {
  const { coupon, applyCoupon, removeCoupon, couponError, subtotal } = useCart();
  const [inputCode, setInputCode] = useState('');

  const handleApply = (e) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyCoupon(inputCode);
    if (res.success) {
      setInputCode('');
    }
  };

  const handleQuickApply = (code) => {
    applyCoupon(code);
  };

  return (
    <div className="space-y-3 p-4 bg-slate-50/80 dark:bg-slate-800/60 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-brand-500" />
          <span>Offers & Coupons</span>
        </label>
        {coupon && (
          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full flex items-center gap-1">
            <Check className="w-3 h-3" />
            Applied
          </span>
        )}
      </div>

      {coupon ? (
        <div className="flex items-center justify-between p-3 bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/70 dark:border-emerald-800/60 rounded-xl">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <div>
              <p className="text-xs font-black text-emerald-900 dark:text-emerald-200 tracking-wide">
                {coupon.code}
              </p>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400">{coupon.title}</p>
            </div>
          </div>
          <button
            onClick={removeCoupon}
            className="p-1 rounded-lg text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition"
            title="Remove coupon"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <form onSubmit={handleApply} className="flex gap-2">
          <input
            type="text"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value.toUpperCase())}
            placeholder="Enter promo code (e.g. FEAST50)"
            className="flex-1 px-3 py-2 text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-brand-500 uppercase tracking-wider text-slate-800 dark:text-white placeholder:normal-case placeholder:tracking-normal placeholder:font-normal placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
          <button
            type="submit"
            disabled={!inputCode.trim()}
            className="px-4 py-2 bg-slate-900 dark:bg-brand-500 hover:bg-brand-500 dark:hover:bg-brand-600 disabled:opacity-40 text-white text-xs font-bold rounded-xl transition"
          >
            Apply
          </button>
        </form>
      )}

      {couponError && (
        <div className="flex items-center gap-1.5 text-[11px] text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 p-2 rounded-xl border border-amber-200 dark:border-amber-800/60">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 text-amber-600 dark:text-amber-400" />
          <span>{couponError}</span>
        </div>
      )}

      {/* Quick click suggestions */}
      {!coupon && (
        <div>
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
            Suggested Coupons
          </p>
          <div className="flex flex-wrap gap-1.5">
            {coupons.slice(0, 3).map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => handleQuickApply(c.code)}
                className="px-2.5 py-1 text-[11px] font-bold bg-white dark:bg-slate-800/80 border border-dashed border-slate-300 dark:border-slate-700 hover:border-brand-500 hover:text-brand-600 rounded-lg text-slate-700 dark:text-slate-300 transition"
              >
                {c.code} ({c.discountPercent ? `${c.discountPercent}% OFF` : 'Free Delivery'})
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

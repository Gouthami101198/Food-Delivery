import React from 'react';
import { Star, Flame, Sparkles, Clock, ShieldCheck } from 'lucide-react';

/**
 * Dietary indicator: Green square with green circle for Veg, Red square with brown triangle for Non-Veg
 */
export const DietaryBadge = ({ isVeg, className = '' }) => {
  return (
    <div
      className={`inline-flex items-center justify-center w-4 h-4 border ${
        isVeg ? 'border-emerald-600' : 'border-rose-600'
      } rounded-sm bg-white p-[2px] ${className}`}
      title={isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
    >
      <div
        className={`w-2 h-2 rounded-full ${
          isVeg ? 'bg-emerald-600' : 'bg-rose-600'
        }`}
      />
    </div>
  );
};

/**
 * Rating pill with star
 */
export const RatingBadge = ({ rating, count, size = 'sm' }) => {
  return (
    <div
      className={`inline-flex items-center gap-1 font-bold rounded-full ${
        size === 'lg'
          ? 'px-3 py-1 text-sm bg-emerald-500 text-white shadow-sm'
          : 'px-2 py-0.5 text-xs bg-emerald-600 text-white'
      }`}
    >
      <Star className={`${size === 'lg' ? 'w-4 h-4 fill-white' : 'w-3 h-3 fill-white'}`} />
      <span>{Number(rating).toFixed(1)}</span>
      {count && <span className="opacity-80 text-[10px]">({count})</span>}
    </div>
  );
};

/**
 * Delivery badge showing time & fee
 */
export const DeliveryBadge = ({ time, isFree = false, fee = 0 }) => {
  return (
    <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-600">
      <span className="flex items-center gap-1">
        <Clock className="w-3.5 h-3.5 text-brand-500" />
        {time}
      </span>
      <span>•</span>
      <span className={isFree ? 'text-emerald-600 font-semibold' : ''}>
        {isFree ? 'Free Delivery' : `₹${fee} delivery`}
      </span>
    </div>
  );
};

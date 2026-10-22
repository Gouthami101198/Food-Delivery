import React from 'react';
import { SlidersHorizontal, ArrowUpDown, Check, X, Sparkles } from 'lucide-react';

export const FilterBar = ({
  sortBy,
  onSortChange,
  freeDeliveryOnly,
  onToggleFreeDelivery,
  topRatedOnly,
  onToggleTopRated,
  resultsCount,
  onResetFilters,
  hasActiveFilters,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4 border-b border-slate-100 dark:border-slate-800 mb-6 transition-colors">
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
          Showing <span className="text-brand-600 dark:text-brand-400">{resultsCount}</span> Kitchens
        </span>
        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-[11px] font-bold text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 px-2 py-0.5 rounded-full transition"
          >
            <X className="w-3 h-3" />
            <span>Clear Filters</span>
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* Toggle: Free Delivery */}
        <button
          onClick={onToggleFreeDelivery}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border flex items-center gap-1.5 ${
            freeDeliveryOnly
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
          }`}
        >
          {freeDeliveryOnly && <Check className="w-3.5 h-3.5" />}
          <span>Free Delivery</span>
        </button>

        {/* Toggle: Top Rated (4.8+) */}
        <button
          onClick={onToggleTopRated}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border flex items-center gap-1.5 ${
            topRatedOnly
              ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
          }`}
        >
          {topRatedOnly && <Check className="w-3.5 h-3.5" />}
          <span>Top Rated (4.8+)</span>
        </button>

        {/* Sort Select */}
        <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1 text-xs text-slate-700 dark:text-slate-300">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
          <span className="text-slate-400 dark:text-slate-500 font-medium">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-transparent font-bold text-slate-800 dark:text-white focus:outline-none cursor-pointer"
          >
            <option value="popularity" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">Popularity</option>
            <option value="rating" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">Highest Rated</option>
            <option value="time" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">Fastest Delivery</option>
            <option value="minOrder" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">Min Order Amount</option>
          </select>
        </div>
      </div>
    </div>
  );
};

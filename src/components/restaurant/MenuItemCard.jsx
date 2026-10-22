import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Star, Sparkles, Play, Flame } from 'lucide-react';
import { DietaryBadge } from '../common/Badge';
import { formatCurrency } from '../../utils/helpers';

export const MenuItemCard = ({ dish, onCustomize, onWatchVideo }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 border border-slate-100 dark:border-slate-800 shadow-2xs hover:shadow-card transition-colors flex flex-col-reverse sm:flex-row justify-between gap-4 group relative"
    >
      {/* Left Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Dietary & Badges */}
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <DietaryBadge isVeg={dish.isVeg} />
            {dish.isPopular && (
              <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3 fill-amber-500 text-amber-500" />
                Bestseller
              </span>
            )}
            {dish.videoUrl && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onWatchVideo && onWatchVideo(dish);
                }}
                className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/40 border border-rose-200/80 dark:border-rose-900/50 px-2.5 py-0.5 rounded-full transition shadow-2xs group/btn active:scale-95"
              >
                <Play className="w-2.5 h-2.5 fill-rose-600 dark:fill-rose-400 text-rose-600 dark:text-rose-400 group-hover/btn:scale-110 transition" />
                <span>Watch Sizzle</span>
              </button>
            )}
            {dish.rating && (
              <span className="flex items-center gap-1 text-[11px] font-bold text-slate-700 dark:text-slate-300">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                {dish.rating}
              </span>
            )}
          </div>

          <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition leading-snug">
            {dish.name}
          </h3>

          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-display">
              {formatCurrency(dish.price)}
            </span>
            {dish.originalPrice && (
              <span className="text-xs text-slate-400 dark:text-slate-500 line-through">
                {formatCurrency(dish.originalPrice)}
              </span>
            )}
            {dish.calories && (
              <span className="text-[11px] text-slate-400 dark:text-slate-500">
                • {dish.calories}
              </span>
            )}
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
            {dish.description}
          </p>
        </div>

        {/* Customization prompt note */}
        <p className="text-[11px] text-brand-600 dark:text-brand-400 font-bold mt-3">
          Customizable options available →
        </p>
      </div>

      {/* Right Image with ADD Button & Video Sizzle Trigger */}
      <div className="relative w-full sm:w-36 h-40 sm:h-36 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-800 self-center sm:self-auto group/img">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          loading="lazy"
        />

        {/* Video Reel Play Badge Overlay if video available */}
        {dish.videoUrl && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onWatchVideo && onWatchVideo(dish);
            }}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 hover:bg-rose-600 text-white backdrop-blur-md transition shadow-md group-hover/img:scale-110 active:scale-90"
            title="Watch Chef Sizzle Video"
          >
            <Play className="w-3 h-3 fill-white" />
          </button>
        )}

        {/* Floating Add CTA */}
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-[85%]">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onCustomize(dish)}
            className="w-full py-2 px-3 rounded-xl bg-white/95 dark:bg-slate-800/95 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-500 dark:hover:text-white text-brand-600 dark:text-brand-400 font-black text-xs uppercase tracking-wider backdrop-blur-md shadow-md border border-brand-200 dark:border-slate-700 hover:border-transparent flex items-center justify-center gap-1.5 transition"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>ADD</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Plus, Star, Play, Sparkles } from 'lucide-react';
import { menuItems } from '../../data/menuItems';
import { restaurants } from '../../data/restaurants';
import { formatCurrency } from '../../utils/helpers';
import { DietaryBadge } from '../common/Badge';

export const FeaturedDishes = ({ onSelectDish, onWatchVideo }) => {
  const [activeTab, setActiveTab] = useState('all');

  // Select top popular dishes across the entire menu
  const popularDishes = menuItems.filter((m) => m.isPopular);

  const filteredPopular = popularDishes.filter((dish) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'biryani') return dish.category.toLowerCase().includes('biryani') || dish.category.toLowerCase().includes('kebab');
    if (activeTab === 'north') return dish.category.toLowerCase().includes('north') || dish.category.toLowerCase().includes('curries');
    if (activeTab === 'south') return dish.category.toLowerCase().includes('south');
    if (activeTab === 'sweets') return dish.category.toLowerCase().includes('sweet') || dish.category.toLowerCase().includes('chaat');
    return true;
  }).slice(0, 8);

  const getRestaurantName = (restId) => {
    const r = restaurants.find((item) => item.id === restId);
    return r ? r.name : 'Top Kitchen';
  };

  return (
    <section className="py-6 sm:py-8 bg-gradient-to-br from-amber-50/60 via-orange-50/30 to-amber-50/40 dark:from-slate-900/90 dark:via-slate-900/60 dark:to-slate-900/80 rounded-3xl sm:rounded-4xl p-4 sm:p-8 my-4 sm:my-8 border border-amber-200/60 dark:border-slate-800 shadow-soft transition-colors">
      {/* Header and Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4 sm:mb-6">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-brand-500 to-amber-500 text-white flex items-center justify-center shadow-md animate-sizzle-glow flex-shrink-0">
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 fill-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-100/60 dark:bg-brand-950/40 px-2 py-0.5 rounded-full">
                Most Loved
              </span>
              <span className="text-xs text-slate-400">• Updated Hourly</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black font-display text-slate-900 dark:text-white tracking-tight mt-0.5">
              Trending Craveables & Signature Dishes
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Hand-tossed and slow-dum dishes ordered by 10,000+ local foodies
            </p>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none -mx-2 px-2 sm:mx-0 sm:px-0">
          {[
            { id: 'all', label: 'All Popular' },
            { id: 'biryani', label: 'Biryanis & Kebabs' },
            { id: 'north', label: 'Butter Curries' },
            { id: 'south', label: 'Crispy Tiffins' },
            { id: 'sweets', label: 'Mithai & Chaat' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-sm dark:bg-brand-500'
                  : 'bg-white/80 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Dishes with Animation */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5"
      >
        <AnimatePresence>
          {filteredPopular.map((dish) => (
            <motion.div
              key={dish.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-3.5 border border-slate-100/90 dark:border-slate-800 shadow-2xs hover:shadow-card transition duration-300 flex flex-col justify-between group relative"
            >
              <div>
                {/* Image & Video Trigger Frame */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-3">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2">
                    <DietaryBadge isVeg={dish.isVeg} />
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full text-white text-[11px] font-bold">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{dish.rating}</span>
                  </div>

                  {/* Video Sizzle Button if available */}
                  {dish.videoUrl && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onWatchVideo && onWatchVideo(dish);
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white shadow-md transition group/play active:scale-90 flex items-center gap-1 px-2"
                      title="Watch Sizzle Video"
                    >
                      <Play className="w-3 h-3 fill-white" />
                      <span className="text-[10px] font-black uppercase">Sizzle</span>
                    </button>
                  )}
                </div>

                {/* Content */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 truncate">
                    {getRestaurantName(dish.restaurantId)}
                  </p>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition leading-snug line-clamp-1 mt-0.5">
                    {dish.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {dish.description}
                  </p>
                </div>
              </div>

              {/* Price & Add to Cart button */}
              <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-50 dark:border-slate-800">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-sm font-black text-slate-900 dark:text-white">
                    {formatCurrency(dish.price)}
                  </span>
                  {dish.originalPrice && (
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 line-through">
                      {formatCurrency(dish.originalPrice)}
                    </span>
                  )}
                </div>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => onSelectDish(dish)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold shadow-2xs transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

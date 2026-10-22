import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Utensils, Store, ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { restaurants } from '../../data/restaurants';
import { menuItems } from '../../data/menuItems';
import { formatCurrency } from '../../utils/helpers';
import { DietaryBadge } from './Badge';

export const SearchModal = ({ isOpen, onClose, onSelectItemForCustomization }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const trimmed = query.trim().toLowerCase();

  const filteredRestaurants = trimmed
    ? restaurants.filter(
        (r) =>
          r.name.toLowerCase().includes(trimmed) ||
          r.cuisines.some((c) => c.toLowerCase().includes(trimmed)) ||
          r.category.toLowerCase().includes(trimmed)
      )
    : [];

  const filteredDishes = trimmed
    ? menuItems.filter(
        (m) =>
          m.name.toLowerCase().includes(trimmed) ||
          m.description.toLowerCase().includes(trimmed) ||
          m.category.toLowerCase().includes(trimmed)
      )
    : [];

  const handleSelectRestaurant = (restId) => {
    onClose();
    navigate(`/restaurant/${restId}`);
  };

  const handleSelectDish = (dish) => {
    onClose();
    if (onSelectItemForCustomization) {
      onSelectItemForCustomization(dish);
    } else {
      navigate(`/restaurant/${dish.restaurantId}`);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-3 sm:pt-16 px-3 sm:px-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col max-h-[88vh] sm:max-h-[80vh] transition-colors"
        >
          {/* Header Input */}
          <div className="p-3 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2 sm:gap-3">
            <Search className="w-5 h-5 sm:w-6 sm:h-6 text-brand-500 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dishes, restaurants, cuisines..."
              className="w-full text-sm sm:text-lg font-medium text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none bg-transparent"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="px-2.5 py-1 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition"
            >
              ESC
            </button>
          </div>

          {/* Quick Suggestions / Results */}
          <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
            {!query && (
              <div>
                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
                  Popular Indian Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Mutton Dum Biryani', 'Butter Chicken', 'Masala Dosa', 'Galouti Kebab', 'Chole Bhature', 'Gulab Jamun'].map(
                    (tag) => (
                      <button
                        key={tag}
                        onClick={() => setQuery(tag)}
                        className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-brand-50 dark:bg-slate-800 text-brand-700 dark:text-brand-300 hover:bg-brand-100 dark:hover:bg-slate-700 transition"
                      >
                        {tag}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

            {query && (
              <>
                {/* Restaurants matches */}
                {filteredRestaurants.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
                      <Store className="w-4 h-4 text-brand-500" />
                      <span>Restaurants ({filteredRestaurants.length})</span>
                    </div>
                    <div className="space-y-2">
                      {filteredRestaurants.map((rest) => (
                        <div
                          key={rest.id}
                          onClick={() => handleSelectRestaurant(rest.id)}
                          className="flex items-center justify-between p-3 rounded-2xl hover:bg-brand-50/50 dark:hover:bg-slate-800/60 cursor-pointer transition border border-transparent hover:border-brand-200 dark:hover:border-slate-700 group"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={rest.image}
                              alt={rest.name}
                              className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                            />
                            <div className="min-w-0">
                              <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition truncate">
                                {rest.name}
                              </h4>
                              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                {rest.cuisines.join(', ')} • {rest.deliveryTime}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                              <Star className="w-3 h-3 fill-emerald-600 dark:fill-emerald-400" />
                              {rest.rating}
                            </span>
                            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600 dark:group-hover:text-brand-400 group-hover:translate-x-1 transition" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dishes matches */}
                {filteredDishes.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
                      <Utensils className="w-4 h-4 text-brand-500" />
                      <span>Menu Items ({filteredDishes.length})</span>
                    </div>
                    <div className="space-y-2">
                      {filteredDishes.map((dish) => (
                        <div
                          key={dish.id}
                          onClick={() => handleSelectDish(dish)}
                          className="flex items-center justify-between p-3 rounded-2xl hover:bg-brand-50/50 dark:hover:bg-slate-800/60 cursor-pointer transition border border-transparent hover:border-brand-200 dark:hover:border-slate-700 group"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={dish.image}
                              alt={dish.name}
                              className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                            />
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <DietaryBadge isVeg={dish.isVeg} />
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition truncate">
                                  {dish.name}
                                </h4>
                              </div>
                              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                                {dish.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                            <span className="text-sm font-black text-brand-600 dark:text-brand-400">
                              {formatCurrency(dish.price)}
                            </span>
                            <span className="px-2.5 py-1 text-xs font-semibold bg-brand-500 text-white rounded-lg shadow-sm group-hover:bg-brand-600 transition">
                              Add
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {filteredRestaurants.length === 0 && filteredDishes.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-4xl mb-3">🍕🔍</p>
                    <h4 className="text-base font-bold text-slate-800 dark:text-white">No delicious matches found</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
                      Try searching with different keywords like "Burger", "Pizza", or "Italian"
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

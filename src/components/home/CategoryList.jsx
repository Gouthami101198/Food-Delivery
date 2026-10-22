import React from 'react';
import { motion } from 'framer-motion';
import { categories } from '../../data/categories';

export const CategoryList = ({ selectedCategory, onSelectCategory }) => {
  return (
    <section className="py-5 sm:py-6 border-b border-slate-100 dark:border-slate-800 transition-colors">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black font-display text-slate-900 dark:text-white tracking-tight">
              Explore Cuisines & Categories
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Filter top-rated dishes crafted for your current craving
            </p>
          </div>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => onSelectCategory('all')}
              className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 transition"
            >
              Reset to All
            </button>
          )}
        </div>

        {/* Scrollable category list */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-3 pt-1 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl whitespace-nowrap text-xs font-bold transition flex-shrink-0 border ${
                  isSelected
                    ? 'bg-slate-900 dark:bg-brand-500 text-white border-slate-900 dark:border-brand-500 shadow-md ring-2 ring-slate-900/10 dark:ring-brand-500/20'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200/80 dark:border-slate-700 hover:border-brand-300 dark:hover:border-slate-600 hover:bg-brand-50/40 dark:hover:bg-slate-700/60 shadow-2xs'
                }`}
              >
                <span className="text-base sm:text-lg">{cat.icon}</span>
                <span>{cat.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300'
                  }`}
                >
                  {cat.count}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

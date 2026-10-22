import React from 'react';

export const CategoryTabs = ({ categories, activeCategory, onSelectCategory }) => {
  return (
    <div className="sticky top-16 z-20 bg-[#fbfaf8]/95 dark:bg-[#0b1120]/95 backdrop-blur-md py-3 mb-6 border-b border-slate-200/80 dark:border-slate-800 -mx-4 px-4 sm:mx-0 sm:px-0 transition-colors">
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => onSelectCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            activeCategory === 'all'
              ? 'bg-slate-900 dark:bg-brand-500 text-white shadow-sm'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
          }`}
        >
          All Items
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-slate-900 dark:bg-brand-500 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

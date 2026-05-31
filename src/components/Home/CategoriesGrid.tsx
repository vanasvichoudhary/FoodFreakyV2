import React from 'react';
import { useApp } from '../../context/AppContext';
import { categories } from '../../data/mockData';

export const CategoriesGrid: React.FC = () => {
  const { setSelectedCategory, setActivePage } = useApp();

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setActivePage('menu');
  };

  return (
    <section className="py-16 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <h2 className="text-3xl font-black tracking-tight text-slate-800 dark:text-white font-serif">
            Inspiration for Your Next Meal
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-brand-orange to-brand-yellow mx-auto rounded-full" />
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            Browse our carefully curated categories. Click on any category to explore the full menu.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6">
          {categories
            .filter((c) => c.id !== 'all')
            .map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="group flex flex-col items-center gap-3 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 hover:bg-white dark:bg-slate-950/40 dark:hover:bg-slate-900/60 hover:shadow-xl hover:shadow-orange-500/5 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
              >
                {/* Icon wrapper */}
                <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  {category.icon}
                </div>
                {/* Label */}
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200 group-hover:text-brand-orange transition-colors">
                  {category.name}
                </span>
              </button>
            ))}
        </div>

      </div>
    </section>
  );
};

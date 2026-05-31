import React from 'react';
import { useApp } from '../../context/AppContext';
import { foodItems } from '../../data/mockData';
import { Star, Plus, Heart } from 'lucide-react';

export const PopularDishes: React.FC = () => {
  const { addToCart, openFoodDetails, addToast } = useApp();

  const popularItems = foodItems.filter((item) => item.isPopular);

  const handleFavoriteClick = (e: React.MouseEvent, itemName: string) => {
    e.stopPropagation();
    addToast(`${itemName} added to favorites!`, 'success');
  };

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div className="space-y-3 text-center sm:text-left">
            <h2 className="text-3xl font-black tracking-tight text-slate-800 dark:text-white font-serif">
              Our Popular Dishes
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-brand-orange to-brand-yellow mx-auto sm:mx-0 rounded-full" />
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              Handpicked customer favorites, prepared freshly by top chefs.
            </p>
          </div>
        </div>

        {/* Food Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6.5">
          {popularItems.map((item) => (
            <div
              key={item.id}
              onClick={() => openFoodDetails(item)}
              className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Image Section */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
                
                {/* Floating Heart / Favorites */}
                <button
                  onClick={(e) => handleFavoriteClick(e, item.name)}
                  className="absolute top-4 right-4 p-2 rounded-xl bg-white/70 dark:bg-slate-900/70 hover:bg-white dark:hover:bg-slate-900 backdrop-blur-md transition-colors text-slate-600 dark:text-slate-300 hover:text-rose-500 shadow-md cursor-pointer"
                >
                  <Heart className="w-4 h-4" />
                </button>

                {/* Vegetarian / Non-vegetarian badge */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider text-white ${
                    item.isVegetarian ? 'bg-emerald-600' : 'bg-rose-600'
                  }`}>
                    {item.isVegetarian ? 'Veg' : 'Non-Veg'}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  {/* Category and Rating */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-brand-orange">
                      {item.category}
                    </span>
                    <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400">
                        {item.rating}
                      </span>
                    </div>
                  </div>

                  {/* Food Name */}
                  <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 group-hover:text-brand-orange transition-colors line-clamp-1">
                    {item.name}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-xs text-slate-400 dark:text-slate-500 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Footer Section */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Price</span>
                    <p className="text-lg font-black text-slate-800 dark:text-slate-100">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item);
                    }}
                    className="flex items-center gap-1 bg-gradient-to-r from-brand-orange to-brand-yellow hover:from-orange-500 hover:to-amber-400 text-white font-extrabold text-xs py-2.5 px-4.5 rounded-xl transition-all duration-300 shadow-md shadow-orange-500/10 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

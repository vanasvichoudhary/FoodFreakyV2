import React from 'react';
import { useApp } from '../../context/AppContext';
import { restaurants } from '../../data/mockData';
import { Star, Clock, Bike } from 'lucide-react';

export const FeaturedRestaurants: React.FC = () => {
  const { setActivePage, setSearchQuery, addToast } = useApp();

  const handleRestaurantClick = (resName: string) => {
    // Simulate filtering menu by setting search query to restaurant-like term or just opening the general menu
    setSearchQuery('');
    setActivePage('menu');
    addToast(`Displaying menu for ${resName}`, 'info');
  };

  return (
    <section id="restaurants" className="py-16 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div className="space-y-3 text-center sm:text-left">
            <h2 className="text-3xl font-black tracking-tight text-slate-800 dark:text-white font-serif">
              Featured Restaurants
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-brand-orange to-brand-yellow mx-auto sm:mx-0 rounded-full" />
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              Order from the best kitchens in your neighborhood.
            </p>
          </div>
        </div>

        {/* Restaurants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {restaurants.map((res) => (
            <div
              key={res.id}
              onClick={() => handleRestaurantClick(res.name)}
              className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col h-full"
            >
              {/* Image Banner */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={res.image}
                  alt={res.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-slate-950/10 to-transparent" />
                
                {/* Coupon badge on image */}
                <div className="absolute top-4 left-4 bg-brand-orange text-white font-extrabold text-[9px] px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-md">
                  {res.offers}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 group-hover:text-brand-orange transition-colors">
                      {res.name}
                    </h3>
                    <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md flex-shrink-0">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400">
                        {res.rating}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 dark:text-slate-500 line-clamp-2">
                    {res.description}
                  </p>

                  {/* Cuisine Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {res.cuisines.map((cuisine) => (
                      <span
                        key={cuisine}
                        className="text-[9px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-md"
                      >
                        {cuisine}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer details */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[10px] font-bold text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{res.deliveryTime}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Bike className="w-3.5 h-3.5 text-slate-400" />
                    <span>{res.deliveryFee === 0 ? 'Free Delivery' : `$${res.deliveryFee} Delivery`}</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

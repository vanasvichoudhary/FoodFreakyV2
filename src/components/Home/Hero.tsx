import React from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Flame, ShieldCheck, Clock } from 'lucide-react';

export const Hero: React.FC = () => {
  const { searchQuery, setSearchQuery, setActivePage } = useApp();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActivePage('menu');
  };

  const handleQuickTagClick = (tag: string) => {
    setSearchQuery(tag);
    setActivePage('menu');
  };

  return (
    <div className="relative overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300 py-12 md:py-24">
      {/* Background Graphic Blobs */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 rounded-full bg-brand-yellow/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-96 h-96 rounded-full bg-brand-orange/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-900/40 rounded-full px-4.5 py-1.5 text-xs text-brand-orange font-bold animate-pulse-slow">
              <Flame className="w-4 h-4" />
              Sizzling Deals Up To 50% OFF!
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6.5xl font-black font-serif tracking-tight leading-[1.08] text-slate-800 dark:text-white">
              Super-Fast Delivery,<br />
              <span className="bg-gradient-to-r from-brand-orange to-brand-yellow bg-clip-text text-transparent">
                Delectable Food.
              </span>
            </h1>
            
            <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 font-medium">
              Craving local gourmet delicacies, hot wood-fired pizzas, or a healthy quinoa bowl? Order in seconds and track your warm meal live to your doorstep.
            </p>

            {/* Hero Search Bar */}
            <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto lg:mx-0 flex flex-col sm:flex-row gap-3 bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800/80">
              <div className="relative flex-grow flex items-center pl-3">
                <Search className="w-5 h-5 text-slate-400 mr-2 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Enter dish name, category, or restaurant..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-0 text-sm font-medium focus:outline-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-brand-orange to-brand-yellow hover:from-orange-500 hover:to-amber-400 text-white font-extrabold text-sm py-4 px-8 rounded-xl transition-all duration-300 shadow-md shadow-orange-500/20 cursor-pointer"
              >
                Order Now
              </button>
            </form>

            {/* Quick searches */}
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-2.5">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500">Popular Searches:</span>
              {['Pizza', 'Biryani', 'Burgers', 'Salad', 'Donut'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleQuickTagClick(tag)}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 hover:border-brand-orange dark:hover:border-brand-orange hover:bg-orange-50/50 dark:hover:bg-orange-950/20 text-slate-600 dark:text-slate-300 hover:text-brand-orange dark:hover:text-brand-orange transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Badges/USP */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200/60 dark:border-slate-800/60 max-w-lg mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start gap-1.5">
                <div className="w-9 h-9 rounded-lg bg-orange-50 dark:bg-orange-950/30 flex items-center justify-center text-brand-orange">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">100% Quality Assurance</span>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-1.5">
                <div className="w-9 h-9 rounded-lg bg-orange-50 dark:bg-orange-950/30 flex items-center justify-center text-brand-orange">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">30 Min Guaranteed Delivery</span>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-1.5">
                <div className="w-9 h-9 rounded-lg bg-orange-50 dark:bg-orange-950/30 flex items-center justify-center text-brand-orange">
                  <span className="text-base">🛵</span>
                </div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Live Delivery Tracking</span>
              </div>
            </div>

          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Spinning Food Plate Backdrop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 h-64 sm:h-80 rounded-full bg-brand-orange/5 border border-brand-orange/10 animate-pulse-slow pointer-events-none" />
            
            {/* Main Interactive Rotating Food Plate */}
            <div className="relative max-w-xs sm:max-w-md w-full hover:scale-102 transition-transform duration-500 cursor-grab active:cursor-grabbing">
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
                alt="Signature Dish"
                className="rounded-full object-cover aspect-square shadow-2xl border-4 border-white dark:border-slate-800 shadow-orange-500/10"
              />
              
              {/* Floating review card */}
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-3.5 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce-slow">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
                  alt="Reviewer"
                  className="w-10 h-10 rounded-full object-cover border"
                />
                <div>
                  <div className="flex text-amber-400 text-xs">★★★★★</div>
                  <p className="text-[10px] font-bold text-slate-800 dark:text-white mt-0.5">"Unbelievably delicious!"</p>
                  <p className="text-[8px] text-slate-400">- Jessica V.</p>
                </div>
              </div>

              {/* Floating hot banner */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-red-600 to-orange-500 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                <span>🔥</span> Best Seller #1
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

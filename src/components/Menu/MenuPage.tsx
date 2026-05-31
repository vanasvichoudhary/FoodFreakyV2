import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { foodItems, categories } from '../../data/mockData';
import { Star, Search, SlidersHorizontal, ArrowUpDown, Plus, Minus, Heart } from 'lucide-react';

export const MenuPage: React.FC = () => {
  const {
    addToCart,
    openFoodDetails,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    addToast
  } = useApp();

  const [sortBy, setSortBy] = useState<'popularity' | 'price-low' | 'price-high' | 'rating'>('popularity');
  const [vegOnly, setVegOnly] = useState(false);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  // Reset quantities to 1 if not specified
  const getItemQuantity = (id: string) => quantities[id] || 1;

  const handleAdjustQuantity = (id: string, delta: number) => {
    const current = getItemQuantity(id);
    const nextVal = Math.max(1, current + delta);
    setQuantities((prev) => ({ ...prev, [id]: nextVal }));
  };

  const handleFavoriteClick = (e: React.MouseEvent, name: string) => {
    e.stopPropagation();
    addToast(`${name} added to favorites!`, 'success');
  };

  // Filtered and Sorted items
  const filteredAndSortedItems = useMemo(() => {
    let result = [...foodItems];

    // Filter by Category
    if (selectedCategory !== 'all') {
      result = result.filter((item) => item.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.ingredients.some((ing) => ing.toLowerCase().includes(q))
      );
    }

    // Filter Veg Only
    if (vegOnly) {
      result = result.filter((item) => item.isVegetarian);
    }

    // Sort Items
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // Popularity (default, sort items with isPopular first, then by reviews count)
      result.sort((a, b) => {
        if (a.isPopular && !b.isPopular) return -1;
        if (!a.isPopular && b.isPopular) return 1;
        return b.reviewsCount - a.reviewsCount;
      });
    }

    return result;
  }, [selectedCategory, searchQuery, vegOnly, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Title */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 dark:from-slate-900/50 dark:to-slate-950 p-8 sm:p-12 rounded-3xl text-center text-white mb-10 shadow-lg relative overflow-hidden border border-slate-800">
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-brand-orange/10 blur-2xl pointer-events-none" />
          <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight mb-3">
            Explore Our Culinary Menu
          </h1>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Choose from a wide variety of fresh recipes, prepared with premium ingredients and quick delivery.
          </p>
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column Sidebar - Filters (Sticky-ish) */}
          <div className="lg:col-span-3 space-y-6 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="text-sm font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-brand-orange" />
                Refine Search
              </span>
              {(searchQuery || vegOnly || selectedCategory !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setVegOnly(false);
                    setSelectedCategory('all');
                  }}
                  className="text-[10px] font-bold text-brand-orange hover:underline cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Keyword Search */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-wider text-slate-400 dark:text-slate-500">
                Keyword Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g., Pizza, Cheese..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 pl-4 pr-10 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-brand-orange"
                />
                <Search className="absolute right-3.5 top-3 w-4.5 h-4.5 text-slate-400" />
              </div>
            </div>

            {/* Sorting */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-wider text-slate-400 dark:text-slate-500">
                Sort By
              </label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 px-3 text-xs text-slate-800 dark:text-slate-100 font-bold focus:outline-none focus:border-brand-orange appearance-none"
                >
                  <option value="popularity">Popularity (Rating)</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated First</option>
                </select>
                <ArrowUpDown className="absolute right-3.5 top-3.5 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Veg Only Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-950/50">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-emerald-600 rounded-full inline-block"></span>
                <span className="text-xs font-bold text-slate-700 dark:text-emerald-400">Vegetarian Only</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={vegOnly}
                  onChange={(e) => setVegOnly(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 dark:bg-slate-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
          </div>

          {/* Right Column - Menu grid and Category Chips */}
          <div className="lg:col-span-9 space-y-8">
            
            {/* Category horizontal Chips */}
            <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-4.5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === c.id
                      ? 'bg-gradient-to-r from-brand-orange to-brand-yellow text-white shadow-md'
                      : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <span className="text-sm">{c.icon}</span>
                  <span>{c.name}</span>
                </button>
              ))}
            </div>

            {/* Items count summary */}
            <div className="flex items-center justify-between text-xs font-bold text-slate-400">
              <span>Showing {filteredAndSortedItems.length} items</span>
            </div>

            {/* Empty State */}
            {filteredAndSortedItems.length === 0 && (
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-12 rounded-3xl text-center max-w-md mx-auto space-y-4">
                <span className="text-6xl block">🔍</span>
                <h3 className="text-lg font-black text-slate-800 dark:text-white">No Items Found</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                  We couldn't find any dishes matching your parameters. Try modifying your search term or filters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setVegOnly(false);
                    setSelectedCategory('all');
                  }}
                  className="bg-brand-orange text-white text-xs font-bold py-2.5 px-6 rounded-xl hover:bg-orange-600 transition-colors shadow-md"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Food Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedItems.map((item) => {
                const qty = getItemQuantity(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => openFoodDetails(item)}
                    className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/85 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                  >
                    {/* Image Banner */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
                      
                      {/* Dietary Tag */}
                      <span className={`absolute top-4 left-4 px-2 py-0.5 rounded-lg text-[9px] font-black uppercase text-white ${
                        item.isVegetarian ? 'bg-emerald-600' : 'bg-rose-600'
                      }`}>
                        {item.isVegetarian ? 'Veg' : 'Non-Veg'}
                      </span>

                      {/* Favorites Button */}
                      <button
                        onClick={(e) => handleFavoriteClick(e, item.name)}
                        className="absolute top-4 right-4 p-2 rounded-xl bg-white/70 dark:bg-slate-900/70 hover:bg-white dark:hover:bg-slate-900 backdrop-blur-md transition-colors text-slate-600 dark:text-slate-300 hover:text-rose-500 shadow-md cursor-pointer"
                      >
                        <Heart className="w-4 h-4" />
                      </button>

                      {/* Hot popular tag */}
                      {item.isPopular && (
                        <span className="absolute bottom-4 left-4 bg-amber-500 text-white font-extrabold text-[8px] px-2.5 py-1 rounded-md uppercase tracking-wider shadow">
                          🔥 Best Seller
                        </span>
                      )}
                    </div>

                    {/* Content Body */}
                    <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                      
                      {/* Name / Category */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-extrabold uppercase tracking-wider text-brand-orange">
                            {item.category}
                          </span>
                          <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400">
                              {item.rating}
                            </span>
                          </div>
                        </div>
                        
                        <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 group-hover:text-brand-orange transition-colors line-clamp-1">
                          {item.name}
                        </h3>
                        <p className="text-xs text-slate-400 dark:text-slate-500 line-clamp-2">
                          {item.description}
                        </p>
                      </div>

                      {/* Controls Footer */}
                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-black text-slate-800 dark:text-slate-100">
                            ${item.price.toFixed(2)}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1">
                            🕒 {item.prepTime}
                          </span>
                        </div>

                        {/* Interactive Quantity Selection */}
                        <div className="flex items-center justify-between gap-2.5 pt-1">
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950/40 px-2 py-1"
                          >
                            <button
                              onClick={() => handleAdjustQuantity(item.id, -1)}
                              className="p-1 text-slate-500 hover:text-brand-orange rounded-md"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center text-xs font-black text-slate-800 dark:text-slate-100">
                              {qty}
                            </span>
                            <button
                              onClick={() => handleAdjustQuantity(item.id, 1)}
                              className="p-1 text-slate-500 hover:text-brand-orange rounded-md"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(item, qty);
                              // Reset qty selector back to 1
                              setQuantities((prev) => ({ ...prev, [item.id]: 1 }));
                            }}
                            className="flex-grow flex items-center justify-center gap-1.5 bg-gradient-to-r from-brand-orange to-brand-yellow hover:from-orange-500 hover:to-amber-400 text-white font-extrabold text-xs py-2.5 px-4.5 rounded-xl transition-all duration-300 shadow-md shadow-orange-500/10 cursor-pointer"
                          >
                            Add To Cart
                          </button>
                        </div>
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

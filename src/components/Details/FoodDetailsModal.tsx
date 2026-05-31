import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { foodItems } from '../../data/mockData';
import { X, Star, Plus, Minus, Flame } from 'lucide-react';

export const FoodDetailsModal: React.FC = () => {
  const { selectedFood, closeFoodDetails, addToCart, openFoodDetails } = useApp();
  const [qty, setQty] = useState(1);

  if (!selectedFood) return null;

  const handleAdjustQuantity = (delta: number) => {
    setQty((prev) => Math.max(1, prev + delta));
  };

  // Find similar items (in same category, excluding itself, max 3 items)
  const similarItems = foodItems
    .filter((item) => item.category === selectedFood.category && item.id !== selectedFood.id)
    .slice(0, 3);

  // Nutrition Macros Percentage helper (for nice UI progress bars)
  // Assumes general daily guidelines or simply scales values for clean bars
  const macroGoals = { calories: 2000, protein: 75, carbs: 250, fats: 70 };
  const getPercent = (val: number, max: number) => Math.min(100, (val / max) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={closeFoodDetails}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col animate-fade-in-up">
        
        {/* Header (Top Close button) */}
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={closeFoodDetails}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 transition-colors shadow-md cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 flex-grow">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column - Image gallery, Ingredients, Nutrition */}
            <div className="lg:col-span-6 space-y-6">
              {/* Image banner */}
              <div className="relative aspect-video sm:aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800">
                <img
                  src={selectedFood.image}
                  alt={selectedFood.name}
                  className="w-full h-full object-cover"
                />
                <span className={`absolute top-4 left-4 px-2.5 py-1 rounded-lg text-[9px] font-black uppercase text-white tracking-wider ${
                  selectedFood.isVegetarian ? 'bg-emerald-600' : 'bg-rose-600'
                }`}>
                  {selectedFood.isVegetarian ? 'Veg' : 'Non-Veg'}
                </span>
              </div>

              {/* Nutrition macros */}
              <div className="bg-slate-50 dark:bg-slate-950/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-4">
                <div className="flex items-center gap-1.5 font-black text-slate-800 dark:text-slate-100 text-xs sm:text-sm uppercase tracking-wider">
                  <Flame className="w-4 h-4 text-brand-orange animate-pulse-slow" />
                  Nutritional Macro Information
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Calories */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-bold text-slate-500">
                      <span>Calories</span>
                      <span className="text-slate-700 dark:text-slate-300">{selectedFood.nutrition.calories} kcal</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-orange rounded-full"
                        style={{ width: `${getPercent(selectedFood.nutrition.calories, macroGoals.calories)}%` }}
                      />
                    </div>
                  </div>

                  {/* Protein */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-bold text-slate-500">
                      <span>Protein</span>
                      <span className="text-slate-700 dark:text-slate-300">{selectedFood.nutrition.protein}g</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${getPercent(selectedFood.nutrition.protein, macroGoals.protein)}%` }}
                      />
                    </div>
                  </div>

                  {/* Carbs */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-bold text-slate-500">
                      <span>Carbs</span>
                      <span className="text-slate-700 dark:text-slate-300">{selectedFood.nutrition.carbs}g</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-yellow rounded-full"
                        style={{ width: `${getPercent(selectedFood.nutrition.carbs, macroGoals.carbs)}%` }}
                      />
                    </div>
                  </div>

                  {/* Fats */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-bold text-slate-500">
                      <span>Fats</span>
                      <span className="text-slate-700 dark:text-slate-300">{selectedFood.nutrition.fats}g</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-rose-500 rounded-full"
                        style={{ width: `${getPercent(selectedFood.nutrition.fats, macroGoals.fats)}%` }}
                      />
                    </div>
                  </div>

                </div>
              </div>

              {/* Ingredients */}
              <div className="space-y-3">
                <h4 className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-wider">
                  Ingredients
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedFood.ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="text-xs font-semibold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-3.5 py-1.5 rounded-full"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column - Title, desc, reviews, recommendations, add-to-cart */}
            <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
              
              {/* Title & Info */}
              <div className="space-y-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-brand-orange bg-orange-50 dark:bg-orange-950/20 px-3 py-1 rounded-md">
                  {selectedFood.category}
                </span>
                
                <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white font-serif tracking-tight mt-1">
                  {selectedFood.name}
                </h2>

                <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-400">
                  <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 px-2 py-1 rounded-md text-amber-700 dark:text-amber-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{selectedFood.rating}</span>
                  </div>
                  <span>•</span>
                  <span>{selectedFood.reviewsCount} Customer Reviews</span>
                  <span>•</span>
                  <span>⏱️ {selectedFood.prepTime} Prep Time</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  {selectedFood.description}
                </p>
              </div>

              {/* Customer Reviews Section */}
              <div className="space-y-3.5 border-t border-slate-100 dark:border-slate-800/80 pt-4">
                <h4 className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-wider">
                  Customer Reviews
                </h4>
                
                {selectedFood.reviews.length === 0 ? (
                  <p className="text-xs text-slate-400 dark:text-slate-500 italic">No reviews yet. Be the first to try and review this item!</p>
                ) : (
                  <div className="space-y-3.5 max-h-[160px] overflow-y-auto pr-1">
                    {selectedFood.reviews.map((rev) => (
                      <div key={rev.id} className="p-3 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-850 rounded-2xl flex items-start gap-3">
                        <img
                          src={rev.userAvatar}
                          alt={rev.userName}
                          className="w-8 h-8 rounded-full object-cover border"
                        />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-extrabold text-slate-700 dark:text-slate-300">{rev.userName}</span>
                            <span className="text-[9px] text-slate-400">{rev.date}</span>
                          </div>
                          <div className="flex text-amber-400 text-[10px]">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span key={i}>{i < rev.rating ? '★' : '☆'}</span>
                            ))}
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">{rev.comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quantity Selector & Add Button */}
              <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 p-4.5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase">Total Price</span>
                  <p className="text-2xl font-black text-slate-800 dark:text-slate-100">
                    ${(selectedFood.price * qty).toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 px-2.5 py-1.5">
                    <button
                      onClick={() => handleAdjustQuantity(-1)}
                      className="p-1 text-slate-500 hover:text-brand-orange"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-black text-sm text-slate-800 dark:text-slate-100">
                      {qty}
                    </span>
                    <button
                      onClick={() => handleAdjustQuantity(1)}
                      className="p-1 text-slate-500 hover:text-brand-orange"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(selectedFood, qty);
                      closeFoodDetails();
                    }}
                    className="flex-grow sm:flex-grow-0 flex items-center justify-center gap-2 bg-gradient-to-r from-brand-orange to-brand-yellow hover:from-orange-500 hover:to-amber-400 text-white font-extrabold text-sm py-3 px-6 rounded-xl transition-all duration-300 shadow-md shadow-orange-500/10 cursor-pointer"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>

              {/* Similar items recommendation */}
              {similarItems.length > 0 && (
                <div className="space-y-3 border-t border-slate-100 dark:border-slate-800/80 pt-4">
                  <h4 className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-wider">
                    Recommended Similar Food
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {similarItems.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => openFoodDetails(item)}
                        className="bg-slate-50 dark:bg-slate-950/40 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-100 dark:border-slate-850 p-2.5 rounded-2xl flex flex-col gap-2 transition-colors cursor-pointer text-center"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full aspect-[4/3] object-cover rounded-xl border border-slate-200/40"
                        />
                        <h5 className="text-[10px] font-bold text-slate-800 dark:text-slate-200 truncate px-1">
                          {item.name}
                        </h5>
                        <p className="text-[10px] font-black text-brand-orange leading-none pb-0.5">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

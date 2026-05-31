import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Trash2, Plus, Minus, Tag, X, ArrowRight, ShoppingBag } from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    coupon,
    applyCouponCode,
    removeCoupon,
    setActivePage
  } = useApp();

  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = applyCouponCode(couponInput);
    if (success) setCouponInput('');
  };

  const subtotal = cart.reduce((sum, item) => sum + item.foodItem.price * item.quantity, 0);
  const deliveryFee = coupon?.code === 'FREEDEL' ? 0 : cart.length > 0 ? 2.50 : 0;
  
  let discount = 0;
  if (coupon) {
    if (coupon.discountType === 'percentage') {
      discount = (subtotal * coupon.discountValue) / 100;
    } else {
      discount = coupon.discountValue;
    }
  }

  const total = Math.max(0, subtotal + deliveryFee - discount);

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] bg-slate-50 dark:bg-slate-950 transition-colors duration-300 py-16 flex items-center justify-center">
        <div className="max-w-md w-full mx-4 bg-white dark:bg-slate-900 border border-slate-105 dark:border-slate-800 p-10 rounded-3xl text-center space-y-6 shadow-xl">
          <div className="w-20 h-20 bg-orange-100 dark:bg-orange-950/40 rounded-full flex items-center justify-center mx-auto text-brand-orange">
            <ShoppingBag className="w-10 h-10 animate-bounce-slow" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-black text-slate-800 dark:text-white font-serif">Your Cart is Empty</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed max-w-xs mx-auto">
              Looks like you haven't added anything to your cart yet. Head over to our menu and explore yummy dishes.
            </p>
          </div>
          <button
            onClick={() => setActivePage('menu')}
            className="w-full bg-gradient-to-r from-brand-orange to-brand-yellow hover:from-orange-500 hover:to-amber-400 text-white font-extrabold text-sm py-3 px-6 rounded-xl transition-all duration-300 shadow-md shadow-orange-500/10 cursor-pointer"
          >
            Browse Food Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-2xl sm:text-3.5xl font-black font-serif tracking-tight text-slate-800 dark:text-white mb-8">
          Shopping Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)} Items)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column - Cart Item list */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map(({ foodItem, quantity }) => (
              <div
                key={foodItem.id}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow"
              >
                
                {/* Product Thumbnail & Details */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={foodItem.image}
                    alt={foodItem.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl border border-slate-100 dark:border-slate-800 flex-shrink-0"
                  />
                  <div>
                    <span className="text-[9px] uppercase font-extrabold text-brand-orange tracking-wider">
                      {foodItem.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 line-clamp-1">
                      {foodItem.name}
                    </h3>
                    <p className="text-xs font-black text-slate-700 dark:text-slate-200 mt-1">
                      ${foodItem.price.toFixed(2)} each
                    </p>
                  </div>
                </div>

                {/* Quantity Adjustment Controls & Delete */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-105 dark:border-slate-800/40">
                  
                  {/* Plus/Minus */}
                  <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950/40 px-2 py-1">
                    <button
                      onClick={() => updateQuantity(foodItem.id, quantity - 1)}
                      className="p-1 text-slate-500 hover:text-brand-orange rounded-md"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-black text-slate-800 dark:text-slate-100">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(foodItem.id, quantity + 1)}
                      className="p-1 text-slate-500 hover:text-brand-orange rounded-md"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Line Total */}
                  <span className="text-sm sm:text-base font-black text-slate-800 dark:text-slate-100 w-16 text-right">
                    ${(foodItem.price * quantity).toFixed(2)}
                  </span>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(foodItem.id)}
                    className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/20 text-rose-500 hover:bg-rose-100 hover:text-rose-600 dark:hover:bg-rose-900/40 transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4.5 h-4.5" />
                  </button>

                </div>

              </div>
            ))}

            {/* Back to menu button */}
            <button
              onClick={() => setActivePage('menu')}
              className="text-xs font-extrabold text-brand-orange hover:underline flex items-center gap-1 cursor-pointer pt-2"
            >
              ← Continue Ordering More Food
            </button>
          </div>

          {/* Right Column - Summary & Coupons */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Promo Code input */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-5 rounded-3xl shadow-sm">
              <h3 className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Tag className="w-4 h-4 text-brand-orange" />
                Apply Discount Coupon
              </h3>

              {!coupon ? (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Coupon (e.g. FEAST20)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-grow bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 px-3.5 text-xs focus:outline-none focus:border-brand-orange uppercase text-slate-800 dark:text-slate-100"
                  />
                  <button
                    type="submit"
                    className="bg-slate-800 dark:bg-slate-950 border border-slate-700 dark:border-slate-800 text-white dark:text-slate-300 font-bold text-xs py-2.5 px-5 rounded-xl hover:bg-brand-orange hover:text-white dark:hover:bg-brand-orange transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-between p-3.5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900 rounded-2xl">
                  <div>
                    <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded-md uppercase">
                      Code Applied
                    </span>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1.5 uppercase">
                      {coupon.code}
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                      {coupon.description}
                    </p>
                  </div>
                  
                  <button
                    onClick={removeCoupon}
                    className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X className="w-4.5 h-4.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Price Calculations & Checkout Summary */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-6 rounded-3xl shadow-sm space-y-4">
              <h3 className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-wider pb-3 border-b border-slate-100 dark:border-slate-800">
                Order Bill Summary
              </h3>

              <div className="space-y-3.5 text-xs font-bold text-slate-500 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Cart Subtotal</span>
                  <span className="text-slate-800 dark:text-slate-200">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery Packing Fee</span>
                  <span className="text-slate-800 dark:text-slate-200">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-extrabold uppercase">Free</span>
                    ) : (
                      `$${deliveryFee.toFixed(2)}`
                    )}
                  </span>
                </div>

                {coupon && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>Discount Coupon ({coupon.code})</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between border-t border-slate-100 dark:border-slate-800 pt-4 text-sm font-black text-slate-800 dark:text-white">
                  <span>Grand Total</span>
                  <span className="text-lg font-black text-brand-orange">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={() => setActivePage('checkout')}
                className="w-full mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-brand-orange to-brand-yellow hover:from-orange-500 hover:to-amber-400 text-white font-extrabold text-sm py-4 rounded-2xl transition-all duration-300 shadow-md shadow-orange-500/20 cursor-pointer"
              >
                Proceed To Checkout
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CreditCard, Truck, Wallet, Check, AlertCircle } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    coupon,
    userProfile,
    placeOrder,
    setActivePage,
    addToast
  } = useApp();

  const [address, setAddress] = useState(userProfile.address);
  const [phone, setPhone] = useState(userProfile.phone);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.foodItem.price * item.quantity, 0);
  const deliveryFee = coupon?.code === 'FREEDEL' ? 0 : 2.50;
  
  let discount = 0;
  if (coupon) {
    if (coupon.discountType === 'percentage') {
      discount = (subtotal * coupon.discountValue) / 100;
    } else {
      discount = coupon.discountValue;
    }
  }

  const total = Math.max(0, subtotal + deliveryFee - discount);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!address.trim()) {
      addToast('Please enter a delivery address.', 'warning');
      return;
    }

    if (!phone.trim()) {
      addToast('Please enter your phone number.', 'warning');
      return;
    }

    setIsSubmitting(true);

    // Simulate payment processing/validation delay
    setTimeout(() => {
      placeOrder(address, paymentMethod.toUpperCase());
      setIsSubmitting(false);
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] bg-slate-50 dark:bg-slate-950 py-16 flex items-center justify-center">
        <div className="max-w-md w-full mx-4 bg-white dark:bg-slate-900 border p-10 rounded-3xl text-center space-y-4 shadow-xl">
          <span className="text-5xl block">🛒</span>
          <h3 className="text-xl font-black text-slate-800 dark:text-white font-serif">Checkout is Empty</h3>
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
            You don't have any items to checkout. Add items to your cart first.
          </p>
          <button
            onClick={() => setActivePage('menu')}
            className="w-full bg-brand-orange text-white font-bold text-xs py-3 px-6 rounded-xl shadow-md cursor-pointer"
          >
            Go To Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-2xl sm:text-3.5xl font-black font-serif tracking-tight text-slate-800 dark:text-white mb-8">
          Checkout Details
        </h1>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column - Forms and Payment selectors */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Delivery address form */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-6 sm:p-8 rounded-3xl shadow-sm space-y-4">
              <h3 className="text-sm sm:text-base font-black text-slate-800 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <Truck className="w-5 h-5 text-brand-orange" />
                Delivery Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-450 dark:text-slate-500">
                    Recipient Name
                  </label>
                  <input
                    type="text"
                    value={userProfile.name}
                    disabled
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 text-xs font-semibold text-slate-500 dark:text-slate-400 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-450 dark:text-slate-500">
                    Contact Phone Number
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-brand-orange focus:outline-none rounded-xl py-3 px-4 text-xs font-bold text-slate-800 dark:text-slate-100"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-450 dark:text-slate-500">
                  Full Delivery Address
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full min-h-[80px] bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-brand-orange focus:outline-none rounded-xl py-3 px-4 text-xs font-bold text-slate-800 dark:text-slate-100"
                  required
                />
              </div>
            </div>

            {/* Payment Method selectors */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-6 sm:p-8 rounded-3xl shadow-sm space-y-4">
              <h3 className="text-sm sm:text-base font-black text-slate-800 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <Wallet className="w-5 h-5 text-brand-orange" />
                Select Payment Mode
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                
                {/* Card */}
                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`group p-5 rounded-2xl border-2 flex flex-col justify-between gap-4 cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-brand-orange bg-orange-50/20 dark:bg-orange-950/10'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <CreditCard className={`w-6 h-6 ${paymentMethod === 'card' ? 'text-brand-orange' : 'text-slate-400'}`} />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === 'card' ? 'border-brand-orange bg-brand-orange text-white' : 'border-slate-300 dark:border-slate-700'
                    }`}>
                      {paymentMethod === 'card' && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-850 dark:text-slate-100">Credit/Debit Card</h4>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">Pay via Visa, Mastercard</p>
                  </div>
                </div>

                {/* UPI */}
                <div
                  onClick={() => setPaymentMethod('upi')}
                  className={`group p-5 rounded-2xl border-2 flex flex-col justify-between gap-4 cursor-pointer transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-brand-orange bg-orange-50/20 dark:bg-orange-950/10'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-black tracking-widest ${paymentMethod === 'upi' ? 'text-brand-orange' : 'text-slate-400'}`}>UPI</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === 'upi' ? 'border-brand-orange bg-brand-orange text-white' : 'border-slate-300 dark:border-slate-700'
                    }`}>
                      {paymentMethod === 'upi' && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-850 dark:text-slate-100">Instant UPI</h4>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">Pay via GPay, PhonePe, Paytm</p>
                  </div>
                </div>

                {/* Cash on Delivery */}
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`group p-5 rounded-2xl border-2 flex flex-col justify-between gap-4 cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-brand-orange bg-orange-50/20 dark:bg-orange-950/10'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl leading-none">💵</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === 'cod' ? 'border-brand-orange bg-brand-orange text-white' : 'border-slate-300 dark:border-slate-700'
                    }`}>
                      {paymentMethod === 'cod' && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-850 dark:text-slate-100">Cash on Delivery</h4>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">Pay when food arrives</p>
                  </div>
                </div>

              </div>

              {/* Credit card inputs Mock */}
              {paymentMethod === 'card' && (
                <div className="bg-slate-50 dark:bg-slate-950/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 space-y-4 animate-fade-in-up mt-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Simulated Card Details</p>
                  
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500">Card Number</label>
                    <input
                      type="text"
                      value="4111 2222 3333 4444"
                      disabled
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-xl py-2.5 px-3 text-xs font-bold text-slate-800 dark:text-slate-100"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500">Expiry Date</label>
                      <input
                        type="text"
                        value="12 / 30"
                        disabled
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-xl py-2.5 px-3 text-xs font-bold text-slate-800 dark:text-slate-100"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500">CVV</label>
                      <input
                        type="password"
                        value="123"
                        disabled
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-xl py-2.5 px-3 text-xs font-bold text-slate-850 dark:text-slate-100"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* UPI input Mock */}
              {paymentMethod === 'upi' && (
                <div className="bg-slate-50 dark:bg-slate-950/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 space-y-2 animate-fade-in-up mt-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Simulated UPI Address</p>
                  <input
                    type="text"
                    value={`${userProfile.email.split('@')[0]}@okaxis`}
                    disabled
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-xl py-3 px-4 text-xs font-bold text-slate-800 dark:text-slate-100"
                  />
                </div>
              )}
            </div>

          </div>

          {/* Right Column - Order breakdown and placement */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Product list summary */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-5 rounded-3xl shadow-sm space-y-4">
              <h3 className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
                <span>Items Ordered</span>
                <span className="text-slate-400 font-bold">({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
              </h3>

              <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1">
                {cart.map(({ foodItem, quantity }) => (
                  <div key={foodItem.id} className="flex items-center gap-3">
                    <img
                      src={foodItem.image}
                      alt={foodItem.name}
                      className="w-11 h-11 object-cover rounded-lg border flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-850 dark:text-slate-100 truncate">{foodItem.name}</h4>
                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Qty: {quantity} • ${foodItem.price.toFixed(2)}</p>
                    </div>
                    <span className="text-xs font-black text-slate-800 dark:text-slate-100">
                      ${(foodItem.price * quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bill summary and place order */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-6 rounded-3xl shadow-sm space-y-4">
              <h3 className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-wider pb-3 border-b border-slate-100 dark:border-slate-800">
                Payment Summary
              </h3>

              <div className="space-y-3.5 text-xs font-bold text-slate-500 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Items Subtotal</span>
                  <span className="text-slate-800 dark:text-slate-200">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery Packing Fee</span>
                  <span className="text-slate-800 dark:text-slate-200">
                    {deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>

                {coupon && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>Discount Coupon ({coupon.code})</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between border-t border-slate-100 dark:border-slate-800 pt-4 text-sm font-black text-slate-800 dark:text-white">
                  <span>Total Bill Amount</span>
                  <span className="text-lg font-black text-brand-orange">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Place Order Trigger */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-brand-orange to-brand-yellow hover:from-orange-500 hover:to-amber-400 text-white font-extrabold text-sm py-4 rounded-2xl transition-all duration-300 shadow-md shadow-orange-500/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Payment...</span>
                  </div>
                ) : (
                  <span>Place Order & Pay (${total.toFixed(2)})</span>
                )}
              </button>

              <div className="flex gap-2 items-start justify-center pt-2 text-[10px] text-slate-400 max-w-[240px] mx-auto text-center leading-normal">
                <AlertCircle className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                <span>By placing order, you agree to our standard terms and delivery schedules.</span>
              </div>
            </div>

          </div>

        </form>

      </div>
    </div>
  );
};

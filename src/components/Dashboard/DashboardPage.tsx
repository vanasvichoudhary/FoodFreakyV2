import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { Order } from '../../context/AppContext';
import { Phone, MapPin, Mail, ChevronDown, ChevronUp, Star } from 'lucide-react';

export const DashboardPage = () => {
  const {
    orders,
    activeOrderId,
    userProfile,
    updateUserProfile,
    addToCart,
    setActivePage,
    addToast
  } = useApp();

  const [name, setName] = useState(userProfile.name);
  const [phone, setPhone] = useState(userProfile.phone);
  const [address, setAddress] = useState(userProfile.address);
  const [isEditing, setIsEditing] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const activeOrder = orders.find((o) => o.id === activeOrderId);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ name, phone, address });
    setIsEditing(false);
  };

  const handleReorder = (order: Order) => {
    order.items.forEach((item) => {
      addToCart(item.foodItem, item.quantity);
    });
    setActivePage('cart');
    addToast('Reordered items successfully copied to cart!', 'success');
  };

  const toggleExpandOrder = (id: string) => {
    setExpandedOrder((prev) => (prev === id ? null : id));
  };

  // Delivery tracker visual helpers
  const getStepStatus = (step: number, orderStatus: string) => {
    const statusOrder = ['confirmed', 'preparing', 'out-for-delivery', 'delivered'];
    const currentIdx = statusOrder.indexOf(orderStatus);
    
    if (currentIdx > step) return 'completed';
    if (currentIdx === step) return 'active';
    return 'pending';
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-2xl sm:text-3.5xl font-black font-serif tracking-tight text-slate-800 dark:text-white mb-8">
          User Dashboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column - Profile & Form */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl shadow-sm space-y-6">
              
              {/* Profile Overview */}
              <div className="text-center space-y-4 pt-4">
                <div className="relative inline-block">
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-brand-orange shadow-lg mx-auto"
                  />
                  <span className="absolute bottom-1 right-1 bg-brand-orange text-white p-1 rounded-full text-xs font-black w-6 h-6 flex items-center justify-center border border-white">
                    ✓
                  </span>
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-800 dark:text-white">{userProfile.name}</h2>
                  <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mt-1">Premium Customer</p>
                </div>
              </div>

              {/* Profile Details or Edit Form */}
              {!isEditing ? (
                <div className="space-y-4 text-xs font-bold text-slate-600 dark:text-slate-350 border-t border-slate-100 dark:border-slate-800 pt-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span>{userProfile.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span>{userProfile.phone}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{userProfile.address}</span>
                  </div>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full mt-4 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs py-2.5 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    Edit Profile Details
                  </button>
                </div>
              ) : (
                <form onSubmit={handleProfileSave} className="space-y-4 border-t border-slate-100 dark:border-slate-800 pt-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase">Your Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl py-2 px-3 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-brand-orange"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase">Phone Number</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl py-2 px-3 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-brand-orange"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase">Delivery Address</label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full min-h-[60px] bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl py-2 px-3 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-brand-orange"
                      required
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs py-2 px-3 rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-brand-orange text-white font-bold text-xs py-2 px-3 rounded-xl shadow-md"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

          {/* Right Column - Order Tracking & Order History */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Live Order Tracker */}
            {activeOrder && (
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 sm:p-8 rounded-3xl shadow-lg space-y-6">
                
                {/* Tracker Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div>
                    <span className="text-[10px] font-black uppercase text-brand-orange tracking-widest bg-orange-100 dark:bg-orange-950/40 px-3 py-1 rounded-md">
                      Live Delivery Tracker
                    </span>
                    <h3 className="text-base font-bold text-slate-850 dark:text-slate-100 mt-2.5">
                      Order ID: {activeOrder.id}
                    </h3>
                  </div>
                  <div className="text-right sm:text-right flex items-center sm:block gap-4">
                    <p className="text-xs text-slate-400 font-bold">Estimated Delivery In</p>
                    <p className="text-xl font-black text-slate-800 dark:text-white">
                      {activeOrder.status === 'delivered' ? 'Arrived!' : '25-30 Mins'}
                    </p>
                  </div>
                </div>

                {/* Progress Visualizer */}
                <div className="relative py-4">
                  {/* Progress Line */}
                  <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 bg-slate-200 dark:bg-slate-800 rounded-full" />
                  
                  {/* Active Progress Overlay */}
                  <div
                    className="absolute top-1/2 left-0 -translate-y-1/2 h-1 bg-gradient-to-r from-brand-orange to-brand-yellow rounded-full transition-all duration-1000"
                    style={{
                      width:
                        activeOrder.status === 'confirmed'
                          ? '12.5%'
                          : activeOrder.status === 'preparing'
                          ? '37.5%'
                          : activeOrder.status === 'out-for-delivery'
                          ? '62.5%'
                          : '100%',
                    }}
                  />

                  {/* Steps */}
                  <div className="relative flex justify-between">
                    {[
                      { label: 'Confirmed', icon: '📝' },
                      { label: 'Preparing', icon: '🍳' },
                      { label: 'Dispatched', icon: '🛵' },
                      { label: 'Delivered', icon: '🍽️' },
                    ].map((step, idx) => {
                      const stepStatus = getStepStatus(idx, activeOrder.status);
                      
                      return (
                        <div key={idx} className="flex flex-col items-center gap-2 relative">
                          {/* Dot / Icon */}
                          <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-sm sm:text-base border shadow-sm z-10 transition-all duration-300 ${
                            stepStatus === 'completed'
                              ? 'bg-brand-orange border-brand-orange text-white'
                              : stepStatus === 'active'
                              ? 'bg-brand-yellow border-brand-yellow text-white scale-110 ring-4 ring-amber-500/10'
                              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400'
                          }`}>
                            {step.icon}
                          </div>
                          
                          {/* Label */}
                          <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-wider ${
                            stepStatus === 'active'
                              ? 'text-brand-orange font-black'
                              : stepStatus === 'completed'
                              ? 'text-slate-800 dark:text-slate-200'
                              : 'text-slate-400'
                          }`}>
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Rider Details (Mock) */}
                <div className="bg-slate-50 dark:bg-slate-950/40 p-4.5 rounded-2xl border border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 w-full sm:w-auto">
                    <div className="w-11 h-11 bg-orange-100 dark:bg-orange-950/40 rounded-full flex items-center justify-center text-brand-orange text-lg">
                      🛵
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">David Lee (Delivery Partner)</h4>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1 mt-0.5">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> 4.9 • Verified Valet
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <a
                      href="tel:+15551234"
                      onClick={(e) => {
                        e.preventDefault();
                        addToast("Calling Rider David Lee... Rider is currently on the move!", "info");
                      }}
                      className="flex-grow sm:flex-grow-0 flex items-center justify-center gap-1.5 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-350 font-bold text-xs py-2 px-4 rounded-xl transition-colors cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5" /> Call Rider
                    </a>
                  </div>
                </div>

              </div>
            )}

            {/* Order History */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
              <h3 className="text-sm sm:text-base font-black text-slate-800 dark:text-slate-100 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
                <span>Your Order History</span>
                <span className="text-slate-400 font-bold">({orders.length})</span>
              </h3>

              {orders.length === 0 ? (
                <div className="text-center py-8 space-y-3">
                  <span className="text-4xl block">📝</span>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-white">No Orders Placed Yet</h4>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500">Your past orders will appear here once you place them.</p>
                  <button
                    onClick={() => setActivePage('menu')}
                    className="bg-brand-orange text-white text-xs font-semibold py-2 px-4 rounded-xl shadow-md"
                  >
                    Go Order Food
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => {
                    const isExpanded = expandedOrder === order.id;

                    return (
                      <div
                        key={order.id}
                        className="border border-slate-200/60 dark:border-slate-800/80 rounded-2xl overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                      >
                        {/* Collapsed Order Card Summary header */}
                        <div
                          onClick={() => toggleExpandOrder(order.id)}
                          className="p-4 bg-slate-50 dark:bg-slate-950/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-bold text-slate-850 dark:text-slate-100">
                                {order.id}
                              </span>
                              <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                                order.status === 'delivered'
                                  ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-450'
                                  : 'bg-orange-100 dark:bg-orange-950/40 text-brand-orange'
                              }`}>
                                {order.status}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-400 dark:text-slate-500">{order.date}</p>
                          </div>

                          <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                            <span className="text-xs font-black text-slate-850 dark:text-slate-100">
                              ${order.total.toFixed(2)}
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleReorder(order);
                                }}
                                className="bg-brand-orange/10 hover:bg-brand-orange text-brand-orange hover:text-white font-extrabold text-[10px] py-1.5 px-3 rounded-lg transition-colors cursor-pointer"
                              >
                                Reorder
                              </button>
                              {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-450" /> : <ChevronDown className="w-4 h-4 text-slate-455" />}
                            </div>
                          </div>
                        </div>

                        {/* Expanded details container */}
                        {isExpanded && (
                          <div className="p-4 border-t border-slate-100 dark:border-slate-800/80 space-y-4 animate-fade-in-up">
                            
                            {/* Product list */}
                            <div className="space-y-2.5">
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Ordered items</p>
                              {order.items.map(({ foodItem, quantity }) => (
                                <div key={foodItem.id} className="flex justify-between items-center text-xs font-bold text-slate-650 dark:text-slate-300">
                                  <span>{foodItem.name} (x{quantity})</span>
                                  <span className="text-slate-800 dark:text-white">${(foodItem.price * quantity).toFixed(2)}</span>
                                </div>
                              ))}
                            </div>

                            {/* Details Address & Bill summary */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[10px] font-bold text-slate-400">
                              <div>
                                <p className="uppercase text-[9px] font-black tracking-wider text-slate-450">Delivery Address</p>
                                <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed font-semibold">{order.address}</p>
                                <p className="uppercase text-[9px] font-black tracking-wider text-slate-455 mt-3">Payment Mode</p>
                                <p className="text-slate-600 dark:text-slate-350 mt-1 font-semibold">{order.paymentMethod}</p>
                              </div>

                              <div className="space-y-1.5 md:pl-6 md:border-l border-slate-100 dark:border-slate-800/80">
                                <p className="uppercase text-[9px] font-black tracking-wider text-slate-450 pb-1">Price Summary</p>
                                <div className="flex justify-between">
                                  <span>Subtotal</span>
                                  <span className="text-slate-600 dark:text-slate-300">${order.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Delivery Packing Fee</span>
                                  <span className="text-slate-600 dark:text-slate-300">${order.deliveryFee.toFixed(2)}</span>
                                </div>
                                {order.discount > 0 && (
                                  <div className="flex justify-between text-emerald-600">
                                    <span>Discount Discount</span>
                                    <span>-${order.discount.toFixed(2)}</span>
                                  </div>
                                )}
                                <div className="flex justify-between text-xs font-black text-slate-800 dark:text-white pt-1.5 border-t border-slate-100 dark:border-slate-800">
                                  <span>Grand Total</span>
                                  <span className="text-brand-orange">${order.total.toFixed(2)}</span>
                                </div>
                              </div>
                            </div>

                          </div>
                        )}

                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

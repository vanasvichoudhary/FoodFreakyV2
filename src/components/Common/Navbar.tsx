import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShoppingCart,
  Search,
  User,
  Sun,
  Moon,
  Menu as MenuIcon,
  X,
  ChevronDown,
  LogOut,
  Compass
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    cart,
    theme,
    toggleTheme,
    activePage,
    setActivePage,
    searchQuery,
    setSearchQuery,
    userProfile,
    addToast
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActivePage('menu');
  };

  const handleLinkClick = (page: 'home' | 'menu' | 'cart' | 'dashboard') => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    addToast('Logout is simulated for demo purposes!', 'info');
    setIsProfileDropdownOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 w-full transition-all duration-300 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleLinkClick('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-orange to-brand-yellow flex items-center justify-center shadow-lg shadow-orange-500/20">
              <span className="text-white font-extrabold text-xl font-serif">F</span>
            </div>
            <span className="text-2xl font-black font-serif tracking-tight bg-gradient-to-r from-brand-orange to-brand-yellow bg-clip-text text-transparent">
              Feast<span className="text-slate-800 dark:text-white">Express</span>
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => handleLinkClick('home')}
              className={`text-sm font-semibold transition-colors duration-200 ${
                activePage === 'home' ? 'text-brand-orange' : 'text-slate-600 dark:text-slate-300 hover:text-brand-orange'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleLinkClick('menu')}
              className={`text-sm font-semibold transition-colors duration-200 ${
                activePage === 'menu' ? 'text-brand-orange' : 'text-slate-600 dark:text-slate-300 hover:text-brand-orange'
              }`}
            >
              Menu
            </button>
            <a
              href="#offers"
              onClick={() => {
                handleLinkClick('home');
                setTimeout(() => document.getElementById('offers')?.scrollIntoView({ behavior: 'smooth' }), 100);
              }}
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-orange transition-colors duration-200"
            >
              Offers
            </a>
            <a
              href="#restaurants"
              onClick={() => {
                handleLinkClick('home');
                setTimeout(() => document.getElementById('restaurants')?.scrollIntoView({ behavior: 'smooth' }), 100);
              }}
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-orange transition-colors duration-200"
            >
              Restaurants
            </a>
            <a
              href="#about"
              onClick={() => {
                handleLinkClick('home');
                setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100);
              }}
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-orange transition-colors duration-200"
            >
              About Us
            </a>
          </div>

          {/* Search bar & Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search spicy biryani, pizza..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-56 lg:w-64 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full py-2 pl-4 pr-10 text-xs font-medium focus:outline-none focus:border-brand-orange dark:focus:border-brand-orange transition-colors text-slate-800 dark:text-slate-100"
              />
              <button type="submit" className="absolute right-3 top-2.5 text-slate-400 hover:text-brand-orange">
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors text-slate-600 dark:text-slate-300"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => handleLinkClick('cart')}
              className="relative p-2.5 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors text-slate-600 dark:text-slate-300"
            >
              <ShoppingCart className="w-4 h-4" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-orange text-[10px] font-bold text-white animate-bounce-slow">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
              >
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="w-7 h-7 rounded-full object-cover border border-brand-orange/40"
                />
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden py-1 animate-fade-in-up">
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800/80">
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Signed in as</p>
                    <p className="text-sm text-slate-800 dark:text-slate-200 font-bold truncate mt-0.5">{userProfile.name}</p>
                  </div>
                  
                  <button
                    onClick={() => {
                      handleLinkClick('dashboard');
                      setIsProfileDropdownOpen(false);
                    }}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-left"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    My Dashboard
                  </button>

                  <button
                    onClick={() => {
                      handleLinkClick('dashboard');
                      setIsProfileDropdownOpen(false);
                    }}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-left"
                  >
                    <Compass className="w-4 h-4 text-slate-400" />
                    Track Deliveries
                  </button>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors text-left border-t border-slate-100 dark:border-slate-800/80"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Mobile Menu Icon */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Theme Toggle Mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
            >
              {theme === 'light' ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
            </button>

            {/* Cart Button Mobile */}
            <button
              onClick={() => handleLinkClick('cart')}
              className="relative p-2 rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
            >
              <ShoppingCart className="w-4.5 h-4.5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-brand-orange text-[9px] font-bold text-white">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-950 p-4 space-y-4 animate-fade-in-up">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full py-2.5 pl-4 pr-10 text-xs focus:outline-none text-slate-800 dark:text-slate-100"
            />
            <button type="submit" className="absolute right-3 top-3 text-slate-400">
              <Search className="w-4.5 h-4.5" />
            </button>
          </form>

          <div className="flex flex-col gap-3 font-semibold text-sm">
            <button onClick={() => handleLinkClick('home')} className="text-left py-2 hover:text-brand-orange text-slate-700 dark:text-slate-200">
              Home
            </button>
            <button onClick={() => handleLinkClick('menu')} className="text-left py-2 hover:text-brand-orange text-slate-700 dark:text-slate-200">
              Browse Menu
            </button>
            <button onClick={() => handleLinkClick('dashboard')} className="text-left py-2 hover:text-brand-orange text-slate-700 dark:text-slate-200">
              My Profile
            </button>
            <button onClick={() => handleLinkClick('dashboard')} className="text-left py-2 hover:text-brand-orange text-slate-700 dark:text-slate-200">
              Track Orders
            </button>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
            <img src={userProfile.avatar} alt={userProfile.name} className="w-10 h-10 rounded-full object-cover border" />
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{userProfile.name}</p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500">{userProfile.email}</p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

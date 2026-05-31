import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Send, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const { addToast } = useApp();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      addToast('Please enter a valid email address.', 'warning');
      return;
    }
    addToast('Welcome to the club! Use coupon FEAST20 for 20% off!', 'success');
    setEmail('');
  };

  return (
    <footer id="about" className="bg-slate-900 text-slate-300 dark:bg-slate-980 border-t border-slate-800/80">
      
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-2">
            <h3 className="text-xl sm:text-2xl font-black text-white font-serif tracking-tight">
              Get App-only Discounts & Special Offers!
            </h3>
            <p className="text-sm text-slate-400 max-w-xl">
              Subscribe to our monthly newsletter and receive exclusive recipes, discount codes, and local culinary updates.
            </p>
          </div>
          <div className="lg:col-span-5">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 focus:border-brand-orange focus:outline-none rounded-xl py-3 pl-11 pr-4 text-xs text-white"
                  required
                />
                <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-brand-orange to-brand-yellow hover:from-orange-500 hover:to-amber-400 text-white font-bold text-xs py-3 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-orange-500/10 cursor-pointer"
              >
                Subscribe
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Column 1 - Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-orange to-brand-yellow flex items-center justify-center">
                <span className="text-white font-extrabold text-lg font-serif">F</span>
              </div>
              <span className="text-xl font-black font-serif tracking-tight text-white">
                Feast<span className="text-slate-400">Express</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              FeastExpress is your premier culinary companion, delivering delectable cuisines from high-end local kitchens straight to your table. Experience fresh flavors, custom nutritional profiles, and lightning-fast tracking.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-brand-orange hover:text-white transition-all text-slate-400">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-brand-orange hover:text-white transition-all text-slate-400">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                </svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-brand-orange hover:text-white transition-all text-slate-400">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-brand-orange hover:text-white transition-all text-slate-400">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Featured Kitchens</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Our Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog Articles</a></li>
            </ul>
          </div>

          {/* Column 3 - Support */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Customer Support</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Order Tracking</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Refund & Return Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
            </ul>
          </div>

          {/* Column 4 - Contact Info */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Get in Touch</h4>
            <ul className="space-y-3.5 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <span className="text-brand-orange">📍</span>
                <span>100 Wilshire Boulevard, Suite 700,<br />Santa Monica, CA 90401</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-brand-orange">📞</span>
                <span>+1 (555) 366-3397 (FOOD-EXPRESS)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-brand-orange">✉️</span>
                <span>support@feastexpress.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copywrite Bottom */}
        <div className="mt-16 pt-8 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} FeastExpress Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

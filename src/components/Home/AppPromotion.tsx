import React from 'react';
import { Smartphone, Download, CheckCircle2 } from 'lucide-react';

export const AppPromotion: React.FC = () => {
  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 dark:from-slate-950 dark:to-slate-980 rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl border border-slate-800">
          {/* Ambient Glows */}
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-brand-orange/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-brand-yellow/10 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-orange bg-brand-orange/10 px-3 py-1.5 rounded-lg border border-brand-orange/20">
                Download Our Mobile App
              </span>
              
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight font-serif tracking-tight">
                Order Food on the Go &<br />
                Get 50% Off Your First App Order
              </h2>
              
              <p className="text-sm text-slate-400 max-w-xl mx-auto lg:mx-0">
                Unlock instant access to specialized kitchen partners, custom meal planning trackers, push alerts on orders, and loyalty reward programs.
              </p>

              {/* Checklist */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto lg:mx-0 text-slate-300 text-xs font-semibold">
                <li className="flex items-center gap-2 justify-center lg:justify-start">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Real-Time Order Routing</span>
                </li>
                <li className="flex items-center gap-2 justify-center lg:justify-start">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Exclusive Chef Recommendations</span>
                </li>
                <li className="flex items-center gap-2 justify-center lg:justify-start">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Flexible Multi-Address Book</span>
                </li>
                <li className="flex items-center gap-2 justify-center lg:justify-start">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>One-Click Secure Checkout</span>
                </li>
              </ul>

              {/* App Store Buttons */}
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 pt-4">
                {/* App Store */}
                <a
                  href="#"
                  className="flex items-center gap-3 bg-slate-800 hover:bg-slate-700 text-white py-3 px-5 rounded-2xl transition-colors border border-slate-700 w-48 sm:w-auto"
                >
                  <Smartphone className="w-6 h-6 text-brand-orange" />
                  <div className="text-left">
                    <p className="text-[9px] font-bold text-slate-400 uppercase">Download on the</p>
                    <p className="text-sm font-black">App Store</p>
                  </div>
                </a>
                
                {/* Google Play */}
                <a
                  href="#"
                  className="flex items-center gap-3 bg-slate-800 hover:bg-slate-700 text-white py-3 px-5 rounded-2xl transition-colors border border-slate-700 w-48 sm:w-auto"
                >
                  <Download className="w-6 h-6 text-brand-yellow" />
                  <div className="text-left">
                    <p className="text-[9px] font-bold text-slate-400 uppercase">Get it on</p>
                    <p className="text-sm font-black">Google Play</p>
                  </div>
                </a>
              </div>

            </div>

            {/* Right QR and Mobile Graphic mockup */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row items-center justify-center gap-8 bg-slate-800/40 p-6 sm:p-8 rounded-3xl border border-slate-800/80">
              {/* QR Code Graphic wrapper */}
              <div className="text-center space-y-3">
                <div className="w-32 h-32 bg-white p-2 rounded-2xl shadow-xl flex items-center justify-center">
                  {/* Custom SVG QR Mock */}
                  <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900" fill="currentColor">
                    <rect x="0" y="0" width="25" height="25" />
                    <rect x="5" y="5" width="15" height="15" fill="white" />
                    <rect x="9" y="9" width="7" height="7" />
                    
                    <rect x="75" y="0" width="25" height="25" />
                    <rect x="80" y="5" width="15" height="15" fill="white" />
                    <rect x="84" y="84" width="7" height="7" />
                    
                    <rect x="0" y="75" width="25" height="25" />
                    <rect x="5" y="80" width="15" height="15" fill="white" />
                    
                    <rect x="35" y="10" width="10" height="10" />
                    <rect x="55" y="5" width="12" height="12" />
                    <rect x="30" y="35" width="15" height="15" />
                    <rect x="60" y="30" width="10" height="25" />
                    <rect x="10" y="45" width="15" height="10" />
                    
                    <rect x="40" y="60" width="20" height="10" />
                    <rect x="40" y="80" width="10" height="15" />
                    <rect x="60" y="70" width="15" height="15" />
                    <rect x="80" y="60" width="10" height="10" />
                    <rect x="85" y="80" width="10" height="10" />
                  </svg>
                </div>
                <p className="text-[10px] font-black text-slate-300">Scan to Download</p>
              </div>

              {/* Text alongside QR */}
              <div className="text-center sm:text-left space-y-1 max-w-[200px]">
                <h4 className="text-sm font-bold text-white">Get the App Today</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Scan this QR code with your smartphone camera to quickly download the FeastExpress app.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

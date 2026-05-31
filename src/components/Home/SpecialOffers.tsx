import React from 'react';
import { useApp } from '../../context/AppContext';
import { coupons } from '../../data/mockData';
import { Tag, Copy, Check } from 'lucide-react';

export const SpecialOffers: React.FC = () => {
  const { addToast } = useApp();
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopiedCode(code);
    addToast(`Coupon "${code}" copied to clipboard!`, 'success');
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section id="offers" className="py-16 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <h2 className="text-3xl font-black tracking-tight text-slate-800 dark:text-white font-serif">
            Deals & Special Offers
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-brand-orange to-brand-yellow mx-auto rounded-full" />
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            Take advantage of these limited-time coupon codes during checkout to save big!
          </p>
        </div>

        {/* Coupons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coupons.map((coupon) => (
            <div
              key={coupon.code}
              className="relative overflow-hidden bg-slate-50 dark:bg-slate-950/40 rounded-3xl border-2 border-dashed border-orange-200 dark:border-orange-950/50 p-6 flex items-center justify-between shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Left semi-circle cutout */}
              <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-8 h-8 rounded-full bg-white dark:bg-slate-900 border-r-2 border-dashed border-orange-200 dark:border-orange-950/50" />
              
              {/* Right semi-circle cutout */}
              <div className="absolute top-1/2 -right-4 -translate-y-1/2 w-8 h-8 rounded-full bg-white dark:bg-slate-900 border-l-2 border-dashed border-orange-200 dark:border-orange-950/50" />

              <div className="flex gap-4 items-center pl-2">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950/40 flex items-center justify-center text-brand-orange flex-shrink-0">
                  <Tag className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-800 dark:text-slate-200">
                    {coupon.code}
                  </h3>
                  <p className="text-xs font-semibold text-brand-orange mt-0.5">
                    {coupon.description}
                  </p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                    Min. order: ${coupon.minOrderValue.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Copy button */}
              <button
                onClick={() => handleCopyCode(coupon.code)}
                className={`flex items-center gap-1.5 font-bold text-xs py-2.5 px-4 rounded-xl transition-all duration-300 shadow-sm cursor-pointer border ${
                  copiedCode === coupon.code
                    ? 'bg-emerald-500 border-emerald-500 text-white'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-brand-orange hover:border-brand-orange dark:hover:text-brand-orange'
                }`}
              >
                {copiedCode === coupon.code ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy
                  </>
                )}
              </button>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

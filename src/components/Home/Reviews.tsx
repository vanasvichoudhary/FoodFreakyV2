import React from 'react';
import { testimonials } from '../../data/mockData';
import { Star, Quote } from 'lucide-react';

export const Reviews: React.FC = () => {
  return (
    <section className="py-16 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <h2 className="text-3xl font-black tracking-tight text-slate-800 dark:text-white font-serif">
            What Our Customers Say
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-brand-orange to-brand-yellow mx-auto rounded-full" />
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            Hear from our community about their experience ordering fresh food with FeastExpress.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="group relative bg-slate-50 dark:bg-slate-950/40 p-8 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Quote Icon Background */}
              <div className="absolute top-6 right-6 text-orange-200 dark:text-orange-950/20 group-hover:scale-110 transition-transform duration-300">
                <Quote className="w-10 h-10 fill-current" />
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 text-amber-400 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 fill-current ${
                      i < Math.floor(t.rating) ? 'text-amber-400' : 'text-slate-300 dark:text-slate-700'
                    }`}
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed mb-6 z-10">
                "{t.comment}"
              </p>

              {/* User Bio */}
              <div className="flex items-center gap-3.5 border-t border-slate-200/50 dark:border-slate-800/50 pt-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border border-brand-orange/30 shadow-md"
                />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
                    {t.name}
                  </h4>
                  <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">
                    {t.role}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { Tag, Sparkles, Copy, Check } from 'lucide-react';
import { promoBanners } from '../../data/offers';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

export const OfferCarousel = () => {
  const { applyCoupon, coupon } = useCart();
  const { addToast } = useToast();

  const handleClaim = (code) => {
    navigator.clipboard?.writeText(code);
    applyCoupon(code);
  };

  return (
    <section id="offers" className="py-8">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-display text-slate-900 dark:text-white tracking-tight">
                Special Offers & Hot Deals
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Exclusive promo codes to save big on today's feast
              </p>
            </div>
          </div>
        </div>

        {/* Promo banners grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {promoBanners.map((promo) => {
            const isApplied = coupon?.code === promo.code;
            return (
              <motion.div
                key={promo.id}
                whileHover={{ y: -4 }}
                className={`relative rounded-3xl overflow-hidden p-6 text-white bg-gradient-to-br ${promo.bg} shadow-lg flex flex-col justify-between min-h-[200px] border border-white/20`}
              >
                {/* Background decorative image with soft fade */}
                <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-20 pointer-events-none overflow-hidden">
                  <img
                    src={promo.image}
                    alt={promo.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="relative z-10 space-y-1.5 max-w-[85%]">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-black uppercase tracking-wider text-white">
                    {promo.tag}
                  </span>
                  <h3 className="text-lg font-black font-display leading-snug">
                    {promo.title}
                  </h3>
                  <p className="text-xs text-white/90 leading-relaxed">
                    {promo.subtitle}
                  </p>
                </div>

                <div className="relative z-10 pt-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
                    <Tag className="w-3.5 h-3.5 text-amber-300" />
                    <span className="font-mono text-xs font-black tracking-widest text-amber-200">
                      {promo.code}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleClaim(promo.code)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                      isApplied
                        ? 'bg-emerald-500 text-white shadow-md'
                        : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white hover:bg-white/90 dark:hover:bg-slate-800 shadow-sm border border-transparent dark:border-slate-700'
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Applied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Apply Code</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

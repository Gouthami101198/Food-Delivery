import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Flame,
  Play,
  Volume2,
  Sparkles,
  Star,
  Eye,
  Heart,
  Plus,
  ArrowRight
} from 'lucide-react';
import { kitchenVideos } from '../../data/kitchenVideos';
import { VideoReelModal } from './VideoReelModal';
import { DietaryBadge } from '../common/Badge';
import { formatCurrency } from '../../utils/helpers';
import { useCart } from '../../context/CartContext';

export const KitchenVideoReels = ({ onCustomizeDish }) => {
  const { addToCart } = useCart();
  const [activeReelIndex, setActiveReelIndex] = useState(null);
  const [hoveredReelId, setHoveredReelId] = useState(null);

  const activeReel = activeReelIndex !== null ? kitchenVideos[activeReelIndex] : null;

  const handleNextReel = () => {
    setActiveReelIndex((prev) => (prev + 1) % kitchenVideos.length);
  };

  const handlePrevReel = () => {
    setActiveReelIndex((prev) => (prev - 1 + kitchenVideos.length) % kitchenVideos.length);
  };

  const handleQuickAdd = (e, reel) => {
    e.stopPropagation();
    const dishItem = {
      id: reel.dishId,
      restaurantId: reel.restaurantId,
      name: reel.dishName,
      price: reel.price,
      isVeg: reel.isVeg,
      image: reel.thumbnail,
      description: reel.subtitle,
    };
    addToCart(dishItem, {}, 1);
  };

  return (
    <section className="py-6 sm:py-8 my-4 sm:my-6 transition-colors">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center shadow-glow flex-shrink-0 animate-sizzle-glow">
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 fill-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-rose-500" />
              </span>
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400">
                Live Kitchen in Motion
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black font-display text-slate-900 dark:text-white tracking-tight">
              Chef Sizzle Reels & Food Stories
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Watch authentic dum biryanis, bubbling curries, and crispy dosas prepared fresh before your eyes
            </p>
          </div>
        </div>

        {/* Live indicator tag */}
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-800 dark:text-amber-300 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>8 Active Kitchen Streams</span>
        </div>
      </div>

      {/* Video Reels Horizontal Scroll Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-5">
        {kitchenVideos.map((reel, index) => {
          const isHovered = hoveredReelId === reel.id;

          return (
            <motion.div
              key={reel.id}
              whileHover={{ y: -6 }}
              onMouseEnter={() => setHoveredReelId(reel.id)}
              onMouseLeave={() => setHoveredReelId(null)}
              onClick={() => setActiveReelIndex(index)}
              className="relative aspect-[9/14] sm:aspect-[9/15] rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 shadow-card hover:shadow-glow transition-all duration-300 border border-slate-200/80 dark:border-slate-800 cursor-pointer group flex flex-col justify-between"
            >
              {/* Background Video preview or Thumbnail */}
              <div className="absolute inset-0 w-full h-full">
                {isHovered ? (
                  <video
                    src={reel.videoUrl}
                    poster={reel.thumbnail}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover scale-105 transition-transform duration-700"
                  />
                ) : (
                  <img
                    src={reel.thumbnail}
                    alt={reel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                )}

                {/* Dark Vignette Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/30" />
              </div>

              {/* Top Badges */}
              <div className="relative z-10 p-2 sm:p-3 flex items-start justify-between gap-1">
                <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-black/50 backdrop-blur-md text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-amber-300 border border-white/10 shadow-xs truncate max-w-[90px] sm:max-w-none">
                  {reel.tag}
                </span>

                <div className="flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-bold flex-shrink-0">
                  <Eye className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-300" />
                  <span>{reel.views}</span>
                </div>
              </div>

              {/* Center Play Button Overlay */}
              <div className="relative z-10 self-center my-auto">
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white/20 hover:bg-brand-500 group-hover:bg-brand-500 backdrop-blur-md text-white flex items-center justify-center border border-white/40 shadow-glow transition duration-300"
                >
                  <Play className="w-4 h-4 sm:w-6 sm:h-6 fill-white ml-0.5" />
                </motion.div>
              </div>

              {/* Bottom Card: Dish & Quick Add Details */}
              <div className="relative z-10 p-2.5 sm:p-4 space-y-1.5 sm:space-y-2">
                <div>
                  <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-amber-400 truncate">
                    {reel.restaurantName}
                  </p>
                  <h3 className="font-display font-black text-xs sm:text-sm text-white line-clamp-1 leading-snug group-hover:text-brand-300 transition">
                    {reel.dishName}
                  </h3>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-white/15">
                  <div className="flex items-baseline gap-1 sm:gap-1.5">
                    <span className="text-xs sm:text-sm font-black text-white">
                      {formatCurrency(reel.price)}
                    </span>
                    <span className="flex items-center gap-0.5 text-[9px] sm:text-[10px] text-amber-300 font-bold">
                      <Star className="w-2.5 h-2.5 fill-amber-300" />
                      {reel.rating}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handleQuickAdd(e, reel)}
                    className="p-1 sm:px-2.5 sm:py-1 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-[10px] sm:text-[11px] flex items-center gap-1 shadow-sm transition active:scale-90"
                    title="Quick Add to Cart"
                  >
                    <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
                    <span className="hidden sm:inline">Add</span>
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Interactive Fullscreen Video Reel Player Modal */}
      <VideoReelModal
        reel={activeReel}
        isOpen={activeReelIndex !== null}
        onClose={() => setActiveReelIndex(null)}
        onNext={handleNextReel}
        onPrev={handlePrevReel}
        onCustomize={onCustomizeDish}
        allReels={kitchenVideos}
      />
    </section>
  );
};

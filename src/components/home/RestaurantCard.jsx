import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Clock, MapPin, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RatingBadge, DeliveryBadge } from '../common/Badge';

export const RestaurantCard = ({ restaurant }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Link to={`/restaurant/${restaurant.id}`} className="group block">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.2 }}
        className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-card hover:shadow-float transition duration-300 flex flex-col h-full"
      >
        {/* Cover Photo with Badges */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            {restaurant.badges && restaurant.badges.length > 0 ? (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/90 dark:bg-slate-900/90 text-brand-700 dark:text-brand-400 backdrop-blur-md shadow-xs">
                {restaurant.badges[0]}
              </span>
            ) : (
              <span />
            )}

            {/* Favorite button */}
            <button
              onClick={toggleFavorite}
              className={`p-2 rounded-full backdrop-blur-md transition shadow-md ${
                isFavorite
                  ? 'bg-rose-500 text-white'
                  : 'bg-black/30 text-white hover:bg-black/50'
              }`}
              aria-label="Add to favorites"
            >
              <Heart
                className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`}
              />
            </button>
          </div>

          {/* Bottom Overlay Info (Delivery time and fee) */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
            <span className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <span>{restaurant.deliveryTime}</span>
            </span>

            <span className="bg-emerald-500/90 text-white backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold">
              {restaurant.deliveryFee === 0 ? 'Free Delivery' : `₹${restaurant.deliveryFee} Del.`}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition leading-snug">
                {restaurant.name}
              </h3>
              <RatingBadge rating={restaurant.rating} count={restaurant.reviewsCount} />
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
              {restaurant.cuisines.join(' • ')}
            </p>
          </div>

          {/* Distance and Price Range */}
          <div className="pt-2 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
              <span>{restaurant.distance}</span>
            </span>

            <div className="flex items-center gap-1.5 font-semibold">
              <span className="text-slate-800 dark:text-slate-200">{restaurant.priceRange}</span>
              <span>•</span>
              <span className="text-slate-500 dark:text-slate-400">Min ₹{restaurant.minOrder}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

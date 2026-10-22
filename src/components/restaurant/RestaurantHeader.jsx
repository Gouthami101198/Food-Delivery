import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Star,
  Clock,
  MapPin,
  ShieldCheck,
  Sparkles,
  Info,
  DollarSign,
  Heart,
} from 'lucide-react';
import { RatingBadge } from '../common/Badge';

export const RestaurantHeader = ({ restaurant }) => {
  return (
    <div className="relative mb-8">
      {/* Back button */}
      <div className="mb-3 sm:mb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700 shadow-2xs transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Kitchens</span>
        </Link>
      </div>

      {/* Hero Banner Image */}
      <div className="relative h-52 sm:h-80 w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg bg-slate-100 dark:bg-slate-800">
        <img
          src={restaurant.bannerImage || restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-transparent" />

        {/* Floating Badges */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {restaurant.badges?.map((badge) => (
              <span
                key={badge}
                className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider bg-white/90 dark:bg-slate-900/90 text-brand-700 dark:text-brand-400 backdrop-blur-md shadow-sm"
              >
                {badge}
              </span>
            ))}
          </div>

          <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-emerald-500 text-white shadow-sm flex items-center gap-1.5 flex-shrink-0">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            {restaurant.openStatus || 'Open Now'}
          </span>
        </div>

        {/* Bottom Banner Content */}
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-white">
          <h1 className="text-xl sm:text-4xl font-black font-display tracking-tight mb-1">
            {restaurant.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl line-clamp-2 sm:line-clamp-none">
            {restaurant.tagline}
          </p>
        </div>
      </div>

      {/* Meta Bar Details Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 mt-3 sm:mt-4 border border-slate-100 dark:border-slate-800 shadow-soft flex flex-wrap items-center justify-between gap-3 sm:gap-4 transition-colors">
        <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs text-slate-600 dark:text-slate-300">
          {/* Rating */}
          <div className="flex items-center gap-2">
            <RatingBadge rating={restaurant.rating} count={restaurant.reviewsCount} size="lg" />
            <span className="text-slate-400 dark:text-slate-500 font-medium hidden sm:inline">Verified Reviews</span>
          </div>

          {/* Delivery speed */}
          <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
            <Clock className="w-4 h-4 text-brand-500" />
            <span>{restaurant.deliveryTime}</span>
          </div>

          {/* Delivery fee */}
          <div className="flex items-center gap-1.5 font-semibold">
            <span className="font-bold text-emerald-600 dark:text-emerald-400">₹</span>
            <span className={restaurant.deliveryFee === 0 ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-800 dark:text-slate-200'}>
              {restaurant.deliveryFee === 0 ? 'Free Delivery' : `₹${restaurant.deliveryFee} Delivery`}
            </span>
          </div>

          {/* Address */}
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <MapPin className="w-4 h-4 text-slate-400 dark:text-slate-500 flex-shrink-0" />
            <span className="truncate max-w-[200px] sm:max-w-none">{restaurant.address}</span>
          </div>
        </div>

        {/* Dietary / Cuisines tags */}
        <div className="flex flex-wrap items-center gap-1.5">
          {restaurant.cuisines?.map((c) => (
            <span
              key={c}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-semibold"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

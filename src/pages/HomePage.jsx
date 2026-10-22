import React, { useState, useMemo } from 'react';
import { HeroBanner } from '../components/home/HeroBanner';
import { CategoryList } from '../components/home/CategoryList';
import { KitchenVideoReels } from '../components/home/KitchenVideoReels';
import { OfferCarousel } from '../components/home/OfferCarousel';
import { FilterBar } from '../components/home/FilterBar';
import { RestaurantCard } from '../components/home/RestaurantCard';
import { FeaturedDishes } from '../components/home/FeaturedDishes';
import { CustomizationModal } from '../components/restaurant/CustomizationModal';
import { VideoReelModal } from '../components/home/VideoReelModal';
import { restaurants } from '../data/restaurants';
import { kitchenVideos } from '../data/kitchenVideos';

export const HomePage = ({ onOpenSearch }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [freeDeliveryOnly, setFreeDeliveryOnly] = useState(false);
  const [topRatedOnly, setTopRatedOnly] = useState(false);
  const [customizingDish, setCustomizingDish] = useState(null);
  const [activeVideoReel, setActiveVideoReel] = useState(null);

  // Filter and sort restaurants
  const filteredRestaurants = useMemo(() => {
    let result = [...restaurants];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(
        (r) =>
          r.category === selectedCategory ||
          r.cuisines.some((c) => c.toLowerCase().includes(selectedCategory))
      );
    }

    // Free delivery toggle
    if (freeDeliveryOnly) {
      result = result.filter((r) => r.isFreeDelivery || r.deliveryFee === 0);
    }

    // Top rated toggle
    if (topRatedOnly) {
      result = result.filter((r) => r.rating >= 4.8);
    }

    // Sort order
    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'time') {
      result.sort((a, b) => a.deliveryTimeMinutes - b.deliveryTimeMinutes);
    } else if (sortBy === 'minOrder') {
      result.sort((a, b) => a.minOrder - b.minOrder);
    } else {
      // popularity
      result.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return result;
  }, [selectedCategory, freeDeliveryOnly, topRatedOnly, sortBy]);

  const hasActiveFilters =
    selectedCategory !== 'all' || freeDeliveryOnly || topRatedOnly || sortBy !== 'popularity';

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setFreeDeliveryOnly(false);
    setTopRatedOnly(false);
    setSortBy('popularity');
  };

  const handleWatchDishVideo = (dish) => {
    if (!dish.videoUrl) return;
    const match = kitchenVideos.find((kv) => kv.dishId === dish.id);
    if (match) {
      setActiveVideoReel(match);
    } else {
      const rest = restaurants.find((r) => r.id === dish.restaurantId);
      setActiveVideoReel({
        id: `reel-${dish.id}`,
        dishId: dish.id,
        restaurantId: dish.restaurantId,
        dishName: dish.name,
        restaurantName: rest?.name || 'Artisan Kitchen',
        title: dish.name,
        subtitle: dish.description,
        chefNote: 'Prepared fresh with high-grade hand-ground spices and traditional slow cooking techniques.',
        videoUrl: dish.videoUrl,
        thumbnail: dish.image,
        tag: 'Chef Signature 🔥',
        duration: '0:15',
        views: '12.4K',
        likes: 1840,
        price: dish.price,
        isVeg: dish.isVeg,
        rating: dish.rating || 4.9,
      });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Video/Photo switch and live steam animation */}
      <HeroBanner onSearchClick={onOpenSearch} />

      {/* Category Pills */}
      <CategoryList
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Live Kitchen Video Reels Section */}
        <KitchenVideoReels
          onCustomizeDish={(dish) => setCustomizingDish(dish)}
        />

        {/* Special Offers Section */}
        <OfferCarousel />

        {/* Featured Trending Dishes Grid with Video Sizzle triggers */}
        <FeaturedDishes
          onSelectDish={(dish) => setCustomizingDish(dish)}
          onWatchVideo={handleWatchDishVideo}
        />

        {/* Restaurant Listings Header & Filter Bar */}
        <section id="restaurants" className="py-6 scroll-mt-24">
          <div className="mb-2">
            <h2 className="text-xl sm:text-3xl font-black font-display text-slate-900 dark:text-white tracking-tight">
              Featured Kitchens & Restaurants
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Crafted fresh and delivered with high-grade thermal isolation
            </p>
          </div>

          <FilterBar
            sortBy={sortBy}
            onSortChange={setSortBy}
            freeDeliveryOnly={freeDeliveryOnly}
            onToggleFreeDelivery={() => setFreeDeliveryOnly(!freeDeliveryOnly)}
            topRatedOnly={topRatedOnly}
            onToggleTopRated={() => setTopRatedOnly(!topRatedOnly)}
            resultsCount={filteredRestaurants.length}
            onResetFilters={handleResetFilters}
            hasActiveFilters={hasActiveFilters}
          />

          {/* Restaurant Grid */}
          {filteredRestaurants.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
              {filteredRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 transition-colors">
              <p className="text-4xl mb-3">🥗🍽️</p>
              <h3 className="text-base font-bold text-slate-800 dark:text-white">
                No restaurants match your filters
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto mb-4">
                Try clearing selected filters or exploring all categories to discover more kitchens.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-2xl bg-brand-500 text-white font-bold text-xs shadow-glow transition hover:bg-brand-600"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>
      </div>

      {/* Global Food Customization Modal */}
      <CustomizationModal
        item={customizingDish}
        isOpen={!!customizingDish}
        onClose={() => setCustomizingDish(null)}
      />

      {/* Standalone Video Reel Modal triggered from Featured dishes */}
      <VideoReelModal
        reel={activeVideoReel}
        isOpen={!!activeVideoReel}
        onClose={() => setActiveVideoReel(null)}
        onCustomize={(dish) => setCustomizingDish(dish)}
        allReels={kitchenVideos}
      />
    </div>
  );
};

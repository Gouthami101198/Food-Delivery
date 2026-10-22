import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';
import { restaurants } from '../data/restaurants';
import { menuItems } from '../data/menuItems';
import { kitchenVideos } from '../data/kitchenVideos';
import { RestaurantHeader } from '../components/restaurant/RestaurantHeader';
import { CategoryTabs } from '../components/restaurant/CategoryTabs';
import { MenuItemCard } from '../components/restaurant/MenuItemCard';
import { CustomizationModal } from '../components/restaurant/CustomizationModal';
import { VideoReelModal } from '../components/home/VideoReelModal';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/helpers';

export const RestaurantDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { totalItemCount, grandTotal, setIsCartDrawerOpen } = useCart();

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [customizingItem, setCustomizingItem] = useState(null);
  const [activeVideoReel, setActiveVideoReel] = useState(null);

  // Find restaurant
  const restaurant = restaurants.find((r) => r.id === id) || restaurants[0];

  // Find restaurant menu items
  const restaurantItems = useMemo(() => {
    return menuItems.filter((m) => m.restaurantId === restaurant.id);
  }, [restaurant.id]);

  // Extract distinct categories from this restaurant's items
  const menuCategories = useMemo(() => {
    const set = new Set(restaurantItems.map((item) => item.category));
    return Array.from(set);
  }, [restaurantItems]);

  // Filter items by category, search text, and dietary preference
  const filteredItems = useMemo(() => {
    return restaurantItems.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Veg toggle
      if (vegOnly && !item.isVeg) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc) return false;
      }
      return true;
    });
  }, [restaurantItems, activeCategory, vegOnly, searchQuery]);

  const handleWatchDishVideo = (dish) => {
    if (!dish.videoUrl) return;
    const match = kitchenVideos.find((kv) => kv.dishId === dish.id);
    if (match) {
      setActiveVideoReel(match);
    } else {
      setActiveVideoReel({
        id: `reel-${dish.id}`,
        dishId: dish.id,
        restaurantId: dish.restaurantId,
        dishName: dish.name,
        restaurantName: restaurant.name,
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
    <div className="min-h-screen pb-24">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-4">
        {/* Restaurant Header Profile */}
        <RestaurantHeader restaurant={restaurant} />

        {/* Menu Search and Veg Toggle Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 bg-white dark:bg-slate-900 p-3 sm:p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-2xs transition-colors">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${restaurantItems.length} dishes in ${restaurant.name}...`}
              className="w-full pl-10 pr-4 py-2 text-xs font-semibold bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-brand-500 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 border w-full sm:w-auto ${
                vegOnly
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  vegOnly ? 'bg-white' : 'bg-emerald-600'
                }`}
              />
              <span>Pure Veg Only</span>
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <CategoryTabs
          categories={menuCategories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        {/* Items List */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {filteredItems.map((dish) => (
              <MenuItemCard
                key={dish.id}
                dish={dish}
                onCustomize={(itemToCustomize) => setCustomizingItem(itemToCustomize)}
                onWatchVideo={handleWatchDishVideo}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 transition-colors">
            <p className="text-3xl mb-2">🍽️</p>
            <h4 className="text-sm font-bold text-slate-800 dark:text-white">No dishes found</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Try modifying your search or resetting dietary filters.
            </p>
          </div>
        )}
      </div>

      {/* Floating Bottom Cart Bar (if user has items in cart) */}
      {totalItemCount > 0 && (
        <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 w-[94%] max-w-lg z-30">
          <div
            onClick={() => setIsCartDrawerOpen(true)}
            className="p-3 sm:p-3.5 bg-slate-900/95 dark:bg-slate-800/95 backdrop-blur-md text-white rounded-2xl shadow-2xl border border-white/10 flex items-center justify-between cursor-pointer hover:bg-slate-800 dark:hover:bg-slate-700 transition"
          >
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 rounded-xl bg-brand-500 text-white flex items-center justify-center font-bold text-xs shadow-md">
                {totalItemCount}
              </div>
              <div>
                <p className="text-xs font-bold text-white">
                  {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'} in bag
                </p>
                <p className="text-[11px] text-slate-300">
                  Total: <strong className="text-white">{formatCurrency(grandTotal)}</strong>
                </p>
              </div>
            </div>

            <button className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 bg-brand-500 text-white text-xs font-bold rounded-xl shadow-glow">
              <span>View Cart</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Customization Modal */}
      <CustomizationModal
        item={customizingItem}
        isOpen={!!customizingItem}
        onClose={() => setCustomizingItem(null)}
      />

      {/* Video Reel Modal */}
      <VideoReelModal
        reel={activeVideoReel}
        isOpen={!!activeVideoReel}
        onClose={() => setActiveVideoReel(null)}
        onCustomize={(dish) => setCustomizingItem(dish)}
        allReels={kitchenVideos}
      />
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Check, Flame, Sparkles } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';
import { DietaryBadge } from '../common/Badge';
import { useCart } from '../../context/CartContext';

export const CustomizationModal = ({ item, isOpen, onClose }) => {
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedCrust, setSelectedCrust] = useState(null);
  const [selectedSpice, setSelectedSpice] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Initialize defaults whenever item changes or modal opens
  useEffect(() => {
    if (item && isOpen) {
      const sizes = item.customizationOptions?.sizes || item.customizationOptions?.bases;
      setSelectedSize(sizes && sizes.length > 0 ? sizes[0] : null);

      const crusts = item.customizationOptions?.crusts || item.customizationOptions?.buns;
      setSelectedCrust(crusts && crusts.length > 0 ? crusts[0] : null);

      const spices = item.customizationOptions?.spiceLevels;
      setSelectedSpice(spices && spices.length > 0 ? spices[0] : null);

      setSelectedAddOns([]);
      setSpecialInstructions('');
      setQuantity(1);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [item, isOpen]);

  if (!isOpen || !item) return null;

  const handleToggleAddOn = (addon) => {
    setSelectedAddOns((prev) => {
      const exists = prev.some((a) => a.id === addon.id);
      if (exists) {
        return prev.filter((a) => a.id !== addon.id);
      } else {
        return [...prev, addon];
      }
    });
  };

  // Calculate live single item price
  const basePrice = Number(item.price);
  const sizePrice = Number(selectedSize?.price || 0);
  const crustPrice = Number(selectedCrust?.price || 0);
  const addOnsTotal = selectedAddOns.reduce((sum, a) => sum + Number(a.price || 0), 0);
  const singleItemPrice = basePrice + sizePrice + crustPrice + addOnsTotal;
  const totalPrice = singleItemPrice * quantity;

  const handleAddToCart = () => {
    const customization = {
      size: selectedSize,
      crust: selectedCrust,
      spiceLevel: selectedSpice,
      addOns: selectedAddOns,
      specialInstructions: specialInstructions.trim(),
    };

    addToCart(item, customization, quantity);
    onClose();
  };

  const sizes = item.customizationOptions?.sizes || item.customizationOptions?.bases;
  const crusts = item.customizationOptions?.crusts || item.customizationOptions?.buns;
  const spiceLevels = item.customizationOptions?.spiceLevels;
  const addOns = item.customizationOptions?.addOns;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col max-h-[90vh] my-0 sm:my-auto transition-colors"
        >
          {/* Close button floating */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-md transition shadow-md"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Hero Image */}
          <div className="relative h-48 sm:h-60 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center gap-2 mb-1">
                <DietaryBadge isVeg={item.isVeg} />
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md">
                  {item.category}
                </span>
                {item.calories && (
                  <span className="text-xs text-slate-200">
                    {item.calories}
                  </span>
                )}
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-display tracking-tight leading-tight">
                {item.name}
              </h3>
            </div>
          </div>

          {/* Scrollable Customization Content */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-5 sm:space-y-6 flex-1">
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {item.description}
            </p>

            {/* 1. Size Selection */}
            {sizes && sizes.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    Choose Portion Size
                  </h4>
                  <span className="text-[11px] font-semibold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50 px-2 py-0.5 rounded-full">
                    Required
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {sizes.map((s) => {
                    const isSelected = selectedSize?.name === s.name;
                    return (
                      <button
                        key={s.name}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={`p-3 rounded-2xl border text-left flex items-center justify-between transition ${
                          isSelected
                            ? 'border-brand-500 bg-brand-50/60 dark:bg-brand-950/40 ring-2 ring-brand-500/20'
                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 bg-white dark:bg-slate-800/80'
                        }`}
                      >
                        <div>
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{s.name}</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {s.price > 0 ? `+${formatCurrency(s.price)}` : 'Included'}
                          </p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            isSelected
                              ? 'border-brand-500 bg-brand-500 text-white'
                              : 'border-slate-300 dark:border-slate-600'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 2. Crust / Style Selection */}
            {crusts && crusts.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    Choose Style / Bun
                  </h4>
                  <span className="text-[11px] font-semibold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50 px-2 py-0.5 rounded-full">
                    Required
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {crusts.map((c) => {
                    const isSelected = selectedCrust?.name === c.name;
                    return (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setSelectedCrust(c)}
                        className={`p-3 rounded-2xl border text-left flex items-center justify-between transition ${
                          isSelected
                            ? 'border-brand-500 bg-brand-50/60 dark:bg-brand-950/40 ring-2 ring-brand-500/20'
                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 bg-white dark:bg-slate-800/80'
                        }`}
                      >
                        <div>
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{c.name}</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {c.price > 0 ? `+${formatCurrency(c.price)}` : 'Included'}
                          </p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            isSelected
                              ? 'border-brand-500 bg-brand-500 text-white'
                              : 'border-slate-300 dark:border-slate-600'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. Spice Level */}
            {spiceLevels && spiceLevels.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span>Spice Level</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {spiceLevels.map((lvl) => {
                    const isSelected = selectedSpice === lvl;
                    return (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setSelectedSpice(lvl)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition border ${
                          isSelected
                            ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 ring-2 ring-orange-500/20'
                            : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300 bg-white dark:bg-slate-800/80'
                        }`}
                      >
                        {lvl}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 4. Add-ons & Extra Toppings */}
            {addOns && addOns.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    Add-ons & Extras
                  </h4>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">Optional</span>
                </div>
                <div className="space-y-2">
                  {addOns.map((addon) => {
                    const isSelected = selectedAddOns.some((a) => a.id === addon.id);
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={() => handleToggleAddOn(addon)}
                        className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition ${
                          isSelected
                            ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/40'
                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 bg-white dark:bg-slate-800/80'
                        }`}
                      >
                        <div>
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{addon.name}</p>
                          <p className="text-[11px] text-brand-600 dark:text-brand-400 font-semibold">
                            +{formatCurrency(addon.price)}
                          </p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-lg border flex items-center justify-center transition ${
                            isSelected
                              ? 'border-brand-500 bg-brand-500 text-white'
                              : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 5. Special Instructions */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 block">
                Special Instructions
              </label>
              <textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="e.g. Extra napkins, dressing on the side, no cutlery needed..."
                rows={2}
                className="w-full p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
          </div>

          {/* Footer Action Bar with Quantity and Add Button */}
          <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 flex items-center justify-between gap-4">
            {/* Quantity Controls */}
            <div className="flex items-center gap-3 bg-white dark:bg-slate-800 px-3 py-2 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-1 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 transition"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-bold text-sm text-slate-900 dark:text-white w-5 text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="p-1 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Cart CTA */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleAddToCart}
              className="flex-1 py-3 px-6 rounded-2xl bg-gradient-to-r from-brand-600 to-amber-500 text-white font-bold text-sm flex items-center justify-between shadow-glow hover:brightness-105 transition"
            >
              <span>Add to Cart</span>
              <span className="font-black text-base">{formatCurrency(totalPrice)}</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';
import { DietaryBadge } from '../common/Badge';

export const CartItem = ({ itemData, onUpdateQuantity, onRemove }) => {
  const { cartItemId, item, customization, unitPrice, quantity, totalPrice } = itemData;

  const hasCustomizations =
    customization?.size ||
    customization?.crust ||
    customization?.spiceLevel ||
    (customization?.addOns && customization.addOns.length > 0) ||
    customization?.specialInstructions;

  return (
    <div className="flex gap-3 p-3.5 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-2xs hover:border-slate-200 dark:hover:border-slate-600 transition">
      {/* Item Image */}
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
      />

      {/* Details */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <DietaryBadge isVeg={item.isVeg} />
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                {item.name}
              </h4>
            </div>
            <button
              onClick={() => onRemove(cartItemId)}
              className="text-slate-400 hover:text-rose-500 p-0.5 rounded transition"
              title="Remove item"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Customization Details */}
          {hasCustomizations && (
            <div className="flex flex-wrap gap-1 mt-1 text-[10px] text-slate-500 dark:text-slate-400">
              {customization.size && (
                <span className="bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-slate-700 dark:text-slate-200 font-medium">
                  {customization.size.name}
                </span>
              )}
              {customization.crust && (
                <span className="bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-slate-700 dark:text-slate-200 font-medium">
                  {customization.crust.name}
                </span>
              )}
              {customization.spiceLevel && (
                <span className="bg-orange-50 dark:bg-orange-950/40 px-1.5 py-0.5 rounded text-orange-700 dark:text-orange-300 font-medium">
                  {customization.spiceLevel}
                </span>
              )}
              {customization.addOns?.map((addon) => (
                <span
                  key={addon.id}
                  className="bg-brand-50 dark:bg-brand-950/40 px-1.5 py-0.5 rounded text-brand-700 dark:text-brand-300 font-medium"
                >
                  +{addon.name}
                </span>
              ))}
              {customization.specialInstructions && (
                <span className="italic text-slate-400 dark:text-slate-500 block w-full mt-0.5">
                  "{customization.specialInstructions}"
                </span>
              )}
            </div>
          )}
        </div>

        {/* Price & Quantity Controls */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-50 dark:border-slate-700/60">
          <span className="text-xs font-black text-slate-900 dark:text-white">
            {formatCurrency(totalPrice)}
          </span>

          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-xl">
            <button
              onClick={() => onUpdateQuantity(cartItemId, quantity - 1)}
              className="p-0.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100 w-4 text-center">
              {quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(cartItemId, quantity + 1)}
              className="p-0.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

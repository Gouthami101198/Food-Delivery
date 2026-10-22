import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { storage } from '../utils/storage';
import { coupons } from '../data/offers';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { addToast } = useToast();
  const [cart, setCart] = useState(() => storage.get('cb_cart', []));
  const [coupon, setCoupon] = useState(() => storage.get('cb_coupon', null));
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Sync cart to localStorage
  useEffect(() => {
    storage.set('cb_cart', cart);
  }, [cart]);

  // Sync coupon to localStorage
  useEffect(() => {
    storage.set('cb_coupon', coupon);
  }, [coupon]);

  /**
   * Add item to cart with customization breakdown
   */
  const addToCart = (item, customization = {}, quantity = 1) => {
    // Generate a unique identifier based on item ID and selected customization attributes
    const customizationKey = JSON.stringify({
      id: item.id,
      size: customization.size?.name || 'default',
      crust: customization.crust?.name || 'default',
      spice: customization.spiceLevel || 'default',
      addOns: (customization.addOns || []).map((a) => a.id).sort(),
      instructions: customization.specialInstructions?.trim() || '',
    });

    // Calculate single unit price with customization add-ons
    const basePrice = Number(item.price);
    const sizePrice = Number(customization.size?.price || 0);
    const crustPrice = Number(customization.crust?.price || 0);
    const addOnsPrice = (customization.addOns || []).reduce(
      (sum, a) => sum + Number(a.price || 0),
      0
    );
    const unitPrice = Number((basePrice + sizePrice + crustPrice + addOnsPrice).toFixed(2));

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((ci) => ci.customizationKey === customizationKey);

      if (existingIndex > -1) {
        // Increase quantity of existing customized item
        const updated = [...prevCart];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          totalPrice: Number((unitPrice * newQty).toFixed(2)),
        };
        return updated;
      } else {
        // New item in cart
        const newCartItem = {
          cartItemId: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          customizationKey,
          item,
          customization,
          unitPrice,
          quantity,
          totalPrice: Number((unitPrice * quantity).toFixed(2)),
        };
        return [...prevCart, newCartItem];
      }
    });

    addToast(`Added ${quantity}x "${item.name}" to cart!`, 'success');
  };

  /**
   * Update quantity of a cart item
   */
  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((ci) => {
        if (ci.cartItemId === cartItemId) {
          return {
            ...ci,
            quantity: newQty,
            totalPrice: Number((ci.unitPrice * newQty).toFixed(2)),
          };
        }
        return ci;
      })
    );
  };

  /**
   * Remove item from cart
   */
  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => {
      const itemToRemove = prevCart.find((ci) => ci.cartItemId === cartItemId);
      if (itemToRemove) {
        addToast(`Removed "${itemToRemove.item.name}" from cart`, 'info');
      }
      return prevCart.filter((ci) => ci.cartItemId !== cartItemId);
    });
  };

  /**
   * Clear entire cart
   */
  const clearCart = () => {
    setCart([]);
    setCoupon(null);
  };

  /**
   * Subtotal calculation
   */
  const subtotal = useMemo(() => {
    const rawSubtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    return Number(rawSubtotal.toFixed(2));
  }, [cart]);

  /**
   * Total item count
   */
  const totalItemCount = useMemo(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  /**
   * Coupon validation & discount calculation
   */
  const { discount, couponError, isFreeDeliveryFromCoupon } = useMemo(() => {
    if (!coupon) {
      return { discount: 0, couponError: null, isFreeDeliveryFromCoupon: false };
    }

    if (subtotal < coupon.minOrder) {
      return {
        discount: 0,
        couponError: `Add $${(coupon.minOrder - subtotal).toFixed(2)} more to use coupon ${coupon.code}`,
        isFreeDeliveryFromCoupon: false,
      };
    }

    let calculatedDiscount = 0;
    let freeDel = false;

    if (coupon.freeDelivery) {
      freeDel = true;
    } else if (coupon.discountPercent) {
      const percentVal = (subtotal * coupon.discountPercent) / 100;
      calculatedDiscount = coupon.maxDiscount
        ? Math.min(percentVal, coupon.maxDiscount)
        : percentVal;
    }

    return {
      discount: Number(calculatedDiscount.toFixed(2)),
      couponError: null,
      isFreeDeliveryFromCoupon: freeDel,
    };
  }, [coupon, subtotal]);

  /**
   * Apply a coupon code
   */
  const applyCoupon = (codeStr) => {
    const cleanCode = codeStr.trim().toUpperCase();
    const matched = coupons.find((c) => c.code.toUpperCase() === cleanCode);

    if (!matched) {
      addToast(`Coupon "${codeStr}" is invalid or expired`, 'error');
      return { success: false, message: 'Invalid coupon code' };
    }

    if (subtotal < matched.minOrder) {
      const needed = Math.round(matched.minOrder - subtotal);
      addToast(`Orders must be at least ₹${matched.minOrder} (Add ₹${needed} more)`, 'warning');
      return {
        success: false,
        message: `Min order is ₹${matched.minOrder}. Add ₹${needed} more.`,
      };
    }

    setCoupon(matched);
    addToast(`Coupon ${matched.code} applied! Enjoy your savings.`, 'success');
    return { success: true, coupon: matched };
  };

  /**
   * Remove applied coupon
   */
  const removeCoupon = () => {
    if (coupon) {
      addToast(`Removed coupon ${coupon.code}`, 'info');
      setCoupon(null);
    }
  };

  /**
   * Delivery fee: Free if subtotal >= ₹299 or if coupon grants free delivery
   */
  const deliveryFee = useMemo(() => {
    if (cart.length === 0) return 0;
    if (isFreeDeliveryFromCoupon) return 0;
    if (subtotal >= 299) return 0;
    return 30;
  }, [cart.length, isFreeDeliveryFromCoupon, subtotal]);

  /**
   * Platform & hygiene fee (₹5)
   */
  const platformFee = useMemo(() => {
    if (cart.length === 0) return 0;
    return 5;
  }, [cart.length]);

  /**
   * Estimated GST (5% on restaurant food)
   */
  const estimatedTax = useMemo(() => {
    if (cart.length === 0) return 0;
    const taxableAmount = Math.max(0, subtotal - discount);
    return Math.round(taxableAmount * 0.05);
  }, [cart.length, subtotal, discount]);

  /**
   * Final Total
   */
  const grandTotal = useMemo(() => {
    if (cart.length === 0) return 0;
    const total = subtotal - discount + deliveryFee + platformFee + estimatedTax;
    return Math.round(Math.max(0, total));
  }, [cart.length, subtotal, discount, deliveryFee, platformFee, estimatedTax]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        totalItemCount,
        coupon,
        applyCoupon,
        removeCoupon,
        couponError,
        discount,
        deliveryFee,
        platformFee,
        estimatedTax,
        grandTotal,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { generateOrderId, getEstimatedArrival } from '../utils/helpers';
import { useToast } from './ToastContext';

const OrderContext = createContext(null);

export const ORDER_STATUSES = [
  {
    key: 'confirmed',
    title: 'Order Confirmed',
    description: 'Payment verified and sent to restaurant',
    icon: 'ReceiptCheck',
    progressPercent: 20,
  },
  {
    key: 'preparing',
    title: 'Chef Preparing Your Food',
    description: 'Fresh ingredients being cooked with artisan care',
    icon: 'ChefHat',
    progressPercent: 45,
  },
  {
    key: 'driver_assigned',
    title: 'Delivery Partner Assigned',
    description: 'Marcus Vance is picking up your order package',
    icon: 'UserCheck',
    progressPercent: 70,
  },
  {
    key: 'out_for_delivery',
    title: 'Out for Delivery',
    description: 'Driver is en route to your address',
    icon: 'Bike',
    progressPercent: 90,
  },
  {
    key: 'delivered',
    title: 'Delivered',
    description: 'Enjoy your delicious meal! Bon appétit!',
    icon: 'CheckCircle2',
    progressPercent: 100,
  },
];

const INITIAL_SAMPLE_ORDERS = [
  {
    orderId: 'CB-94182',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    status: 'delivered',
    restaurantName: 'Dawat-e-Khaas Royal Biryani',
    restaurantImage: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=300&q=80',
    items: [
      {
        cartItemId: 'sample-1',
        item: {
          id: 'item-101',
          name: 'Royal Hyderabadi Mutton Dum Biryani',
          price: 380,
          image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=300&q=80',
        },
        customization: {
          size: { name: 'Regular Handi (1 person)', price: 0 },
          spiceLevel: 'Hyderabadi Teekha 🌶️',
          addOns: [{ id: 'boiled-egg', name: 'Fried Masala Boiled Egg (2 pcs)', price: 35 }],
        },
        quantity: 1,
        totalPrice: 415,
      },
      {
        cartItemId: 'sample-2',
        item: {
          id: 'item-103',
          name: 'Lucknowi Galouti Kebabs (4 pcs)',
          price: 320,
          image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=300&q=80',
        },
        customization: {
          sizes: { name: '4 Pieces + 1 Paratha', price: 0 },
        },
        quantity: 1,
        totalPrice: 320,
      },
    ],
    pricing: {
      subtotal: 735,
      discount: 100,
      deliveryFee: 0,
      platformFee: 5,
      estimatedTax: 32,
      grandTotal: 672,
    },
    customer: {
      fullName: 'Aarav Sharma',
      phone: '+91 98765 43210',
      email: 'aarav.sharma@example.com',
      address: 'Flat 402, Royal Palms, 12th Main, Indiranagar, Bengaluru - 560038',
      deliveryNotes: 'Leave with society security guard / ring bell 402',
      deliveryType: 'standard',
      paymentMethod: 'upi',
      cardLast4: 'N/A',
    },
    driver: {
      name: 'Ramesh Kumar',
      rating: 4.96,
      trips: '2,840 deliveries',
      vehicle: 'Hero Splendor (KA 03 EX 4821)',
      phone: '+91 98450 12345',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    },
  },
];

export const OrderProvider = ({ children }) => {
  const { addToast } = useToast();
  const [orders, setOrders] = useState(() => storage.get('cb_orders', INITIAL_SAMPLE_ORDERS));
  const [activeOrder, setActiveOrder] = useState(() => storage.get('cb_active_order', null));

  useEffect(() => {
    storage.set('cb_orders', orders);
  }, [orders]);

  useEffect(() => {
    storage.set('cb_active_order', activeOrder);
  }, [activeOrder]);

  /**
   * Place an order from checkout
   */
  const placeOrder = (orderData) => {
    const orderId = generateOrderId();
    const newOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      estimatedArrival: getEstimatedArrival(32),
      status: 'confirmed',
      restaurantName: orderData.items[0]?.item?.restaurantName || 'Dawat-e-Khaas Royal Biryani',
      restaurantImage: orderData.items[0]?.item?.image || 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=300&q=80',
      items: orderData.items,
      pricing: orderData.pricing,
      customer: orderData.customer,
      driver: {
        name: 'Ramesh Kumar',
        rating: 4.96,
        trips: '2,840 deliveries',
        vehicle: 'Hero Splendor (KA 03 EX 4821)',
        phone: '+91 98450 12345',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      },
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrder(newOrder);
    addToast(`Order ${orderId} placed successfully!`, 'success');
    return newOrder;
  };

  /**
   * Update the status of an order (for live simulation / testing)
   */
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.orderId === orderId) {
          return { ...order, status: newStatus };
        }
        return order;
      })
    );

    setActiveOrder((prevActive) => {
      if (prevActive && prevActive.orderId === orderId) {
        return { ...prevActive, status: newStatus };
      }
      return prevActive;
    });

    const statusObj = ORDER_STATUSES.find((s) => s.key === newStatus);
    if (statusObj) {
      addToast(`Order status updated: ${statusObj.title}`, 'info');
    }
  };

  /**
   * Advance order status to the next step
   */
  const advanceOrderStatus = (orderId) => {
    const currentOrder = orders.find((o) => o.orderId === orderId) || activeOrder;
    if (!currentOrder) return;

    const currentIndex = ORDER_STATUSES.findIndex((s) => s.key === currentOrder.status);
    if (currentIndex < ORDER_STATUSES.length - 1) {
      const nextStatus = ORDER_STATUSES[currentIndex + 1].key;
      updateOrderStatus(orderId, nextStatus);
    }
  };

  /**
   * Get an order by ID
   */
  const getOrderById = (orderId) => {
    return orders.find((o) => o.orderId === orderId) || (activeOrder?.orderId === orderId ? activeOrder : null);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        activeOrder,
        placeOrder,
        updateOrderStatus,
        advanceOrderStatus,
        getOrderById,
        setActiveOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};

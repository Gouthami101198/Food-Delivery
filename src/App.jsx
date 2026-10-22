import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';
import { CartDrawer } from './components/cart/CartDrawer';
import { SearchModal } from './components/common/SearchModal';
import { CustomizationModal } from './components/restaurant/CustomizationModal';
import { AuthModal } from './components/auth/AuthModal';

// Pages
import { HomePage } from './pages/HomePage';
import { RestaurantDetailPage } from './pages/RestaurantDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { OrderHistoryPage } from './pages/OrderHistoryPage';
import { AuthPage } from './pages/AuthPage';

// Scroll to top helper on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchCustomizingDish, setSearchCustomizingDish] = useState(null);

  // Keyboard shortcut Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#fbfaf8] dark:bg-[#0b1120] text-slate-800 dark:text-slate-100 antialiased font-sans transition-colors duration-300">
      <ScrollToTop />

      {/* Global Navigation Bar */}
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Main Routed Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage onOpenSearch={() => setIsSearchOpen(true)} />} />
          <Route path="/restaurant/:id" element={<RestaurantDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/confirmation/:orderId" element={<OrderConfirmationPage />} />
          <Route path="/orders" element={<OrderHistoryPage />} />
          <Route path="/orders/:orderId" element={<OrderTrackingPage />} />
          <Route path="/login" element={<AuthPage initialMode="login" />} />
          <Route path="/signup" element={<AuthPage initialMode="signup" />} />
          <Route path="/forgot-password" element={<AuthPage initialMode="forgot-password" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Cart Slide-over Drawer */}
      <CartDrawer />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectItemForCustomization={(dish) => setSearchCustomizingDish(dish)}
      />

      {/* Customization modal if opened from global search */}
      <CustomizationModal
        item={searchCustomizingDish}
        isOpen={!!searchCustomizingDish}
        onClose={() => setSearchCustomizingDish(null)}
      />

      {/* Global Auth Modal for Login, Signup & Forgot Password */}
      <AuthModal />

      {/* Global Floating Toast Container */}
      <Toast />
    </div>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <OrderProvider>
              <BrowserRouter>
                <AppContent />
              </BrowserRouter>
            </OrderProvider>
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;

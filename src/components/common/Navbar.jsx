import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Search,
  MapPin,
  Clock,
  Menu as MenuIcon,
  X,
  Sparkles,
  Receipt,
  Heart,
  ChevronDown,
  Sun,
  Moon,
  User,
  LogOut,
  UserCheck,
  Shield,
  Compass,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { formatCurrency } from '../../utils/helpers';

export const Navbar = ({ onOpenSearch }) => {
  const { totalItemCount, subtotal, setIsCartDrawerOpen } = useCart();
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();
  const { theme, isDark, toggleTheme } = useTheme();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState('Flat 402, Royal Palms, Indiranagar, Bengaluru');
  const [isChangingAddress, setIsChangingAddress] = useState(false);

  const userDropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addresses = [
    'Flat 402, Royal Palms, Indiranagar, Bengaluru',
    'B-12, Sector 62, Noida, Delhi NCR',
    'Flat 704, Sea Green Heights, Bandra West, Mumbai',
    'Villa 18, Road No. 36, Jubilee Hills, Hyderabad',
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border-b border-slate-100 dark:border-slate-800 py-3'
            : 'bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm py-4'
        }`}
      >
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Brand Logo & Address */}
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-amber-500 flex items-center justify-center text-white shadow-glow group-hover:scale-105 transition transform">
                  <span className="text-xl">🍛</span>
                </div>
                <div>
                  <span className="font-display font-black text-xl tracking-tight text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition">
                    Crave<span className="text-brand-500">Bite</span>
                  </span>
                  <span className="hidden sm:block text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 -mt-1">
                    Desi Gourmet Delivery
                  </span>
                </div>
              </Link>

              {/* Delivery Address Pill */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setIsChangingAddress(!isChangingAddress)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 text-xs font-semibold text-slate-700 dark:text-slate-300 transition border border-transparent dark:border-slate-700/50"
                >
                  <MapPin className="w-3.5 h-3.5 text-brand-500 flex-shrink-0" />
                  <span className="max-w-[200px] truncate text-slate-900 dark:text-slate-100 font-bold">
                    {currentAddress.split(',')[0]}
                  </span>
                  <span className="text-slate-400 dark:text-slate-500 font-normal">25-35 min</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {isChangingAddress && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 p-2 z-50 animate-in fade-in zoom-in-95">
                    <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-3 py-2">
                      Select Delivery Address (India)
                    </p>
                    {addresses.map((addr) => (
                      <button
                        key={addr}
                        onClick={() => {
                          setCurrentAddress(addr);
                          setIsChangingAddress(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-2 hover:bg-brand-50 dark:hover:bg-slate-800 hover:text-brand-600 dark:hover:text-brand-400 transition ${
                          currentAddress === addr
                            ? 'bg-brand-50 dark:bg-slate-800 text-brand-600 dark:text-brand-400 font-bold'
                            : 'text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">{addr}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Middle: Search bar trigger */}
            <div className="flex-1 max-w-md lg:max-w-lg xl:max-w-2xl hidden lg:block mx-2 xl:mx-6">
              <button
                onClick={onOpenSearch}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200/80 dark:hover:bg-slate-800 text-xs text-slate-400 dark:text-slate-400 transition border border-transparent hover:border-slate-200 dark:border-slate-700/50"
              >
                <span className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <span className="truncate">Search for Biryani, Butter Chicken, Dosa, Chaats...</span>
                </span>
                <kbd className="px-2 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-700 rounded-md border border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-300 shadow-2xs">
                  ⌘K
                </kbd>
              </button>
            </div>

            {/* Right: Actions, Theme Switcher, Auth & Cart */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search icon for mobile/tablet */}
              <button
                onClick={onOpenSearch}
                className="lg:hidden p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Navigation Links */}
              <nav className="hidden md:flex items-center gap-1 font-semibold text-xs text-slate-600 dark:text-slate-300">
                <Link
                  to="/"
                  className={`px-3 py-2 rounded-xl hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-slate-800 transition ${
                    location.pathname === '/' ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-slate-800 font-bold' : ''
                  }`}
                >
                  Explore
                </Link>
                <Link
                  to="/orders"
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-slate-800 transition ${
                    location.pathname === '/orders'
                      ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-slate-800 font-bold'
                      : ''
                  }`}
                >
                  <Receipt className="w-4 h-4" />
                  <span>Orders</span>
                </Link>
              </nav>

              {/* DARK THEME TOGGLE BUTTON */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                onClick={toggleTheme}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-amber-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition border border-transparent dark:border-slate-700/60"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-amber-400 animate-spin-once" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700" />
                )}
              </motion.button>

              {/* USER AUTHENTICATION STATE */}
              {isAuthenticated ? (
                <div className="relative" ref={userDropdownRef}>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-1.5 p-1 sm:px-2.5 sm:py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition border border-slate-200/60 dark:border-slate-700/60"
                  >
                    <img
                      src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'}
                      alt={user?.name || 'User'}
                      className="w-7 h-7 rounded-full object-cover ring-2 ring-brand-500/30"
                    />
                    <span className="hidden sm:inline text-xs font-bold text-slate-800 dark:text-slate-100 max-w-[100px] truncate">
                      {user?.name?.split(' ')[0] || 'User'}
                    </span>
                    <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:block" />
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {userDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 p-2 z-50 text-xs"
                      >
                        {/* Profile Info Header */}
                        <div className="px-3 py-2.5 border-b border-slate-100 dark:border-slate-800 mb-1">
                          <p className="font-bold text-slate-900 dark:text-white truncate">
                            {user?.name}
                          </p>
                          <p className="text-[11px] text-slate-400 truncate">
                            {user?.email}
                          </p>
                          <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 text-[10px] font-bold">
                            Royal Foodie Member 👑
                          </span>
                        </div>

                        {/* Navigation Links inside Dropdown */}
                        <Link
                          to="/orders"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-600 dark:hover:text-brand-400 transition"
                        >
                          <Receipt className="w-4 h-4 text-slate-400" />
                          <span>My Orders & Live Status</span>
                        </Link>

                        <button
                          onClick={() => {
                            toggleTheme();
                            setUserDropdownOpen(false);
                          }}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition text-left"
                        >
                          <span className="flex items-center gap-2.5">
                            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-400" />}
                            <span>Appearance</span>
                          </span>
                          <span className="text-[10px] font-bold uppercase text-slate-400">
                            {isDark ? 'Dark' : 'Light'}
                          </span>
                        </button>

                        <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

                        {/* Logout Button */}
                        <button
                          onClick={() => {
                            logout();
                            setUserDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition text-left font-semibold"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  onClick={() => openAuthModal('login')}
                  className="flex items-center gap-1.5 p-2 sm:px-3.5 sm:py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-500 text-slate-700 dark:text-slate-200 text-xs font-bold transition border border-slate-200/80 dark:border-slate-700/60"
                  title="Sign In / Register"
                >
                  <User className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sign In</span>
                </button>
              )}

              {/* Cart Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsCartDrawerOpen(true)}
                className="relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full bg-slate-900 dark:bg-brand-600 text-white hover:bg-brand-500 dark:hover:bg-brand-500 transition shadow-card group"
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4" />
                  {totalItemCount > 0 && (
                    <motion.span
                      key={totalItemCount}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2.5 w-4 h-4 rounded-full bg-brand-500 dark:bg-white text-white dark:text-brand-600 text-[10px] font-black flex items-center justify-center ring-2 ring-white dark:ring-slate-900"
                    >
                      {totalItemCount}
                    </motion.span>
                  )}
                </div>
                <span className="hidden sm:inline text-xs font-bold">
                  {totalItemCount > 0 ? formatCurrency(subtotal) : 'Cart'}
                </span>
              </motion.button>

              {/* Mobile hamburger menu */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pt-4 pb-3 border-t border-slate-100 dark:border-slate-800 mt-3 space-y-2"
            >
              <div className="px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl mb-2 text-xs flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <MapPin className="w-4 h-4 text-brand-500 flex-shrink-0" />
                <span className="truncate">{currentAddress}</span>
              </div>

              {isAuthenticated ? (
                <div className="px-3 py-2.5 bg-brand-50 dark:bg-slate-800 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">
                        {user?.name}
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal('login');
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-brand-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-glow"
                >
                  <User className="w-4 h-4" />
                  <span>Sign In / Create Account</span>
                </button>
              )}

              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-slate-800 hover:text-brand-600 transition"
              >
                Explore Restaurants
              </Link>
              <Link
                to="/orders"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-slate-800 hover:text-brand-600 transition"
              >
                Order History & Live Status
              </Link>
              <Link
                to="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-slate-800 hover:text-brand-600 transition"
              >
                View Full Cart ({totalItemCount} items)
              </Link>

              {/* Mobile theme and fullscreen row */}
              <div className="pt-2 space-y-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between px-3 text-xs text-slate-600 dark:text-slate-400">
                  <span>Theme: {isDark ? 'Dark Mode' : 'Light Mode'}</span>
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-amber-400 flex items-center gap-1.5"
                  >
                    {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                    <span className="text-[11px] font-bold">Toggle</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </header>
    </>
  );
};

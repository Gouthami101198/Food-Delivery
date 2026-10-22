import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Monitor,
  Smartphone,
  Maximize2,
  Minimize2,
  Sun,
  Moon,
  ChevronUp,
  ChevronDown,
  Layers,
} from 'lucide-react';
import { useViewMode } from '../../context/ViewModeContext';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';

export const ViewModeBar = () => {
  const { viewMode, setViewMode, isFullscreen, toggleFullscreen } = useViewMode();
  const { theme, isDark, toggleTheme } = useTheme();
  const { totalItemCount } = useCart();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // If user has items in cart, elevate above the sticky mobile cart bar
  const bottomPositionClass = totalItemCount > 0 ? 'bottom-20 sm:bottom-5' : 'bottom-4 sm:bottom-5';

  return (
    <div className={`fixed ${bottomPositionClass} right-3 sm:right-5 z-40 print:hidden select-none transition-all duration-300`}>
      <AnimatePresence mode="wait">
        {isCollapsed ? (
          <motion.button
            key="collapsed-btn"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsCollapsed(false)}
            className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-full bg-slate-900/90 dark:bg-slate-800/95 text-white shadow-xl backdrop-blur-md border border-white/10 hover:bg-brand-500 transition text-xs font-bold"
            title="Open Display Controls"
          >
            <Layers className="w-4 h-4 text-brand-400" />
            <span className="hidden sm:inline">Views & Screen</span>
            <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
          </motion.button>
        ) : (
          <motion.div
            key="expanded-bar"
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-full bg-slate-900/95 dark:bg-slate-800/95 text-white shadow-2xl backdrop-blur-md border border-white/10 text-xs"
          >
            {/* View Mode Toggle: Desktop vs Mobile */}
            <div className="flex items-center bg-white/10 dark:bg-slate-900/60 p-0.5 rounded-full">
              <button
                type="button"
                onClick={() => setViewMode('desktop')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition font-semibold text-xs ${
                  viewMode === 'desktop'
                    ? 'bg-brand-500 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
                title="Desktop View (Full Width)"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Desktop</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('mobile')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition font-semibold text-xs ${
                  viewMode === 'mobile'
                    ? 'bg-brand-500 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
                title="Mobile View (390px Simulated Viewport)"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mobile</span>
              </button>
            </div>

            <div className="w-[1px] h-4 bg-white/15 mx-0.5" />

            {/* Dark Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-white/10 text-amber-400 transition"
              title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-slate-300" />}
            </button>

            {/* Fullscreen Toggle */}
            <button
              type="button"
              onClick={toggleFullscreen}
              className={`p-2 rounded-full transition ${
                isFullscreen
                  ? 'bg-brand-500/20 text-brand-400 hover:bg-brand-500/30'
                  : 'hover:bg-white/10 text-slate-300 hover:text-white'
              }`}
              title={isFullscreen ? 'Exit Full Screen' : 'Enable Full Screen'}
              aria-label="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Collapse button */}
            <button
              type="button"
              onClick={() => setIsCollapsed(true)}
              className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-slate-200 transition"
              title="Minimize toolbar"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

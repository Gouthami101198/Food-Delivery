import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Heart,
  ChevronLeft,
  ChevronRight,
  Plus,
  Sliders,
  Sparkles,
  Star,
  Flame,
  Check
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/helpers';
import { DietaryBadge } from '../common/Badge';

export const VideoReelModal = ({
  reel,
  isOpen,
  onClose,
  onNext,
  onPrev,
  onCustomize,
  allReels = []
}) => {
  const { addToCart } = useCart();
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(reel?.likes || 1200);
  const [floatingHearts, setFloatingHearts] = useState([]);
  const [justAdded, setJustAdded] = useState(false);

  // Sync like count with current reel
  useEffect(() => {
    if (reel) {
      setLikeCount(reel.likes);
      setIsLiked(false);
      setProgress(0);
      setIsPlaying(true);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    }
  }, [reel?.id]);

  // Handle time update for progress bar
  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const current = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(current);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        onNext && onNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        onPrev && onPrev();
      } else if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      } else if (e.key.toLowerCase() === 'm') {
        toggleMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onNext, onPrev, isPlaying, isMuted]);

  if (!isOpen || !reel) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleLike = () => {
    const nextState = !isLiked;
    setIsLiked(nextState);
    setLikeCount((prev) => (nextState ? prev + 1 : prev - 1));

    if (nextState) {
      // Spawn floating hearts
      const heartId = Date.now();
      setFloatingHearts((prev) => [...prev, heartId]);
      setTimeout(() => {
        setFloatingHearts((prev) => prev.filter((id) => id !== heartId));
      }, 1200);
    }
  };

  const handleQuickAdd = () => {
    // Fabricate dish item format for cart
    const dishItem = {
      id: reel.dishId,
      restaurantId: reel.restaurantId,
      name: reel.dishName,
      price: reel.price,
      isVeg: reel.isVeg,
      image: reel.thumbnail,
      description: reel.subtitle,
    };

    addToCart(dishItem, {}, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleOpenCustomize = () => {
    onClose();
    if (onCustomize) {
      const dishItem = {
        id: reel.dishId,
        restaurantId: reel.restaurantId,
        name: reel.dishName,
        price: reel.price,
        isVeg: reel.isVeg,
        image: reel.thumbnail,
        description: reel.subtitle,
      };
      onCustomize(dishItem);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-hidden">
        {/* Backdrop with dark blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/85 backdrop-blur-xl"
        />

        {/* Modal Reel Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-sm sm:max-w-md md:max-w-lg aspect-[9/16] max-h-[90vh] bg-slate-900 rounded-4xl overflow-hidden shadow-2xl border border-white/15 flex flex-col z-10"
        >
          {/* Top Progress bar */}
          <div className="absolute top-0 left-0 right-0 z-30 p-3 flex gap-1.5 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
            <div className="w-full bg-white/25 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-brand-500 h-full rounded-full transition-all duration-150 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Top Controls Bar */}
          <div className="absolute top-5 left-4 right-4 z-30 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/90 backdrop-blur-md text-[11px] font-black uppercase tracking-wider shadow-sm">
                <Flame className="w-3.5 h-3.5 fill-white" />
                <span>Live Sizzle</span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-[11px] font-semibold text-white/90">
                {reel.tag}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Sound Toggle */}
              <button
                type="button"
                onClick={toggleMute}
                className="p-2.5 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white transition active:scale-90"
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-brand-400" />}
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="p-2.5 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white transition active:scale-90"
                aria-label="Close video reel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Video Element */}
          <div className="relative flex-1 w-full h-full cursor-pointer" onClick={togglePlay}>
            <video
              ref={videoRef}
              src={reel.videoUrl}
              poster={reel.thumbnail}
              playsInline
              autoPlay
              loop
              muted={isMuted}
              onTimeUpdate={handleTimeUpdate}
              className="w-full h-full object-cover select-none"
            />

            {/* Subtle dark vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-black/40 pointer-events-none" />

            {/* Play/Pause indicator on click */}
            {!isPlaying && (
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center pointer-events-none shadow-xl border border-white/20"
              >
                <Play className="w-8 h-8 fill-white ml-1" />
              </motion.div>
            )}

            {/* Floating Heart Burst Animation */}
            <AnimatePresence>
              {floatingHearts.map((heartId) => (
                <motion.div
                  key={heartId}
                  initial={{ opacity: 1, scale: 0.5, y: 0 }}
                  animate={{ opacity: 0, scale: 1.8, y: -120 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute bottom-32 right-12 text-rose-500 pointer-events-none z-40"
                >
                  <Heart className="w-12 h-12 fill-rose-500" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Right Action Rail (Like, Share, Audio Equalizer) */}
          <div className="absolute right-3 bottom-32 z-30 flex flex-col items-center gap-4">
            {/* Like Button */}
            <div className="flex flex-col items-center gap-1">
              <motion.button
                whileTap={{ scale: 0.8 }}
                onClick={handleLike}
                className={`p-3 rounded-full backdrop-blur-md shadow-lg border border-white/10 transition ${
                  isLiked
                    ? 'bg-rose-500 text-white'
                    : 'bg-black/40 text-white hover:bg-black/60'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-white' : ''}`} />
              </motion.button>
              <span className="text-[11px] font-black text-white drop-shadow-md">
                {likeCount.toLocaleString()}
              </span>
            </div>

            {/* Sound Wave Indicator when unmuted */}
            {!isMuted && (
              <div className="flex items-end justify-center gap-0.5 h-6 px-2 py-1 rounded-full bg-black/40 backdrop-blur-md">
                <span className="w-1 bg-brand-400 rounded-full animate-sound-1" />
                <span className="w-1 bg-brand-400 rounded-full animate-sound-2" />
                <span className="w-1 bg-brand-400 rounded-full animate-sound-3" />
              </div>
            )}
          </div>

          {/* Navigation Arrows for Previous and Next */}
          {onPrev && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition z-30 active:scale-90"
              aria-label="Previous Video"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {onNext && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition z-30 active:scale-90"
              aria-label="Next Video"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* Bottom Card: Dish Info, Chef Secrets & Order Actions */}
          <div className="absolute bottom-0 left-0 right-0 z-30 p-4 sm:p-5 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent text-white space-y-3">
            {/* Restaurant & Rating */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-brand-500 flex items-center justify-center text-xs font-black">
                  👨‍🍳
                </div>
                <span className="text-xs font-bold text-slate-300">
                  {reel.restaurantName}
                </span>
              </div>
              <div className="flex items-center gap-1 bg-white/10 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{reel.rating}</span>
              </div>
            </div>

            {/* Dish Title & Price */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <DietaryBadge isVeg={reel.isVeg} />
                <h3 className="font-display font-black text-base sm:text-lg text-white leading-tight">
                  {reel.dishName}
                </h3>
              </div>
              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                {reel.subtitle}
              </p>
            </div>

            {/* Chef Tasting Note Tag */}
            <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-[11px] text-amber-200 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="line-clamp-2 leading-snug">{reel.chefNote}</p>
            </div>

            {/* Order Action CTAs */}
            <div className="flex items-center gap-2.5 pt-1">
              {/* Quick Add Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleQuickAdd}
                className={`flex-1 py-3 px-4 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-glow transition ${
                  justAdded
                    ? 'bg-emerald-500 text-white'
                    : 'bg-brand-500 hover:bg-brand-600 text-white'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>Order • {formatCurrency(reel.price)}</span>
                  </>
                )}
              </motion.button>

              {/* Customize Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenCustomize}
                className="py-3 px-3.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs backdrop-blur-md border border-white/15 flex items-center gap-1.5 transition"
                title="Customize spice, sizes and add-ons"
              >
                <Sliders className="w-4 h-4" />
                <span className="hidden sm:inline">Customize</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

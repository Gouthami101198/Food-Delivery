import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Sparkles,
  Clock,
  ShieldCheck,
  Flame,
  ArrowRight,
  Star,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Video,
  Image as ImageIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const HeroBanner = ({ onSearchClick }) => {
  const navigate = useNavigate();
  const [heroQuery, setHeroQuery] = useState('');
  const [mediaMode, setMediaMode] = useState('video'); // 'video' | 'image'
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const heroVideoRef = useRef(null);

  const handleHeroSubmit = (e) => {
    e.preventDefault();
    if (onSearchClick) {
      onSearchClick(heroQuery);
    }
  };

  const toggleVideoPlayback = () => {
    if (!heroVideoRef.current) return;
    if (isVideoPlaying) {
      heroVideoRef.current.pause();
      setIsVideoPlaying(false);
    } else {
      heroVideoRef.current.play().catch(() => {});
      setIsVideoPlaying(true);
    }
  };

  const toggleVideoMute = () => {
    if (!heroVideoRef.current) return;
    heroVideoRef.current.muted = !isVideoMuted;
    setIsVideoMuted(!isVideoMuted);
  };

  return (
    <section className="relative overflow-hidden pt-2 sm:pt-4 pb-10 sm:pb-16 lg:pb-20">
      {/* Background ambient gradient glow */}
      <div className="absolute top-0 left-0 right-0 w-full h-96 bg-gradient-to-b from-brand-100/40 dark:from-brand-950/20 via-amber-50/30 dark:via-transparent to-transparent pointer-events-none -z-10" />

      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 xl:gap-16 items-center">
          {/* Left Column: Headline, Value Props, Search */}
          <div className="md:col-span-7 space-y-4 sm:space-y-6 text-center md:text-left">
            {/* Pill tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/40 border border-brand-200/80 dark:border-brand-800/60 text-brand-700 dark:text-brand-300 text-[11px] sm:text-xs font-bold shadow-2xs max-w-full truncate"
            >
              <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse flex-shrink-0" />
              <span className="truncate">Free Delivery on orders above ₹199 with code FREESHIP</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-black font-display text-slate-900 dark:text-white tracking-tight leading-[1.15]"
            >
              Crave it? We deliver it{' '}
              <span className="bg-gradient-to-r from-brand-500 via-amber-500 to-orange-500 bg-clip-text text-transparent">
                Hot, Sizzling & Fresh.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xs sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto md:mx-0 leading-relaxed"
            >
              Explore royal Hyderabadi dum biryanis, rich Punjabi butter chicken, crispy butter masala dosas, Kolkata kathi rolls, and authentic Delhi street chaats.
            </motion.p>

            {/* Quick Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-xl lg:max-w-2xl mx-auto md:mx-0"
            >
              <form
                onSubmit={handleHeroSubmit}
                className="p-1.5 sm:p-2.5 bg-white dark:bg-slate-800/90 rounded-2xl sm:rounded-3xl shadow-float border border-slate-200/80 dark:border-slate-700 flex items-center gap-1.5 sm:gap-2 transition-colors"
              >
                <div className="pl-2 sm:pl-3 text-brand-500 flex-shrink-0">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <input
                  type="text"
                  value={heroQuery}
                  onChange={(e) => setHeroQuery(e.target.value)}
                  placeholder="Search Biryani, Butter Chicken, Dosa..."
                  className="w-full text-xs sm:text-sm font-semibold text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none bg-transparent min-w-0"
                />
                <button
                  type="button"
                  onClick={() => onSearchClick(heroQuery)}
                  className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs sm:text-sm shadow-glow flex items-center gap-2 transition flex-shrink-0"
                >
                  <span>Search</span>
                  <ArrowRight className="w-4 h-4 hidden sm:block" />
                </button>
              </form>

              {/* Popular tags */}
              <div className="flex items-center gap-1.5 sm:gap-2 mt-2.5 sm:mt-3 flex-wrap justify-center md:justify-start text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-400 dark:text-slate-500">Popular:</span>
                {['Dum Biryani', 'Butter Chicken', 'Masala Dosa', 'Galouti Kebabs', 'Pani Puri'].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => onSearchClick(item)}
                    className="hover:text-brand-600 dark:hover:text-brand-400 underline underline-offset-4 font-medium transition"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Metrics & Guarantees */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="pt-3 sm:pt-4 grid grid-cols-3 gap-2 sm:gap-4 border-t border-slate-200/60 dark:border-slate-800 max-w-lg mx-auto md:mx-0 text-center sm:text-left"
            >
              <div>
                <p className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white font-display">25 min</p>
                <p className="text-[10px] sm:text-[11px] font-semibold text-slate-500 dark:text-slate-400">Avg Delivery</p>
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-black text-brand-600 dark:text-brand-400 font-display">1,200+</p>
                <p className="text-[10px] sm:text-[11px] font-semibold text-slate-500 dark:text-slate-400">Kitchens</p>
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 font-display flex items-center justify-center sm:justify-start gap-1">
                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-emerald-600 dark:fill-emerald-400 text-emerald-600 dark:text-emerald-400" />
                  <span>4.9</span>
                </p>
                <p className="text-[10px] sm:text-[11px] font-semibold text-slate-500 dark:text-slate-400">Foodie Rating</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Dynamic Visual Presentation with Video Sizzle & Animations */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md md:max-w-none px-2 sm:px-0">
              {/* Media Toggle Switch (Video vs Photo) */}
              <div className="flex items-center justify-center md:justify-end mb-3 gap-1.5">
                <div className="inline-flex items-center p-1 rounded-2xl bg-slate-200/80 dark:bg-slate-800/90 border border-slate-300/40 dark:border-slate-700 backdrop-blur-md text-xs font-bold shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setMediaMode('video')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${
                      mediaMode === 'video'
                        ? 'bg-brand-500 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>🎥 Live Sizzle Video</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMediaMode('image')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${
                      mediaMode === 'image'
                        ? 'bg-slate-900 dark:bg-brand-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>📸 Photo Feast</span>
                  </button>
                </div>
              </div>

              {/* Steam Rising Animation Over the Plate */}
              <div className="absolute -top-12 left-1/3 pointer-events-none z-20 flex gap-4 opacity-80">
                <svg className="w-5 h-16 text-white/70 animate-steam-1" viewBox="0 0 20 60" fill="none">
                  <path d="M10 55 C 5 45, 15 35, 10 25 C 5 15, 15 5, 10 0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
                <svg className="w-5 h-16 text-amber-200/70 animate-steam-2" viewBox="0 0 20 60" fill="none">
                  <path d="M10 55 C 15 45, 5 35, 10 25 C 15 15, 5 5, 10 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <svg className="w-5 h-16 text-white/70 animate-steam-3" viewBox="0 0 20 60" fill="none">
                  <path d="M10 55 C 7 45, 13 35, 10 25 C 7 15, 13 5, 10 0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* Main Feature Container with organic rounded styling and glowing border */}
              <div className="relative rounded-3xl sm:rounded-4xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 aspect-[4/3] sm:aspect-square lg:aspect-[4/3] xl:aspect-[16/11] max-h-[500px] xl:max-h-[540px] bg-slate-900 group">
                {mediaMode === 'video' ? (
                  <div className="relative w-full h-full">
                    <video
                      ref={heroVideoRef}
                      src="https://assets.mixkit.co/videos/49231/49231-720.mp4"
                      poster="https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80"
                      autoPlay
                      loop
                      muted={isVideoMuted}
                      playsInline
                      className="w-full h-full object-cover"
                    />

                    {/* Video Controls Overlay */}
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 flex items-center gap-1.5 sm:gap-2">
                      <button
                        type="button"
                        onClick={toggleVideoMute}
                        className="p-2 sm:p-2.5 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md text-white transition active:scale-90"
                        title={isVideoMuted ? 'Unmute' : 'Mute'}
                      >
                        {isVideoMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-400" />}
                      </button>
                      <button
                        type="button"
                        onClick={toggleVideoPlayback}
                        className="p-2 sm:p-2.5 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md text-white transition active:scale-90"
                        title={isVideoPlaying ? 'Pause' : 'Play'}
                      >
                        {isVideoPlaying ? <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" />}
                      </button>
                    </div>

                    {/* Live indicator badge */}
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20 flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-[11px] font-bold">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                      <span>LIVE KITCHEN FEED</span>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <img
                      src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80"
                      alt="Delicious Indian food feast"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                    />
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white z-10">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-amber-300 bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full">
                      <Flame className="w-3 h-3 fill-amber-300 text-amber-300" />
                      Chef's Handi Special
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-white/80 font-semibold">• 4.97 ★</span>
                  </div>
                  <h3 className="text-sm sm:text-lg font-black font-display text-white drop-shadow-md line-clamp-1 sm:line-clamp-none">
                    Royal Zaffrani Dum Biryani & Galouti Kebabs
                  </h3>
                </div>
              </div>

              {/* Floating Badge 1: Live Delivery Time (Contained properly on mobile) */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-2 left-2 md:-top-4 md:-left-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-2 sm:p-3 rounded-2xl shadow-float border border-slate-100 dark:border-slate-800 flex items-center gap-2 sm:gap-3 z-20"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-brand-500 text-white flex items-center justify-center shadow-md animate-pulse flex-shrink-0">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" style={{ animationDuration: '6s' }} />
                </div>
                <div>
                  <p className="text-[11px] sm:text-xs font-black text-slate-900 dark:text-white">Live Delivery</p>
                  <p className="text-[10px] sm:text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">⚡ 22 min to doorstep</p>
                </div>
              </motion.div>

              {/* Floating Badge 2: Verified Quality (Contained properly on mobile) */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute bottom-2 right-2 md:-bottom-5 md:-right-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-2 sm:p-3.5 rounded-2xl shadow-float border border-slate-100 dark:border-slate-800 flex items-center gap-2 sm:gap-3 z-20"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md flex-shrink-0">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <p className="text-[11px] sm:text-xs font-black text-slate-900 dark:text-white">Tamper-Proof</p>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-semibold">100% Hygienic Pack</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

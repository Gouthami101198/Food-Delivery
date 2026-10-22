import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Bike, Home, Store, Clock } from 'lucide-react';

export const DeliveryMapMock = ({ status, estimatedArrival }) => {
  // Compute driver position percentage along the mock route
  let driverPercent = 10;
  if (status === 'preparing') driverPercent = 25;
  if (status === 'driver_assigned') driverPercent = 45;
  if (status === 'out_for_delivery') driverPercent = 75;
  if (status === 'delivered') driverPercent = 95;

  return (
    <div className="relative w-full h-80 sm:h-96 rounded-3xl overflow-hidden shadow-soft border border-slate-200/80 dark:border-slate-800 bg-[#e5e9ec] dark:bg-slate-900 transition-colors">
      {/* Map Graphic Mock using CSS SVG layout */}
      <svg
        className="w-full h-full object-cover dark:brightness-[0.7] dark:invert-[0.85] dark:hue-rotate-180 transition-all"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 450"
      >
        {/* Background Land */}
        <rect width="800" height="450" fill="#f4f3ef" />

        {/* Parks / Green spaces */}
        <path
          d="M 50,50 Q 120,30 200,90 T 320,120 L 290,240 Q 180,260 80,180 Z"
          fill="#dcfce7"
        />
        <path
          d="M 550,180 Q 640,150 720,210 L 760,350 Q 650,380 540,320 Z"
          fill="#dcfce7"
        />

        {/* Water River */}
        <path
          d="M 0,260 C 180,240 320,320 450,290 C 580,260 680,360 800,340 L 800,390 C 680,410 580,310 450,340 C 320,370 180,290 0,310 Z"
          fill="#bae6fd"
          opacity="0.8"
        />

        {/* City Streets / Grids */}
        <path
          d="M 0,100 L 800,100 M 0,200 L 800,200 M 0,380 L 800,380"
          stroke="#ffffff"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d="M 120,0 L 120,450 M 360,0 L 360,450 M 600,0 L 600,450"
          stroke="#ffffff"
          strokeWidth="14"
          strokeLinecap="round"
        />

        {/* Secondary Avenues */}
        <path
          d="M 0,150 L 800,150 M 0,320 L 800,320 M 240,0 L 240,450 M 480,0 L 480,450"
          stroke="#ffffff"
          strokeWidth="8"
        />

        {/* Delivery Route Path (Curved Highway Line) */}
        <path
          id="deliveryRoute"
          d="M 120,100 C 240,100 240,200 360,200 C 480,200 480,320 600,320"
          fill="none"
          stroke="#ff5c00"
          strokeWidth="6"
          strokeDasharray="8 6"
          className="animate-pulse"
        />
      </svg>

      {/* Origin Pin (Restaurant) */}
      <div className="absolute top-[16%] left-[13%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg border-2 border-white">
          <Store className="w-5 h-5 text-amber-400" />
        </div>
        <span className="mt-1 px-2 py-0.5 rounded-md bg-white/95 dark:bg-slate-900/95 text-[10px] font-black text-slate-800 dark:text-slate-200 shadow-xs border border-slate-200 dark:border-slate-700">
          Kitchen
        </span>
      </div>

      {/* Destination Pin (Home) */}
      <div className="absolute top-[68%] left-[75%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
          <Home className="w-5 h-5" />
        </div>
        <span className="mt-1 px-2 py-0.5 rounded-md bg-white/95 dark:bg-slate-900/95 text-[10px] font-black text-slate-800 dark:text-slate-200 shadow-xs border border-slate-200 dark:border-slate-700">
          Your Home (Indiranagar)
        </span>
      </div>

      {/* Animated Driver Marker Pin */}
      <motion.div
        animate={{
          left: `${13 + (driverPercent / 100) * (75 - 13)}%`,
          top: `${16 + (driverPercent / 100) * (68 - 16)}%`,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center"
      >
        <div className="relative">
          <div className="w-12 h-12 rounded-2xl bg-brand-500 text-white flex items-center justify-center shadow-glow border-2 border-white">
            <Bike className="w-6 h-6 animate-bounce" />
          </div>
          {/* Radar ripple rings */}
          <span className="absolute -inset-2 rounded-2xl bg-brand-500 opacity-40 animate-ping pointer-events-none" />
        </div>
        <span className="mt-1 px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-bold shadow-md">
          Ramesh (Delivery Partner)
        </span>
      </motion.div>

      {/* Live Distance & ETA floating pill */}
      <div className="absolute top-4 left-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl shadow-float border border-slate-100 dark:border-slate-800 flex items-center gap-2.5 sm:gap-3">
        <div className="w-8 h-8 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center">
          <Clock className="w-4 h-4" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Estimated Arrival
          </p>
          <p className="text-xs font-black text-slate-900 dark:text-white">
            {estimatedArrival || 'Approx. 25-30 min'}
          </p>
        </div>
      </div>
    </div>
  );
};

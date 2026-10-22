import React from 'react';
import { Phone, MessageSquare, Star, ShieldCheck } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const DriverCard = ({ driver }) => {
  const { addToast } = useToast();

  const handleCall = () => {
    addToast(`Calling Ramesh Kumar at ${driver?.phone || '+91 98450 12345'}...`, 'info');
  };

  const handleChat = () => {
    addToast('Ramesh: "Bhaiya, I have picked up your order and reaching your location in 5 minutes!"', 'success');
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 border border-slate-100 dark:border-slate-800 shadow-soft flex items-center justify-between gap-3 sm:gap-4">
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="relative flex-shrink-0">
          <img
            src={
              driver?.avatar ||
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
            }
            alt={driver?.name || 'Driver'}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl object-cover border-2 border-brand-100 dark:border-slate-700"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 flex items-center justify-center text-white" title="Verified Delivery Partner">
            <ShieldCheck className="w-3 h-3" />
          </div>
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">
              {driver?.name || 'Ramesh Kumar'}
            </h4>
            <span className="flex items-center gap-0.5 text-[11px] font-black text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-1.5 py-0.5 rounded-md flex-shrink-0">
              <Star className="w-3 h-3 fill-amber-500" />
              {driver?.rating || '4.96'}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
            {driver?.vehicle || 'Hero Splendor (KA 03 EX 4821)'}
          </p>
          <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold truncate">
            {driver?.trips || '2,840 deliveries'} • 100% on-time
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={handleCall}
          className="p-2.5 sm:p-3 rounded-2xl bg-brand-50 dark:bg-brand-950/50 hover:bg-brand-100 dark:hover:bg-brand-900/50 text-brand-600 dark:text-brand-400 transition shadow-2xs"
          title="Call delivery driver"
        >
          <Phone className="w-4 h-4" />
        </button>
        <button
          onClick={handleChat}
          className="p-2.5 sm:p-3 rounded-2xl bg-slate-900 dark:bg-slate-800 hover:bg-brand-500 dark:hover:bg-brand-500 text-white transition shadow-2xs"
          title="Send message to driver"
        >
          <MessageSquare className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

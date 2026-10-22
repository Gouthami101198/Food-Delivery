import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  ChefHat,
  UserCheck,
  Bike,
  Sparkles,
  Clock,
  Circle,
} from 'lucide-react';
import { ORDER_STATUSES } from '../../context/OrderContext';

export const OrderStatusTimeline = ({ currentStatusKey }) => {
  const currentIndex = ORDER_STATUSES.findIndex((s) => s.key === currentStatusKey);
  const activeIndex = currentIndex === -1 ? 0 : currentIndex;

  const getStepIcon = (iconName, isCompleted, isCurrent) => {
    const iconClass = `w-4 h-4 ${
      isCurrent ? 'text-white' : isCompleted ? 'text-white' : 'text-slate-400'
    }`;

    switch (iconName) {
      case 'ChefHat':
        return <ChefHat className={iconClass} />;
      case 'UserCheck':
        return <UserCheck className={iconClass} />;
      case 'Bike':
        return <Bike className={iconClass} />;
      case 'CheckCircle2':
        return <CheckCircle2 className={iconClass} />;
      default:
        return <CheckCircle2 className={iconClass} />;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-8 border border-slate-100 dark:border-slate-800 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display font-black text-lg sm:text-xl text-slate-900 dark:text-white">
            Order Progress
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time milestone updates from kitchen to your door
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-brand-50 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300">
          Step {activeIndex + 1} of {ORDER_STATUSES.length}
        </span>
      </div>

      {/* Vertical Timeline on mobile, Horizontal on tablet+ */}
      <div className="relative">
        <div className="space-y-6 sm:space-y-0 sm:grid sm:grid-cols-5 sm:gap-4 relative">
          {ORDER_STATUSES.map((step, idx) => {
            const isCompleted = idx < activeIndex;
            const isCurrent = idx === activeIndex;
            const isFuture = idx > activeIndex;

            return (
              <div
                key={step.key}
                className="flex sm:flex-col items-start sm:items-center gap-4 sm:gap-2 text-left sm:text-center relative group"
              >
                {/* Step Circle Indicator */}
                <div className="relative flex items-center justify-center">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center transition shadow-md z-10 ${
                      isCurrent
                        ? 'bg-brand-500 text-white ring-4 ring-brand-500/20 scale-110 shadow-glow'
                        : isCompleted
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {getStepIcon(step.icon, isCompleted, isCurrent)}
                  </div>

                  {/* Pulsing ring for current step */}
                  {isCurrent && (
                    <span className="absolute -inset-1 rounded-2xl bg-brand-500 opacity-30 animate-ping pointer-events-none" />
                  )}
                </div>

                {/* Step Text Info */}
                <div className="flex-1">
                  <h4
                    className={`text-xs font-bold leading-tight ${
                      isCurrent
                        ? 'text-brand-600 dark:text-brand-400 font-black'
                        : isCompleted
                        ? 'text-slate-900 dark:text-slate-100'
                        : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 sm:block">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

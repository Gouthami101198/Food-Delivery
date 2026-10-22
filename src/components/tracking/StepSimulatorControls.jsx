import React from 'react';
import { FastForward, Play, RefreshCw, CheckCircle2 } from 'lucide-react';
import { ORDER_STATUSES } from '../../context/OrderContext';

export const StepSimulatorControls = ({
  orderId,
  currentStatus,
  onUpdateStatus,
  onAdvanceStatus,
}) => {
  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-5 shadow-lg border border-slate-700/80">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h4 className="font-display font-bold text-sm text-white">
              Live Order Simulation Control
            </h4>
          </div>
          <p className="text-[11px] text-slate-400">
            Interactive tool to test real-time milestone transitions and delivery updates
          </p>
        </div>

        <button
          onClick={() => onAdvanceStatus(orderId)}
          className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-glow transition flex-shrink-0"
        >
          <FastForward className="w-4 h-4" />
          <span>Simulate Next Step</span>
        </button>
      </div>

      {/* Quick Select Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {ORDER_STATUSES.map((step) => {
          const isActive = currentStatus === step.key;
          return (
            <button
              key={step.key}
              onClick={() => onUpdateStatus(orderId, step.key)}
              className={`p-2 rounded-xl text-[11px] font-bold text-center transition border ${
                isActive
                  ? 'bg-white text-slate-900 border-white shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {step.title}
            </button>
          );
        })}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Send,
  Heart,
  ShieldCheck,
  Zap,
  Award,
  Smartphone,
  CheckCircle2,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const { addToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address', 'error');
      return;
    }
    addToast('Subscribed! Check your inbox for 25% off your next order.', 'success');
    setEmail('');
  };

  return (
    <footer className="bg-slate-900 dark:bg-black text-slate-300 pt-10 sm:pt-16 pb-12 mt-12 sm:mt-20 border-t border-slate-800">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Top Feature Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pb-8 sm:pb-12 border-b border-slate-800/80 mb-8 sm:mb-12">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center flex-shrink-0">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h5 className="text-white text-xs font-bold">Fastest Delivery</h5>
              <p className="text-[10px] sm:text-[11px] text-slate-400">Average 25 min to door</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h5 className="text-white text-xs font-bold">100% Hygienic</h5>
              <p className="text-[10px] sm:text-[11px] text-slate-400">Tamper-proof safety seals</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0">
              <Award className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h5 className="text-white text-xs font-bold">Top Rated Kitchens</h5>
              <p className="text-[10px] sm:text-[11px] text-slate-400">Curated master chefs</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center flex-shrink-0">
              <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h5 className="text-white text-xs font-bold">Live GPS Tracking</h5>
              <p className="text-[10px] sm:text-[11px] text-slate-400">Real-time driver route</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 sm:gap-10 pb-8 sm:pb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-amber-500 flex items-center justify-center text-white shadow-glow">
                <span className="text-xl">🍛</span>
              </div>
              <span className="font-display font-black text-2xl text-white">
                Crave<span className="text-brand-500">Bite</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Discover authentic Indian culinary traditions delivered piping hot to your doorstep. From slow-dum biryanis and buttery dal makhani to crisp dosas and street chaats, taste the finest flavours from top kitchens.
            </p>

            {/* Newsletter form */}
            <form onSubmit={handleSubscribe} className="pt-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider block mb-2">
                Get Secret Discounts & Weekly Deals
              </span>
              <div className="flex items-center max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-2.5 text-xs bg-slate-800 text-white rounded-l-xl border border-slate-700 focus:outline-none focus:border-brand-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold rounded-r-xl transition flex items-center gap-1.5 flex-shrink-0"
                >
                  <span>Join</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>

          {/* Column 1: Cuisines */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Top Indian Cuisines
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/?category=biryani" className="hover:text-brand-400 transition">Dum Biryani & Rice</Link></li>
              <li><Link to="/?category=north-indian" className="hover:text-brand-400 transition">North Indian & Curries</Link></li>
              <li><Link to="/?category=south-indian" className="hover:text-brand-400 transition">South Indian Tiffins</Link></li>
              <li><Link to="/?category=chaat" className="hover:text-brand-400 transition">Street Food & Chaats</Link></li>
              <li><Link to="/?category=sweets" className="hover:text-brand-400 transition">Mithai & Desserts</Link></li>
            </ul>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Discover
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/" className="hover:text-brand-400 transition">Featured Restaurants</Link></li>
              <li><Link to="/orders" className="hover:text-brand-400 transition">Track Live Order</Link></li>
              <li><Link to="/orders" className="hover:text-brand-400 transition">Order History</Link></li>
              <li><a href="#offers" className="hover:text-brand-400 transition">Active Coupons</a></li>
              <li><Link to="/cart" className="hover:text-brand-400 transition">Shopping Bag</Link></li>
            </ul>
          </div>

          {/* Column 3: Apps & Safe Pay */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Mobile App
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Experience ultra-fast ordering on iOS and Android.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-800 border border-slate-700 hover:border-slate-600 cursor-pointer transition">
                <span className="text-lg">🍏</span>
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-slate-400">Download on</p>
                  <p className="text-xs font-bold text-white">Apple App Store</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-800 border border-slate-700 hover:border-slate-600 cursor-pointer transition">
                <span className="text-lg">🤖</span>
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-slate-400">Get it on</p>
                  <p className="text-xs font-bold text-white">Google Play Store</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p>© {new Date().getFullYear()} CraveBite Inc. All culinary rights reserved.</p>
          <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 sm:gap-4 text-slate-400">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-400">
              Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for food lovers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

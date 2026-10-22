import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  CreditCard,
  Wallet,
  Banknote,
  ShieldCheck,
  Clock,
  Sparkles,
  MapPin,
  Check,
  AlertCircle,
  Lock,
  User,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../utils/helpers';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, subtotal, discount, deliveryFee, platformFee, estimatedTax, grandTotal, clearCart } =
    useCart();
  const { placeOrder } = useOrder();
  const { addToast } = useToast();
  const { user, isAuthenticated, openAuthModal } = useAuth();

  const [formData, setFormData] = useState({
    fullName: 'Aarav Sharma',
    phone: '+91 98765 43210',
    email: 'aarav.sharma@example.com',
    address: 'Flat 402, Royal Palms, 12th Main',
    apartment: 'Indiranagar, Bengaluru',
    deliveryNotes: 'Leave with society security guard / ring bell 402',
    deliverySpeed: 'standard', // 'standard' or 'priority'
    paymentMethod: 'upi', // 'upi', 'card', 'cod'
    upiId: 'aarav.sharma@oksbi',
    cardNumber: '4242 •••• •••• 4242',
    cardExpiry: '12/28',
    cardCvc: '888',
  });

  // Sync with authenticated user
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.name || prev.fullName,
        phone: user.phone || prev.phone,
        email: user.email || prev.email,
        address: user.address ? user.address.split(',')[0].trim() : prev.address,
        apartment:
          user.address && user.address.includes(',')
            ? user.address.split(',').slice(1).join(',').trim()
            : prev.apartment,
      }));
    }
  }, [user]);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const priorityFee = formData.deliverySpeed === 'priority' ? 30 : 0;
  const finalPayable = grandTotal + priorityFee;

  const validateForm = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.email.trim() || !formData.email.includes('@'))
      errs.email = 'Valid email is required';
    if (!formData.address.trim()) errs.address = 'Street address is required';

    if (formData.paymentMethod === 'upi') {
      if (!formData.upiId.trim() || !formData.upiId.includes('@')) {
        errs.upiId = 'Valid UPI ID required (e.g. name@okhdfcbank)';
      }
    }

    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber.trim()) errs.cardNumber = 'Card number is required';
      if (!formData.cardExpiry.trim()) errs.cardExpiry = 'Expiry required';
      if (!formData.cardCvc.trim()) errs.cardCvc = 'CVC required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      addToast('Your cart is empty! Add food items first.', 'error');
      navigate('/');
      return;
    }

    if (!validateForm()) {
      addToast('Please fix the errors in the form before continuing', 'error');
      return;
    }

    setIsSubmitting(true);

    // Simulate order placement delay for realism
    setTimeout(() => {
      const orderPayload = {
        items: cart,
        pricing: {
          subtotal,
          discount,
          deliveryFee: deliveryFee + priorityFee,
          platformFee,
          estimatedTax,
          grandTotal: finalPayable,
        },
        customer: {
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          address: `${formData.address}${formData.apartment ? ', ' + formData.apartment : ''}`,
          deliveryNotes: formData.deliveryNotes,
          deliveryType: formData.deliverySpeed,
          paymentMethod: formData.paymentMethod,
          cardLast4: formData.paymentMethod === 'card' ? '4242' : 'N/A',
        },
      };

      const createdOrder = placeOrder(orderPayload);
      clearCart();

      // Confetti celebratory explosion
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ff5c00', '#10b981', '#f59e0b', '#3b82f6'],
        });
      } catch (err) {
        // Confetti fallback
      }

      setIsSubmitting(false);
      navigate(`/confirmation/${createdOrder.orderId}`);
    }, 1200);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen py-16 flex items-center justify-center">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-md text-center border border-slate-100 dark:border-slate-800 shadow-soft transition-colors">
          <p className="text-4xl mb-3">🛒</p>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No items to checkout</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Please add dishes to your cart before proceeding to checkout.
          </p>
          <Link
            to="/"
            className="px-6 py-2.5 rounded-2xl bg-brand-500 text-white font-bold text-xs shadow-glow transition hover:bg-brand-600"
          >
            Explore Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Header Breadcrumb */}
        <div className="flex items-center gap-3 mb-8">
          <Link
            to="/cart"
            className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black font-display text-slate-900 dark:text-white tracking-tight">
              Express Secure Checkout
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Complete your address, select delivery priority, and pay safely
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 cols: Delivery details and Payment */}
            <div className="lg:col-span-7 space-y-6">
              {/* 1. Contact Information */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-soft space-y-4 transition-colors">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 flex items-center justify-center text-xs font-black">
                      1
                    </span>
                    <span>Contact Information</span>
                  </h3>
                </div>

                {/* Auth indicator / Login prompt */}
                {isAuthenticated ? (
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 rounded-2xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>
                        Ordering as <strong>{user?.name}</strong> ({user?.email})
                      </span>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40 px-2 py-0.5 rounded-full">
                      Verified Member
                    </span>
                  </div>
                ) : (
                  <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 rounded-2xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300">
                      <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      <span>
                        Have an account? <strong>Sign in</strong> for express checkout.
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => openAuthModal('login')}
                      className="px-3 py-1 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-[11px] shadow-sm transition"
                    >
                      Sign In
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Alex Rivera"
                      className={`w-full px-3.5 py-2.5 text-xs font-medium rounded-xl border bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none ${
                        errors.fullName ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200 dark:border-slate-700 focus:border-brand-500'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-[10px] text-rose-500 mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+91 98765 43210"
                      className={`w-full px-3.5 py-2.5 text-xs font-medium rounded-xl border bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none ${
                        errors.phone ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200 dark:border-slate-700 focus:border-brand-500'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-[10px] text-rose-500 mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="alex.rivera@example.com"
                      className={`w-full px-3.5 py-2.5 text-xs font-medium rounded-xl border bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none ${
                        errors.email ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200 dark:border-slate-700 focus:border-brand-500'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[10px] text-rose-500 mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* 2. Delivery Address */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-100 dark:border-slate-800 shadow-soft space-y-4 transition-colors">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 flex items-center justify-center text-xs font-black">
                      2
                    </span>
                    <span>Delivery Address</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="742 Evergreen Terrace"
                      className={`w-full px-3.5 py-2.5 text-xs font-medium rounded-xl border bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none ${
                        errors.address ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200 dark:border-slate-700 focus:border-brand-500'
                      }`}
                    />
                    {errors.address && (
                      <p className="text-[10px] text-rose-500 mt-1">{errors.address}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Apt / Suite / Floor
                    </label>
                    <input
                      type="text"
                      value={formData.apartment}
                      onChange={(e) => handleInputChange('apartment', e.target.value)}
                      placeholder="Apt 4B"
                      className="w-full px-3.5 py-2.5 text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Delivery Drop-off Notes
                    </label>
                    <input
                      type="text"
                      value={formData.deliveryNotes}
                      onChange={(e) => handleInputChange('deliveryNotes', e.target.value)}
                      placeholder="e.g. Leave by front door, buzz code 1234, ring bell..."
                      className="w-full px-3.5 py-2.5 text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                {/* Delivery Speed Options */}
                <div className="pt-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                    Delivery Speed
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleInputChange('deliverySpeed', 'standard')}
                      className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition ${
                        formData.deliverySpeed === 'standard'
                          ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/40 ring-2 ring-brand-500/20'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800'
                      }`}
                    >
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Standard Delivery</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">25 - 35 mins</p>
                      </div>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Included</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleInputChange('deliverySpeed', 'priority')}
                      className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition ${
                        formData.deliverySpeed === 'priority'
                          ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/40 ring-2 ring-brand-500/20'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800'
                      }`}
                    >
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                          <span>⚡ Priority Express</span>
                          <span className="text-[10px] text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/50 px-1.5 py-0.2 rounded">Fast</span>
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">15 - 20 mins (Direct)</p>
                      </div>
                      <span className="text-xs font-bold text-brand-600 dark:text-brand-400">+₹30</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 3. Payment Method */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-100 dark:border-slate-800 shadow-soft space-y-4 transition-colors">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 flex items-center justify-center text-xs font-black">
                      3
                    </span>
                    <span>Payment Method</span>
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                    <Lock className="w-3.5 h-3.5" />
                    <span>100% Secure</span>
                  </div>
                </div>

                {/* Method Selector Tabs */}
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => handleInputChange('paymentMethod', 'upi')}
                    className={`p-2.5 sm:p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1 sm:gap-1.5 ${
                      formData.paymentMethod === 'upi'
                        ? 'border-brand-500 bg-brand-50/60 dark:bg-brand-950/40 ring-2 ring-brand-500/20 font-bold text-slate-900 dark:text-white'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <Wallet className="w-4 h-4 sm:w-5 sm:h-5 text-brand-500" />
                    <span className="text-[11px] sm:text-xs">UPI / QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleInputChange('paymentMethod', 'card')}
                    className={`p-2.5 sm:p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1 sm:gap-1.5 ${
                      formData.paymentMethod === 'card'
                        ? 'border-brand-500 bg-brand-50/60 dark:bg-brand-950/40 ring-2 ring-brand-500/20 font-bold text-slate-900 dark:text-white'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" />
                    <span className="text-[11px] sm:text-xs">Card / RuPay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleInputChange('paymentMethod', 'cod')}
                    className={`p-2.5 sm:p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1 sm:gap-1.5 ${
                      formData.paymentMethod === 'cod'
                        ? 'border-brand-500 bg-brand-50/60 dark:bg-brand-950/40 ring-2 ring-brand-500/20 font-bold text-slate-900 dark:text-white'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <Banknote className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
                    <span className="text-[11px] sm:text-xs">Cash on Del.</span>
                  </button>
                </div>

                {/* UPI Fields */}
                {formData.paymentMethod === 'upi' && (
                  <div className="p-4 bg-brand-50/40 dark:bg-brand-950/30 rounded-2xl border border-brand-100 dark:border-brand-900/50 space-y-3 mt-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                          Enter UPI ID (Google Pay / PhonePe / Paytm / BHIM)
                        </label>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">⚡ Zero Charges</span>
                      </div>
                      <input
                        type="text"
                        value={formData.upiId}
                        onChange={(e) => handleInputChange('upiId', e.target.value)}
                        placeholder="e.g. mobile@paytm or name@oksbi"
                        className={`w-full px-3 py-2 text-xs font-semibold rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none ${
                          errors.upiId ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700 focus:border-brand-500'
                        }`}
                      />
                      {errors.upiId && (
                        <p className="text-[10px] text-rose-500 mt-1">{errors.upiId}</p>
                      )}
                    </div>

                    {/* Quick UPI suffix pills */}
                    <div className="flex flex-wrap gap-1.5 items-center">
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">Suggested handles:</span>
                      {['@oksbi', '@okhdfcbank', '@paytm', '@ybl'].map((handle) => (
                        <button
                          key={handle}
                          type="button"
                          onClick={() => {
                            const prefix = formData.upiId.split('@')[0] || 'aarav.sharma';
                            handleInputChange('upiId', `${prefix}${handle}`);
                          }}
                          className="px-2 py-0.5 text-[10px] font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-slate-600 dark:text-slate-300 hover:border-brand-500 hover:text-brand-600"
                        >
                          {handle}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Card Fields Mock */}
                {formData.paymentMethod === 'card' && (
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700 space-y-3 mt-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                          Debit / Credit Card (RuPay, Visa, Mastercard)
                        </label>
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">Domestic & International</span>
                      </div>
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        placeholder="•••• •••• •••• ••••"
                        className="w-full px-3 py-2 text-xs font-mono font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                          Expiry (MM/YY)
                        </label>
                        <input
                          type="text"
                          value={formData.cardExpiry}
                          onChange={(e) => handleInputChange('cardExpiry', e.target.value)}
                          placeholder="12/28"
                          className="w-full px-3 py-2 text-xs font-mono font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                          CVV
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          value={formData.cardCvc}
                          onChange={(e) => handleInputChange('cardCvc', e.target.value)}
                          placeholder="888"
                          className="w-full px-3 py-2 text-xs font-mono font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formData.paymentMethod === 'cod' && (
                  <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-100 dark:border-emerald-800/60 text-xs text-emerald-900 dark:text-emerald-200 mt-3 flex items-center gap-3">
                    <span className="text-2xl">💵</span>
                    <div>
                      <p className="font-bold">Pay Cash or Scan UPI at Doorstep</p>
                      <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
                        Our delivery partner carries change and a UPI QR code reader.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right 5 cols: Order Items & Pricing Summary */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-100 dark:border-slate-800 shadow-soft space-y-4">
                <h3 className="font-display font-bold text-base text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
                  Order Summary ({cart.length} items)
                </h3>

                {/* Items preview list */}
                <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                  {cart.map((ci) => (
                    <div key={ci.cartItemId} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="font-bold text-brand-600">{ci.quantity}x</span>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-800 dark:text-slate-200 truncate">{ci.item.name}</p>
                          {ci.customization.size && (
                            <p className="text-[10px] text-slate-400 dark:text-slate-500">
                              {ci.customization.size.name}
                            </p>
                          )}
                        </div>
                      </div>
                      <span className="font-black text-slate-900 dark:text-white flex-shrink-0">
                        {formatCurrency(ci.totalPrice)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {formatCurrency(subtotal)}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                      <span>Promo Savings</span>
                      <span>-{formatCurrency(discount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {deliveryFee === 0 ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">FREE</span>
                      ) : (
                        formatCurrency(deliveryFee)
                      )}
                    </span>
                  </div>

                  {priorityFee > 0 && (
                    <div className="flex justify-between text-amber-700 dark:text-amber-400 font-semibold">
                      <span>Priority Speed Fee</span>
                      <span>+{formatCurrency(priorityFee)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Platform & Hygiene Fee</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {formatCurrency(platformFee)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>GST & Restaurant Taxes (5%)</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {formatCurrency(estimatedTax)}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between text-base font-black text-slate-900 dark:text-white">
                    <span>Final Total</span>
                    <span className="text-brand-600 font-display text-xl">
                      {formatCurrency(finalPayable)}
                    </span>
                  </div>
                </div>

                {/* Place Order CTA Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-600 to-amber-500 hover:brightness-105 disabled:opacity-70 text-white font-black text-sm shadow-glow flex items-center justify-center gap-2 transition"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Confirming Order...</span>
                    </div>
                  ) : (
                    <span>Place Order • {formatCurrency(finalPayable)}</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

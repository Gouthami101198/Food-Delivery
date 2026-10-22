import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const SEED_USERS = [
  {
    id: 'user-demo-1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    address: 'Flat 402, Royal Palms, Indiranagar, Bengaluru',
    ordersCount: 14,
    joinedDate: 'January 2024',
  },
  {
    id: 'user-demo-2',
    name: 'Priya Patel',
    email: 'priya.patel@example.com',
    phone: '+91 98111 22334',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    address: 'Flat 704, Sea Green Heights, Bandra West, Mumbai',
    ordersCount: 8,
    joinedDate: 'March 2024',
  },
];

export const AuthProvider = ({ children }) => {
  // Registered users database in localStorage
  const [usersDb, setUsersDb] = useState(() => {
    try {
      const stored = localStorage.getItem('cravebite_users_db');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to parse users DB from localStorage', e);
    }
    return SEED_USERS;
  });

  // Current logged in user
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('cravebite_auth_user');
      if (savedUser) return JSON.parse(savedUser);
    } catch (e) {
      console.error('Failed to parse saved user', e);
    }
    return null;
  });

  // Sync users DB to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cravebite_users_db', JSON.stringify(usersDb));
    } catch (e) {
      console.error('Failed to save users DB', e);
    }
  }, [usersDb]);

  // Sync current user to localStorage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('cravebite_auth_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('cravebite_auth_user');
      }
    } catch (e) {
      console.error('Failed to sync auth user', e);
    }
  }, [user]);

  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState('login'); // 'login' | 'signup' | 'forgot-password' | 'verify-otp' | 'new-password'
  
  // Pending password reset state
  const [pendingReset, setPendingReset] = useState({
    email: '',
    otp: '',
    verified: false,
  });

  const openAuthModal = (view = 'login') => {
    setAuthModalView(view);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  // Login handler
  const login = async ({ email, password, rememberMe = true }) => {
    const cleanEmail = email.trim().toLowerCase();
    const existing = usersDb.find(
      (u) => u.email.toLowerCase() === cleanEmail && u.password === password
    );

    if (!existing) {
      return {
        success: false,
        error: 'Invalid email or password. Try aarav.sharma@example.com / password123',
      };
    }

    const sessionUser = {
      id: existing.id,
      name: existing.name,
      email: existing.email,
      phone: existing.phone,
      avatar: existing.avatar,
      address: existing.address,
      ordersCount: existing.ordersCount || 0,
    };

    setUser(sessionUser);
    closeAuthModal();
    return { success: true, user: sessionUser };
  };

  // Quick 1-click Demo Login
  const quickDemoLogin = () => {
    const demoUser = usersDb[0] || SEED_USERS[0];
    const sessionUser = {
      id: demoUser.id,
      name: demoUser.name,
      email: demoUser.email,
      phone: demoUser.phone,
      avatar: demoUser.avatar,
      address: demoUser.address,
      ordersCount: demoUser.ordersCount || 14,
    };
    setUser(sessionUser);
    closeAuthModal();
    return { success: true, user: sessionUser };
  };

  // Signup handler
  const signup = async ({ name, email, phone, password }) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    const cleanPhone = phone.trim();

    if (!cleanName) {
      return { success: false, error: 'Please enter your full name.' };
    }
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }
    if (!cleanPhone || cleanPhone.length < 10) {
      return { success: false, error: 'Please enter a valid 10-digit mobile number.' };
    }
    if (!password || password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    const existing = usersDb.find((u) => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      return {
        success: false,
        error: 'An account with this email already exists. Please log in.',
      };
    }

    // Generate random friendly avatar
    const avatars = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    ];
    const chosenAvatar = avatars[Math.floor(Math.random() * avatars.length)];

    const newUser = {
      id: `user-${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone.startsWith('+') ? cleanPhone : `+91 ${cleanPhone}`,
      password: password,
      avatar: chosenAvatar,
      address: 'Flat 402, Royal Palms, Indiranagar, Bengaluru',
      ordersCount: 0,
      joinedDate: 'Just now',
    };

    setUsersDb((prev) => [...prev, newUser]);
    setUser({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      avatar: newUser.avatar,
      address: newUser.address,
      ordersCount: 0,
    });

    closeAuthModal();
    return { success: true, user: newUser };
  };

  // Logout handler
  const logout = () => {
    setUser(null);
  };

  // Forgot password flow: Step 1 - Send OTP
  const sendResetOtp = async (email) => {
    const cleanEmail = email.trim().toLowerCase();
    const existing = usersDb.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!existing) {
      return {
        success: false,
        error: 'No account registered with this email address.',
      };
    }

    // Generate 6-digit OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setPendingReset({
      email: cleanEmail,
      otp: generatedOtp,
      verified: false,
    });

    return {
      success: true,
      email: cleanEmail,
      otp: generatedOtp, // returned for test simulation banner
    };
  };

  // Forgot password flow: Step 2 - Verify OTP
  const verifyResetOtp = (otpInput) => {
    if (!pendingReset.otp) {
      return { success: false, error: 'No OTP requested. Please start over.' };
    }
    if (otpInput.trim() !== pendingReset.otp) {
      return { success: false, error: 'Invalid verification code. Please check and try again.' };
    }

    setPendingReset((prev) => ({ ...prev, verified: true }));
    return { success: true };
  };

  // Forgot password flow: Step 3 - Reset Password
  const resetPassword = async (newPassword) => {
    if (!pendingReset.verified || !pendingReset.email) {
      return { success: false, error: 'Session expired. Please request a new OTP.' };
    }
    if (!newPassword || newPassword.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    setUsersDb((prev) =>
      prev.map((u) =>
        u.email.toLowerCase() === pendingReset.email.toLowerCase()
          ? { ...u, password: newPassword }
          : u
      )
    );

    // Reset pending
    setPendingReset({ email: '', otp: '', verified: false });
    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        quickDemoLogin,
        signup,
        logout,
        sendResetOtp,
        verifyResetOtp,
        resetPassword,
        pendingReset,
        isAuthModalOpen,
        authModalView,
        openAuthModal,
        closeAuthModal,
        setAuthModalView,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

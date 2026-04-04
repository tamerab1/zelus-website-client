import { createContext, useContext, useState, useEffect } from 'react';
import { checkout } from '../services/storeService.js';

const AppContext = createContext(null);

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function AppProvider({ children }) {
  const [currentUser, setCurrentUserState] = useState(() => loadFromStorage('currentUser', null));
  const [currentView, setCurrentViewState] = useState(() => loadFromStorage('currentView', 'home'));
  const [authStatus,  setAuthStatus]       = useState({ type: '', message: '' });
  const [storeMessage, setStoreMessage]    = useState({ type: '', message: '' });

  // Keep localStorage in sync whenever these change
  const setCurrentUser = (user) => {
    setCurrentUserState(user);
    if (user) localStorage.setItem('currentUser', JSON.stringify(user));
    else       localStorage.removeItem('currentUser');
  };

  const setCurrentView = (view) => {
    setCurrentViewState(view);
    localStorage.setItem('currentView', JSON.stringify(view));
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('home');
    setStoreMessage({ type: '', message: '' });
  };

  const handleCheckout = async (pkg) => {
    if (!currentUser) {
      setAuthStatus({ type: 'error', message: 'You must be logged in to make a purchase.' });
      setCurrentView('login');
      return;
    }
    setStoreMessage({ type: 'info', message: 'Processing your order securely...' });
    try {
      const data = await checkout({
        username:       currentUser.username,
        package_name:   pkg.name,
        usd_amount:     pkg.price,
        tokens_to_give: pkg.tokens,
      });
      setStoreMessage({ type: 'success', message: data.message });
    } catch (error) {
      setStoreMessage({ type: 'error', message: error.message });
    }
  };

  return (
    <AppContext.Provider value={{
      currentUser,    setCurrentUser,
      currentView,    setCurrentView,
      authStatus,     setAuthStatus,
      storeMessage,   setStoreMessage,
      handleLogout,
      handleCheckout,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
  return ctx;
};

import { createContext, useContext, useState } from 'react';
import { checkout } from '../services/storeService.js';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser]     = useState(null);
  const [currentView, setCurrentView]     = useState('home');
  const [authStatus, setAuthStatus]       = useState({ type: '', message: '' });
  const [storeMessage, setStoreMessage]   = useState({ type: '', message: '' });

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

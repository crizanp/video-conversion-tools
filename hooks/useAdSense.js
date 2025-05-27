// hooks/useAdSense.js
import { useState, useEffect, useContext, createContext } from 'react';

const AdSenseContext = createContext();

export const AdSenseProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAdSenseSettings();
  }, []);

  const fetchAdSenseSettings = async () => {
    try {
      const response = await fetch('https://setting-panel.vercel.app/api/adsense/settings');
      const data = await response.json();
      
      if (data.success) {
        setSettings(data.data);
      } else {
        setError('Failed to load AdSense settings');
      }
    } catch (err) {
      setError('Error fetching AdSense settings');
      console.error('AdSense settings error:', err);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    settings,
    loading,
    error,
    isEnabled: settings?.globalSettings?.enabled || false,
    refreshSettings: fetchAdSenseSettings
  };

  return (
    <AdSenseContext.Provider value={value}>
      {children}
    </AdSenseContext.Provider>
  );
};

export const useAdSense = () => {
  const context = useContext(AdSenseContext);
  if (!context) {
    throw new Error('useAdSense must be used within AdSenseProvider');
  }
  return context;
};
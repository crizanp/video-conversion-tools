// hooks/useAdSense.js
import { useState, useEffect, useContext, createContext } from 'react';

const AdSenseContext = createContext();

export const AdSenseProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get API base URL from environment variables
  const API_BASE_URL = process.env.API_BASE_URL || 'https://setting-panel.vercel.app';

  useEffect(() => {
    fetchAdSenseSettings();
  }, []);

  const fetchAdSenseSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/api/adsense/settings`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
     
      if (data.success) {
        setSettings(data.data);
      } else {
        throw new Error(data.message || 'Failed to load AdSense settings');
      }
    } catch (err) {
      const errorMessage = err.message || 'Error fetching AdSense settings';
      setError(errorMessage);
      console.error('AdSense settings error:', err);
      
      // Set fallback settings on error
      setSettings({
        globalSettings: {
          enabled: false,
          publisherId: '',
          autoAdsEnabled: false
        },
        adUnits: []
      });
    } finally {
      setLoading(false);
    }
  };

  const value = {
    settings,
    loading,
    error,
    isEnabled: settings?.globalSettings?.enabled || false,
    publisherId: settings?.globalSettings?.publisherId || '',
    autoAdsEnabled: settings?.globalSettings?.autoAdsEnabled || false,
    adUnits: settings?.adUnits || [],
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
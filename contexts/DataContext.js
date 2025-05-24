// contexts/DataContext.js
import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Use useRef to store cache timestamp to avoid dependency issues
  const lastFetchRef = useRef(0);
  const fetchingRef = useRef(false);
  
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  const fetchHeroData = useCallback(async (forceRefresh = false) => {
    const now = Date.now();
    
    // Prevent multiple simultaneous requests
    if (fetchingRef.current && !forceRefresh) {
      return;
    }
    
    // Check if we have cached data that's still valid and not forcing refresh
    if (!forceRefresh && heroData && (now - lastFetchRef.current) < CACHE_DURATION) {
      return;
    }

    fetchingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/api/admin/homepage/settings');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.data) {
        setHeroData(result.data);
        lastFetchRef.current = now;
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (err) {
      console.error('Error fetching hero data:', err);
      setError(err.message);
      
      // Use fallback data if API fails and we don't have existing data
      if (!heroData) {
        const fallbackData = {
          hero: {
            title: "Transform Your Video Formats",
            description: "Convert between MP4, WebM, MOV, MKV and more with blazing-fast speed and uncompromising quality.",
            image: "https://cdn-site-assets.veed.io/cdn-cgi/image/width=1024,quality=75,format=auto/MKV_to_MP_4_bdd29d1ce7/MKV_to_MP_4_bdd29d1ce7.png",
            imageAlt: "Video Formats Illustration",
            features: ["Blazing Fast", "High Quality", "100% Free", "Batch Processing"]
          }
        };
        setHeroData(fallbackData);
        lastFetchRef.current = now;
      }
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  }, [heroData]); // Only depend on heroData

  // Initial fetch - only runs once on mount
  useEffect(() => {
    fetchHeroData();
  }, []); // Empty dependency array ensures this only runs once

  const refetch = useCallback(() => {
    return fetchHeroData(true);
  }, [fetchHeroData]);

  const isCacheValid = useCallback(() => {
    const now = Date.now();
    return heroData && (now - lastFetchRef.current) < CACHE_DURATION;
  }, [heroData]);

  const value = {
    heroData,
    loading,
    error,
    refetch,
    isCacheValid
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
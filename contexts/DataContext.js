import AnimatedLoader from '@/components/AnimatedLoading';
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
  const [companyData, setCompanyData] = useState(null);
  const [converterData, setConverterData] = useState({});
  const [adsData, setAdsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  const lastFetchRef = useRef(0);
  const fetchingRef = useRef(false);
  const converterFetchingRef = useRef({});
  const adsFetchingRef = useRef(false);
 
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  // Available converter IDs
  const CONVERTER_IDS = [
    'mp4-to-mkv',
    'mkv-to-mp4',
    'avi-to-mp4',
    'webm-to-mp4',
    'mov-to-mp4',
    'mp4-to-webm'
  ];

  const fetchHeroData = useCallback(async (forceRefresh = false) => {
    const now = Date.now();
   
    if (fetchingRef.current && !forceRefresh) {
      return;
    }
   
    if (!forceRefresh && heroData && (now - lastFetchRef.current) < CACHE_DURATION) {
      return;
    }

    fetchingRef.current = true;
    setError(null);

    try {
      const response = await fetch('https://setting-panel.vercel.app/api/admin/homepage/settings');
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
      fetchingRef.current = false;
    }
  }, [heroData]);

  const fetchCompanyData = useCallback(async (forceRefresh = false) => {
    const now = Date.now();
   
    // Check if we have cached data that's still valid and not forcing refresh
    if (!forceRefresh && companyData && (now - lastFetchRef.current) < CACHE_DURATION) {
      return;
    }

    try {
      const response = await fetch('https://setting-panel.vercel.app/api/admin/company/details');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (result.success && result.data) {
        setCompanyData(result.data);
      } else {
        throw new Error('Invalid company API response format');
      }
    } catch (err) {
      console.error('Error fetching company data:', err);
     
      // Use fallback data if API fails and we don't have existing data
      if (!companyData) {
        const fallbackData = {
          companyName: "Foxbeep",
          socialLinks: {
            facebook: "https://facebook.com/foxbeeptech",
            instagram: "https://instagram.com/foxbeeptech", 
            twitter: "https://x.com/foxbeeptech",
            linkedin: "https://linkedin.com/in/foxbeeptech"
          }
        };
        setCompanyData(fallbackData);
      }
    }
  }, [companyData]);

  const fetchAdsData = useCallback(async (forceRefresh = false) => {
    const now = Date.now();
   
    if (adsFetchingRef.current && !forceRefresh) {
      return adsData;
    }
   
    // Check if we have cached data that's still valid
    if (!forceRefresh && adsData && adsData._fetchedAt && 
        (now - adsData._fetchedAt) < CACHE_DURATION) {
      return adsData;
    }

    adsFetchingRef.current = true;

    try {
      const response = await fetch('https://setting-panel.vercel.app/api/admin/ads');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success && result.data) {
        const processedAdsData = {
          allAds: result.data,
          activeAds: result.data.filter(ad => ad.active === true),
          _fetchedAt: now
        };
        
        setAdsData(processedAdsData);
        return processedAdsData;
      } else {
        throw new Error('Invalid ads API response format');
      }
    } catch (err) {
      console.error('Error fetching ads data:', err);
     
      // Use fallback data if API fails and we don't have existing data
      if (!adsData) {
        const fallbackData = {
          allAds: [],
          activeAds: [],
          _fetchedAt: now
        };
        setAdsData(fallbackData);
        return fallbackData;
      }
      
      return adsData;
    } finally {
      adsFetchingRef.current = false;
    }
  }, [adsData]);

  const fetchConverterData = useCallback(async (converterId, forceRefresh = false) => {
    const now = Date.now();
    
    // Validate converter ID
    if (!CONVERTER_IDS.includes(converterId)) {
      console.error(`Invalid converter ID: ${converterId}`);
      return null;
    }
   
    // Check if we're already fetching this converter
    if (converterFetchingRef.current[converterId] && !forceRefresh) {
      return converterData[converterId] || null;
    }
   
    // Check if we have cached data that's still valid
    if (!forceRefresh && converterData[converterId] && 
        converterData[converterId]._fetchedAt && 
        (now - converterData[converterId]._fetchedAt) < CACHE_DURATION) {
      return converterData[converterId];
    }

    converterFetchingRef.current[converterId] = true;

    try {
      const response = await fetch(`https://setting-panel.vercel.app/api/converter/settings?converterId=${converterId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      
      if (result.success && result.data) {
        const dataWithTimestamp = {
          ...result.data,
          _fetchedAt: now
        };
        
        setConverterData(prev => ({
          ...prev,
          [converterId]: dataWithTimestamp
        }));
        
        return dataWithTimestamp;
      } else {
        throw new Error('Invalid converter API response format');
      }
    } catch (err) {
      console.error(`Error fetching converter data for ${converterId}:`, err);
     
      // Use fallback data if API fails and we don't have existing data
      if (!converterData[converterId]) {
        const fallbackData = {
          hero: {
            title: `${converterId.replace('-', ' ').toUpperCase()} Converter`,
            description: `Convert your ${converterId.split('-')[0].toUpperCase()} files to ${converterId.split('-')[2].toUpperCase()} format with our lightning-fast converter.`,
            image: "https://cdn-site-assets.veed.io/cdn-cgi/image/width=1024,quality=75,format=auto/MKV_to_MP_4_bdd29d1ce7/MKV_to_MP_4_bdd29d1ce7.png",
            imageAlt: `${converterId} converter`,
            imagePublicId: null
          },
          ways: {
            title: "How to Convert",
            description: `Follow these simple steps to convert your ${converterId.split('-')[0].toUpperCase()} files`,
            image: "https://cdn-site-assets.veed.io/cdn-cgi/image/width=1024,quality=75,format=auto/MKV_to_MP_4_bdd29d1ce7/MKV_to_MP_4_bdd29d1ce7.png",
            imageAlt: "Conversion process",
            imagePublicId: null,
            steps: [
              "Upload your file",
              "Choose conversion settings",
              `Download your ${converterId.split('-')[2].toUpperCase()} file`
            ]
          },
          features: {
            title: "Why Choose Our Converter",
            items: [
              "Fast conversion speed",
              "High quality output",
              "Secure file processing",
              "No registration required"
            ]
          },
          _fetchedAt: now
        };
        
        setConverterData(prev => ({
          ...prev,
          [converterId]: fallbackData
        }));
        
        return fallbackData;
      }
      
      return converterData[converterId] || null;
    } finally {
      converterFetchingRef.current[converterId] = false;
    }
  }, [converterData]);

  // Fetch all converter data
  const fetchAllConverterData = useCallback(async (forceRefresh = false) => {
    const promises = CONVERTER_IDS.map(id => fetchConverterData(id, forceRefresh));
    await Promise.all(promises);
  }, [fetchConverterData]);

  // Helper function to get a random active ad
  const getRandomActiveAd = useCallback(() => {
    if (!adsData || !adsData.activeAds || adsData.activeAds.length === 0) {
      return null;
    }
    
    const randomIndex = Math.floor(Math.random() * adsData.activeAds.length);
    return adsData.activeAds[randomIndex];
  }, [adsData]);

  // Helper function to check if ads cache is valid
  const isAdsCacheValid = useCallback(() => {
    const now = Date.now();
    return adsData && adsData._fetchedAt && (now - adsData._fetchedAt) < CACHE_DURATION;
  }, [adsData]);

  // Initial fetch - only runs once on mount
  useEffect(() => {
    const fetchAllData = async () => {
      await Promise.all([
        fetchHeroData(),
        fetchCompanyData(),
        fetchAllConverterData(),
        fetchAdsData()
      ]);
      setLoading(false); // Only set loading to false after all data is fetched
    };
    
    fetchAllData();
  }, [fetchHeroData, fetchCompanyData, fetchAllConverterData, fetchAdsData]);

  const refetch = useCallback(async () => {
    setLoading(true);
    await Promise.all([
      fetchHeroData(true),
      fetchCompanyData(true),
      fetchAllConverterData(true),
      fetchAdsData(true)
    ]);
    setLoading(false);
  }, [fetchHeroData, fetchCompanyData, fetchAllConverterData, fetchAdsData]);

  const refetchConverter = useCallback(async (converterId) => {
    return await fetchConverterData(converterId, true);
  }, [fetchConverterData]);

  const refetchAds = useCallback(async () => {
    return await fetchAdsData(true);
  }, [fetchAdsData]);

  const getConverterData = useCallback((converterId) => {
    return converterData[converterId] || null;
  }, [converterData]);

  const isCacheValid = useCallback(() => {
    const now = Date.now();
    return heroData && companyData && (now - lastFetchRef.current) < CACHE_DURATION;
  }, [heroData, companyData]);

  const isConverterCacheValid = useCallback((converterId) => {
    const now = Date.now();
    const data = converterData[converterId];
    return data && data._fetchedAt && (now - data._fetchedAt) < CACHE_DURATION;
  }, [converterData]);

  const value = {
    // Data states
    heroData,
    companyData,
    converterData,
    adsData,
    loading,
    error,
    
    // Refetch functions
    refetch,
    refetchConverter,
    refetchAds,
    
    // Fetch functions
    fetchConverterData,
    fetchAdsData,
    
    // Getter functions
    getConverterData,
    getRandomActiveAd,
    
    // Cache validation functions
    isCacheValid,
    isConverterCacheValid,
    isAdsCacheValid,
    
    // Constants
    CONVERTER_IDS
  };

  // Show simple loader while loading
  if (loading) {
    return <AnimatedLoader />;
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
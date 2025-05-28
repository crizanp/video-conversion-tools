import AnimatedLoader from '@/components/AnimatedLoading';
import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children, initialCompanyData = null }) => {
  const router = useRouter();
  const [heroData, setHeroData] = useState(null);
  const [companyData, setCompanyData] = useState(initialCompanyData);
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

  // Generate dynamic SEO data based on current route
  const getSEOData = useCallback(() => {
    const companyName = companyData?.companyName || 'Foxbeep';
    const baseSEO = companyData?.seo || {};
    const currentPath = router.asPath;
    const pathname = router.pathname;
    
    // Default SEO data
    let seoData = {
      title: `${companyName} | Fast & Free Video Format Converter`,
      description: 'Convert video formats easily with our powerful online tool. Free, fast and secure. Convert MP4, WebM, MOV, MKV and more.',
      keywords: 'video converter, online video converter, free video converter, MP4 converter, video format converter',
      ogImage: companyData?.logo || '/default-og-image.jpg',
      canonical: `https://yourdomain.com${currentPath}`,
      type: 'website'
    };

    // Route-specific SEO
    if (pathname === '/') {
      seoData = {
        ...seoData,
        title: baseSEO.title || `${companyName} | Fast & Free Video Format Converter`,
        description: baseSEO.description || seoData.description,
        keywords: baseSEO.keywords || seoData.keywords
      };
    } else if (pathname.includes('/converter/')) {
      const converterId = router.query.converterId;
      const converterPageData = converterData[converterId];
      
      if (converterPageData && converterId) {
        const [fromFormat, , toFormat] = converterId.split('-');
        seoData = {
          ...seoData,
          title: converterPageData.seo?.title || `${fromFormat.toUpperCase()} to ${toFormat.toUpperCase()} Converter | ${companyName}`,
          description: converterPageData.seo?.description || `Convert ${fromFormat.toUpperCase()} files to ${toFormat.toUpperCase()} format online. Fast, free, and secure video conversion with ${companyName}.`,
          keywords: converterPageData.seo?.keywords || `${fromFormat} to ${toFormat}, ${fromFormat} converter, ${toFormat} converter, video converter, ${companyName}`,
          ogImage: converterPageData.hero?.image || seoData.ogImage,
          type: 'article'
        };
      }
    } else if (pathname === '/about') {
      seoData = {
        ...seoData,
        title: `About Us | ${companyName}`,
        description: `Learn more about ${companyName} - your trusted partner for fast and reliable video format conversion.`,
        keywords: `about ${companyName}, video converter company, online tools`
      };
    } else if (pathname === '/contact') {
      seoData = {
        ...seoData,
        title: `Contact Us | ${companyName}`,
        description: `Get in touch with ${companyName}. Contact our support team for help with video conversion.`,
        keywords: `contact ${companyName}, video converter support, customer service`
      };
    } else if (pathname === '/privacy-policy') {
      seoData = {
        ...seoData,
        title: `Privacy Policy | ${companyName}`,
        description: `Read ${companyName}'s privacy policy to understand how we protect your data.`,
        keywords: `privacy policy, ${companyName} privacy, data protection`
      };
    } else if (pathname === '/terms-of-service') {
      seoData = {
        ...seoData,
        title: `Terms of Service | ${companyName}`,
        description: `Review the terms of service for ${companyName}'s video conversion tools.`,
        keywords: `terms of service, ${companyName} terms, user agreement`
      };
    }

    return seoData;
  }, [router.asPath, router.pathname, router.query, companyData, converterData]);

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
    
    if (!CONVERTER_IDS.includes(converterId)) {
      console.error(`Invalid converter ID: ${converterId}`);
      return null;
    }
   
    if (converterFetchingRef.current[converterId] && !forceRefresh) {
      return converterData[converterId] || null;
    }
   
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
     
      if (!converterData[converterId]) {
        const fallbackData = {
          hero: {
            title: `${converterId.replace('-', ' ').toUpperCase()} Converter`,
            description: `Convert your ${converterId.split('-')[0].toUpperCase()} files to ${converterId.split('-')[2].toUpperCase()} format with our lightning-fast converter.`,
            image: "",
            imageAlt: `${converterId} converter`,
            imagePublicId: null
          },
          ways: {
            title: "How to Convert",
            description: `Follow these simple steps to convert your ${converterId.split('-')[0].toUpperCase()} files`,
            image: "",
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

  const fetchAllConverterData = useCallback(async (forceRefresh = false) => {
    const promises = CONVERTER_IDS.map(id => fetchConverterData(id, forceRefresh));
    await Promise.all(promises);
  }, [fetchConverterData]);

  const getRandomActiveAd = useCallback(() => {
    if (!adsData || !adsData.activeAds || adsData.activeAds.length === 0) {
      return null;
    }
    
    const randomIndex = Math.floor(Math.random() * adsData.activeAds.length);
    return adsData.activeAds[randomIndex];
  }, [adsData]);

  const isAdsCacheValid = useCallback(() => {
    const now = Date.now();
    return adsData && adsData._fetchedAt && (now - adsData._fetchedAt) < CACHE_DURATION;
  }, [adsData]);

  useEffect(() => {
    const fetchAllData = async () => {
      await Promise.all([
        fetchHeroData(),
        initialCompanyData ? Promise.resolve() : fetchCompanyData(),
        fetchAllConverterData(),
        fetchAdsData()
      ]);
      setLoading(false);
    };
    
    fetchAllData();
  }, [fetchHeroData, fetchCompanyData, fetchAllConverterData, fetchAdsData, initialCompanyData]);

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
    
    // SEO function
    getSEOData,
    
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

  if (loading) {
    return <AnimatedLoader />;
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
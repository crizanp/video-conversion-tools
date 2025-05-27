// components/AdSenseScript.js
import { useEffect } from 'react';
import { useAdSense } from '../hooks/useAdSense';

const AdSenseScript = () => {
  const { settings, isEnabled } = useAdSense();

  useEffect(() => {
    // Only load if AdSense is enabled and we have a publisher ID
    if (!isEnabled || !settings?.publisherId) {
      return;
    }

    // Check if script is already loaded
    const existingScript = document.querySelector(`script[src*="adsbygoogle.js"]`);
    if (existingScript) {
      return;
    }

    // Create and load the AdSense script
    const script = document.createElement('script');
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${settings.publisherId}`;
    script.async = true;
    script.crossOrigin = 'anonymous';
    
    // Handle script load
    script.onload = () => {
      console.log('AdSense script loaded successfully');
      
      // Initialize Auto Ads if enabled
      if (settings.globalSettings?.autoAds) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({
            google_ad_client: settings.publisherId,
            enable_page_level_ads: true
          });
        } catch (error) {
          console.error('Auto Ads initialization error:', error);
        }
      }
    };

    script.onerror = () => {
      console.error('Failed to load AdSense script');
    };

    document.head.appendChild(script);

    // Cleanup function
    return () => {
      const scriptToRemove = document.querySelector(`script[src*="adsbygoogle.js"]`);
      if (scriptToRemove) {
        document.head.removeChild(scriptToRemove);
      }
    };
  }, [isEnabled, settings?.publisherId, settings?.globalSettings?.autoAds]);

  return null; // This component doesn't render anything
};

export default AdSenseScript;
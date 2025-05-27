// components/AutoAds.js
import { useEffect } from 'react';
import { useAdSense } from '../hooks/useAdSense';

const AutoAds = () => {
  const { settings, isEnabled } = useAdSense();

  useEffect(() => {
    if (isEnabled && settings?.globalSettings?.autoAds && settings?.publisherId) {
      // Enable Auto Ads
      const script = document.createElement('script');
      script.innerHTML = `
        (adsbygoogle = window.adsbygoogle || []).push({
          google_ad_client: "${settings.publisherId}",
          enable_page_level_ads: true
        });
      `;
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [isEnabled, settings]);

  return null;
};

export default AutoAds;
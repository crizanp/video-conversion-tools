// components/ads/AdUnit.js
import { useEffect, useRef } from 'react';
import { useAdSense } from '../../hooks/useAdSense';

const AdUnit = ({ 
  adSlot, 
  adFormat = 'auto', 
  style = {},
  className = '',
  placement = 'default',
  lazy = true 
}) => {
  const adRef = useRef(null);
  const { settings, isEnabled } = useAdSense();
  const hasAdLoaded = useRef(false);

  useEffect(() => {
    if (!isEnabled || !settings?.publisherId || !adSlot || hasAdLoaded.current) {
      return;
    }

    // Check for Do Not Track
    if (settings.globalSettings?.respectDoNotTrack && 
        (navigator.doNotTrack === '1' || window.doNotTrack === '1')) {
      return;
    }

    // Test mode check
    if (settings.globalSettings?.testMode && process.env.NODE_ENV === 'production') {
      return;
    }

    const loadAd = () => {
      try {
        if (window.adsbygoogle && adRef.current) {
          window.adsbygoogle.push({});
          hasAdLoaded.current = true;
        }
      } catch (error) {
        console.error('AdSense error:', error);
      }
    };

    if (lazy) {
      // Intersection Observer for lazy loading
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              loadAd();
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      if (adRef.current) {
        observer.observe(adRef.current);
      }

      return () => observer.disconnect();
    } else {
      loadAd();
    }
  }, [isEnabled, settings, adSlot, lazy]);

  // Don't render if ads are disabled
  if (!isEnabled || !settings?.publisherId || !adSlot) {
    return null;
  }

  const defaultStyle = {
    display: 'block',
    minHeight: '90px',
    ...style
  };

  return (
    <div className={`ad-container ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={defaultStyle}
        data-ad-client={settings.publisherId}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdUnit;
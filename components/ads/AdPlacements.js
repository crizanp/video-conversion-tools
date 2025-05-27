// components/ads/AdPlacements.js
import AdUnit from './AdUnit';
import { useAdSense } from '../../hooks/useAdSense';

export const HeaderAd = ({ className = "" }) => {
  const { settings } = useAdSense();
  const placement = settings?.adPlacements?.header;

  if (!placement?.adSlot) return null;

  return (
    <div className={`header-ad ${className}`}>
      <AdUnit
        adSlot={placement.adSlot}
        adFormat={placement.adFormat}
        placement="header"
        style={{ textAlign: 'center', marginBottom: '20px' }}
      />
    </div>
  );
};

export const SidebarAd = ({ className = "" }) => {
  const { settings } = useAdSense();
  const placement = settings?.adPlacements?.sidebar;

  if (!placement?.adSlot) return null;

  return (
    <div className={`sidebar-ad ${className}`}>
      <AdUnit
        adSlot={placement.adSlot}
        adFormat={placement.adFormat}
        placement="sidebar"
        style={{ width: '300px', height: '250px' }}
      />
    </div>
  );
};

export const FooterAd = ({ className = "" }) => {
  const { settings } = useAdSense();
  const placement = settings?.adPlacements?.footer;

  if (!placement?.adSlot) return null;

  return (
    <div className={`footer-ad ${className}`}>
      <AdUnit
        adSlot={placement.adSlot}
        adFormat={placement.adFormat}
        placement="footer"
        style={{ textAlign: 'center', marginTop: '20px' }}
      />
    </div>
  );
};

export const InContentAd = ({ className = "" }) => {
  const { settings } = useAdSense();
  const placement = settings?.adPlacements?.inContent;

  if (!placement?.adSlot) return null;

  return (
    <div className={`in-content-ad ${className}`}>
      <AdUnit
        adSlot={placement.adSlot}
        adFormat={placement.adFormat}
        placement="inContent"
        style={{ margin: '20px 0', textAlign: 'center' }}
      />
    </div>
  );
};

export const MobileAd = ({ className = "" }) => {
  const { settings } = useAdSense();
  const placement = settings?.adPlacements?.mobile;

  if (!placement?.adSlot) return null;

  return (
    <div className={`mobile-ad md:hidden ${className}`}>
      <AdUnit
        adSlot={placement.adSlot}
        adFormat={placement.adFormat}
        placement="mobile"
        style={{ textAlign: 'center' }}
      />
    </div>
  );
};
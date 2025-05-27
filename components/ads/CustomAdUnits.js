// components/ads/CustomAdUnits.js
import AdUnit from './AdUnit';
import { useAdSense } from '../../hooks/useAdSense';

const CustomAdUnits = ({ placement, className = "" }) => {
  const { settings } = useAdSense();
  
  if (!settings?.customAdUnits) return null;

  const customUnits = settings.customAdUnits.filter(
    unit => unit.placement === placement
  );

  if (customUnits.length === 0) return null;

  return (
    <div className={`custom-ads ${className}`}>
      {customUnits.map((unit) => (
        <div key={unit.id} className="custom-ad-unit">
          <AdUnit
            adSlot={unit.adSlot}
            adFormat={unit.adFormat}
            placement={`custom-${unit.placement}`}
          />
        </div>
      ))}
    </div>
  );
};

export default CustomAdUnits;
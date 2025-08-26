import { useEffect } from 'react';

const ADS_CLIENT = 'ca-pub-8377837851676312';

const GlobalAds = () => {
  useEffect(() => {
    // Helper: push ad for a single <ins> only when it has non-zero size
    const pushWhenVisible = (ins) => {
      try {
        if (!ins) return false;
        if (ins.offsetWidth > 0 && ins.offsetHeight > 0) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          return true;
        }
      } catch (e) {
        // ignore
      }
      return false;
    };
  
    // Observe each ins.adsbygoogle and push when it becomes visible
    const insList = Array.from(document.querySelectorAll('ins.adsbygoogle'));
    const observers = [];
  
  insList.forEach((ins) => {
      // If already has size, push immediately
      if (pushWhenVisible(ins)) return;
  
      // Use ResizeObserver when available
      if (typeof ResizeObserver !== 'undefined') {
        const ro = new ResizeObserver((entries) => {
          for (const entry of entries) {
            if (entry.target && entry.target.offsetWidth > 0) {
              try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
              } catch (e) {
                // ignore
              }
              ro.disconnect();
            }
          }
        });
        try {
          ro.observe(ins);
          observers.push(ro);
        } catch (e) {
          // ignore observation failures
        }
      } else {
        // Fallback: push on window resize when element gets size
        const onResize = () => {
          if (ins.offsetWidth > 0 && ins.offsetHeight > 0) {
            try {
              (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {}
            window.removeEventListener('resize', onResize);
          }
        };
        window.addEventListener('resize', onResize);
        // store a lightweight observer-like object so we can remove the listener on cleanup
        observers.push({ disconnect: () => window.removeEventListener('resize', onResize) });
      }
    });
  
    // Sidebar visibility: show on large screens (>=1024px) and hide on smaller
    const sidebar = document.querySelector('.global-ad--sidebar');
    let mql;
    const applySidebarVisibility = () => {
      if (!sidebar) return;
      const shouldShow = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(min-width: 1024px)').matches;
      sidebar.style.display = shouldShow ? 'block' : 'none';

      // If showing, attempt to initialize the slot if it has size
      if (shouldShow) {
        const ins = sidebar.querySelector('ins.adsbygoogle');
        if (ins && ins.offsetWidth > 0 && ins.offsetHeight > 0) {
          try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
        }
      }
    };

    if (typeof window !== 'undefined' && window.matchMedia) {
      mql = window.matchMedia('(min-width: 1024px)');
      try {
        // Modern API
        mql.addEventListener('change', applySidebarVisibility);
      } catch (e) {
        // Fallback
        try { mql.addListener(applySidebarVisibility); } catch (err) {}
      }
      // initial apply
      applySidebarVisibility();
    }

    return () => {
      observers.forEach((o) => {
        try { o.disconnect(); } catch (e) {}
      });
      if (mql) {
        try { mql.removeEventListener('change', applySidebarVisibility); } catch (e) { try { mql.removeListener(applySidebarVisibility); } catch (e) {} }
      }
    };
  }, []);

  // Render several ad placements that will appear across the site.
  // Positioning is intentionally simple — adjust styles in CSS as needed.
  return (
    <>
  {/* Inject AdSense script dynamically to avoid Next.js adding data-nscript attribute */}
  {/* The script is added on the client via useEffect so it won't include Next.js data attributes. */}

      {/* Top / header fluid ad */}
      <div className="global-ad global-ad--top" style={{width: '100%', textAlign: 'center', marginTop: 8}}>
        <ins className="adsbygoogle"
             style={{display: 'block'}}
             data-ad-format="fluid"
             data-ad-layout-key="-gw-3+1f-3d+2z"
             data-ad-client={ADS_CLIENT}
             data-ad-slot="2667530864"></ins>
      </div>

      {/* Sidebar vertical ad (fixed on large screens) */}
      <div className="global-ad global-ad--sidebar" style={{position: 'fixed', right: 8, top: '25%', width: 120, zIndex: 40, display: 'none'}}>
        <ins className="adsbygoogle"
             style={{display: 'block'}}
             data-ad-client={ADS_CLIENT}
             data-ad-slot="2036975475"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>

      {/* In-feed / square ad (can be placed near lists/feeds) */}
      <div className="global-ad global-ad--feed" style={{width: '100%', textAlign: 'center', marginTop: 16}}>
        <ins className="adsbygoogle"
             style={{display: 'block'}}
             data-ad-client={ADS_CLIENT}
             data-ad-slot="3350057146"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>

      {/* Multiplex / autorelaxed ad */}
      <div className="global-ad global-ad--multiplex" style={{width: '100%', textAlign: 'center', marginTop: 16}}>
        <ins className="adsbygoogle"
             style={{display: 'block'}}
             data-ad-format="autorelaxed"
             data-ad-client={ADS_CLIENT}
             data-ad-slot="8173070616"></ins>
      </div>

      {/* In-article ad */}
      <div className="global-ad global-ad--inarticle" style={{width: '100%', textAlign: 'center', marginTop: 20}}>
        <ins className="adsbygoogle"
             style={{display: 'block', textAlign: 'center'}}
             data-ad-layout="in-article"
             data-ad-format="fluid"
             data-ad-client={ADS_CLIENT}
             data-ad-slot="1056997921"></ins>
      </div>

      {/* Small/homepage responsive ad (footer area) */}
      <div className="global-ad global-ad--footer" style={{width: '100%', textAlign: 'center', marginTop: 20}}>
        <ins className="adsbygoogle"
             style={{display: 'block'}}
             data-ad-client={ADS_CLIENT}
             data-ad-slot="3608706319"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>
    </>
  );
};

export default GlobalAds;

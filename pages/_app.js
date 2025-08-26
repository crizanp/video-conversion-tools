// pages/_app.js
import React from 'react';
import '../styles/globals.css';
import { DataProvider } from '../contexts/DataContext';
import { AdSenseProvider } from '@/hooks/useAdSense';
import AdSenseScript from '@/components/AdSenseScript';

export default function MyApp({ Component, pageProps }) {
  return (
    <DataProvider>
      <AdSenseProvider>
        {/* AdSense script loader (will no-op if disabled in settings) */}
        <AdSenseScript />
        {/* Pages handle their own SEO via components/SEO.js or Head */}
        <Component {...pageProps} />
      </AdSenseProvider>
    </DataProvider>
  );
}

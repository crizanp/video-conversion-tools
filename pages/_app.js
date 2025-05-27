// pages/_app.js
import { AdSenseProvider } from '@/hooks/useAdSense';
import { DataProvider } from '../contexts/DataContext';
import '../styles/globals.css'; // Make sure you have your global styles
import AdSenseScript from '@/components/AdSenseScript';

export default function App({ Component, pageProps }) {
  return (
    <AdSenseProvider>
            <AdSenseScript />

      <DataProvider>
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">
            <Component {...pageProps} />
          </main>
        </div>
      </DataProvider>
    </AdSenseProvider>

  );
}



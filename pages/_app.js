// pages/_app.js
import { AdSenseProvider } from '@/hooks/useAdSense';
import { DataProvider } from '../contexts/DataContext';
import '../styles/globals.css'; // Make sure you have your global styles

export default function App({ Component, pageProps }) {
  return (
    <AdSenseProvider>
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
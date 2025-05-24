// pages/_app.js
import { DataProvider } from '../contexts/DataContext';
import '../styles/globals.css'; // Make sure you have your global styles

export default function App({ Component, pageProps }) {
  return (
    <DataProvider>
      <Component {...pageProps} />
    </DataProvider>
  );
}
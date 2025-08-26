import Head from 'next/head';
import { useRouter } from 'next/router';
import { SITE_URL } from '../utils/siteConfig';

export default function SEO({ title, description, keywords, image, type = 'website', canonical }) {
  const router = useRouter();
  const currentUrl = typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}${router.asPath}` : `${SITE_URL}${router.asPath}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="canonical" href={canonical || currentUrl} />
    </Head>
  );
}

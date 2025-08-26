import { SITE_URL } from '../utils/siteConfig';

const EXCLUDE = ['/api', '/_next', '/static'];

function generateSiteMap(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map((url) => {
        return `
      <url>
        <loc>${url.loc}</loc>
        <lastmod>${url.lastmod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>`;
      })
      .join('')}
  </urlset>`;
}

export async function getServerSideProps({ res }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tools.foxbeep.com';

  const pages = [
    '/',
    '/convert/mp4-to-webm',
    '/convert/webm-to-mp4',
    '/convert/mp4-to-mkv',
    '/convert/mov-to-mp4',
    '/convert/mkv-to-mp4',
    '/convert/avi-to-mp4',
    '/tools/mp4-webm',
    '/tools/webm-mp4',
    '/tools/mp4-mkv',
    '/tools/mov-mp4',
    '/tools/mkv-mp4',
    '/tools/avi-mp4',
    '/about',
    '/contact'
  ];

  const urls = pages.map((p) => ({ loc: `${baseUrl}${p}`, lastmod: new Date().toISOString() }));

  const sitemap = generateSiteMap(urls);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function SiteMap() {
  // getServerSideProps will do the heavy lifting
  return null;
}

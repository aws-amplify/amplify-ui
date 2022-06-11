/**
 * Generate SiteMap for SEO Purpose
 * We choose to write the script instead of using next-sitemap library because
 * next-sitemap library doesn't handle Next.js dynamic path well and it's easier
 * to maintain the small script on our own.
 * src: https://leerob.io/blog/nextjs-sitemap-robots
 */

import dotenv from 'dotenv-safe';
import prettier from 'prettier';
import { writeFileSync } from 'fs';
import path from 'path';

import { getAllPaths } from '../src/utils/getAllPaths';
import { getContentPaths } from '../src/utils/getContentPaths';
import { getPageFromSlug } from '../src/utils/getPageFromSlug';
import { getPagesManifest } from '../src/utils/getPagesManifest';
import { META_INFO } from '../src/data/meta';

dotenv.config();

async function generateSitemap() {
  const manifest = await getPagesManifest(
    getContentPaths,
    getPageFromSlug,
    META_INFO
  );

  console.log('🗺 ▶️ SiteMap generating...');
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');

  const pages = await getAllPaths();

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
          <url>
            <loc>${process.env.SITE_URL}</loc>
            <changefreq>weekly</changefreq>
            <priority>0.5</priority>
            <lastmod>2022-05-19T16:24:03.254Z</lastmod>
          </url>
        ${pages
          .map((path) => {
            const route = path === '/index' ? '' : path;

            /**
             * The priority of this URL relative to other URLs on your site.
             * Valid values range from 0.0 to 1.0. This value does not affect
             * how your pages are compared to pages on other sites—it only lets
             * the search engines know which pages you deem most important for
             * the crawlers.
             * Source: https://www.sitemaps.org/protocol.html#prioritydef
             */
            const prioritize = (path) => {
              const defaultPriority = 0.5;
              const isGetStarted = path.includes('getting-started') ? 0.1 : 0;
              const isReact = path.includes('react') ? 0.1 : 0;

              return defaultPriority + isGetStarted + isReact;
            };
            const priority = prioritize(route);

            return `
              <url>
                  <loc>${
                    process.env.SITE_URL ?? 'https://ui.docs.amplify.aws'
                  }${route}</loc>
                  <changefreq>weekly</changefreq>
                  <priority>${priority}</priority>
                  <lastmod>${new Date().toISOString()}</lastmod>
              </url>
            `;
          })
          .join('')}
    </urlset>
    `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  });

  // eslint-disable-next-line no-sync
  writeFileSync(path.resolve(__dirname, '../public/sitemap.xml'), formatted);
  console.log('🗺 ✅ SiteMap generated.');
}

function generateRobotsTxt() {
  const isProd =
    process.env.SITE_URL &&
    process.env.SITE_URL.startsWith('https://ui.docs.amplify.aws');
  console.log(
    `🤖▶️ robots.txt generating for ${
      isProd
        ? 'Prod. Googlebot is allowed.'
        : 'non-Prod. Googlebot is disallowed.'
    }...`
  );
  const disallowTxt = `# *
User-agent: Googlebot
Disallow: /
`;

  const txt = `${isProd ? '' : disallowTxt}
User-agent: *
Allow: /

# Host
Host: ui.docs.amplify.aws

# Sitemaps
Sitemap: ${process.env.SITE_URL ?? 'https://ui.docs.amplify.aws'}/sitemap.xml
`;
  writeFileSync(path.resolve(__dirname, '../public/robots.txt'), txt);
  console.log('🤖✅ robots.txt generated.');
}

generateSitemap();
generateRobotsTxt();

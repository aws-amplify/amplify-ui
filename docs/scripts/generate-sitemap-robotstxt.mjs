/**
 * Generate SiteMap for SEO Purpose
 * We choose to write the script instead of using next-sitemap library because
 * next-sitemap library doesn't handle Next.js dynamic path well and it's easier
 * to maintain the small script on our own.
 * src: https://leerob.io/blog/nextjs-sitemap-robots
 */

import dotenv from 'dotenv-safe';
import { globby } from 'globby';
import prettier from 'prettier';
import { writeFileSync } from 'fs';

dotenv.config();

async function generateSitemap() {
  console.log('🗺 ▶️ SiteMap generating...');
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');
  const pagesWithParam = await globby([
    'src/pages/**/index.page.tsx',
    'src/pages/**/index.page.mdx',
    '!data/*.mdx',
    '!src/pages/_*.tsx',
    '!src/pages/404.page.tsx',
  ]);

  const pages = pagesWithParam.flatMap((p) =>
    ['react', 'angular', 'vue', 'flutter'].map((framework) =>
      p.replace('[platform]', framework)
    )
  );

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
        ${pages
          .map((page) => {
            const path = page
              .replace('src/pages', '')
              .replace('data', '')
              .replace('.js', '')
              .replace('.page.mdx', '')
              .replace('.page.tsx', '');
            const route = path === '/index' ? '' : path;

            return `
              <url>
                  <loc>${
                    process.env.SITE_URL ?? 'https://ui.docs.amplify.aws'
                  }${route}</loc>
                  <changefreq>daily</changefreq>
                  <priority>0.7</priority>
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
  writeFileSync('public/sitemap.xml', formatted);
  console.log('🗺 ✅ SiteMap generated.');
}

function generateRobotsTxt() {
  console.log('🤖▶️ robots.txt generating...');
  const txt = `
# *
User-agent: *
Allow: /

# Host
Host: https://ui.docs.amplify.aws

# Sitemaps
Sitemap: ${process.env.SITE_URL ?? 'https://ui.docs.amplify.aws'}
`;
  writeFileSync('public/robots.txt', txt);
  console.log('🤖✅ robots.txt generating...');
}

generateSitemap();
generateRobotsTxt();

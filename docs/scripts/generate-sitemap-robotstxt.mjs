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

  const pages = pagesWithParam.flatMap((p) => {
    p = p
      .replace('src/pages', '')
      .replace('data', '')
      .replace('.js', '')
      .replace('.page.mdx', '')
      .replace('.page.tsx', '')
      .replace('/index', '');
    return ['react', 'angular', 'vue', 'flutter'].map((framework) => {
      const frameworkWithAllPath = 'react';
      const navNotForAllFrameworks = '[platform]/components';
      const pathForAllFrameworks = [
        '/[platform]/components',
        '/[platform]/components/authenticator',
        '/[platform]/components/chatbot',
        '/[platform]/components/storage',
      ];
      const path = p.replace('[platform]', framework);
      if (
        framework === frameworkWithAllPath ||
        !p.includes(navNotForAllFrameworks) ||
        pathForAllFrameworks.includes(p)
      ) {
        return path;
      } else {
        console.log(`${path} is not added to sitemap.`);
        return '';
      }
    });
  });

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
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
  writeFileSync('public/sitemap.xml', formatted);
  console.log('🗺 ✅ SiteMap generated.');
}

function generateRobotsTxt() {
  const isProd = process.env.SITE_URL === 'https://ui.docs.amplify.aws';
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

  const txt = `${
    process.env.SITE_URL === 'https://ui.docs.amplify.aws' ? '' : disallowTxt
  }
User-agent: *
Allow: /

# Host
Host: https://ui.docs.amplify.aws

# Sitemaps
Sitemap: ${process.env.SITE_URL ?? 'https://ui.docs.amplify.aws'}
`;
  writeFileSync('public/robots.txt', txt);
  console.log('🤖✅ robots.txt generated.');
}

generateSitemap();
generateRobotsTxt();

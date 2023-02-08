import https from 'https';
import http from 'http';
import * as fs from 'fs';
import { JSDOM } from 'jsdom';
import { VALIDATED_LINKS } from '../cypress/data/validatedLinks';

const sitemapData = fs.readFileSync('./public/sitemap.xml', 'utf8');
const linkRegex = new RegExp('(?<=>).+?(?=</loc)', 'gmi'); // This Regex is to match all the content between `>` and end with `</loc`.
const paths = sitemapData
  .match(linkRegex)
  .map((link) => link.replace(process.env.SITE_URL, ''))
  .sort();

/** TODO: need to remove .slice(0, 50) so that it can test all the pages */
paths.slice(0, 50).forEach(async (path, idx) => {
  await checkPage(path, idx);
});

async function checkPage(pageUrl, pathIdx) {
  return await http
    .get(pageUrl, (response) => {
      let data = '';

      console.log(
        `🧪[TESTING...] page ${pathIdx} ${pageUrl} statusCode: `,
        response.statusCode
      );
      // A chunk of data has been received.
      response.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      response.on('end', () => {
        const dom = new JSDOM(data);
        dom.window.document.querySelectorAll('a').forEach(async (el) => {
          await checkURL(el.href, el.tagName, el.text, pageUrl);
        });
      });
    })
    .on('error', (err) => {
      console.log('Error: ' + err.message);
    });
}

async function checkURL(urlOrPath, tagName, tagText, pageUrl) {
  const baseURL = 'http://localhost:3000';
  if (VALIDATED_LINKS.includes(urlOrPath)) {
    console.log(
      `⏭[SKIPPING...] ${urlOrPath} from ${tagName} tag "${tagText}" on ${pageUrl}, because it's pre-validated.`
    );
  } else if (urlOrPath.includes('https')) {
    await https.get(urlOrPath, ({ statusCode }) =>
      returnStatus({ statusCode, url: urlOrPath })
    );
  } else {
    const url = baseURL + urlOrPath.replace('about:blank', '');
    await http.get(url, ({ statusCode }) =>
      returnStatus({ statusCode, url: urlOrPath })
    );
  }

  function returnStatus({
    statusCode,
    url,
  }: {
    statusCode: number;
    url: string;
  }) {
    if ([200, 301, 303].includes(statusCode)) {
      console.log(
        `↩️ [RETURNING STATUS...] ${statusCode} for ${urlOrPath} from ${tagName} tag "${tagText}" on ${pageUrl}`
      );
    } else if (
      /** if it's an internal redirected link, then manually add a "/react" prefix to avoid the redirection */
      statusCode === 308 &&
      !url.includes('https:') &&
      !url.includes('/react/')
    ) {
      checkURL(
        `/react${urlOrPath.replace('about:blank', '')}`,
        tagName,
        tagText,
        pageUrl
      );
    } else {
      throw new Error(
        `❌ [RETURNING STATUS...] ${statusCode} for ${urlOrPath} from ${tagName} tag "${tagText}" on ${pageUrl}`
      );
    }
  }
}

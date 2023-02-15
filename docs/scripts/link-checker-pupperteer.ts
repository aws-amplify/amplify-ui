import https from 'https';
import http from 'http';
import puppeteer from 'puppeteer';
import { IGNORED_LINKS } from '../src/data/ignoredLinks';
import { sitePaths } from '../src/data/sitePaths';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const pageUrl = 'http://localhost:3000';
  const pageIdx = 0;
  await page.goto(pageUrl);

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });
  // await page.screenshot({ path: 'puppeteer-screenshot.jpg' });
  const links = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a')).map(
      ({ href, tagName, text }) => ({
        href,
        tagName,
        tagText: text,
      })
    );
  });

  links.forEach(async ({ href, tagName, tagText }, linkIdx) => {
    if (IGNORED_LINKS.includes(href)) {
      console.log(
        `⏭[SKIPPING...] link #${linkIdx} ${href} from ${tagName} tag "${tagText}" on page #${pageIdx} ${pageUrl}, because it is on the IGNORED_LINKS list.`
      );
    } else if (href.includes('https:')) {
      const request = await https.get(href, ({ statusCode = 0 }) => {
        returnStatus({ statusCode, href });
      });
      request.end();
    } else {
      const request = await http.get(href, ({ statusCode = 0 }) => {
        returnStatus({ statusCode, href });
      });
      request.end();
    }

    function returnStatus({
      statusCode,
      href,
    }: {
      statusCode: number;
      href: string;
    }) {
      if (
        [200, 301, 303, /*Start To remove */ 308 /*End To remove*/].includes(
          statusCode
        )
      ) {
        console.log(
          `↩️ [RETURNING STATUS...] ${statusCode} for link #${linkIdx} ${href} from ${tagName} tag "${tagText}" on page #${pageIdx} ${pageUrl}`
        );
      } else {
        throw new Error(
          `❌ [RETURNING STATUS...] ${statusCode} for link #${linkIdx} ${href} from ${tagName} tag "${tagText}" on  page #${pageIdx} ${pageUrl}`
        );
      }
    }
  });

  await browser.close();
})();

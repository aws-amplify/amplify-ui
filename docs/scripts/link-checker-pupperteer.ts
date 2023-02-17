import https from 'https';
import http from 'http';
import puppeteer from 'puppeteer';
import { IGNORED_LINKS } from '../src/data/ignoredLinks';
import { sitePaths } from '../src/data/sitePaths';

if (![3, 4].includes(process.argv.length)) {
  console.error('Expected 3 or 4 arguments!');
  process.exit(1);
}

const start = process.argv[2];
const end = process.argv[3];
const testPaths = end ? sitePaths.slice(+start, +end) : sitePaths.slice(+start); // Divide the sitePaths array to prevent the socket hang up issue.

runArrayPromiseInOrder(testPaths, checkSitemapPath);

async function runArrayPromiseInOrder(arr: unknown[], fn) {
  for (const [i, item] of arr.entries()) {
    await fn(item, i);
  }
}

async function checkSitemapPath(pageUrl, pageIdx) {
  // const pageUrl = process.argv[2];
  // const pageIdx = process.argv[3];
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(pageUrl, { waitUntil: 'domcontentloaded' });
  console.log(`🧪[TESTING...] page #${pageIdx} ${pageUrl}`);
  await page.setViewport({ width: 1080, height: 1024 });
  const links = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a'))
      .map(({ href, tagName, text }) => ({
        href,
        tagName,
        tagText: text,
      }))
      .filter(({ href }) => href);
  });

  await runArrayPromiseInOrder(links, checkLink);
  await page.close();
  await browser.close();

  async function checkLink({ href, tagName, tagText }, linkIdx) {
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
  }
}

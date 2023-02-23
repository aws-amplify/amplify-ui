import https from 'https';
import http from 'http';
import puppeteer from 'puppeteer';
import { IGNORED_LINKS } from '../src/data/ignoredLinks';
import { sitePaths } from '../src/data/sitePaths';

/**
 * "uncaughtException" is to prevent Error: connect ECONNREFUSED
 * More details: https://stackoverflow.com/questions/14168433/node-js-error-connect-econnrefused
 */
process.on('uncaughtException', function (err) {
  console.log('ERROR::', err);
});

if (![3, 4].includes(process.argv.length)) {
  console.error('Expected 3 or 4 arguments!');
  process.exit(1);
}

const start = process.argv[2];
const end = process.argv[3];
const testPaths = end ? sitePaths.slice(+start, +end) : sitePaths.slice(+start); // Divide the sitePaths array to prevent the socket hang up issue.

runArrayPromiseInOrder(testPaths, checkSitemapPath);

/**
 * Asynchronous array loops
 * More details: https://www.30secondsofcode.org/articles/s/javascript-async-array-loops#for-loops
 * @param {array} arr - array to iterate
 * @param {function} fn - callback function
 */
async function runArrayPromiseInOrder(arr: unknown[], fn) {
  for (const [i, item] of arr.entries()) {
    await fn(item, i);
  }
}

async function checkSitemapPath(pageUrl, pageIdx) {
  let browser = await puppeteer.launch({
    args: [
      /**
       * add '--disable-dev-shm-usage' to prevent "Error: Protocol error (Runtime.callFunctionOn): Target closed."
       * More details: https://github.com/puppeteer/puppeteer/issues/1175#issuecomment-369728215
       */
      '--disable-dev-shm-usage',
    ],
  });

  const page = await browser.newPage();

  await page.goto(pageUrl, { waitUntil: 'networkidle2' });
  await page.waitForNetworkIdle({ idleTime: 1000 });
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
  console.log(`🧮 ${links.length} links will be checked.`);
  await runArrayPromiseInOrder(links, checkLink);

  await page.close();
  await browser.close();

  async function checkLink(
    {
      href,
      tagName,
      tagText,
    }: { href: string; tagName: string; tagText: string },
    linkIdx: number
  ) {
    if (IGNORED_LINKS.includes(href)) {
      console.log(
        `⏭[SKIPPING...] link #${linkIdx} ${href} from ${tagName} tag "${tagText}" on page #${pageIdx} ${pageUrl}, because it is on the IGNORED_LINKS list.`
      );
    } else if (href.includes('https:')) {
      const request = await https.get(href, async ({ statusCode = 0 }) => {
        await returnStatus({ statusCode, href });
      });
      request.end();
    } else {
      const request = await http.get(href, async ({ statusCode = 0 }) => {
        await returnStatus({ statusCode, href });
      });
      request.end();
    }

    async function returnStatus({
      statusCode,
      href,
    }: {
      statusCode: number;
      href: string;
    }) {
      if ([200, 301, 303, 308].includes(statusCode)) {
        console.log(
          `↩️ [RETURNING STATUS...] ${statusCode} for link #${linkIdx} ${href} from ${tagName} tag "${tagText}" on page #${pageIdx} ${pageUrl}`
        );

        /**
         * If 308, check if it's a internal direction (see docs/next.config.js redirects logic)
         * If it's internal direction, after adding the platform, it should be 200
         * Otherwise, the link needs to be updated
         */
        if (statusCode === 308) {
          const hostNameRegex = /http(s)?:\/\/[^/]*/i;
          const platform = pageUrl.replace(hostNameRegex, '').split('/')[1];
          const newHref = `${
            href.match(hostNameRegex)[0]
          }/${platform}${href.replace(hostNameRegex, '')}`;
          console.log(
            `🔁 [Redirecting...] link #${linkIdx} ${href} to ${newHref}`
          );
          await checkLink({ href: newHref, tagName, tagText }, linkIdx);
        }
      } else {
        throw new Error(
          `❌ [RETURNING STATUS...] ${statusCode} for link #${linkIdx} ${href} from ${tagName} tag "${tagText}" on  page #${pageIdx} ${pageUrl}`
        );
      }
    }
  }
}

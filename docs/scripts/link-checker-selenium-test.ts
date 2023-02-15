import https from 'https';
import http from 'http';
import { Builder, By } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import { IGNORED_LINKS } from '../src/data/ignoredLinks';
import { sitePaths } from '../src/data/sitePaths';

if (![3, 4].includes(process.argv.length)) {
  console.error('Expected 3 or 4 arguments!');
  process.exit(1);
}

const start = process.argv[2];
const end = process.argv[3];
const testPaths = end ? sitePaths.slice(+start, +end) : sitePaths.slice(+start); // Divide the sitePaths array to prevent the socket hang up issue.

(async function checkLinks() {
  const service = new chrome.ServiceBuilder(
    '/Users/zhamujun/Amplify-workplace/amplify-ui/docs/scripts/chromedriver_mac64/chromedriver'
  );
  const driver = new Builder()
    .forBrowser('chrome')
    .setChromeService(service)
    .build();

  const pageChecked = testPaths.map(async (path, pageIdx) => {
    await driver.get(path);
    const linkElements = await driver.findElements(By.tagName('a'));
    const linksChecked = linkElements.map(async (e, linkIdx) => {
      const link = await e.getAttribute('href');
      const tagName = await e.getTagName();
      const tagText = await e.getText();
      console.log(`⭐ page #${pageIdx} link #${linkIdx}`);
      return await checkURL(link, tagName, tagText, path, pageIdx, linkIdx);
    });
    return Promise.allSettled(linksChecked);
  });

  Promise.allSettled(pageChecked).then(() => {
    driver.quit();
  });
})();

async function checkURL(
  urlOrPath,
  tagName,
  tagText,
  pageUrl,
  pageIdx,
  linkIdx
) {
  if (IGNORED_LINKS.includes(urlOrPath)) {
    console.log(
      `⏭[SKIPPING...] link #${linkIdx} ${urlOrPath} from ${tagName} tag "${tagText}" on page #${pageIdx} ${pageUrl}, because it is on the IGNORED_LINKS list.`
    );
  } else if (urlOrPath.includes('http://')) {
    const request = await http.get(urlOrPath, ({ statusCode }) =>
      returnStatus({ statusCode, url: urlOrPath })
    );
    request.end();
  } else {
    const request = await https.get(urlOrPath, ({ statusCode }) =>
      returnStatus({ statusCode, url: urlOrPath })
    );
    request.end();
  }

  function returnStatus({
    statusCode,
    url,
  }: {
    statusCode: number;
    url: string;
  }) {
    if (
      [200, 301, 303, /*Start To remove */ 308 /*End To remove*/].includes(
        statusCode
      )
    ) {
      console.log(
        `↩️ [RETURNING STATUS...] ${statusCode} for link #${linkIdx} ${urlOrPath} from ${tagName} tag "${tagText}" on page #${pageIdx} ${pageUrl}`
      );
    } else {
      throw new Error(
        `❌ [RETURNING STATUS...] ${statusCode} for ${urlOrPath} from ${tagName} tag "${tagText}" on ${pageUrl}`
      );
    }
  }
}

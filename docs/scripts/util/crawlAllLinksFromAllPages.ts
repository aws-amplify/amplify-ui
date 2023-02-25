import puppeteer from 'puppeteer';
import { runArrayPromiseInOrder } from '.';

export async function crawlAllLinksFromAllPages(allPages: string[]) {
  type AllPagesPaths = Map<
    string,
    {
      pageUrl: string;
      links: { href: string; tagName: string; tagText: string }[];
    }
  >;
  const allPagesPaths: AllPagesPaths = new Map();
  await runArrayPromiseInOrder(allPages, checkSitemapPath);

  return allPagesPaths;

  async function checkSitemapPath(pageUrl: string, pageIdx: string) {
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
    console.log(`🐝 [VISITING...] page #${pageIdx} ${pageUrl}`);
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
    // console.log(`🧮 ${links.length} links will be checked.`);
    // await runArrayPromiseInOrder(links, checkLink);
    allPagesPaths.set(pageIdx, { pageUrl, links });

    await page.close();
    await browser.close();
  }
}

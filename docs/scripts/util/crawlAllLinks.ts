import puppeteer from 'puppeteer';
import { runArrayPromiseInOrder } from '.';

type Links = {
  pageUrl: string;
  links: { href: string; tagName: string; tagText: string }[];
};
type AllPagesPaths = Map<string, Links>;

export async function crawlAllLinks(pages: string[]) {
  const allPagesPaths: AllPagesPaths = new Map();
  await runArrayPromiseInOrder(pages, checkSitemapPath);

  return allPagesPaths;

  async function checkSitemapPath(pageUrl: string, pageIdx: string) {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.goto(pageUrl, { waitUntil: 'networkidle2' });
    await page.waitForNetworkIdle({ idleTime: 1000 });
    console.log(`🐝 [VISITING...] page #${pageIdx} ${pageUrl}`);
    await page.setViewport({ width: 1080, height: 1024 });
    const links = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a')).map(
        ({ href, tagName, text }) => ({
          href,
          tagName,
          tagText: text,
        })
      );
    });

    allPagesPaths.set(pageIdx, { pageUrl, links });

    await page.close();
    await browser.close();
  }
}

import puppeteer from 'puppeteer';
import { PromisePool } from '@supercharge/promise-pool';

type Links = {
  pageUrl: string;
  links: { href: string; tagName: string; tagText: string }[];
};
type AllPagesPaths = Map<number, Links>;

export async function crawlAllLinks(pages: string[]) {
  const allPagesPaths: AllPagesPaths = new Map();
  await PromisePool.withConcurrency(10)
    .for(pages)
    .process(async (pageUrl, pageIdx, pool) => {
      await checkSitemapPath(pageUrl, pageIdx, allPagesPaths);
    });

  return allPagesPaths;
}

async function checkSitemapPath(
  pageUrl: string,
  pageIdx: number,
  allPagesPaths: AllPagesPaths
) {
  let browser = await puppeteer.launch();

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

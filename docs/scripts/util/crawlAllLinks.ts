import puppeteer from 'puppeteer';
import { PromisePool } from '@supercharge/promise-pool';
import { PROMISE_POOL_CONCURRENCY } from '../data/constants';

export async function crawlAllLinks(pages: string[]) {
  const { results: allPagesPaths } = await PromisePool.withConcurrency(
    PROMISE_POOL_CONCURRENCY
  )
    .for(pages)
    .process(async (pageUrl, pageIdx, pool) => {
      return await checkSitemapPath(pageUrl, pageIdx);
    });

  return allPagesPaths;
}

async function checkSitemapPath(pageUrl: string, pageIdx: number) {
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

  await page.close();
  await browser.close();

  return { pageUrl, links };
}

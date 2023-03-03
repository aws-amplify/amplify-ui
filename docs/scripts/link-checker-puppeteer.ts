import { sitePaths } from '../src/data/sitePaths';
import { checkLink, crawlAllLinks, runArrayPromiseInOrder } from './util';

/**
 * Divide the sitePaths array so that we can easily run a smaller portion if needed.
 * e.g. to run the first 10 links. run `yarn docs node --require esbuild-register ./scripts/link-checker-puppeteer.ts 0 10`
 */
const start = process.argv[2] ?? 0;
const end = process.argv[3];
const testPaths = end ? sitePaths.slice(+start, +end) : sitePaths.slice(+start);

try {
  main();
} catch (err) {
  process.exit(1);
}

async function main() {
  const allPagesPaths = await crawlAllLinks(testPaths);

  await runArrayPromiseInOrder(
    Array.from(allPagesPaths),
    async ([pageIdx, { pageUrl, links }]) => {
      await runArrayPromiseInOrder(
        links.map((link) => ({ ...link, pageIdx, pageUrl })),
        checkLink
      );
    }
  );

  const allPagePaths = Array.from(allPagesPaths).map(
    ([pageIdx, { pageUrl, links }]) => ({
      pageUrl,
      numberOfLinks: links.length,
    })
  );
  console.table(allPagePaths);
}

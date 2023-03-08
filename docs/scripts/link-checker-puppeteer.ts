import { PromisePool } from '@supercharge/promise-pool';
import { sitePaths } from '../src/data/sitePaths';
import { checkLink, crawlAllLinks } from './util';
import type { LinkInfo } from './util';
import {
  DEFAULT_GOOD_STATUS_CODES,
  PROMISE_POOL_CONCURRENCY,
} from './data/constants';

/**
 * Divide the sitePaths array so that we can easily run a smaller portion if needed.
 * e.g. to run the first 10 links. run `yarn docs node --require esbuild-register ./scripts/link-checker-puppeteer.ts 0 10`
 */
const start = process.argv[2] ?? 0;
const end = process.argv[3];
const testPaths = end ? sitePaths.slice(+start, +end) : sitePaths.slice(+start);

function reportResult(links: LinkInfo[]) {
  const errorLinks = links.filter((link) => {
    const isInternalRedirection =
      link.statusCode === 308 && link.href.includes('http://localhost:3000');
    const goodStatusCodes = [0, ...DEFAULT_GOOD_STATUS_CODES];
    return !goodStatusCodes.includes(link.statusCode) && !isInternalRedirection;
  });

  if (errorLinks.length) {
    errorLinks.forEach(
      ({ statusCode, pageIdx, linkIdx, href, tagName, tagText, pageUrl }) => {
        console.error(
          `❌ [RETURNING STATUS...] ${statusCode} for page #${pageIdx} link #${linkIdx} -- ${href} from ${tagName} tag "${tagText}" on  page ${pageUrl}`
        );
      }
    );
    throw new Error(`${errorLinks.length} broken links found`);
  } else {
    console.log('🎉 All links look good!');
  }
}

async function runLinkChecker() {
  const allPagesPaths = await crawlAllLinks(testPaths);

  const { results } = await PromisePool.withConcurrency(
    PROMISE_POOL_CONCURRENCY
  )
    .for(allPagesPaths)
    .process(async (pagePaths, pageIdx, pool) => {
      const { pageUrl, links } = pagePaths;
      const { results } = await PromisePool.withConcurrency(
        PROMISE_POOL_CONCURRENCY
      )
        .for(links)
        .process(async ({ href, tagName, tagText }, linkIdx, pool) => {
          return await checkLink(
            { href, tagName, tagText, pageUrl, pageIdx },
            linkIdx
          );
        });
      return { pageUrl, links: results };
    });

  const allPagesPathsNum = allPagesPaths.map((pagePaths) => {
    const { pageUrl, links } = pagePaths;
    return {
      pageUrl,
      numberOfLinks: links.length,
    };
  });

  await console.table(allPagesPathsNum);

  const links = results.reduce((acc, curr) => [...acc, ...curr.links], []);
  reportResult(links);
}

try {
  runLinkChecker();
} catch (err) {
  process.exit(1);
}

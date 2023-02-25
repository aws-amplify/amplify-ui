import { sitePaths } from '../src/data/sitePaths';
import {
  checkLink,
  crawlAllLinksFromAllPages,
  runArrayPromiseInOrder,
} from './util';

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

async function main() {
  const allPagesPaths = await crawlAllLinksFromAllPages(testPaths);

  await runArrayPromiseInOrder(
    [...allPagesPaths],
    async ([pageIdx, { pageUrl, links }]) => {
      await runArrayPromiseInOrder(
        links.map((link) => ({ ...link, pageIdx, pageUrl })),
        checkLink
      );
    }
  );

  [...allPagesPaths].map(([pageIdx, { pageUrl, links }]) => {
    console.log(`#${pageIdx}, ${pageUrl} has ${links.length} links`);
  });
}

main();

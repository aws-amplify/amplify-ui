import https from 'https';
import http from 'http';
import process from 'process';
import { JSDOM } from 'jsdom';
import { VALIDATED_LINKS } from '../cypress/data/validatedLinks';
import { sitePaths } from '../src/data/sitePaths';

setTimeout(() => {
  console.log('This will still run.');
}, 500);

if (![3, 4].includes(process.argv.length)) {
  console.error('Expected 3 or 4 arguments!');
  process.exit(1);
}

const start = process.argv[2];
const end = process.argv[3];
const testPaths = end ? sitePaths.slice(+start, +end) : sitePaths.slice(+start); // Divide the sitePaths array to prevent the socket hang up issue.

testPaths.forEach(async (path, idx) => {
  await checkPage(path, idx);
});

async function checkPage(pageUrl, pathIdx) {
  const request = http
    .get(pageUrl, (response) => {
      let data = '';

      console.log(
        `🧪[TESTING...] page ${pathIdx} ${pageUrl} statusCode: `,
        response.statusCode
      );
      // A chunk of data has been received.
      response.on('data', (chunk) => {
        data += chunk;
      });

      // Check all the urls
      response.on('end', checkUrlOnPage(data));
    })
    .on('error', (err) => {
      console.log('Error: ' + err.message);
    });
  request.end();

  function checkUrlOnPage(data: string): () => void {
    return () => {
      const dom = new JSDOM(data);
      dom.window.document.querySelectorAll('a').forEach(async (el) => {
        await checkURL(el.href, el.tagName, el.text, pageUrl);
      });
    };
  }
}

async function checkURL(urlOrPath, tagName, tagText, pageUrl) {
  const baseURL = 'http://localhost:3000';
  if (VALIDATED_LINKS.includes(urlOrPath)) {
    console.log(
      `⏭[SKIPPING...] ${urlOrPath} from ${tagName} tag "${tagText}" on ${pageUrl}, because it's pre-validated.`
    );
  } else if (urlOrPath.includes('https')) {
    const request = await https.get(urlOrPath, ({ statusCode }) =>
      returnStatus({ statusCode, url: urlOrPath })
    );
    request.end();
  } else {
    const url = baseURL + urlOrPath.replace('about:blank', '');
    const request = await http.get(url, ({ statusCode }) =>
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
    if ([200, 301, 303].includes(statusCode)) {
      console.log(
        `↩️ [RETURNING STATUS...] ${statusCode} for ${urlOrPath} from ${tagName} tag "${tagText}" on ${pageUrl}`
      );
    } else if (
      /** if it's an internal redirected link, then manually add a "/react" prefix to avoid the redirection */
      statusCode === 308 &&
      !url.includes('https:') &&
      !url.includes('/react/')
    ) {
      checkURL(
        `/react${urlOrPath.replace('about:blank', '')}`,
        tagName,
        tagText,
        pageUrl
      );
    } else {
      throw new Error(
        `❌ [RETURNING STATUS...] ${statusCode} for ${urlOrPath} from ${tagName} tag "${tagText}" on ${pageUrl}`
      );
    }
  }
}

import https from 'https';
import http, { IncomingMessage } from 'http';
import { JSDOM } from 'jsdom';
// const validatedLinks = require('docs/cypress/e2e/links.cy.ts');
import { VALIDATED_LINKS } from '../cypress/data/validatedLinks';

const pageUrl = 'http://localhost:3000';
http
  .get(pageUrl, (response) => {
    let data = '';

    console.log('🍬 STATUS CODE', response.statusCode);
    // A chunk of data has been received.
    response.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    response.on('end', () => {
      const dom = new JSDOM(data);
      dom.window.document.querySelectorAll('a').forEach(async (el) => {
        await checkURL(el.href, el.tagName, el.text, pageUrl);
      });
    });
  })
  .on('error', (err) => {
    console.log('Error: ' + err.message);
  });

function checkURL(urlOrPath, tagName, tagText, pageUrl) {
  const baseURL = 'http://localhost:3000';
  if (VALIDATED_LINKS.includes(urlOrPath)) {
    console.log(
      `⏭[SKIPPING...] ${urlOrPath} from ${tagName} tag "${tagText}" on ${pageUrl}, because it's pre-validated.`
    );
  } else if (urlOrPath.includes('https')) {
    https.get(urlOrPath, returnStatus);
  } else {
    const url = baseURL + urlOrPath.replace('about:blank', '');
    http.get(url, returnStatus);
  }

  function returnStatus({ statusCode }: IncomingMessage) {
    if ([200, 301, 303].includes(statusCode)) {
      console.log(
        `↩️ [RETURNING STATUS...] ${statusCode} for ${urlOrPath} from ${tagName} tag "${tagText}" on ${pageUrl}`
      );
    } else {
      throw new Error(
        `❌ [RETURNING STATUS...] ${statusCode} for ${urlOrPath} from ${tagName} tag "${tagText}" on ${pageUrl}`
      );
    }
  }
}

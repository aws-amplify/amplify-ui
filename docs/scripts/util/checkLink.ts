import https from 'https';
import http from 'http';
import {
  DEFAULT_GOOD_STATUS_CODES,
  DOCS_AMPLIFY_HOST,
} from '../data/constants';

export type LinkInfo = {
  href: string;
  linkIdx: number;
  pageIdx: number;
  pageUrl: string;
  statusCode: number;
  tagName: string;
  tagText: string;
  originalStatusCode?: number;
};
const requestedUrl: Set<string> = new Set();

const hostName = 'http://localhost:3000';
export const isInternalLink = (link) => link.includes(hostName);

async function returnStatus({
  href,
  linkIdx,
  pageIdx,
  pageUrl,
  statusCode,
  tagName,
  tagText,
}: LinkInfo): Promise<LinkInfo> {
  if ([...DEFAULT_GOOD_STATUS_CODES, 301, 308].includes(statusCode)) {
    /**
     * If 308, check if it's an internal redirection to add [platform] prefix. See docs/next.config.js redirects logic.
     * If it's an internal redirection to add [platform] prefix, after adding the platform, it should be 200.
     * Otherwise, the link needs to be updated.
     * e.g. 308 from "/guides" passes (because it's redirected to "react/guides"),
     *  but 308 from "connected-components/authenticator/headless" fails and returns a 404 ((because it's redirected to "react/connected-components/authenticator/advanced").
     */
    if (statusCode === 308 && isInternalLink(href)) {
      const platform = pageUrl.replace(hostName, '').split('/')[1];
      const newHref = `${href.match(hostName)[0]}/${platform}${href.replace(
        hostName,
        ''
      )}`;
      return await checkLink(
        { href: newHref, tagName, tagText, pageIdx, pageUrl },
        linkIdx
      );
    }
  } else {
    console.error(
      `❌ [RETURNING STATUS...] ${statusCode} for page #${pageIdx} link #${linkIdx} -- ${href} from ${tagName} tag "${tagText}" on  page ${pageUrl}`
    );
  }
}

export async function checkLink(
  {
    href,
    tagName,
    tagText,
    pageIdx,
    pageUrl,
  }: {
    href: string;
    tagName: string;
    tagText: string;
    pageIdx: number;
    pageUrl: string;
  },
  linkIdx: number
): Promise<LinkInfo> {
  return new Promise(async (res, rej) => {
    const linkData = { href, linkIdx, pageIdx, pageUrl, tagName, tagText };
    if (!href) {
      console.log(
        `⚠️[WARNING...] page #${pageIdx} link #${linkIdx} "${tagName}" tag "${tagText}" doesn't have a href on ${pageUrl}.`
      );
      res({ ...linkData, statusCode: 0 });
      // skip all external links
    } else if (requestedUrl.has(href) || !isInternalLink(href)) {
      res({ ...linkData, statusCode: 0 });
    } else {
      const { get } = href.includes('https:') ? https : http;
      const request = await get(href, async ({ statusCode = 0 }) => {
        const originalStatusCode = statusCode;
        statusCode =
          (
            await returnStatus({
              ...linkData,
              statusCode,
            })
          )?.statusCode ?? statusCode;
        requestedUrl.add(href);
        res({ ...linkData, statusCode, originalStatusCode });
      });
      request.end();
    }
  });
}

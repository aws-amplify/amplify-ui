import https from 'https';
import http from 'http';
import { IGNORED_LINKS } from '../../src/data/ignoredLinks';
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
};
const requestedUrl: Set<string> = new Set();

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
     * If 301 and from 'https://docs.amplify.aws/', add a "/" and check again.
     * Because 'https://docs.amplify.aws/' adds a "/" and return a 301 to all the links not ending with "/".
     * e.g. https://docs.amplify.aws/lib/auth/getarted/q/platform/js returns 301 but we should catch it as 404.
     */
    if (statusCode === 301 && href.startsWith(DOCS_AMPLIFY_HOST)) {
      return await checkLink(
        { href: `${href}/`, tagName, tagText, pageIdx, pageUrl },
        linkIdx
      );
    }
    /**
     * If 308, check if it's a internal direction (see docs/next.config.js redirects logic)
     * If it's internal direction, after adding the platform, it should be 200
     * Otherwise, the link needs to be updated
     */
    if (statusCode === 308) {
      const hostNameRegex = RegExp(`http(s)?:\/\/[^/]*`, 'i'); // matches everything between http(s)?: to "/", which is the hostname. e.g., "https://github.com/".
      const platform = pageUrl.replace(hostNameRegex, '').split('/')[1];
      const newHref = `${
        href.match(hostNameRegex)[0]
      }/${platform}${href.replace(hostNameRegex, '')}`;
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

export function checkLink(
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
): Promise<LinkInfo>;

export async function checkLink(
  { href, tagName, tagText, pageIdx, pageUrl },
  linkIdx
) {
  return new Promise(async (res, rej) => {
    const linkData = { href, linkIdx, pageIdx, pageUrl, tagName, tagText };
    if (!href) {
      console.log(
        `⚠️[WARNING...] page #${pageIdx} link #${linkIdx} "${tagName}" tag "${tagText}" doesn't have a href.`
      );
      res({ ...linkData, statusCode: 0 });
    } else if (IGNORED_LINKS.includes(href) || requestedUrl.has(href)) {
      res({ ...linkData, statusCode: 0 });
    } else {
      const { get } = href.includes('https:') ? https : http;
      const request = await get(href, async ({ statusCode = 0 }) => {
        statusCode =
          (
            await returnStatus({
              ...linkData,
              statusCode,
            })
          )?.statusCode ?? statusCode;
        requestedUrl.add(href);
        res({ ...linkData, statusCode });
      });
      request.end();
    }
  });
}

import https from 'https';
import http from 'http';
import { IGNORED_LINKS } from '../../src/data/ignoredLinks';
import { defaultGoodStatusCodes } from '../data/constants';

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
          )?.statusCode || statusCode;
        requestedUrl.add(href);
        res({ ...linkData, statusCode });
      });
      request.end();
    }
  });
}

async function returnStatus({
  href,
  linkIdx,
  pageIdx,
  pageUrl,
  statusCode,
  tagName,
  tagText,
}: LinkInfo): Promise<LinkInfo> {
  if ([...defaultGoodStatusCodes, 308].includes(statusCode)) {
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

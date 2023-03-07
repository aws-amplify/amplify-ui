import * as fs from 'fs';

const sitemapData = fs.readFileSync('./public/sitemap.xml', 'utf8');
const linkRegex = new RegExp('(?<=>).+?(?=</loc)', 'gmi'); // This Regex is to match all the content between `>` and end with `</loc`.

export const sitePaths = sitemapData
  .match(linkRegex)
  .map((link) => link.replace(process.env.SITE_URL, ''))
  .sort();

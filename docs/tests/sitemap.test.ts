import * as fs from 'fs';

test('Sitemap Snapshot', () => {
  const sitemapData = fs.readFileSync('./public/sitemap.xml', 'utf8');
  const linkRegex = new RegExp('(?<=>).+?(?=</loc)', 'gmi'); // This Regex is to match all the content between `>` and end with `</loc`.
  const paths = sitemapData
    .match(linkRegex)
    .map((link) => link.replace(process.env.SITE_URL, ''))
    .sort();
  expect(paths.join(', \n')).toMatchSnapshot();
});

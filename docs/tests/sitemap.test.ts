import * as fs from 'fs';

test('Sitemap Snapshot', () => {
  const sitemapData = fs.readFileSync('./public/sitemap.xml', 'utf8');
  const regex = new RegExp('(?<=>).+?(?=</loc)', 'gmi');
  const paths = sitemapData
    .match(regex)
    .map((link) => link.replace(process.env.SITE_URL, ''))
    .sort();
  expect(paths.join(', \n')).toMatchSnapshot();
});

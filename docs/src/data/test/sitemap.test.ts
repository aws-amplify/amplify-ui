const fs = require('fs');

test('Sitemap Snapshot', () => {
  const propsTableData = fs.readFileSync('./public/sitemap.xml', 'utf8');
  expect(propsTableData).toMatchSnapshot();
});

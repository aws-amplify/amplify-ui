const fs = require('fs');

test('Props Table', () => {
  const propsTableData = fs.readFileSync('./src/data/props-table.json', 'utf8');
  expect(propsTableData).toMatchSnapshot();
});

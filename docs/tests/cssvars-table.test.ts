import * as fs from 'fs';

test('CSS Variables Table', () => {
  const propsTableData = fs.readFileSync(
    './src/data/cssvars-table.json',
    'utf8'
  );
  expect(propsTableData).toMatchSnapshot();
});

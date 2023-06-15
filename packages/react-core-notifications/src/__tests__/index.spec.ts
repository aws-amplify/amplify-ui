import * as exported from '..';

const sortedExportKeys = Object.keys(exported).sort();

describe('@aws-amplify/ui-react-core-notifications', () => {
  it('exports should match snapshot', () => {
    expect(sortedExportKeys).toMatchSnapshot();
  });
});

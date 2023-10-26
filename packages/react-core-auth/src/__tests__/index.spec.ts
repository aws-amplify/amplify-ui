import * as exported from '..';

const sortedExportKeys = Object.keys(exported).sort();

describe('@aws-amplify/ui-react-core-auth', () => {
  it('exports should match snapshot', () => {
    expect(sortedExportKeys).toMatchSnapshot();
  });
});

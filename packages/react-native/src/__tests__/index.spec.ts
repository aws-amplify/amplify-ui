import * as exported from '..';

describe('@aws-amplify/ui-react-native', () => {
  it('exports should match snapshot', () => {
    const exportedKeys = Object.keys(exported);
    expect(exportedKeys).toMatchSnapshot();
  });
});

import * as exported from '..';

describe('@aws-amplify/ui-react-native-auth', () => {
  it('exports should match snapshot', () => {
    const exportedKeys = Object.keys(exported);
    expect(exportedKeys).toMatchSnapshot();
  });
});

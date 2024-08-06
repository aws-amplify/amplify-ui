import * as exported from '../src';

describe('@aws-amplify/ui-vue', () => {
  describe('exports', () => {
    it('should match snapshot', () => {
      const sortedExports = Object.keys(exported).sort();
      expect(sortedExports).toMatchSnapshot();
    });
  });
});

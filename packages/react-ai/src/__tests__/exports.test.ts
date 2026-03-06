import * as exported from '..';

describe('@aws-amplify/ui-react-ai', () => {
  describe('exports', () => {
    it('should match snapshot', () => {
      const sortedExports = Object.keys(exported).sort();

      expect(sortedExports).toMatchSnapshot();
    });
  });
});

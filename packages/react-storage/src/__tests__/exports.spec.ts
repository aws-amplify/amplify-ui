import * as exported from '../';
import * as browser from '../components/StorageBrowser';

describe('@aws-amplify/ui-react-storage', () => {
  describe('exports', () => {
    it('should match snapshot', () => {
      const sortedExports = Object.keys(exported).sort();

      expect(sortedExports).toMatchSnapshot();
    });
  });
});

describe('@aws-amplify/ui-react-storage/browser', () => {
  describe('exports', () => {
    it('should match snapshot', () => {
      const sortedBrowserExports = Object.keys(browser).sort();

      expect(sortedBrowserExports).toMatchSnapshot();
    });
  });
});

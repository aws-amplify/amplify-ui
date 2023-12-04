import StyleDictionary from 'style-dictionary';
import { defaultTheme, createTheme } from '../';

describe('@aws-amplify/ui', () => {
  describe('defaultTheme', () => {
    it('all references should resolve', () => {
      expect(() => {
        StyleDictionary.extend({
          // @ts-ignore next-line
          tokens: { ...defaultTheme.tokens },
          platforms: {
            // Need a platform for Style Dictionary to build so it can try to
            // resolve references
            test: {},
          },
        }).buildAllPlatforms();
        // This will throw an error if there are any references that can't be resolved
      }).not.toThrow();
    });

    it('should match snapshot', () => {
      expect(createTheme().cssText).toMatchSnapshot();
    });
  });
});

import { baseTheme } from '../baseTheme';
import StyleDictionary from 'style-dictionary';

describe('@aws-amplify/ui', () => {
  describe('baseTheme', () => {
    it('all references should resolve', () => {
      expect(() => {
        StyleDictionary.extend({
          // This is to make typescript happy, the types don't jive well
          tokens: Object.assign({ ...baseTheme.tokens }),
          platforms: {
            // Need a platform for Style Dictionary to build so it can try to
            // resolve references
            test: {},
          },
        }).buildAllPlatforms();
        // This will throw an error if there are any references that can't be resolved
      }).not.toThrow();
    });
  });
});

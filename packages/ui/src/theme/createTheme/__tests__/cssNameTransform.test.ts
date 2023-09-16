import { cssNameTransform } from '../cssNameTransform';

describe('@aws-amplify/ui', () => {
  describe('cssNameTransform', () => {
    it('should kebab/param-case an array of strings with the prefix', () => {
      expect(cssNameTransform({ path: ['a', 'b', 'c'] })).toEqual(
        'amplify-a-b-c'
      );
    });

    it('should handle spacing/deliminting characters in the path', () => {
      expect(cssNameTransform({ path: ['a-b', 'c'] })).toEqual('amplify-a-b-c');
      expect(cssNameTransform({ path: ['a_b', 'c'] })).toEqual('amplify-a-b-c');
      expect(cssNameTransform({ path: ['fontPrimary', 'c'] })).toEqual(
        'amplify-font-primary-c'
      );
    });

    it('should transform a single cssName to kebab case', () => {
      expect(cssNameTransform({ path: ['myVar'] })).toEqual('amplify-my-var');
    });

    it('should handle nested paths', () => {
      expect(
        cssNameTransform({ path: ['theme', 'colors', 'primary'] })
      ).toEqual('amplify-theme-colors-primary');
    });
  });
});

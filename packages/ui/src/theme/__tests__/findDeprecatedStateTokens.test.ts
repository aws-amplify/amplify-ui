import { findDeprecatedStateTokens } from '../utils';

describe('@aws-amplify/ui', () => {
  describe('findDeprecatedStateTokens', () => {
    let baseTheme;
    beforeEach(() => {
      baseTheme = {
        name: 'baseTheme',
        tokens: {
          components: {
            button: {
              hover: {
                color: { value: 'red', deprecatedStateToken: true },
                backgroundColor: { value: 'blue' },
              },
              focus: {
                fontSize: {
                  value: 'fontSizes.xxxl',
                  deprecatedStateToken: true,
                },
              },
            },
          },
        },
      };
    });

    it('should return a list of pathObjects', () => {
      const pathObjects = findDeprecatedStateTokens(baseTheme);
      const expectedPaths = [
        ['components', 'button', 'hover', 'color'],
        ['components', 'button', 'focus', 'fontSize'],
      ];
      expect(pathObjects.length).toEqual(2);
      expectedPaths.forEach((path) => {
        const containsExpected = pathObjects.some((pathObj) => {
          return (
            pathObj.path.length === path.length &&
            path.every((val, idx) => val === pathObj.path[idx])
          );
        });
        expect(containsExpected).toEqual(true);
      });
    });

    it('should return an empty list if no deprecatedStateTokens are found', () => {
      baseTheme.tokens.components.button.hover.color.deprecatedStateToken =
        false;
      baseTheme.tokens.components.button.focus.fontSize.deprecatedStateToken =
        false;
      const pathObjects = findDeprecatedStateTokens(baseTheme);
      expect(pathObjects.length).toEqual(0);
    });
  });
});

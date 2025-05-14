import { createAnimationCSS } from '../createAnimationCSS';
import { createTheme } from '../createTheme';
const { tokens } = createTheme();
describe('@aws-amplify/ui', () => {
  describe('createAnimationCSS', () => {
    it('should work with a theme as a function or an object', () => {
      const css = createAnimationCSS({
        animations: {
          dot: {
            '0%': {
              opacity: 1,
            },
            '100%': {
              opacity: 0,
            },
          },
          example: {
            from: (tokens) => {
              return {
                color: tokens.colors.primary[20],
              };
            },
            to: (tokens) => {
              return {
                color: tokens.colors.primary[40],
              };
            },
          },
          invalid: {
            // @ts-expect-error
            foo: {
              opacity: 1,
            },
            bar: {
              opacity: 0,
            },
          },
        },
        tokens,
      });
      expect(css).toMatchSnapshot();
    });
  });
});

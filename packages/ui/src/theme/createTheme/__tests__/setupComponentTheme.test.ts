import { setupComponentTheme } from '../setupComponentTheme';
import { createTheme } from '../createTheme';

const { tokens, breakpoints } = createTheme();

describe('@aws-amplify/ui', () => {
  describe('setupComponentTheme', () => {
    it('should pass through raw values', () => {
      const css = setupComponentTheme(
        `test`,
        [
          {
            name: 'badge',
            theme: (tokens) => {
              return {
                backgroundColor: 'pink',
                borderRadius: '{radii.small}',
                _modifier: {
                  small: {
                    borderRadius: '0',
                  },
                },
              };
            },
          },
        ],
        tokens,
        breakpoints
      );
      expect(css).toMatchSnapshot();
    });

    it('should button', () => {
      expect(
        setupComponentTheme(
          `test`,
          [
            {
              name: 'button',
              theme: {
                _modifier: {
                  primary: {
                    background: 'red',
                    ':hover': {
                      background: 'pink',
                      color: '{colors.font.primary}',
                    },
                  },
                },
              },
            },
          ],
          tokens,
          breakpoints
        )
      ).toMatchSnapshot();
    });

    it('can use custom primitives', () => {
      const css = setupComponentTheme(
        'test',
        [
          {
            name: 'chip',
            theme: {
              paddingInline: '{space.xs}',
              paddingBlock: '{space.xs}',
              borderRadius: '{radii.small}',
              _modifier: {
                primary: {
                  background: 'red',
                  ':hover': {
                    background: 'pink',
                    color: '{colors.font.primary}',
                  },
                },
              },
            },
          },
        ],
        tokens,
        breakpoints
      );
      expect(css).toMatchSnapshot();
    });
  });
});

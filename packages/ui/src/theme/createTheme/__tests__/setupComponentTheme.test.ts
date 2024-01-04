import { setupComponentTheme } from '../setupComponentTheme';
import { createTheme } from '../createTheme';

const { tokens } = createTheme();

describe('@aws-amplify/ui', () => {
  describe('setupComponentTheme', () => {
    it('should pass through raw values', () => {
      const css = setupComponentTheme(
        `[data-amplify-theme="test"]`,
        {
          badge: {
            backgroundColor: 'pink',
            borderRadius: '{radii.small}',
            modifier: {
              small: {
                borderRadius: '0',
              },
            },
          },
        },
        tokens
      );
      expect(css).toMatchSnapshot();
    });

    it('should button', () => {
      expect(
        setupComponentTheme(
          `[data-amplify-theme="test"]`,
          {
            button: {
              modifier: {
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
          tokens
        )
      ).toMatchSnapshot();
    });

    it('can use custom primitives', () => {
      const css = setupComponentTheme(
        `[data-amplify-theme="test"]`,
        {
          chip: {
            paddingInline: '{space.xs}',
            paddingBlock: '{space.xs}',
            borderRadius: '{radii.small}',
            modifier: {
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
        createTheme().tokens
      );
      expect(css).toMatchSnapshot();
    });
  });
});

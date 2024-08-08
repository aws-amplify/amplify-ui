import { createComponentCSS } from '../createComponentCSS';
import { createTheme } from '../createTheme';
import { defineComponentTheme } from '../defineComponentTheme';

const { tokens, breakpoints } = createTheme();
const { tokens: customTokens } = createTheme({
  name: 'test',
  tokens: {
    colors: {
      hotPink: {
        10: '#f90',
      },
    },
  },
});

// This component theme has all the: modifiers, elements, overrides, states to get a complete test
const avatarTheme = defineComponentTheme({
  name: 'avatar',
  theme(tokens) {
    return {
      _vars: {
        bgColor: tokens.colors.primary[20],
      },
      _element: {
        icon: {
          backgroundColor: 'white',
        },
      },
      _modifiers: {
        small: {
          padding: tokens.space.xxs,
        },
        large: {
          padding: tokens.space.small,
          ':hover': {},
        },
      },

      display: 'inline-flex',
      alignContent: 'center',
      boxSizing: 'content-box',
      borderRadius: '99rem',
      width: '1rem',
      height: '1rem',
      backgroundColor: tokens.colors.background.tertiary,
      color: tokens.colors.font.primary,
      padding: tokens.space.xs,

      ':hover': {
        _vars: {
          bgColor: tokens.colors.secondary[20],
        },
        _element: {
          icon: {
            backgroundColor: 'pink',
          },
        },
        backgroundColor: 'blue',
      },
    };
  },
  overrides: [
    {
      colorMode: 'dark',
      theme(tokens) {
        return {
          _vars: {
            bgColor: 'pink',
          },
          _element: {
            icon: {},
          },
          _modifiers: {
            small: {},
            large: {},
          },
        };
      },
    },
    {
      breakpoint: 'large',
      theme(tokens) {
        return {};
      },
    },
    {
      selector: '.disco',
      theme(tokens) {
        return {};
      },
    },
    {
      mediaQuery: 'max-width: 1250px',
      theme(tokens) {
        return {};
      },
    },
  ],
});

describe('@aws-amplify/ui', () => {
  describe('createComponentCSS', () => {
    it('should work with a theme as a function or an object', () => {
      const theme = {
        padding: '20px',
      };
      const css = createComponentCSS(
        `test`,
        [
          {
            name: 'testing',
            theme,
          },
        ],
        tokens,
        breakpoints
      );

      const functionCSS = createComponentCSS(
        `test`,
        [
          {
            name: 'testing',
            theme(tokens) {
              return theme;
            },
          },
        ],
        tokens,
        breakpoints
      );
      expect(css).toMatchSnapshot();
      expect(functionCSS).toMatchSnapshot();
    });

    it('should work with custom tokens', () => {
      const css = createComponentCSS(
        'test',
        [
          {
            name: 'avatar',
            theme(tokens) {
              return {
                backgroundColor: tokens.colors.hotPink[10],
              };
            },
          },
        ],
        customTokens,
        breakpoints
      );
      expect(css).toMatchSnapshot();
    });

    it('should pass through raw values', () => {
      const css = createComponentCSS(
        `test`,
        [
          {
            name: 'badge',
            theme: (tokens) => {
              return {
                backgroundColor: 'pink',
                borderRadius: '{radii.small}',
                _modifiers: {
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

    it('should work with built-in components', () => {
      expect(
        createComponentCSS(`test`, [avatarTheme], tokens, breakpoints)
      ).toMatchSnapshot();
    });

    it('can use custom primitives', () => {
      const css = createComponentCSS(
        'test',
        [
          {
            name: 'chip',
            theme: {
              paddingInline: '{space.xs}',
              paddingBlock: '{space.xs}',
              borderRadius: '{radii.small}',
              _vars: {
                color: 'red',
              },
              _element: {
                icon: {
                  fontSize: '{fontSizes.xl}',
                  color: 'var(--color)',
                  _modifiers: {},
                },
              },
              _modifiers: {
                primary: {
                  _vars: {
                    color: 'blue',
                  },
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

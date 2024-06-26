import { Tokens, WebTokens } from '../../tokens';
import { defineComponentTheme } from '../defineComponentTheme';

// type helper to get custom tokens type
type DesignTokens<T extends Tokens> = WebTokens & Required<T>;

// the problem here is setting the type of the object
// that is its type dummy
// we might need a defineTokens function
const tokens: Tokens = {
  colors: {
    foo: 'bar',
  },
};

function defineTokens<T extends Tokens = Tokens>(tokens: T): T {
  return tokens;
}

const myTokens = defineTokens({
  colors: {
    foo: 'bar',
  },
  fontSizes: {
    xl: '14',
    foo: '23',
  },
});

type Foo = typeof tokens;

type CustomDesignTokens = DesignTokens<typeof myTokens>;

describe('defineComponentTheme', () => {
  describe('built-in components', () => {
    it('should have properly typed overrides', () => {
      const alertTheme = defineComponentTheme({
        name: 'alert',
        theme(tokens) {
          return {
            _element: {
              heading: {
                fontSize: tokens.fontSizes.large,
              },
            },
          };
        },
        overrides: [
          {
            colorMode: 'dark',
            theme(tokens) {
              return {
                _modifiers: {
                  success: {
                    color: tokens.colors.green[100],
                  },
                },
              };
            },
          },
        ],
      });
    });

    it('should work with custom tokens type', () => {
      const alertTheme = defineComponentTheme({
        name: 'alert',
        theme: (tokens: CustomDesignTokens) => {
          return {
            fontSize: `${tokens.fontSizes.bar}`,
            _modifiers: {
              info: {
                backgroundColor: tokens.colors.primary[20],
              },
            },
          };
        },
      });

      alertTheme.className({ _modifiers: 'success' });
    });
  });

  describe('custom components', () => {
    it('should return properly typed className function', () => {
      const { className } = defineComponentTheme({
        name: 'avatar',
        theme(tokens) {
          return {
            _modifiers: {
              primary: {},
            },
            _element: {
              label: {
                _modifiers: {
                  any: {},
                },
              },
            },
          };
        },
      });
      expect(className()).toBe('amplify-avatar');
      expect(className({ _modifiers: 'primary' })).toBe(
        'amplify-avatar amplify-avatar--primary'
      );
      expect(className({ _element: 'label' })).toBe('amplify-avatar__label');
    });
  });

  it('should return a validly typed className function', () => {
    const { className } = defineComponentTheme({
      name: 'avatar',
      theme: (tokens) => {
        return {
          _modifiers: {
            large: {},
            small: {},
            primary: {},
          },
          _element: {
            icon: {
              _modifiers: {
                large: {},
              },
            },
          },
        };
      },
    });

    // these should all work and have type-safety
    const c1 = className({ _element: 'icon' });
    const c2 = className();
    const c3 = className({ _element: { icon: 'large' } });
    const c4 = className({ _modifiers: 'small' });

    // These should all have TypeScript errors

    // @ts-expect-error
    const c5 = className({ _element: 'foo' });

    // @ts-expect-error
    const c6 = className({ _element: { icon: 'foo' } });

    // @ts-expect-error
    const c7 = className({ _modifiers: 'foo' });

    // @ts-expect-error
    const c8 = className({ _element: { icon: 'foo' } });

    expect(c1).toEqual('amplify-avatar__icon');
    expect(c2).toEqual('amplify-avatar');
    expect(c3).toEqual('amplify-avatar__icon amplify-avatar__icon--large');
    expect(c4).toEqual('amplify-avatar amplify-avatar--small');
  });

  it('should return a theme function to pass to createTheme', () => {
    const { theme } = defineComponentTheme({
      name: 'avatar',
      theme(tokens) {
        return {};
      },
    });
    expect(typeof theme).toBe('function');
  });
});

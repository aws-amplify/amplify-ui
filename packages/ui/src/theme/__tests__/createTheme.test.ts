import { createTheme } from '../createTheme';

let consoleWarnSpy: jest.SpyInstance;
afterEach(() => {
  consoleWarnSpy?.mockRestore();
});

describe('@aws-amplify/ui', () => {
  describe('createTheme', () => {
    describe('without a base theme', () => {
      const { tokens } = createTheme({ name: 'test-theme' });

      // This will allow users to use the token in a style prop
      // without `.value` and for it to use the CSS variable
      // so it won't change even the value changes (with
      // references)
      it('should return tokens css variable declaration when used as a string', () => {
        expect(`${tokens.colors.background.error}`).toEqual(
          'var(--amplify-colors-background-error)'
        );
      });

      it('should return a css variable reference if present on token value', () => {
        expect(tokens.colors.background.error.value).toEqual(
          'var(--amplify-colors-red-20)'
        );
      });

      it('should return the variable name in var() when called with .toString()', () => {
        expect(tokens.colors.background.primary.toString()).toEqual(
          'var(--amplify-colors-background-primary)'
        );
      });
    });

    describe('with a theme and without a base theme', () => {
      const theme = createTheme({
        name: 'test-theme',
        tokens: {
          colors: {
            background: {
              primary: { value: '#bada55' },
            },
            font: {
              primary: { value: '{colors.white.value}' },
            },
          },
        },
      });

      it('should override the base theme', () => {
        const { tokens } = theme;
        expect(tokens.colors.background.primary.value).toEqual('#bada55');
      });

      it('should handle being extended again', () => {
        const newTheme = createTheme(
          {
            name: 'test-theme',
            tokens: {
              colors: {
                background: {
                  secondary: { value: '#ff9900' },
                },
              },
            },
          },
          theme
        );
        const { tokens } = newTheme;
        expect(tokens.colors.background.secondary.value).toEqual('#ff9900');
        expect(tokens.colors.background.primary.value).toEqual('#bada55');
      });
    });

    describe('error handling', () => {
      it('should warn the user and not do a max-call stack if given an invalid theme object', () => {
        consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
        const theme = createTheme({
          name: 'my-theme',
          tokens: {
            colors: {
              background: {
                //@ts-expect-error
                primary: '#f90',
              },
            },
          },
        });
        expect(theme.tokens.colors.background.primary).toEqual('#f90');
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn)
          .toHaveBeenCalledWith(`Non-design token found when creating the theme at path: colors.background.primary
Did you forget to add '{value:"#f90"}'?`);
      });
    });
  });
});

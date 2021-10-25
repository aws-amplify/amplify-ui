import { createTheme } from '../createTheme';

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
  });
});

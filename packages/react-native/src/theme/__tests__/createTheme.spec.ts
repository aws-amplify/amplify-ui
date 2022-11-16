import { defaultTheme } from '@aws-amplify/ui';
import { createTheme } from '../createTheme';

describe('createTheme', () => {
  describe('with mixture of value and no value', () => {
    const { tokens } = createTheme({
      tokens: {
        colors: {
          neutral: {
            100: { value: 'hotpink' },
          },
          font: {
            secondary: { value: '{colors.red.10}' },
            tertiary: { value: '{colors.red.10.value}' },
          },
          background: {
            primary: '{colors.black}',
            secondary: '{colors.white.value}',
          },
        },
        // Using the web default theme should just work
        space: defaultTheme.tokens.space,
      },
    });

    it('should resolve references from the default theme when the referenced has .value', () => {
      expect(tokens.colors.font.primary).toEqual('hotpink');
    });

    it('should resolve references from .value to the default theme without .value', () => {
      expect(tokens.colors.font.secondary).toEqual('hsl(0, 75%, 95%)');
    });

    it('should resolve references from .value to the default theme with .value', () => {
      expect(tokens.colors.font.secondary).toEqual('hsl(0, 75%, 95%)');
    });

    it('should resolve references from without .value to the default theme without .value', () => {
      expect(tokens.colors.background.primary).toEqual('hsl(0, 0%, 0%)');
    });

    it('should resolve references from without .value to the default theme with .value', () => {
      expect(tokens.colors.background.secondary).toEqual('hsl(0, 0%, 100%)');
    });
  });

  describe('without a base theme', () => {
    const { tokens, components } = createTheme({
      components: { bottomSheet: { container: { backgroundColor: 'red' } } },
    });

    it('should have tokens', () => {
      expect(tokens).toBeDefined();

      expect(components).toBeDefined();
      expect(components?.bottomSheet.container.backgroundColor).toBe('red');
    });
  });
  //TODO add more tests once component tokens are added

  describe('component references', () => {
    it('should have tokens', () => {
      const { components } = createTheme({
        components: {
          bottomSheet: { container: { backgroundColor: '{colors.red.10}' } },
        },
      });
      expect(components?.bottomSheet.container.backgroundColor).toBe(
        'hsl(0, 75%, 95%)'
      );
    });

    it('should work for overridden tokens', () => {
      const { components } = createTheme({
        tokens: {
          colors: {
            background: {
              primary: '{colors.white}',
            },
          },
        },
        components: {
          bottomSheet: {
            container: {
              backgroundColor: '{colors.background.primary}',
              padding: '{space.xl}',
              opacity: '{opacities.10}',
            },
          },
        },
      });
      expect(components?.bottomSheet.container.backgroundColor).toBe(
        'hsl(0, 0%, 100%)'
      );
      expect(components?.bottomSheet.container.padding).toBe(32);
      expect(components?.bottomSheet.container.opacity).toBe(0.1);
    });

    it('should work for token overrides', () => {
      const { components } = createTheme(
        {
          tokens: {
            colors: {
              background: {
                primary: '{colors.white}',
              },
            },
          },
          overrides: [
            {
              colorMode: 'dark',
              tokens: {
                colors: {
                  background: {
                    primary: '{colors.black}',
                  },
                },
              },
            },
          ],
          components: {
            bottomSheet: {
              container: { backgroundColor: '{colors.background.primary}' },
            },
          },
        },
        'dark'
      );
      expect(components?.bottomSheet.container.backgroundColor).toBe(
        'hsl(0, 0%, 0%)'
      );
    });
  });

  describe('dark mode override', () => {
    const { tokens } = createTheme(
      {
        overrides: [
          {
            colorMode: 'dark',
            tokens: {
              colors: {
                neutral: {
                  100: 'white',
                },
              },
            },
          },
        ],
      },
      'dark'
    );

    it('should properly resolve references', () => {
      expect(tokens.colors.font.primary).toEqual('white');
    });
  });
});

import { defaultTheme } from '@aws-amplify/ui';
import { createTheme } from '../createTheme';

describe('createTheme', () => {
  describe('with mixture of value and no value', () => {
    const { tokens } = createTheme({
      name: 'test-tokens',
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
      name: 'test-theme',
      components: { bottomSheet: { container: { backgroundColor: 'red' } } },
    });

    it('should have tokens', () => {
      expect(tokens).toBeDefined();

      expect(components).toBeDefined();
      expect(components?.bottomSheet.container.backgroundColor).toBe('red');
    });
  });
  //TODO add more tests once component tokens are added

  describe('dark mode override', () => {
    const { tokens } = createTheme({
      name: 'test',
      colorMode: 'dark',
      overrides: [
        {
          colorMode: 'dark',
          name: 'foo',
          tokens: {
            colors: {
              neutral: {
                100: 'white',
              },
            },
          },
        },
      ],
    });

    it('should properly resolve references', () => {
      expect(tokens.colors.font.primary).toEqual('white');
    });
  });
});

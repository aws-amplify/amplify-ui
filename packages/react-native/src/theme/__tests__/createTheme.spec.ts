import { defaultTheme } from '@aws-amplify/ui';
import { createTheme } from '../createTheme';
import { StrictTokens } from '../types';

describe('createTheme', () => {
  describe('without a base theme', () => {
    const { tokens, components } = createTheme({
      components: { button: { container: { backgroundColor: 'red' } } },
    });

    it('should have component agnostic tokens', () => {
      expect(tokens).toBeDefined();
      expect(components).toBeDefined();
      expect(components?.button?.container?.backgroundColor).toBe('red');
    });

    it('should return proper React Native token types', () => {
      const { tokens } = createTheme({});
      expect(typeof tokens.opacities[10]).toBe('number');
      expect(typeof tokens.fontWeights.bold).toBe('string');
    });
  });

  describe('number conversions', () => {
    it('should convert strings to numbers where applicable', () => {
      const { tokens } = createTheme({
        tokens: {
          borderWidths: {
            small: '4',
            medium: '1rem',
            large: 6,
          },
          opacities: {
            '10': '0.2',
          },
          space: {
            small: 4,
            medium: '6',
            large: '{space.small.value}',
          },
          fontSizes: {
            small: '1rem',
          },
        },
      });
      expect(tokens.borderWidths.small).toBe(4);
      expect(tokens.borderWidths.medium).toBe(16);
      expect(tokens.borderWidths.large).toBe(6);
      expect(tokens.opacities['10']).toBe(0.2);
      expect(tokens.space.small).toBe(4);
      expect(tokens.space.medium).toBe(6);
      expect(tokens.space.large).toBe(4);
      expect(tokens.fontSizes.small).toBe(16);
    });

    it('should use the spaceModifier for space tokens with rem', () => {
      const { tokens } = createTheme({
        spaceModifier: 1.25,
        tokens: {
          space: {
            small: 4,
            medium: '1rem',
          },
        },
      });

      expect(tokens.space.small).toEqual(4);
      expect(tokens.space.medium).toEqual(20);
    });
  });

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

  describe('with components', () => {
    it('should resolve references in a functional component theme', () => {
      const { components } = createTheme({
        components: {
          button(tokens: StrictTokens) {
            return {
              container: {
                backgroundColor: tokens.colors.background.primary,
              },
            };
          },
        },
      });
      expect(components?.button?.container?.backgroundColor).toBe(
        'hsl(0, 0%, 100%)'
      );
    });

    it('should resolve references in an object-based theme', () => {
      const { components } = createTheme({
        tokens: {
          colors: {
            background: {
              primary: '{colors.white}',
            },
          },
        },
        components: {
          button: {
            container: {
              backgroundColor: '{colors.background.primary}',
              padding: '{space.xl}',
            },
          },
        },
      });
      expect(components?.button?.container?.backgroundColor).toBe(
        'hsl(0, 0%, 100%)'
      );
      expect(components?.button?.container?.padding).toBe(32);
    });

    it('should respect colorMode', () => {
      const { components } = createTheme(
        {
          components: {
            button(tokens: StrictTokens) {
              return {
                container: {
                  // default value is a reference to colors.white
                  backgroundColor: tokens.colors.background.primary,
                },
              };
            },
          },
          overrides: [
            {
              colorMode: 'dark',
              tokens: {
                colors: {
                  white: 'black',
                },
              },
            },
          ],
        },
        'dark'
      );
      expect(components?.button?.container?.backgroundColor).toBe('black');
    });

    it('should properly resolve with overrides', () => {
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
            button: {
              container: { backgroundColor: '{colors.background.primary}' },
            },
          },
        },
        'dark'
      );
      expect(components?.button?.container?.backgroundColor).toBe(
        'hsl(0, 0%, 0%)'
      );
    });
  });

  describe('with dark mode override', () => {
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

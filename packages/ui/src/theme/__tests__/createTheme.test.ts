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

    describe('with a custom theme using token objects and without a base theme', () => {
      const shadows = {
        small: { value: '12px' },
        large: {
          value: {
            offsetX: 'offsetX',
            offsetY: 'offsetY',
            blurRadius: 'blurRadius',
            spreadRadius: 'spreadRadius',
            color: 'color',
          },
        },
      };
      const theme = createTheme({
        name: 'test-theme',
        tokens: {
          colors: {
            background: { primary: { value: '#bada55' } },
            font: { primary: { value: '{colors.white.value}' } },
          },
          components: { card: { padding: { value: '16px' } } },
          shadows,
        },
      });

      it('should override the base theme', () => {
        const { tokens } = theme;
        expect(tokens.colors.background.primary.value).toEqual('#bada55');

        expect(tokens.shadows.large.value).toEqual(
          'offsetX offsetY blurRadius spreadRadius color'
        );
        expect(tokens.components.card.padding.value).toEqual('16px');
        expect(tokens.shadows.small.value).toEqual(shadows.small.value);
      });

      it('should handle being extended again', () => {
        const newTheme = createTheme(
          {
            name: 'test-theme',
            tokens: {
              colors: { background: { secondary: { value: '#ff9900' } } },
            },
          },
          theme
        );
        const { tokens } = newTheme;
        expect(tokens.colors.background.secondary.value).toEqual('#ff9900');
        expect(tokens.colors.background.primary.value).toEqual('#bada55');
      });
    });

    describe('with a custom theme not using token objects and without a base theme', () => {
      const shadows = {
        small: '12px',
        large: {
          offsetX: 'offsetX',
          offsetY: 'offsetY',
          blurRadius: 'blurRadius',
          spreadRadius: 'spreadRadius',
          color: 'color',
        },
      };
      const theme = createTheme({
        name: 'test-theme',
        tokens: {
          borderWidths: { small: '2px' },
          colors: {
            background: { primary: '#bada55' },
            font: { primary: '{colors.white.value}' },
          },
          components: { alert: { alignItems: 'right' } },
          fonts: { default: { variable: 'Comic Sans' } },
          fontSizes: { xxxxl: '256rem' },
          fontWeights: { bold: 'REAL_BOLD', hairline: 0.001 },
          lineHeights: { small: '1px', medium: 2 },
          opacities: { 10: '2' },
          outlineOffsets: { large: '24px' },
          outlineWidths: { small: '.25px' },
          radii: { medium: 'medium' },
          shadows,
          space: { small: '2px', relative: { small: '1px' } },
          time: { short: '10ms' },
          transforms: { slideX: { small: { value: 'translateX(300%)' } } },
        },
      });

      it('should override the base theme', () => {
        const { tokens } = theme;

        expect(tokens.components.alert.alignItems.value).toEqual('right');
        expect(tokens.borderWidths.small.value).toEqual('2px');
        expect(tokens.colors.background.primary.value).toEqual('#bada55');
        expect(tokens.fonts.default.variable.value).toEqual('Comic Sans');
        expect(tokens.fontSizes.xxxxl.value).toEqual('256rem');
        expect(tokens.fontWeights.bold.value).toEqual('REAL_BOLD');
        expect(tokens.lineHeights.small.value).toEqual('1px');
        expect(tokens.lineHeights.medium.value).toEqual(2);
        expect(tokens.opacities[10].value).toEqual('2');
        expect(tokens.outlineOffsets.large.value).toEqual('24px');
        expect(tokens.outlineWidths.small.value).toEqual('.25px');
        expect(tokens.radii.medium.value).toEqual('medium');
        expect(tokens.shadows.large.value).toEqual(
          'offsetX offsetY blurRadius spreadRadius color'
        );
        expect(tokens.shadows.small.value).toEqual(shadows.small);
        expect(tokens.space.small.value).toEqual('2px');
        expect(tokens.space.relative.small.value).toEqual('1px');
        expect(tokens.time.short.value).toEqual('10ms');
        expect(tokens.transforms.slideX.small.value).toEqual(
          'translateX(300%)'
        );
      });

      it('should handle being extended again', () => {
        const newTheme = createTheme(
          {
            name: 'test-theme',
            tokens: { colors: { background: { secondary: '#ff9900' } } },
          },
          theme
        );
        const { tokens } = newTheme;
        expect(tokens.colors.background.secondary.value).toEqual('#ff9900');
        expect(tokens.colors.background.primary.value).toEqual('#bada55');
      });

      it('merges in custom color tokens', () => {
        const newTheme = createTheme(
          {
            name: 'test-theme',
            tokens: {
              colors: { fuschia: { 10: 'fuschia', 20: { value: 'fuschia' } } },
            },
          },
          theme
        );
        const { tokens } = newTheme;
        expect(tokens.colors.fuschia[10].value).toEqual('fuschia');
        expect(tokens.colors.fuschia[20].value).toEqual('fuschia');
      });

      it('correctly handles a custom theme key with an undefined value', () => {
        const newTheme = createTheme(
          {
            name: 'test-theme',
            tokens: { colors: { background: { secondary: undefined } } },
          },
          theme
        );
        const { tokens } = newTheme;
        expect(tokens.colors.background.secondary.value).toEqual(
          'var(--amplify-colors-neutral-10)'
        );
        expect(`${tokens.colors.background.primary}`).toEqual(
          'var(--amplify-colors-background-primary)'
        );
        expect(tokens.colors.background.primary.value).toEqual('#bada55');
      });
    });

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
        },
      });

      it('should work with .value', () => {
        expect(tokens.colors.neutral[100].value).toEqual('hotpink');
        expect(`${tokens.colors.neutral[100]}`).toEqual(
          'var(--amplify-colors-neutral-100)'
        );
      });

      it('should work without .value', () => {
        expect(tokens.colors.background.primary.value).toEqual(
          'var(--amplify-colors-black)'
        );
      });

      it('should work with .value on reference without .value', () => {
        expect(tokens.colors.font.secondary.value).toEqual(
          'var(--amplify-colors-red-10)'
        );
      });

      it('should work with .value on reference with .value', () => {
        expect(tokens.colors.font.tertiary.value).toEqual(
          'var(--amplify-colors-red-10)'
        );
      });

      it('should work without .value on references with .value', () => {
        expect(tokens.colors.background.secondary.value).toEqual(
          'var(--amplify-colors-white)'
        );
      });
    });
  });
});

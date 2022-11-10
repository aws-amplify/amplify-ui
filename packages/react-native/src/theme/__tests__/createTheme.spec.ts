import baseTokens from '@aws-amplify/ui/dist/react-native/tokens';

import { createTheme } from '../createTheme';
import { iconSizes } from '../types';

describe('createTheme', () => {
  describe('without a custom theme', () => {
    const { tokens } = createTheme({ name: 'test-theme' });

    it('should have component agnostic tokens', () => {
      expect(tokens).toBeDefined();

      expect(tokens.colors).toStrictEqual(baseTokens.colors);
      expect(tokens.fontSizes).toStrictEqual(baseTokens.fontSizes);
      expect(tokens.fontWeights).toStrictEqual(baseTokens.fontWeights);
      expect(tokens.opacities).toStrictEqual(baseTokens.opacities);
      expect(tokens.radii).toStrictEqual(baseTokens.radii);
      expect(tokens.space).toStrictEqual(baseTokens.space);
      expect(tokens.time).toStrictEqual(baseTokens.time);
      expect(tokens.iconSizes).toStrictEqual(iconSizes);
    });

    it('should not have component tokens', () => {
      expect(tokens.components).toBeUndefined();
    });
  });

  describe('with a custom theme', () => {
    const theme = createTheme({
      name: 'test-theme',
      tokens: {
        colors: {
          font: {
            primary: '{colors.white}',
            secondary: 'purple',
          },
        },
        iconSizes: {
          medium: 26,
        },
        components: {
          label: {
            text: { color: 'blue' },
          },
        },
      },
    });

    it('should override the base theme', () => {
      const { tokens } = theme;
      expect(tokens.colors.font.primary).toEqual('hsl(0, 0%, 100%)');
      expect(tokens.colors.font.secondary).toEqual('purple');
      expect(tokens.iconSizes.medium).toEqual(26);
      expect(tokens.components?.label.text.color).toEqual('blue');
    });
  });
  //TODO add more tests once component tokens are added
});

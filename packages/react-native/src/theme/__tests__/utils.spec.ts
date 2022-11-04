import baseTokens from '@aws-amplify/ui/dist/react-native/tokens';

import { Tokens, tokens } from '../types';
import { setupTokens } from '../utils';

// setupTokens will receive a fully defined theme so all props are required
const customTokens: Tokens = {
  ...baseTokens,
  colors: {
    ...baseTokens.colors,
    brand: {
      primary: {
        ...baseTokens.colors.brand.primary,
        10: '#bada55',
      },
      secondary: {
        ...baseTokens.colors.brand.secondary,
        10: '{colors.brand.primary[10]}',
      },
    },
  },
  components: { ...tokens.components },
};

describe('utils', () => {
  describe('setupTokens', () => {
    it('should replace token references with values', () => {
      const finalTokens = setupTokens(customTokens);
      expect(finalTokens.colors.brand.secondary[10]).toEqual('#bada55');
      expect(finalTokens.components.label.color).toEqual(
        tokens.colors.font.primary
      );
    });
  });
});

import defaultTokens from '@aws-amplify/ui/dist/react-native/tokens';
import { StrictTokens } from '../types';
import { setupTokens } from '../utils';

// setupTokens will receive a fully defined theme so all props are required
const tokens: StrictTokens = {
  ...defaultTokens,
  colors: {
    ...defaultTokens.colors,
    brand: {
      primary: {
        ...defaultTokens.colors.brand.primary,
        10: '#bada55',
      },
      secondary: {
        ...defaultTokens.colors.brand.secondary,
        10: '{colors.brand.primary[10]}',
      },
    },
  },
} as StrictTokens; // cast because "strict" tokens require values that are not available in "default" tokens

describe('utils', () => {
  describe('setupTokens', () => {
    it('should replace token references with values', () => {
      const finalTokens = setupTokens(tokens);
      expect(finalTokens.colors.brand.secondary[10]).toEqual('#bada55');
    });
  });
});

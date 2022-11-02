import baseTokens from '@aws-amplify/ui/dist/react-native/tokens';

import { Tokens } from '../types';
import { setupTokens } from '../utils';

// setupTokens will receive a fully defined theme so all props are required
const tokens: Tokens = {
  ...baseTokens,
  colors: {
    ...baseTokens.colors,
    brand: {
      primary: {
        10: '#bada55',
      },
      secondary: {
        10: '{colors.brand.primary[10]}',
      },
    },
  },
  components: {},
};

describe('utils', () => {
  describe('setupTokens', () => {
    it('should replace token references with values', () => {
      const finalTokens = setupTokens(tokens);
      expect(finalTokens.colors.brand.secondary[10]).toEqual('#bada55');
    });
  });
});

import { Tokens } from '../types';
import { setupTokens } from '../utils';

// TODO: refactor when adding component agnostic tokens
// setupTokens will receive a fully defined theme so all props are required
const tokens: Tokens = {
  colors: {
    brand: {
      primary: {
        10: '#bada55',
        20: '#bada55',
        40: '#bada55',
        60: '#bada55',
        80: '#bada55',
        90: '#bada55',
        100: '#bada55',
      },
      secondary: {
        10: '{colors.brand.primary[10]}',
        20: '{colors.brand.primary[20]}',
        40: '{colors.brand.primary[40]}',
        60: '{colors.brand.primary[60]}',
        80: '{colors.brand.primary[80]}',
        90: '{colors.brand.primary[90]}',
        100: '{colors.brand.primary[100]}',
      },
    },
  },
  components: {},
};

describe('utils', () => {
  describe('setupTokens', () => {
    it('should replace token references with values', () => {
      const finalTokens = setupTokens(tokens);
      // optional chaining will be removed here once we have our comp. agnostic tokens
      expect(finalTokens.colors.brand?.secondary[10]).toEqual('#bada55');
    });
  });
});

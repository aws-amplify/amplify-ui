import baseTokens from '@aws-amplify/ui/dist/react-native/tokens';

import { setupTokens } from '../utils';

const customTokens = {
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
};

describe('utils', () => {
  describe('setupTokens', () => {
    const finalTokens = setupTokens(customTokens);

    it('should replace token references with values', () => {
      expect(finalTokens.colors.brand.secondary[10]).toEqual('#bada55');
    });
  });
});

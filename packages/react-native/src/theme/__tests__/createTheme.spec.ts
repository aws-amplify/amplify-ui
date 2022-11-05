import baseTokens from '@aws-amplify/ui/dist/react-native/tokens';
import { createTheme } from '../createTheme';

describe('createTheme', () => {
  describe('without a base theme', () => {
    const { tokens, components } = createTheme({
      name: 'test-theme',
      components: { bottomSheet: { container: { backgroundColor: 'red' } } },
    });

    it('should have tokens', () => {
      expect(tokens).toBeDefined();

      expect(components).toBeDefined();
      expect(components?.bottomSheet.container.backgroundColor).toBe('red');

      expect(tokens.colors).toStrictEqual(baseTokens.colors);
      expect(tokens.fontSizes).toStrictEqual(baseTokens.fontSizes);
      expect(tokens.fontWeights).toStrictEqual(baseTokens.fontWeights);
      expect(tokens.opacities).toStrictEqual(baseTokens.opacities);
      expect(tokens.radii).toStrictEqual(baseTokens.radii);
      expect(tokens.space).toStrictEqual(baseTokens.space);
      expect(tokens.time).toStrictEqual(baseTokens.time);
    });
  });
  //TODO add more tests once component tokens are added
});

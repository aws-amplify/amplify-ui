import { createReactNativeTheme } from '../createReactNativeTheme';

describe('createReactNativeTheme', () => {
  describe('without a base theme', () => {
    const { tokens } = createReactNativeTheme({ name: 'test-theme' });

    it('should have tokens', () => {
      expect(tokens).toBeDefined();
    });
  });
  //TODO add more tests once component tokens are added
});

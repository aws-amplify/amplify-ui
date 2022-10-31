import { createTheme } from '../createTheme';

describe('createTheme', () => {
  describe('without a base theme', () => {
    const { tokens } = createTheme({ name: 'test-theme' });

    it('should have tokens', () => {
      expect(tokens).toBeDefined();
      expect(tokens.colors).toBeDefined();
      expect(tokens.components).toBeDefined();
    });
  });
  //TODO add more tests once component tokens are added
});

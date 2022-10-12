import { createReactNativeTheme } from '../createReactNativeTheme';

describe('createReactNativeTheme', () => {
  describe('without a base theme', () => {
    const { tokens } = createReactNativeTheme({ name: 'test-theme' });

    it('should have tokens', () => {
      expect(tokens).toBeDefined();
    });
  });
  describe('with a custom theme', () => {
    const theme = createReactNativeTheme({
      name: 'test-theme',
      tokens: {
        components: {
          button: {
            text: {
              color: 'red',
            },
          },
        },
      },
    });

    it('should override the base theme', () => {
      const { tokens } = theme;
      expect(tokens.components.button.text.color).toEqual('red');
    });
  });
});

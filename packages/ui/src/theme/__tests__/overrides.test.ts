import { createTheme } from '../createTheme';

const darkTokens = {
  colors: {
    background: {
      primary: { value: '#000' },
    },
  },
};

const mobileTokens = {
  space: {
    medium: { value: '0.5rem' },
  },
};

const desktopTokens = {
  space: {
    medium: { value: '2.5rem' },
  },
};

const discoTokens = {
  colors: {
    background: {
      primary: { value: 'pink' },
    },
  },
};

describe('@aws-amplify/ui', () => {
  describe('overrides', () => {
    const themeWithOverrides = createTheme({
      name: 'test-theme',
      tokens: {},
      overrides: [
        {
          mediaQuery: 'prefers-color-scheme: dark',
          tokens: darkTokens,
        },
        {
          breakpoint: 'small',
          tokens: mobileTokens,
        },
        {
          breakpoint: 'large',
          tokens: desktopTokens,
        },
        {
          selector: '.disco-theme',
          tokens: discoTokens,
        },
      ],
    });
    it('should match snapshot', () => {
      expect(themeWithOverrides.cssText).toMatchSnapshot();
    });
  });
});

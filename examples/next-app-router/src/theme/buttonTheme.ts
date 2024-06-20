import { createComponentTheme } from '@aws-amplify/ui-react/server';

export const buttonTheme = createComponentTheme({
  name: 'button',
  theme: (tokens) => {
    return {
      display: 'block',
      padding: tokens.space.large,
      _modifiers: {
        primary: {
          backgroundImage: `linear-gradient(${tokens.colors.primary[80]} 0%, ${tokens.colors.primary[60]} 100%)`,
          modifier: {
            error: {
              backgroundColor: 'blue',
            },
          },
        },
        'link--error': {
          backgroundColor: 'pink',
        },
      },
    };
  },
  overrides: [
    {
      colorMode: 'dark',
      theme: (tokens) => {
        return {
          backgroundColor: 'hotpink',
        };
      },
    },
    {
      breakpoint: 'large',
      theme: (tokens) => {
        return {
          backgroundColor: 'green',
        };
      },
    },
    {
      selector: '.disco',
      theme: (tokens) => {
        return {
          backgroundColor: 'blue',
        };
      },
    },
  ],
});

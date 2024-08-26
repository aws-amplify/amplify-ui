import { defineComponentTheme } from '@aws-amplify/ui-react/server';

export const buttonTheme = defineComponentTheme({
  name: 'button',
  theme: (tokens) => {
    const gradStart = 'gradStart';
    const gradStop = 'gradStop';
    return {
      _vars: {
        [gradStart]: tokens.colors.primary[80],
        [gradStop]: tokens.colors.primary[60],
      },
      boxShadow: `${tokens.shadows.small}`,
      borderColor: tokens.colors.border.tertiary,
      _modifiers: {
        primary: {
          backgroundImage: `linear-gradient(var(--${gradStart}) 0%, var(--${gradStop}) 100%)`,
        },
        'primary--error': {
          _vars: {
            [gradStart]: tokens.colors.red[80],
            [gradStop]: tokens.colors.red[60],
          },
        },
        'primary--warning': {
          _vars: {
            [gradStart]: tokens.colors.orange[80],
            [gradStop]: tokens.colors.orange[60],
          },
        },
        'primary--info': {
          _vars: {
            [gradStart]: tokens.colors.blue[80],
            [gradStop]: tokens.colors.blue[60],
          },
        },
        'primary--success': {
          _vars: {
            [gradStart]: tokens.colors.green[80],
            [gradStop]: tokens.colors.green[60],
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
      breakpoint: 'large',
      theme: (tokens) => {
        return {
          borderRadius: tokens.radii.xl,
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

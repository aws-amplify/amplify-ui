import { bench } from '@arktype/attest';
import { defineComponentTheme } from '../../src';

bench('defineComponentTheme: empty', () => {
  const myComponentTheme = defineComponentTheme({
    name: 'my-component',
    theme: {},
  });
}).types([12000, 'instantiations']);

bench(
  'defineComponentTheme: custom component with modifiers and elements and variables',
  () => {
    const customTheme = defineComponentTheme({
      name: 'custom',
      theme(tokens) {
        const iconVar = 'iconColor';
        const borderVar = 'borderColor';
        return {
          _vars: {
            [iconVar]: tokens.colors.red[60],
            [borderVar]: tokens.colors.border.secondary,
          },
          border: `${tokens.borderWidths.large} solid var(--${borderVar})`,
          _modifiers: {
            info: {
              _vars: {
                [iconVar]: tokens.colors.blue[60],
                [borderVar]: tokens.colors.blue[20],
              },
            },
            success: {
              _vars: {
                [iconVar]: tokens.colors.green[60],
                [borderVar]: tokens.colors.green[20],
              },
            },
            error: {
              _vars: {
                [iconVar]: tokens.colors.red[60],
                [borderVar]: tokens.colors.red[20],
              },
            },
            warning: {
              _vars: {
                [iconVar]: tokens.colors.orange[80],
                [borderVar]: tokens.colors.orange[20],
              },
            },
          },
          _element: {
            icon: {
              color: `var(--${iconVar})`,
              _modifiers: {
                info: {
                  color: `var(--${iconVar})`,
                },
                success: {
                  color: `var(--${iconVar})`,
                },
                error: {
                  color: `var(--${iconVar})`,
                },
                warning: {
                  color: `var(--${iconVar})`,
                },
              },
            },
          },
        };
      },
    });

    const errorClassname = customTheme.className({ _modifiers: 'error' });
    const infoClassname = customTheme.className({ _modifiers: 'info' });
    const iconWarningClassname = customTheme.className({
      _element: { icon: ['warning'] },
    });
  }
).types([15000, 'instantiations']);

bench('defineComponentTheme with crazy custom theme 2', () => {
  const colors = [
    'red',
    'green',
    'blue',
    'purple',
    'teal',
    'orange',
    'yellow',
    'pink',
  ];
  const shades = ['10', '20', '40', '60', '80', '90'];
  const crazyTheme = defineComponentTheme({
    name: 'crazy',
    theme: (tokens) => {
      return {
        color: tokens.colors.neutral[10],
        _modifiers: colors.reduce((acc, color) => {
          shades.forEach((shade) => {
            acc[`${color}--${shade}`] = { color: tokens.colors[color][shade] };
          });
          return acc;
        }, {}),
      };
    },
  });
}).types([15000, 'instantiations']);

bench('defineTheme with complex built-in component theme', () => {
  const buttonTheme = defineComponentTheme({
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
        colorMode: 'dark',
        theme: (tokens) => {
          return {
            // backgroundColor: 'hotpink',
          };
        },
      },
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
}).types([15000, 'instantiations']);

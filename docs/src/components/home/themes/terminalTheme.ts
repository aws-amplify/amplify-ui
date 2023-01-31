import { defaultDarkModeOverride } from '@aws-amplify/ui-react';

const terminalTheme = {
  name: 'terminal',
  tokens: {
    colors: {
      green: {
        10: { value: '#C7EFCA' },
        20: { value: '#9AE2A1' },
        40: { value: '#4CCB68' },
        60: { value: '#44AF5B' },
        80: { value: '#31703D' },
        90: { value: '#224226' },
        100: { value: '#013D09' },
      },
      brand: {
        primary: {
          10: { value: '{colors.green.10}' },
          20: { value: '{colors.green.20}' },
          40: { value: '{colors.green.40}' },
          60: { value: '{colors.green.60}' },
          80: { value: '{colors.green.80}' },
          90: { value: '{colors.green.90}' },
          100: { value: '{colors.green.100}' },
        },
        secondary: {
          10: { value: '{colors.green.10}' },
          20: { value: '{colors.green.20}' },
          40: { value: '{colors.green.40}' },
          60: { value: '{colors.green.60}' },
          80: { value: '{colors.green.80}' },
          90: { value: '{colors.green.90}' },
          100: { value: '{colors.green.100}' },
        },
      },
      border: {
        primary: { value: 'black' },
      },
    },
    shadows: {
      small: {
        value: {
          offsetX: '0px',
          offsetY: '2px',
          blurRadius: '4px',
          color: '{colors.shadow.tertiary.value}',
        },
      },
      medium: {
        value: {
          offsetX: '10px',
          offsetY: '10px',
          spreadRadius: '0px',
          blurRadius: '0',
          color: '{colors.shadow.secondary.value}',
        },
      },
      large: {
        value: {
          offsetX: '8px',
          offsetY: '30px',
          spreadRadius: '10px',
          blurRadius: '0',
          color: '{colors.shadow.primary.value}',
        },
      },
    },
    components: {
      card: {
        boxShadow: { value: '{shadows.medium.value}' },
      },
      radio: {
        button: {
          padding: { value: '{borderWidths.small}' },
          borderWidth: { value: '{borderWidths.small}' },
        },
      },
      heading: {
        1: { fontWeight: { value: '{fontWeights.extrabold.value}' } },
        2: { fontWeight: { value: '{fontWeights.extrabold.value}' } },
        3: { fontWeight: { value: '{fontWeights.extrabold.value}' } },
        4: { fontWeight: { value: '{fontWeights.extrabold.value}' } },
        5: { fontWeight: { value: '{fontWeights.extrabold.value}' } },
        6: { fontWeight: { value: '{fontWeights.extrabold.value}' } },
      },
      button: {
        primary: {
          backgroundColor: { value: '{colors.brand.primary.40.value}' },
          color: { value: '{colors.font.primary.value}' },
          borderColor: { value: '{colors.border.primary.value}' },
        },
      },
    },
    radii: {
      small: { value: '0' },
      medium: { value: '0' },
      large: { value: '0' },
    },
    space: {
      small: { value: '1rem' },
      medium: { value: '1.5rem' },
      large: { value: '2rem' },
    },
    borderWidths: {
      small: { value: '2px' },
      medium: { value: '4px' },
      large: { value: '8px' },
    },
  },
  overrides: [defaultDarkModeOverride],
};

export default terminalTheme;

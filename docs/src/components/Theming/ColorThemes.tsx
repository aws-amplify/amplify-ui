import { Grid, View, Flex, Text, Heading } from '@aws-amplify/ui-react';

const interactive = {
  plain: {
    ['role']: {
      color: 'color.80',
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      hover: {
        color: 'color.90',
        backgroundColor: 'color.10',
        borderColor: 'transparent',
      },
      focus: {
        color: 'color.100',
        backroundColor: 'color.10',
        borderColor: 'transparent',
        shadow: 'color.100',
      },
      active: {
        color: 'color.100',
        backgroundColor: 'color.20',
        borderColor: 'transparent',
      },
    },
  },
  filled: {
    ['role']: {
      color: 'font.primary',
      backgroundColor: 'color.80',
      borderColor: 'transparent',
      hover: {
        color: 'font.primary',
        backgroundColor: 'color.90',
        borderColor: 'transparent',
      },
      focus: {
        color: 'font.primary',
        backroundColor: 'color.90',
        borderColor: 'transparent',
        shadow: 'color.100',
      },
      active: {
        color: 'font.primary',
        backgroundColor: 'color.100',
        borderColor: 'transparent',
      },
    },
  },
  outline: {
    ['role']: {
      color: 'color.100',
      backgroundColor: 'transparent',
      borderColor: 'color.60',
      hover: {
        color: 'color.100',
        backgroundColor: 'color.10',
        borderColor: 'color.60',
      },
      focus: {
        color: 'color.100',
        backroundColor: 'color.100',
        borderColor: 'transparent',
        shadow: 'color.100',
      },
      active: {
        color: 'color.100',
        backgroundColor: 'color.20',
        borderColor: 'color.100',
      },
    },
  },
};

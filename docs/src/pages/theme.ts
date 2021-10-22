import { createTheme } from '@aws-amplify/ui-react';

export const theme = createTheme({
  name: 'amplify-docs',
  tokens: {
    colors: {
      border: {
        primary: { value: '{colors.neutral.100.value}' },
      },
    },
    components: {
      heading: {
        1: {
          fontWeight: { value: 900 },
          fontSize: { value: '3rem' },
        },
      },
      button: {
        borderColor: { value: '{colors.border.primary.value}' },
        color: { value: '{colors.font.primary.value}' },
        primary: {
          borderWidth: { value: '{borderWidths.small.value}' },
          borderColor: { value: 'transparent' },
        },
      },
      togglebutton: {
        borderColor: { value: '{colors.border.primary.value}' },
      },
      fieldcontrol: {
        // paddingBlockStart: { value: '{space.xs.value}' },
        // paddingBlockEnd: { value: '{space.xs.value}' },
        // paddingInlineStart: { value: '{space.xs.value}' },
        // paddingInlineEnd: { value: '{space.xs.value}' },
        lineHeight: { value: 1 },
      },
    },
  },
});

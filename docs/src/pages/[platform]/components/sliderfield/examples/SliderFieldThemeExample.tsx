import { SliderField, ThemeProvider, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'slider-theme',
  tokens: {
    components: {
      sliderfield: {
        thumb: {
          width: { value: '{space.xl}' },
          height: { value: '{space.xl}' },
          backgroundColor: { value: '{colors.neutral.90}' },
          borderRadius: { value: '{radii.medium}' },
          _hover: {
            backgroundColor: { value: '{colors.neutral.80}' },
            borderColor: { value: '{colors.neutral.90}' },
          },
          _focus: {
            borderColor: { value: '{colors.green.80}' },
            boxShadow: {
              // @ts-ignore //IGNORE
              value: {
                spreadRadius: '3px',
                color: '{colors.green.20}',
              },
            },
          },
        },
        track: {
          backgroundColor: {
            value: '{colors.blue.20}',
          },
          height: { value: '{fontSizes.medium}' },
        },
        range: {
          backgroundColor: { value: '{colors.blue.80}' },
        },
      },
    },
  },
};

export const SliderFieldThemeExample = () => {
  return (
    <ThemeProvider theme={theme} colorMode="light">
      <SliderField label="Themed Slider" defaultValue={50} labelHidden />
    </ThemeProvider>
  );
};

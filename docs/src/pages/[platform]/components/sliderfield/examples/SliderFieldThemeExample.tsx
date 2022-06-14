import { SliderField, ThemeProvider, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'slider-theme',
  tokens: {
    components: {
      sliderfield: {
        thumb: {
          width: { value: '{space.xl}' },
          height: { value: '{space.xl}' },
          backgroundColor: { value: '{colors.blue.40}' },
          borderRadius: { value: '{radii.medium}' },
          _hover: {
            backgroundColor: { value: '{colors.green.40}' },
            borderColor: { value: 'orange' },
          },
          _focus: {
            borderColor: { value: 'red' },
            boxShadow: {
              value: {
                spreadRadius: '3px',
                color: 'yellow',
              },
            },
          },
        },
        track: {
          backgroundColor: {
            value: '{colors.neutral.80}',
          },
          height: { value: '{fontSizes.medium}' },
        },
        range: {
          backgroundColor: { value: '{colors.brand.secondary.80}' },
        },
      },
    },
  },
};

export const SliderFieldThemeExample = () => {
  return (
    <ThemeProvider theme={theme}>
      <SliderField label="Themed Slider" defaultValue={50} labelHidden />
    </ThemeProvider>
  );
};

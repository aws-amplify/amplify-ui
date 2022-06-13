import { ThemeProvider, SliderField, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'slider-theme',
  tokens: {
    components: {
      sliderfield: {
        thumb: {
          width: { value: '{space.xl.value}' },
          height: { value: '{space.xl.value}' },
          backgroundColor: { value: '{colors.blue.40.value}' },
          borderRadius: { value: '{radii.medium.value}' },
          _hover: {
            backgroundColor: { value: '{colors.green.40.value}' },
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
            value: '{colors.neutral.80.value}',
          },
          height: { value: '{fontSizes.medium.value}' },
        },
        range: {
          backgroundColor: { value: '{colors.brand.secondary.80.value}' },
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

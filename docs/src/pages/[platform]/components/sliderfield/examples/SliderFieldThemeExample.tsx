import { AmplifyProvider, SliderField, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'slider-theme',
  tokens: {
    components: {
      sliderfield: {
        thumb: {
          backgroundColor: { value: '{colors.green.40.value}' },
          borderRadius: { value: '0' },
        },
        track: {
          backgroundColor: {
            value: '{colors.neutral.80.value}',
          },
        },
        range: {
          backgroundColor: { value: 'blue' },
        },
      },
    },
  },
};

export const SliderFieldThemeExample = () => {
  return (
    <AmplifyProvider theme={theme}>
      <SliderField label="Themed Slider" defaultValue={50} />
    </AmplifyProvider>
  );
};

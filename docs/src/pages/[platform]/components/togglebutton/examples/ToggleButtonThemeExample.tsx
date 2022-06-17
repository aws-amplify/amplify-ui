import {
  ToggleButton,
  Flex,
  ThemeProvider,
  Theme,
} from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'toggleButton-theme',
  tokens: {
    components: {
      togglebutton: {
        borderColor: { value: '{colors.brand.secondary.80}' },
        color: { value: '{colors.brand.secondary.80}' },
        _hover: {
          backgroundColor: { value: 'red' },
        },
        _focus: {
          color: { value: 'orange' },
        },
        _active: {
          backgroundColor: { value: 'yellow' },
        },
        _pressed: {
          backgroundColor: { value: 'green' },
          color: { value: '{colors.white}' },
          _hover: {
            backgroundColor: { value: 'blue' },
          },
        },
        primary: {
          backgroundColor: { value: '{colors.pink.20}' },
        },
      },
    },
  },
};

export const ToggleButtonThemeExample = () => {
  return (
    <ThemeProvider theme={theme} colorMode="light">
      <Flex>
        <ToggleButton>Default</ToggleButton>
        <ToggleButton variation="primary">Primary</ToggleButton>
      </Flex>
    </ThemeProvider>
  );
};

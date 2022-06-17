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
        borderColor: { value: '{colors.blue.90}' },
        color: { value: '{colors.blue.90}' },
        _hover: {
          backgroundColor: { value: '{colors.blue.40}' },
        },
        _focus: {
          color: { value: 'white' },
        },
        _active: {
          backgroundColor: { value: '{colors.blue.60}' },
        },
        _pressed: {
          backgroundColor: { value: '{colors.blue.80}' },
          color: { value: 'white' },
          _hover: {
            backgroundColor: { value: 'blue' },
          },
        },
        primary: {
          backgroundColor: { value: '{colors.teal.20}' },
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

import {
  Flex,
  Input,
  Label,
  ThemeProvider,
  Theme,
} from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'input-theme',
  tokens: {
    components: {
      input: {
        color: { value: '{colors.blue.90}' },
        _focus: {
          borderColor: { value: '{colors.blue.40}' },
        },
      },
    },
  },
};

export const InputThemeExample = () => (
  <ThemeProvider theme={theme} colorMode="light">
    <Flex direction="column" gap="small">
      <Label htmlFor="name">Name</Label>
      <Input id="name" />
    </Flex>
  </ThemeProvider>
);

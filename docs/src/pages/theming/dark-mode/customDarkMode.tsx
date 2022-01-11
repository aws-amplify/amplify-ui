import {
  AmplifyProvider,
  Text,
  Flex,
  Card,
  Theme,
  useTheme,
} from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'custom-theme',
  overrides: [
    {
      colorMode: 'dark',
      tokens: {
        colors: {
          neutral: {
            10: { value: '#0c001f' },
            20: { value: '#180d2a' },
            40: { value: '#231934' },
            60: { value: '#41354f' },
            80: { value: '#7b6a80' },
            90: { value: '#bdb2bd' },
            100: { value: '#f2f2f3' },
          },
        },
      },
    },
  ],
};

const Example = () => {
  const { tokens } = useTheme();
  return (
    <Flex direction="row" backgroundColor={tokens.colors.background.tertiary}>
      <Card>
        <Text>Hello</Text>
      </Card>
      <Card backgroundColor={tokens.colors.neutral[60]}>
        <Text>Hello</Text>
      </Card>
    </Flex>
  );
};

export const CustomDarkModeExample = () => {
  return (
    <AmplifyProvider theme={theme} colorMode="dark">
      <Example />
    </AmplifyProvider>
  );
};

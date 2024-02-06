import {
  Authenticator,
  ThemeProvider,
  Theme,
  useTheme,
  View,
} from '@aws-amplify/ui-react';
export function AuthStyle() {
  const { tokens } = useTheme();
  const theme: Theme = {
    name: 'Auth Example Theme',
    tokens: {
      components: {
        authenticator: {
          router: {
            boxShadow: '0 0 16px hsla(0, 0%, 0%, 0.1)',
            borderWidth: '0',
          },
          form: {
            padding:
              'var(--amplify-space-medium) var(--amplify-space-xl) var(--amplify-space-xl)',
          },
        },
        button: {
          primary: {
            backgroundColor: { value: '{colors.neutral.100}' },
          },
          link: {
            color: { value: '{colors.purple.80}' },
          },
        },
        fieldcontrol: {
          _focus: {
            boxShadow: '0 0 0 2px var(--amplify-colors-purple-60)',
          },
        },
        tabs: {
          item: {
            color: { value: '{colors.neutral.80}' },
            _active: {
              borderColor: { value: '{colors.neutral.100}' },
              color: { value: '{colors.purple.100}' },
            },
          },
        },
      },
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <View padding="xxl">
        <Authenticator></Authenticator>
      </View>
    </ThemeProvider>
  );
}

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
            boxShadow: `0 0 16px ${tokens.colors.overlay['10']}`,
            borderWidth: '0',
          },
          form: {
            padding: `${tokens.space.medium} ${tokens.space.xl} ${tokens.space.medium}`,
          },
        },
        button: {
          primary: {
            backgroundColor: tokens.colors.neutral['100'],
          },
          link: {
            color: tokens.colors.purple['80'],
          },
        },
        fieldcontrol: {
          _focus: {
            boxShadow: `0 0 0 2px ${tokens.colors.purple['60']}`,
          },
        },
        tabs: {
          item: {
            color: tokens.colors.neutral['80'],
            _active: {
              borderColor: tokens.colors.neutral['100'],
              color: tokens.colors.purple['100'],
            },
          },
        },
      },
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <View padding="xxl">
        <Authenticator />
      </View>
    </ThemeProvider>
  );
}

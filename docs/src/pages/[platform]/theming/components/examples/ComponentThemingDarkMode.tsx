import { defaultDarkModeOverride, Alert } from '@aws-amplify/ui-react';
import { createTheme, Theme } from '@aws-amplify/ui-react/theme';

const theme = createTheme({
  name: '',
  components: {
    alert(tokens) {
      return {};
    },
  },
  overrides: [
    defaultDarkModeOverride,
    {
      colorMode: 'dark',
      components: {
        alert(tokens) {
          return {
            borderRadius: '20px',
          };
        },
      },
    },
  ],
});

export default function ComponentThemingDarkMode() {
  return (
    <Theme theme={theme} colorMode="dark">
      <Alert variation="info">Info alert</Alert>
      <Alert variation="success">Success alert</Alert>
    </Theme>
  );
}

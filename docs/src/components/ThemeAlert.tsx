import { Alert, useTheme } from '@aws-amplify/ui-react';

export const ThemeAlert = () => {
  const { tokens } = useTheme();
  return (
    <Alert variation="info" marginBottom={tokens.space.medium}>
      AmplifyProvider has been renamed to ThemeProvider. The ThemeProvider
      export is available since version 2.18.3, previous versions must still use
      AmplifyProvider.
    </Alert>
  );
};

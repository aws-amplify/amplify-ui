import { Alert } from '@aws-amplify/ui-react';

export const ThemeAlert = () => {
  return (
    <Alert variation="info" role="none">
      AmplifyProvider has been renamed to ThemeProvider. The ThemeProvider
      export is available since version 2.18.3, previous versions must still use
      AmplifyProvider.
    </Alert>
  );
};

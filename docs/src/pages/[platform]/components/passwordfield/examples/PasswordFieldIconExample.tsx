import { PasswordField, IconsProvider } from '@aws-amplify/ui-react';
import { FiLock, FiUnlock } from 'react-icons/fi';

export const PasswordFieldIconExample = () => (
  <IconsProvider
    icons={{
      passwordField: {
        visibility: <FiLock />,
        visibilityOff: <FiUnlock />,
      },
    }}
  >
    <PasswordField label="Password" />
  </IconsProvider>
);

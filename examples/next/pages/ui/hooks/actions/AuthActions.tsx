import { Button } from '@aws-amplify/ui-react';
import { useAuthSignOutAction } from '@aws-amplify/ui-react/internal';

export const AuthSignOutButton = ({ children }) => {
  const authSignOutAction = useAuthSignOutAction({ global: true });
  return <Button onClick={authSignOutAction}>{children}</Button>;
};

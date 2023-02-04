import React from 'react';
import useAuthenticatorProps from './useAuthenticatorProps';

export const Haha = (): JSX.Element => {
  const props = useAuthenticatorProps({ route: 'confirmSignIn' });
  return <>{props.challengeName}</>;
};

import { useMemo } from 'react';

import { RenderNothing } from '../../../components';
import { useAuthenticator } from '../useAuthenticator';

import { UseAuthenticatorRoute, UseAuthenticatorRouteParams } from './types';
import { getRouteSelector } from './utils';

export default function useAuthenticatorRoute<PlatformProps>(
  params: UseAuthenticatorRouteParams<PlatformProps>
): UseAuthenticatorRoute<PlatformProps, 'ConfirmSignIn'>;
export default function useAuthenticatorRoute<PlatformProps>(
  params: UseAuthenticatorRouteParams<PlatformProps>
): UseAuthenticatorRoute<PlatformProps, 'SetupTOTP'>;
export default function useAuthenticatorRoute<PlatformProps>({
  components,
}: UseAuthenticatorRouteParams<PlatformProps>): UseAuthenticatorRoute<PlatformProps> {
  const { fields, route } = useAuthenticator(({ route }) => [route]);

  const routeSelector = useMemo(() => getRouteSelector(route), [route]);
  const routeSelectorProps = useAuthenticator(routeSelector);

  const { error, isPending, toSignIn, user } = routeSelectorProps;
  const { ConfirmSignIn, SetupTOTP } = components;

  switch (route) {
    case 'confirmSignIn': {
      const props = {
        challengeName: user.challengeName!,
        error,
        fields,
        Footer: ConfirmSignIn.Footer,
        FormFields: ConfirmSignIn.FormFields,
        Header: ConfirmSignIn.Header,
        isPending,
        toSignIn,
      };
      return { Component: ConfirmSignIn, props };
    }
    case 'setupTOTP': {
      const props = {
        error,
        fields,
        Footer: SetupTOTP.Footer,
        FormFields: SetupTOTP.FormFields,
        Header: SetupTOTP.Header,
        isPending,
        totpUsername: user.username!,
        totpIssuer: 'AWSCognito',
      };
      return { Component: SetupTOTP, props };
    }
    default: {
      return {
        Component: RenderNothing,
        props: {},
      } as UseAuthenticatorRoute<PlatformProps>;
    }
  }
}

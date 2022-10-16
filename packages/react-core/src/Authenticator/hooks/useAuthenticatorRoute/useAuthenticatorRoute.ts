import { AuthenticatorRouteComponentName } from '../types';
import { useAuthenticator } from '../useAuthenticator';

import { UseAuthenticatorRoute, UseAuthenticatorRouteParams } from './types';
import {
  getRouteSelector,
  resolveConfirmSignIn,
  resolveDefault,
  resolveSetupTOTP,
} from './utils';

export default function useAuthenticatorRoute<PlatformProps>(
  params: UseAuthenticatorRouteParams<PlatformProps>
): UseAuthenticatorRoute<PlatformProps, 'ResetPassword'>;
export default function useAuthenticatorRoute<PlatformProps>(
  params: UseAuthenticatorRouteParams<PlatformProps>
): UseAuthenticatorRoute<PlatformProps, 'ConfirmSignIn'>;
export default function useAuthenticatorRoute<PlatformProps>(
  params: UseAuthenticatorRouteParams<PlatformProps>
): UseAuthenticatorRoute<PlatformProps, 'SetupTOTP'>;
export default function useAuthenticatorRoute<PlatformProps>({
  components,
}: UseAuthenticatorRouteParams<PlatformProps>): UseAuthenticatorRoute<
  PlatformProps,
  AuthenticatorRouteComponentName
> {
  const { route } = useAuthenticator(({ route }) => [route]);

  // do not memo, all functions returned by getRouteSelector retain references between renders
  const routeSelector = getRouteSelector(route);

  // `useAuthenticator` exposes both state machine (example: `toSignIn`) and non-state machine
  // props (example: `getTotpSecretCode`). `routeSelector` specifies which state machine props
  // should be returned for a specific route.
  // Only state machine props specified by the current `routeSelector` will have their current value
  // returned by `useAuthenticator`, non-machine props returned will always be the current value
  const routeSelectorProps = useAuthenticator(routeSelector);

  const { ConfirmSignIn, SetupTOTP } = components;

  switch (route) {
    case 'confirmSignIn': {
      return resolveConfirmSignIn(ConfirmSignIn, routeSelectorProps);
    }
    case 'setupTOTP': {
      return resolveSetupTOTP(SetupTOTP, routeSelectorProps);
    }
    default: {
      return resolveDefault();
    }
  }
}

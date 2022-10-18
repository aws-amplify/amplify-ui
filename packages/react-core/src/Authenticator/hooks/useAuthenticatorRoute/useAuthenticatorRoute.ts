import { useMemo } from 'react';
import { AuthenticatorRouteComponentName } from '../types';
import { useAuthenticator } from '../useAuthenticator';

import { UseAuthenticatorRoute, UseAuthenticatorRouteParams } from './types';
import {
  getRouteSelector,
  resolveConfirmResetPasswordRoute,
  resolveConfirmSignInRoute,
  resolveConfirmSignUpRoute,
  resolveDefault,
  resolveConfirmVerifyUserRoute,
  resolveForceNewPasswordRoute,
  resolveResetPasswordRoute,
  resolveSetupTOTPRoute,
  resolveSignInRoute,
  resolveSignUpRoute,
  resolveVerifyUserRoute,
} from './utils';

export default function useAuthenticatorRoute<PlatformProps>(
  params: UseAuthenticatorRouteParams<PlatformProps>
): UseAuthenticatorRoute<PlatformProps, 'ConfirmResetPassword'>;
export default function useAuthenticatorRoute<PlatformProps>(
  params: UseAuthenticatorRouteParams<PlatformProps>
): UseAuthenticatorRoute<PlatformProps, 'ConfirmSignIn'>;
export default function useAuthenticatorRoute<PlatformProps>(
  params: UseAuthenticatorRouteParams<PlatformProps>
): UseAuthenticatorRoute<PlatformProps, 'ConfirmSignUp'>;
export default function useAuthenticatorRoute<PlatformProps>(
  params: UseAuthenticatorRouteParams<PlatformProps>
): UseAuthenticatorRoute<PlatformProps, 'ConfirmVerifyUser'>;
export default function useAuthenticatorRoute<PlatformProps>(
  params: UseAuthenticatorRouteParams<PlatformProps>
): UseAuthenticatorRoute<PlatformProps, 'ForceNewPassword'>;
export default function useAuthenticatorRoute<PlatformProps>(
  params: UseAuthenticatorRouteParams<PlatformProps>
): UseAuthenticatorRoute<PlatformProps, 'ResetPassword'>;
export default function useAuthenticatorRoute<PlatformProps>(
  params: UseAuthenticatorRouteParams<PlatformProps>
): UseAuthenticatorRoute<PlatformProps, 'SetupTOTP'>;
export default function useAuthenticatorRoute<PlatformProps>(
  params: UseAuthenticatorRouteParams<PlatformProps>
): UseAuthenticatorRoute<PlatformProps, 'SignIn'>;
export default function useAuthenticatorRoute<PlatformProps>(
  params: UseAuthenticatorRouteParams<PlatformProps>
): UseAuthenticatorRoute<PlatformProps, 'SignUp'>;
export default function useAuthenticatorRoute<PlatformProps>(
  params: UseAuthenticatorRouteParams<PlatformProps>
): UseAuthenticatorRoute<PlatformProps, 'VerifyUser'>;
export default function useAuthenticatorRoute<PlatformProps>({
  components,
}: UseAuthenticatorRouteParams<PlatformProps>): UseAuthenticatorRoute<
  PlatformProps,
  AuthenticatorRouteComponentName
> {
  const { route } = useAuthenticator(({ route }) => [route]);

  const routeSelector = useMemo(() => getRouteSelector(route), [route]);

  // `useAuthenticator` exposes both state machine (example: `toSignIn`) and non-state machine
  // props (example: `getTotpSecretCode`). `routeSelector` specifies which state machine props
  // should be returned for a specific route.
  // Only state machine props specified by the current `routeSelector` will have their current value
  // returned by `useAuthenticator`, non-machine props returned will always be the current value
  const routeSelectorProps = useAuthenticator(routeSelector);

  const {
    ConfirmResetPassword,
    ConfirmSignIn,
    ConfirmSignUp,
    ConfirmVerifyUser,
    ForceNewPassword,
    ResetPassword,
    SetupTOTP,
    SignIn,
    SignUp,
    VerifyUser,
  } = components;

  switch (route) {
    case 'confirmResetPassword': {
      return resolveConfirmResetPasswordRoute(
        ConfirmResetPassword,
        routeSelectorProps
      );
    }
    case 'confirmSignIn': {
      return resolveConfirmSignInRoute(ConfirmSignIn, routeSelectorProps);
    }
    case 'confirmSignUp': {
      return resolveConfirmSignUpRoute(ConfirmSignUp, routeSelectorProps);
    }
    case 'confirmVerifyUser': {
      return resolveConfirmVerifyUserRoute(
        ConfirmVerifyUser,
        routeSelectorProps
      );
    }
    case 'forceNewPassword': {
      return resolveForceNewPasswordRoute(ForceNewPassword, routeSelectorProps);
    }
    case 'resetPassword': {
      return resolveResetPasswordRoute(ResetPassword, routeSelectorProps);
    }
    case 'setupTOTP': {
      return resolveSetupTOTPRoute(SetupTOTP, routeSelectorProps);
    }
    case 'signIn': {
      return resolveSignInRoute(SignIn, routeSelectorProps);
    }
    case 'signUp': {
      return resolveSignUpRoute(SignUp, routeSelectorProps);
    }
    case 'verifyUser': {
      return resolveVerifyUserRoute(VerifyUser, routeSelectorProps);
    }
    default: {
      return resolveDefault();
    }
  }
}

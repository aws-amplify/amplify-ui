import { useMemo } from 'react';
import { useAuthenticator } from '../useAuthenticator';

import {
  UseAuthenticatorRoute,
  UseAuthenticatorRouteDefault,
  UseAuthenticatorRouteParams,
} from './types';
import {
  getRouteMachineSelector,
  routeSelector,
  resolveConfirmResetPasswordRoute,
  resolveConfirmSignInRoute,
  resolveConfirmSignUpRoute,
  resolveConfirmVerifyUserRoute,
  resolveDefault,
  resolveForceNewPasswordRoute,
  resolveForgotPasswordRoute,
  resolveSetupTotpRoute,
  resolveSignInRoute,
  resolveSignUpRoute,
  resolveVerifyUserRoute,
} from './utils';

export default function useAuthenticatorRoute<FieldType>(
  params: UseAuthenticatorRouteParams<FieldType>
): UseAuthenticatorRoute<'ConfirmResetPassword'>;
export default function useAuthenticatorRoute<FieldType>(
  params: UseAuthenticatorRouteParams<FieldType>
): UseAuthenticatorRoute<'ConfirmSignIn'>;
export default function useAuthenticatorRoute<FieldType>(
  params: UseAuthenticatorRouteParams<FieldType>
): UseAuthenticatorRoute<'ConfirmSignUp'>;
export default function useAuthenticatorRoute<FieldType>(
  params: UseAuthenticatorRouteParams<FieldType>
): UseAuthenticatorRoute<'ConfirmVerifyUser'>;
export default function useAuthenticatorRoute<FieldType>(
  params: UseAuthenticatorRouteParams<FieldType>
): UseAuthenticatorRoute<'ForceNewPassword'>;
export default function useAuthenticatorRoute<FieldType>(
  params: UseAuthenticatorRouteParams<FieldType>
): UseAuthenticatorRoute<'ForgotPassword'>;
export default function useAuthenticatorRoute<FieldType>(
  params: UseAuthenticatorRouteParams<FieldType>
): UseAuthenticatorRoute<'SetupTotp'>;
export default function useAuthenticatorRoute<FieldType>(
  params: UseAuthenticatorRouteParams<FieldType>
): UseAuthenticatorRoute<'SignIn'>;
export default function useAuthenticatorRoute<FieldType>(
  params: UseAuthenticatorRouteParams<FieldType>
): UseAuthenticatorRoute<'SignUp'>;
export default function useAuthenticatorRoute<FieldType>(
  params: UseAuthenticatorRouteParams<FieldType>
): UseAuthenticatorRoute<'VerifyUser'>;
export default function useAuthenticatorRoute<FieldType>({
  components,
}: UseAuthenticatorRouteParams<FieldType>): UseAuthenticatorRouteDefault<FieldType> {
  const { route } = useAuthenticator(routeSelector);

  const routeMachineSelector = useMemo(
    () => getRouteMachineSelector(route),
    [route]
  );

  // `useAuthenticator` exposes both state machine (example: `toSignIn`) and non-state machine
  // props (example: `getTotpSecretCode`). `routeSelector` specifies which state machine props
  // should be returned for a specific route.
  // Only state machine props specified by the current `routeSelector` will have their current value
  // returned by `useAuthenticator`, non-machine props returned will always be the current value
  const routeSelectorProps = useAuthenticator(routeMachineSelector);

  const {
    ConfirmResetPassword,
    ConfirmSignIn,
    ConfirmSignUp,
    ConfirmVerifyUser,
    ForceNewPassword,
    ForgotPassword,
    SetupTotp,
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
    case 'forgotPassword': {
      return resolveForgotPasswordRoute(ForgotPassword, routeSelectorProps);
    }
    case 'setupTotp': {
      return resolveSetupTotpRoute(SetupTotp, routeSelectorProps);
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

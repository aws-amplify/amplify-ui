import { AuthenticatorRoute } from '@aws-amplify/ui';
// import { useMemo } from 'react';
import { UseAuthenticator, useAuthenticator } from '../useAuthenticator';
// import { AuthenticatorRouteComponentKey } from '../newTypes';

import {
  // UseAuthenticatorRoute,
  // UseAuthenticatorRouteDefault,
  // UseAuthenticatorRouteParams,
  UseAuthenticatorRouteProps,
  NewAuthenticatorRoute,
  // Resolvers,
} from './types';

import {
  getRouteMachineSelector,
  NewAuthenticatorComponentRoute,
  // routeSelector,
  // resolveConfirmResetPasswordRoute,
  // resolveConfirmSignInRoute,
  // resolveConfirmSignUpRoute,
  // resolveConfirmVerifyUserRoute,
  // resolveDefault,
  // resolveForceNewPasswordRoute,
  // resolveResetPasswordRoute,
  // resolveSetupTOTPRoute,
  // resolveSignInRoute,
  // resolveSignUpRoute,
  // resolveVerifyUserRoute,
  newGetConvertedMachineProps,
} from './utils';

function isAuthenticatorComponent<T extends unknown>(
  route: T
): route is NewAuthenticatorComponentRoute {
  return (['signIn'] as NewAuthenticatorComponentRoute[]).includes(route);
}

export default function useAuthenticatorProps<
  RouteKey extends NewAuthenticatorRoute
>({ route }: { route: RouteKey }): UseAuthenticatorRouteProps[RouteKey] {
  const selector = getRouteMachineSelector(route);
  const machineProps = useAuthenticator(selector);

  if (!isAuthenticatorComponent(route)) {
    return () => undefined;
  }

  return newGetConvertedMachineProps(route, machineProps);
}

// export default function useAuthenticatorRoute<FieldType>(
//   params: UseAuthenticatorRouteParams<FieldType>
// ): UseAuthenticatorRoute<'ConfirmResetPassword'>;
// export default function useAuthenticatorRoute<FieldType>(
//   params: UseAuthenticatorRouteParams<FieldType>
// ): UseAuthenticatorRoute<'ConfirmSignIn'>;
// export default function useAuthenticatorRoute<FieldType>(
//   params: UseAuthenticatorRouteParams<FieldType>
// ): UseAuthenticatorRoute<'ConfirmSignUp'>;
// export default function useAuthenticatorRoute<FieldType>(
//   params: UseAuthenticatorRouteParams<FieldType>
// ): UseAuthenticatorRoute<'ConfirmVerifyUser'>;
// export default function useAuthenticatorRoute<FieldType>(
//   params: UseAuthenticatorRouteParams<FieldType>
// ): UseAuthenticatorRoute<'ForceNewPassword'>;
// export default function useAuthenticatorRoute<FieldType>(
//   params: UseAuthenticatorRouteParams<FieldType>
// ): UseAuthenticatorRoute<'ResetPassword'>;
// export default function useAuthenticatorRoute<FieldType>(
//   params: UseAuthenticatorRouteParams<FieldType>
// ): UseAuthenticatorRoute<'SetupTOTP'>;
// export default function useAuthenticatorRoute<FieldType>(
//   params: UseAuthenticatorRouteParams<FieldType>
// ): UseAuthenticatorRoute<'SignIn'>;
// export default function useAuthenticatorRoute<FieldType>(
//   params: UseAuthenticatorRouteParams<FieldType>
// ): UseAuthenticatorRoute<'SignUp'>;
// export default function useAuthenticatorRoute<FieldType>(
//   params: UseAuthenticatorRouteParams<FieldType>
// ): UseAuthenticatorRoute<'VerifyUser'>;
// export default function useAuthenticatorRoute<FieldType>({
//   components,
// }: UseAuthenticatorRouteParams<FieldType>): UseAuthenticatorRouteDefault<FieldType> {
//   const { route } = useAuthenticator(routeSelector);

//   const routeMachineSelector = useMemo(
//     () => getRouteMachineSelector(route),
//     [route]
//   );

//   // `useAuthenticator` exposes both state machine (example: `toSignIn`) and non-state machine
//   // props (example: `getTotpSecretCode`). `routeSelector` specifies which state machine props
//   // should be returned for a specific route.
//   // Only state machine props specified by the current `routeSelector` will have their current value
//   // returned by `useAuthenticator`, non-machine props returned will always be the current value
//   const routeSelectorProps = useAuthenticator(routeMachineSelector);

//   const {
//     ConfirmResetPassword,
//     ConfirmSignIn,
//     ConfirmSignUp,
//     ConfirmVerifyUser,
//     ForceNewPassword,
//     ResetPassword,
//     SetupTOTP,
//     SignIn,
//     SignUp,
//     VerifyUser,
//   } = components;

//   switch (route) {
//     case 'confirmResetPassword': {
//       return resolveConfirmResetPasswordRoute(
//         ConfirmResetPassword,
//         routeSelectorProps
//       );
//     }
//     case 'confirmSignIn': {
//       return resolveConfirmSignInRoute(ConfirmSignIn, routeSelectorProps);
//     }
//     case 'confirmSignUp': {
//       return resolveConfirmSignUpRoute(ConfirmSignUp, routeSelectorProps);
//     }
//     case 'confirmVerifyUser': {
//       return resolveConfirmVerifyUserRoute(
//         ConfirmVerifyUser,
//         routeSelectorProps
//       );
//     }
//     case 'forceNewPassword': {
//       return resolveForceNewPasswordRoute(ForceNewPassword, routeSelectorProps);
//     }
//     case 'resetPassword': {
//       return resolveResetPasswordRoute(ResetPassword, routeSelectorProps);
//     }
//     case 'setupTOTP': {
//       return resolveSetupTOTPRoute(SetupTOTP, routeSelectorProps);
//     }
//     case 'signIn': {
//       return resolveSignInRoute(SignIn, routeSelectorProps);
//     }
//     case 'signUp': {
//       return resolveSignUpRoute(SignUp, routeSelectorProps);
//     }
//     case 'verifyUser': {
//       return resolveVerifyUserRoute(VerifyUser, routeSelectorProps);
//     }
//     default: {
//       return resolveDefault();
//     }
//   }
// }

import { AuthenticatorRoute } from '@aws-amplify/ui';
import { RenderNothing } from '../../../../components';
import { AuthenticatorRouteComponentName, DefaultComponent } from '../../types';
import { UseAuthenticator } from '../../useAuthenticator/types';

import { DEFAULTS } from '../../__mock__/components';
import {
  mockMachineContext,
  mockUseAuthenticatorOutput,
} from '../../useAuthenticator/__mock__/useAuthenticator';
import { UseAuthenticatorRoute } from '../types';

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
} from '../utils';

type PropsResolver = (
  Component: DefaultComponent,
  selectedProps: UseAuthenticator
) => UseAuthenticatorRoute<{}, AuthenticatorRouteComponentName>;

const {
  codeDeliveryDetails,
  error,
  fields,
  getTotpSecretCode,
  isPending,
  resendCode,
  skipVerification,
  toSignIn,
  toSignUp,
  user,
  validationErrors,
} = mockUseAuthenticatorOutput;

const totpIssuer = 'AWSCognito';
const { challengeName, username } = user;

const machineContext = mockMachineContext;

const useAuthenticatorOutput = mockUseAuthenticatorOutput;

describe('getRouteSelector', () => {
  it.each([
    ['confirmResetPassword', [error, isPending, resendCode, validationErrors]],
    ['confirmSignIn', [error, isPending, toSignIn, user]],
    ['confirmSignUp', [codeDeliveryDetails, error, isPending, resendCode]],
    ['confirmVerifyUser', [error, isPending, skipVerification]],
    ['forceNewPassword', [error, isPending, toSignIn, validationErrors]],
    ['idle', []],
    ['resetPassword', [error, isPending, toSignIn]],
    ['signIn', [error, isPending, toSignUp]],
    ['signUp', [error, isPending, toSignIn, validationErrors]],
    ['setupTOTP', [error, isPending, user]],
    ['verifyUser', [error, isPending]],
  ])('returns the expected route selector for %s', (route, expected) => {
    const selector = getRouteSelector(route as AuthenticatorRoute);
    const output = selector(machineContext);
    expect(output).toStrictEqual(expected);
  });
});

describe('props resolver functions', () => {
  it.each([
    [
      'ConfirmResetPassword',
      resolveConfirmResetPasswordRoute,
      { resendCode, validationErrors },
    ],
    ['ConfirmSignIn', resolveConfirmSignInRoute, { challengeName, toSignIn }],
    [
      'ConfirmSignUp',
      resolveConfirmSignUpRoute,
      { codeDeliveryDetails, resendCode },
    ],
    [
      'ConfirmVerifyUser',
      resolveConfirmVerifyUserRoute,
      { error, isPending, skipVerification },
    ],
    [
      'ForceNewPassword',
      resolveForceNewPasswordRoute,
      { error, isPending, toSignIn, validationErrors },
    ],
    [
      'ResetPassword',
      resolveResetPasswordRoute,
      { error, isPending, toSignIn },
    ],
    [
      'SetupTOTP',
      resolveSetupTOTPRoute,
      { getTotpSecretCode, totpUsername: username, totpIssuer },
    ],
    [
      'SignIn',
      resolveSignInRoute,
      { error, hideSignUp: false, isPending, toSignUp },
    ],
    [
      'SignUp',
      resolveSignUpRoute,
      { error, isPending, toSignIn, validationErrors },
    ],
    ['VerifyUser', resolveVerifyUserRoute, { error, isPending }],
  ])(
    'resolve%s returns the expected values',
    (key, resolver, routSpecificeProps) => {
      const Component = DEFAULTS[key as AuthenticatorRouteComponentName];

      const commonProps = { error, fields, isPending };
      const componentSlots = {
        Footer: Component.Footer,
        FormFields: Component.FormFields,
        Header: Component.Header,
      };

      const expected = {
        Component,
        props: { ...commonProps, ...componentSlots, ...routSpecificeProps },
      };

      const output = (resolver as PropsResolver)(
        Component,
        useAuthenticatorOutput
      );
      expect(output).toStrictEqual(expected);
    }
  );

  describe('resolveDefault', () => {
    it('returns the expected values', () => {
      const output = resolveDefault();
      const expected = { Component: RenderNothing, props: {} };

      expect(output).toStrictEqual(expected);
    });
  });
});

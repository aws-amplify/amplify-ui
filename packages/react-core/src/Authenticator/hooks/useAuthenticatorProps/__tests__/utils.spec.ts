import { AuthenticatorRoute } from '@aws-amplify/ui';
import { AuthenticatorRouteComponentKey } from '../../types';

import {
  mockMachineContext,
  mockUseAuthenticatorOutput,
} from '../../useAuthenticator/__mock__/useAuthenticator';

import { getRouteMachineSelector, resolveRouteProps } from '../utils';

const {
  codeDeliveryDetails,
  error,
  isPending,
  resendCode,
  route,
  skipVerification,
  submitForm,
  toFederatedSignIn,
  toResetPassword,
  toSignIn,
  toSignUp,
  totpSecretCode,
  updateBlur,
  updateForm,
  user,
  validationErrors,
} = mockUseAuthenticatorOutput;

const { challengeName } = user;

const machineContext = mockMachineContext;

const useAuthenticatorOutput = mockUseAuthenticatorOutput;

const commonSelectorProps = [
  error,
  isPending,
  submitForm,
  updateBlur,
  updateForm,
];

describe('getRouteMachineSelector', () => {
  it.each([
    [
      'confirmResetPassword',
      [...commonSelectorProps, resendCode, validationErrors, route],
    ],
    ['confirmSignIn', [...commonSelectorProps, toSignIn, user, route]],
    [
      'confirmSignUp',
      [...commonSelectorProps, codeDeliveryDetails, resendCode, route],
    ],
    ['confirmVerifyUser', [...commonSelectorProps, skipVerification, route]],
    [
      'forceNewPassword',
      [...commonSelectorProps, toSignIn, validationErrors, route],
    ],
    ['idle', [route]],
    ['resetPassword', [...commonSelectorProps, toSignIn, route]],
    [
      'signIn',
      [
        ...commonSelectorProps,
        toFederatedSignIn,
        toResetPassword,
        toSignUp,
        route,
      ],
    ],
    ['signUp', [...commonSelectorProps, toSignIn, validationErrors, route]],
    ['setupTOTP', [...commonSelectorProps, toSignIn, totpSecretCode, route]],
    ['verifyUser', [...commonSelectorProps, skipVerification, route]],
  ])('returns the expected route selector for %s', (route, expected) => {
    const selector = getRouteMachineSelector(route as AuthenticatorRoute);
    const output = selector(machineContext);
    expect(output).toStrictEqual(expected);
  });
});

describe('resolveRouteProps', () => {
  it.each([
    ['confirmResetPassword', { resendCode, validationErrors }],
    ['confirmSignIn', { challengeName, toSignIn, user }],
    ['confirmSignUp', { codeDeliveryDetails, resendCode }],
    ['confirmVerifyUser', { error, isPending, skipVerification }],
    ['forceNewPassword', { error, isPending, toSignIn, validationErrors }],
    ['resetPassword', { error, isPending, toSignIn }],
    ['setupTOTP', { toSignIn, totpSecretCode }],
    [
      'signIn',
      {
        error,
        hideSignUp: false,
        isPending,
        toFederatedSignIn,
        toResetPassword,
        toSignUp,
      },
    ],
    [
      'signUp',
      { error, hideSignIn: false, isPending, toSignIn, validationErrors },
    ],
    ['verifyUser', { error, isPending, skipVerification }],
  ])(
    'resolves the expected props for the %s route',
    (route, routeSpecificProps) => {
      const commonProps = { error, isPending };

      const eventHandlerProps = {
        handleBlur: updateBlur,
        handleChange: updateForm,
        handleSubmit: submitForm,
      };

      const expected = {
        ...commonProps,
        ...eventHandlerProps,
        ...routeSpecificProps,
      };

      const output = resolveRouteProps(
        route as AuthenticatorRouteComponentKey,
        useAuthenticatorOutput
      );
      expect(output).toStrictEqual(expected);
    }
  );

  it('handles being called with a non-component route', () => {
    const output = resolveRouteProps(
      'idle' as AuthenticatorRouteComponentKey,
      useAuthenticatorOutput
    );
    expect(output).toBeUndefined();
  });
});

import { AuthenticatorRoute } from '@aws-amplify/ui';
import { RenderNothing } from '../../../../components';
import {
  AuthenticatorRouteComponentName,
  DefaultComponentType,
} from '../../types';
import { UseAuthenticator } from '../../useAuthenticator/types';

import { DEFAULTS } from '../../__mocks__/components';
import {
  mockMachineContext,
  mockUseAuthenticatorOutput,
} from '../../useAuthenticator/__mock__/useAuthenticator';
import { UseAuthenticatorRoute } from '../types';

import {
  getRouteMachineSelector,
  routeSelector,
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
  Component: DefaultComponentType,
  selectedProps: UseAuthenticator
) => UseAuthenticatorRoute<AuthenticatorRouteComponentName, {}>;

const {
  codeDeliveryDetails,
  error,
  hasValidationErrors,
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
      [
        ...commonSelectorProps,
        hasValidationErrors,
        resendCode,
        validationErrors,
        route,
      ],
    ],
    ['confirmSignIn', [...commonSelectorProps, toSignIn, user, route]],
    [
      'confirmSignUp',
      [...commonSelectorProps, codeDeliveryDetails, resendCode, route],
    ],
    ['confirmVerifyUser', [...commonSelectorProps, skipVerification, route]],
    [
      'forceNewPassword',
      [
        ...commonSelectorProps,
        hasValidationErrors,
        toSignIn,
        validationErrors,
        route,
      ],
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
    [
      'signUp',
      [
        ...commonSelectorProps,
        hasValidationErrors,
        toSignIn,
        validationErrors,
        route,
      ],
    ],
    ['setupTOTP', [...commonSelectorProps, toSignIn, totpSecretCode, route]],
    ['verifyUser', [...commonSelectorProps, skipVerification, route]],
  ])('returns the expected route selector for %s', (route, expected) => {
    const selector = getRouteMachineSelector(route as AuthenticatorRoute);
    const output = selector(machineContext);
    expect(output).toStrictEqual(expected);
  });
});

describe('props resolver functions', () => {
  it.each([
    [
      'ConfirmResetPassword',
      resolveConfirmResetPasswordRoute,
      { hasValidationErrors, resendCode, validationErrors },
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
      { error, hasValidationErrors, isPending, toSignIn, validationErrors },
    ],
    [
      'ResetPassword',
      resolveResetPasswordRoute,
      { error, isPending, toSignIn },
    ],
    ['SetupTOTP', resolveSetupTOTPRoute, { toSignIn, totpSecretCode }],
    [
      'SignIn',
      resolveSignInRoute,
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
      'SignUp',
      resolveSignUpRoute,
      { error, hasValidationErrors, isPending, toSignIn, validationErrors },
    ],
    [
      'VerifyUser',
      resolveVerifyUserRoute,
      { error, isPending, skipVerification },
    ],
  ])(
    'resolve%s returns the expected values',
    (key, resolver, routeSpecificProps) => {
      const Component = DEFAULTS[key as AuthenticatorRouteComponentName];

      const commonProps = { error, isPending };
      const componentSlots = {
        Footer: Component.Footer,
        FormFields: Component.FormFields,
        Header: Component.Header,
      };
      const eventHandlerProps = {
        handleBlur: updateBlur,
        handleChange: updateForm,
        handleSubmit: submitForm,
      };

      const expected = {
        Component,
        props: {
          ...commonProps,
          ...componentSlots,
          ...eventHandlerProps,
          ...routeSpecificProps,
        },
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

describe('routeSelector', () => {
  it('only selects the value of route', () => {
    const route = 'idle' as UseAuthenticator['route'];
    const machineContext = { ...mockUseAuthenticatorOutput, route };

    const output = routeSelector(machineContext);
    expect(output).toStrictEqual([route]);
  });
});

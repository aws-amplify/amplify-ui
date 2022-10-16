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
  resolveConfirmSignIn,
  resolveDefault,
  resolveSetupTOTP,
} from '../utils';

type PropsResolver = (
  Component: DefaultComponent,
  selectedProps: UseAuthenticator
) => UseAuthenticatorRoute;

const {
  codeDeliveryDetails,
  error,
  fields,
  getTotpSecretCode,
  isPending,
  resendCode,
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
    ['confirmResetPassword', [error, isPending, validationErrors]],
    ['confirmSignIn', [error, isPending, toSignIn, user]],
    ['confirmSignUp', [codeDeliveryDetails, error, isPending, resendCode]],
    ['confirmVerifyUser', [error, isPending]],
    ['forceNewPassword', [error, isPending, toSignIn, validationErrors]],
    ['idle', []],
    ['resetPassword', [error, isPending]],
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
      'SetupTOTP',
      resolveSetupTOTP,
      { getTotpSecretCode, totpUsername: username, totpIssuer },
    ],
    ['ConfirmSignIn', resolveConfirmSignIn, { challengeName, toSignIn }],
  ])('resolve%s returns the expected values', (key, resolver, routeProps) => {
    const Component = DEFAULTS[key as AuthenticatorRouteComponentName];

    const commonProps = { error, fields, isPending };
    const componentSlots = {
      Footer: Component.Footer,
      FormFields: Component.FormFields,
      Header: Component.Header,
    };

    const expected = {
      Component,
      props: { ...commonProps, ...componentSlots, ...routeProps },
    };

    const output = (resolver as PropsResolver)(
      Component,
      useAuthenticatorOutput
    );
    expect(output).toStrictEqual(expected);
  });

  describe('resolveDefault', () => {
    it('returns the expected values', () => {
      const output = resolveDefault();
      const expected = { Component: RenderNothing, props: {} };

      expect(output).toStrictEqual(expected);
    });
  });
});

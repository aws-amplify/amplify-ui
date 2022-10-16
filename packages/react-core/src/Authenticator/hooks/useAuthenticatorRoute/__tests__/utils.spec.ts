import { AuthenticatorRoute } from '@aws-amplify/ui';
import { RenderNothing } from '../../../../components';
import {
  AuthenticatorLegacyFields,
  AuthenticatorMachineContext,
  AuthenticatorRouteComponentName,
  DefaultComponent,
} from '../../types';
import { UseAuthenticator } from '../../useAuthenticator/types';

import { DEFAULTS } from '../../__mock__/components';
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

const challengeName = 'CUSTOM_CHALLENGE';
const error = 'error';
const fields = [] as AuthenticatorLegacyFields;
const getTotpSecretCode = jest.fn();
const isPending = false;
const toSignIn = jest.fn();
const totpIssuer = 'AWSCognito';
const username = 'Charles';

const user = {
  challengeName,
  username,
} as AuthenticatorMachineContext['user'];

const machineContext: AuthenticatorMachineContext = {
  error,
  fields,
  isPending,
  toSignIn,
  user,
} as unknown as AuthenticatorMachineContext;

const useAuthenticatorOutput: UseAuthenticator = {
  ...machineContext,
  getTotpSecretCode,
} as unknown as UseAuthenticator;

describe('getRouteSelector', () => {
  it.each([
    ['confirmResetPassword', []],
    ['confirmSignIn', [error, isPending, toSignIn, user]],
    ['confirmSignUp', []],
    ['confirmVerifyUser', []],
    ['forceNewPassword', []],
    ['idle', []],
    ['signIn', []],
    ['signUp', []],
    ['resetPassword', []],
    ['setupTOTP', [error, isPending, user]],
    ['verifyUser', []],
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

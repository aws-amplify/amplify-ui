import { AuthenticatorRoute } from '@aws-amplify/ui';
import { AuthenticatorMachineContext } from '../../types';

import { getRouteSelector } from '../utils';

const error = 'error';
const isPending = false;
const toSignIn = jest.fn();
const user = {} as AuthenticatorMachineContext['user'];

const machineContext: AuthenticatorMachineContext = {
  error,
  isPending,
  toSignIn,
  user,
} as unknown as AuthenticatorMachineContext;

describe('getRouteSelector', () => {
  it.each([
    ['confirmSignIn', [error, isPending, toSignIn, user]],
    ['setupTOTP', [error, isPending, user]],
    ['idle', []],
  ])('returns the expected route selector for %s', (route, expected) => {
    const selector = getRouteSelector(route as AuthenticatorRoute);
    const output = selector(machineContext);
    expect(output).toStrictEqual(expected);
  });
});

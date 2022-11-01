import { Auth } from 'aws-amplify';
import {
  AmplifyUser,
  AuthenticatorServiceFacade,
  AuthMachineState,
} from '@aws-amplify/ui';

import * as UIModule from '@aws-amplify/ui';

import { COMPONENT_ROUTE_KEYS } from '../constants';
import { AuthenticatorRouteComponentKey } from '../types';
import {
  areSelectorDepsEqual,
  defaultComparator,
  getComparator,
  getLegacyFields,
  getTotpSecretCodeCallback,
  isComponentRouteKey,
} from '../utils';

const setupTOTPSpy = jest.spyOn(Auth, 'setupTOTP').mockImplementation();
const getSortedFormFieldsSpy = jest
  .spyOn(UIModule, 'getSortedFormFields')
  .mockImplementation(() => [['name', { required: true }]]);

describe('areSelectorDepsEqual', () => {
  it('returns false when dep arrays have different lengths', () => {
    const output = areSelectorDepsEqual([0, {}], [0]);

    expect(output).toBe(false);
  });

  it('returns false when comparing an empty array and an empty object', () => {
    const output = areSelectorDepsEqual([{}], [[]]);

    expect(output).toBe(false);
  });

  it('returns false when dep arrays have similar object values', () => {
    const output = areSelectorDepsEqual([0, { id: 4 }], [0, { id: 4 }]);

    expect(output).toBe(false);
  });

  it('returns false when nested object values are different', () => {
    const output = areSelectorDepsEqual(
      [0, { options: {} }],
      [0, { options: {} }]
    );

    expect(output).toBe(false);
  });

  it('returns true when arrays are equal length and have same deps', () => {
    const output = areSelectorDepsEqual([{}, 0], [{}, 0]);

    expect(output).toBe(true);
  });
});

describe('getComparator', () => {
  it('returns a comparator that compares arrays', () => {
    const comparator = getComparator(({ route }) => [route]);

    expect(comparator).toEqual(expect.any(Function));

    expect(
      comparator(
        { route: 'transition' } as AuthenticatorServiceFacade,
        { route: 'confirmSignIn' } as AuthenticatorServiceFacade
      )
    ).toBe(false);

    expect(
      comparator(
        { route: 'idle' } as AuthenticatorServiceFacade,
        { route: 'idle' } as AuthenticatorServiceFacade
      )
    ).toBe(true);
  });
});

describe('defaultComparator', () => {
  it('returns false', () => {
    expect(defaultComparator()).toBe(false);
  });
});

describe('isComponentRouteKey', () => {
  it.each(COMPONENT_ROUTE_KEYS)('returns true for a %s value', (route) => {
    const output = isComponentRouteKey(route);
    expect(output).toBe(true);
  });

  it('returns false for a non-component route key value', () => {
    const output = isComponentRouteKey(
      'route' as AuthenticatorRouteComponentKey
    );

    expect(output).toBe(false);
  });
});

describe('getTotpSecretCodeCallback', () => {
  const user = {} as AmplifyUser;
  it('returns a getTotpSecretCode function', () => {
    const getTotpSecretCode = getTotpSecretCodeCallback(user);

    expect(getTotpSecretCode).toStrictEqual(expect.any(Function));
  });

  it('returns a function that calls Auth.setupTOTP with the user', async () => {
    const getTotpSecretCode = getTotpSecretCodeCallback(user);

    await getTotpSecretCode();

    expect(setupTOTPSpy).toBeCalledWith(user);
  });
});

describe('getLegacyFields', () => {
  const state = {} as unknown as AuthMachineState;
  it('calls getSortedFormFields when route is a valid component route', () => {
    getLegacyFields('signIn', state);

    expect(getSortedFormFieldsSpy).toHaveBeenCalledWith('signIn', state);
  });

  it('returns an empty array for a non-component route', () => {
    const output = getLegacyFields('idle', state);

    expect(output).toHaveLength(0);
  });
});

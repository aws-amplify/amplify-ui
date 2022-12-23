import { Auth } from 'aws-amplify';
import {
  AmplifyUser,
  AuthenticatorServiceFacade,
  AuthMachineState,
  AuthActorContext,
} from '@aws-amplify/ui';

import * as UIModule from '@aws-amplify/ui';

import {
  areSelectorDepsEqual,
  defaultComparator,
  getComparator,
  getMachineFields,
  getTotpSecretCodeCallback,
  getQRFields,
} from '../utils';

const setupTOTPSpy = jest.spyOn(Auth, 'setupTOTP').mockImplementation();

const totpIssuer = 'testIssuer';
const totpUsername = 'testUsername';
const mockActorReturnActorContextValues = {
  formFields: {
    setupTOTP: {
      QR: {
        totpIssuer,
        totpUsername,
      },
    },
  },
} as unknown as AuthActorContext;

const getActorContextSpy = jest.spyOn(UIModule, 'getActorContext');

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

describe('getMachineFields', () => {
  const state = {} as unknown as AuthMachineState;
  it('calls getSortedFormFields when route is a valid component route', () => {
    getMachineFields('signIn', state, {});

    expect(getSortedFormFieldsSpy).toHaveBeenCalledWith('signIn', state);
  });

  it('returns an empty array for a non-component route', () => {
    const output = getMachineFields('idle', state, {});

    expect(output).toHaveLength(0);
  });

  it('returns expected values for verifyUser route', () => {
    const output = getMachineFields('verifyUser', state, {
      email: 'test@example.com',
    });

    expect(output).toHaveLength(1);
    expect(output).toStrictEqual([
      {
        label: 'test@example.com',
        name: 'email',
        value: 'test@example.com',
        type: 'radio',
      },
    ]);
  });

  it('returns expected values for verifyUser route when contact method is empty', () => {
    const output = getMachineFields('verifyUser', state, {});

    expect(output).toHaveLength(0);
    expect(output).toStrictEqual([]);
  });

  it('returns expected values for verifyUser route when contact method value is invalid', () => {
    const output = getMachineFields('verifyUser', state, {
      phone_number: null as unknown as string,
    });

    expect(output).toHaveLength(1);
    expect(output).toStrictEqual([{}]);
  });

  describe('getQRFields', () => {
    const state = {} as unknown as AuthMachineState;

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('returns the correct QR issuer and username', () => {
      getActorContextSpy.mockReturnValue(mockActorReturnActorContextValues);
      const QRFields = getQRFields(state);
      expect(QRFields).toEqual({ totpIssuer, totpUsername });
    });
    it('returns empty object if QR field is not present', () => {
      getActorContextSpy.mockReturnValue({});
      const QRFields = getQRFields(state);
      expect(QRFields).toEqual({});
    });
  });
});

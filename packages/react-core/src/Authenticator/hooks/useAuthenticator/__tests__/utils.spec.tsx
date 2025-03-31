import {
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
  getQRFields,
} from '../utils';

const totpIssuer = 'testIssuer';
const totpUsername = 'testUsername';
const mockActorReturnActorContextValues = {
  formFields: {
    setupTotp: {
      QR: {
        totpIssuer,
        totpUsername,
      },
    },
  },
} as unknown as AuthActorContext;

const generateMockState = ({
  allowedMfaTypes,
  unverifiedUserAttributes,
}: {
  allowedMfaTypes?: AuthActorContext['allowedMfaTypes'];
  unverifiedUserAttributes?: AuthActorContext['unverifiedUserAttributes'];
} = {}): AuthMachineState => {
  return {
    context: {
      actorRef: {
        getSnapshot: () => ({
          context: {
            allowedMfaTypes,
            unverifiedUserAttributes,
          },
        }),
      },
    },
  } as AuthMachineState;
};

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

describe('getMachineFields', () => {
  it('calls getSortedFormFields when route is a valid component route', () => {
    const state = generateMockState();
    getMachineFields('signIn', state);

    expect(getSortedFormFieldsSpy).toHaveBeenCalledWith('signIn', state);
  });

  it('returns an empty array for a non-component route', () => {
    const output = getMachineFields('idle', generateMockState());

    expect(output).toHaveLength(0);
  });

  it('returns the expected values for selectMfaType route', () => {
    const state = generateMockState({
      allowedMfaTypes: ['EMAIL', 'TOTP'],
    });
    const output = getMachineFields('selectMfaType', state);

    expect(output).toHaveLength(2);
    expect(output).toStrictEqual([
      {
        name: 'mfa_type',
        label: 'Email Message',
        type: 'radio',
        value: 'EMAIL',
      },
      {
        name: 'mfa_type',
        label: 'Authenticator App (TOTP)',
        type: 'radio',
        value: 'TOTP',
      },
    ]);
  });

  it('returns expected values for verifyUser route', () => {
    const state = generateMockState({
      unverifiedUserAttributes: { email: 'test@example.com' },
    });

    const output = getMachineFields('verifyUser', state);

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
    const state = generateMockState();
    const output = getMachineFields('verifyUser', state);

    expect(output).toHaveLength(0);
    expect(output).toStrictEqual([]);
  });

  it('returns expected values for verifyUser route when contact method value is invalid', () => {
    const state = generateMockState({
      unverifiedUserAttributes: { phone_number: null as unknown as string },
    });

    const output = getMachineFields('verifyUser', state);

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

    it('returns an empty object if no QRfields are present', () => {
      getActorContextSpy.mockReturnValue({} as AuthActorContext);
      const QRFields = getQRFields(state);
      expect(QRFields).toEqual({});
    });

    it('returns an empty object when getActorContext returns undefined', () => {
      getActorContextSpy.mockReturnValue(
        undefined as unknown as AuthActorContext
      );
      const QRFields = getQRFields(state);
      expect(QRFields).toEqual({});
    });
  });
});

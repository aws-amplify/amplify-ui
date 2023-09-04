import * as UIModule from '@aws-amplify/ui';
import { AuthActorContext, AuthMachineState } from '@aws-amplify/ui';
import { getQRFields } from '../useAuth';

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
    getActorContextSpy.mockReturnValue({});
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

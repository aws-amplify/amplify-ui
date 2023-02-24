import { facade } from '../useUtils';
import { AuthenticatorServiceFacade } from '@aws-amplify/ui';

import { InterpretService } from '@/components';
import { useAuthenticator, useAuth, updateAuthValues } from '..';

// test setup
jest.mock('@xstate/vue', () => ({
  ...jest.requireActual('@xstate/vue'),
  useActor: jest.fn((value) => value),
}));

describe('useAuth composables', () => {
  it('useAuth returns existing service when nothing is passed in', () => {
    const value = useAuth();
    expect(value).toBe(undefined);
  });
  it('useAuth returns value sent to it', () => {
    const value = useAuth('5' as unknown as InterpretService);
    expect(value).toBe('5');
  });
  it('updateAuthValues updates useAuthenticator', () => {
    const errorText = 'error text';
    const newFacade: AuthenticatorServiceFacade = {
      ...facade,
      error: errorText,
    };

    updateAuthValues(newFacade);
    const { error } = useAuthenticator();
    expect(error).toBe(errorText);
  });
});

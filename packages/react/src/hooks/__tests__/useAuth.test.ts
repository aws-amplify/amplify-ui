import { Auth } from '@aws-amplify/auth';
import { renderHook } from '@testing-library/react-hooks';
import { useAuth } from '../useAuth';

jest.mock('@aws-amplify/auth');

describe('useAuth', () => {
  afterEach(() => jest.clearAllMocks());

  it('should return default values when initialized', async () => {
    (Auth.currentAuthenticatedUser as jest.Mock).mockResolvedValue(undefined);

    const { result, waitForNextUpdate } = renderHook(() => useAuth());

    expect(result.current.user).toBe(undefined);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeUndefined();

    await waitForNextUpdate();
  });

  it('should invoke Auth.currentAuthenticatedUser function', async () => {
    const mockCurrentAuthenticatedUser = jest.fn(() => Promise.resolve());

    (Auth.currentAuthenticatedUser as jest.Mock).mockImplementation(
      mockCurrentAuthenticatedUser
    );

    const { waitForNextUpdate } = renderHook(() => useAuth());

    await waitForNextUpdate();

    expect(mockCurrentAuthenticatedUser).toHaveBeenCalled();
  });

  it('should set an error when retrieved user is not found', async () => {
    (Auth.currentAuthenticatedUser as jest.Mock).mockResolvedValue(undefined);

    const { result, waitForNextUpdate } = renderHook(() => useAuth());

    await waitForNextUpdate();

    expect(result.current.error).not.toBeUndefined();
  });

  it('should set an error when something unexpected happen', async () => {
    (Auth.currentAuthenticatedUser as jest.Mock).mockRejectedValue(
      new Error('Unknown error')
    );

    const { result, waitForNextUpdate } = renderHook(() => useAuth());

    await waitForNextUpdate();

    expect(result.current.error).not.toBeUndefined();
  });

  it('should retrieve a Cognito user', async () => {
    const mockCognitoUser = {
      username: 'johndoe',
      attributes: {
        phone_number: '+1-234-567-890',
        email: 'john@doe.com',
      },
    };

    (Auth.currentAuthenticatedUser as jest.Mock).mockResolvedValue(
      mockCognitoUser
    );

    const { result, waitForNextUpdate } = renderHook(() => useAuth());

    await waitForNextUpdate();

    expect(result.current.error).toBeUndefined();
    expect(result.current.user).toBe(mockCognitoUser);
  });
});

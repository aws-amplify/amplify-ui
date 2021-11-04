import { Auth } from '@aws-amplify/auth';
import { renderHook } from '@testing-library/react-hooks';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { useAuthenticatedUser } from '../useAuthenticatedUser';

jest.mock('@aws-amplify/auth');

describe('useAuthenticatedUser', () => {
  afterEach(() => jest.clearAllMocks());

  it('should return default values when initialized', async () => {
    (Auth.currentAuthenticatedUser as jest.Mock).mockResolvedValue(undefined);

    const { result, waitForNextUpdate } = renderHook(() =>
      useAuthenticatedUser()
    );

    expect(result.current.attributes).toMatchObject({});
    expect(result.current.error).toBeUndefined();
    expect(result.current.username).toBeUndefined();

    await waitForNextUpdate();
  });

  it('should invoke Auth.currentAuthenticatedUser function', async () => {
    const mockCurrentAuthenticatedUser = jest.fn(() => Promise.resolve());

    (Auth.currentAuthenticatedUser as jest.Mock).mockImplementation(
      mockCurrentAuthenticatedUser
    );

    const { waitForNextUpdate } = renderHook(() => useAuthenticatedUser());

    await waitForNextUpdate();

    expect(mockCurrentAuthenticatedUser).toHaveBeenCalled();
  });

  it('should set an error when retrieved user is not found', async () => {
    (Auth.currentAuthenticatedUser as jest.Mock).mockResolvedValue(undefined);

    const { result, waitForNextUpdate } = renderHook(() =>
      useAuthenticatedUser()
    );

    await waitForNextUpdate();

    expect(result.current.error).not.toBeUndefined();
  });

  it('should set an error when something unexpected happen', async () => {
    (Auth.currentAuthenticatedUser as jest.Mock).mockRejectedValue(
      new Error('Unknown error')
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useAuthenticatedUser()
    );

    await waitForNextUpdate();

    expect(result.current.error).not.toBeUndefined();
  });

  it("should set an error when attributes can't be fetched", async () => {
    const mockCognitoUser = {
      getUsername: () => 'fake-username',
      getUserAttributes: () => {
        throw new Error('Unexpected error fetching attributes');
      },
    };

    (Auth.currentAuthenticatedUser as jest.Mock).mockResolvedValue(
      mockCognitoUser
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useAuthenticatedUser()
    );

    await waitForNextUpdate();

    expect(result.current.error).not.toBeUndefined();
  });

  it('should retrieve username from Cognito user', async () => {
    const mockCognitoUser = {
      getUsername: () => 'fake-username',
      getUserAttributes: () => {},
    };

    (Auth.currentAuthenticatedUser as jest.Mock).mockResolvedValue(
      mockCognitoUser
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useAuthenticatedUser()
    );

    await waitForNextUpdate();

    expect(result.current.error).toBeUndefined();
    expect(result.current.username).toBe(mockCognitoUser.getUsername());
  });

  it('should retrieve attributes from Cognito user', async () => {
    const mockAttributeList = [
      new CognitoUserAttribute({
        Name: 'phone_number',
        Value: '+1-123-456-7890',
      }),
      new CognitoUserAttribute({
        Name: 'special_field',
        Value: 'special value',
      }),
    ];

    const mockCognitoUser = {
      getUsername: () => 'fake-username',
      getUserAttributes: (callback: Function) =>
        callback(undefined, mockAttributeList),
    };

    (Auth.currentAuthenticatedUser as jest.Mock).mockResolvedValue(
      mockCognitoUser
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useAuthenticatedUser()
    );

    await waitForNextUpdate();

    expect(result.current.error).toBeUndefined();

    expect(result.current.attributes).toMatchObject({
      phone_number: mockAttributeList[0].Value,
      special_field: mockAttributeList[1].Value,
    });
  });
});

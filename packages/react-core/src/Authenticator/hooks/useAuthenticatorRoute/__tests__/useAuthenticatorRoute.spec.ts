import { renderHook } from '@testing-library/react-hooks';

import { RenderNothing } from '../../../../components';
import { DEFAULTS } from '../../__mock__/components';
import { mockUseAuthenticatorOutput } from '../../useAuthenticator/__mock__/useAuthenticator';
import { useAuthenticator } from '../../useAuthenticator';

import { useAuthenticatorRoute } from '..';

jest.mock('../../useAuthenticator');

const { error, fields, getTotpSecretCode, isPending, toSignIn, user } =
  mockUseAuthenticatorOutput;

const { challengeName, username: totpUsername } = user;

const totpIssuer = 'AWSCognito';

describe('useAuthenticatorRoute', () => {
  it.each([
    // ['confirmResetPassword', DEFAULTS.ConfirmResetPassword],
    [
      'confirmSignIn',
      DEFAULTS.ConfirmSignIn,
      { challengeName, error, fields, isPending, toSignIn },
    ],
    // ['confirmSignUp', DEFAULTS.ConfirmSignUp],
    // ['confirmVerifyUser', DEFAULTS.ConfirmVerifyUser],
    // ['forceNewPassword', DEFAULTS.ForceNewPassword],
    // ['resetPassword', DEFAULTS.ResetPassword],
    [
      'setupTOTP',
      DEFAULTS.SetupTOTP,
      { error, fields, isPending, getTotpSecretCode, totpIssuer, totpUsername },
    ],
    // ['signIn', DEFAULTS.SignIn],
    // ['signUp', DEFAULTS.SignUp],
    // ['verifyUser', DEFAULTS.VerifyUser],
  ])(
    'returns the expected values for the %s route',
    (route, Component, useAuthenticatorProps) => {
      (useAuthenticator as jest.Mock).mockReturnValue({
        ...mockUseAuthenticatorOutput,
        route,
      });
      const { result } = renderHook(() =>
        useAuthenticatorRoute({ components: DEFAULTS })
      );
      expect(result.current).toStrictEqual({
        Component,
        props: { ...Component, ...useAuthenticatorProps },
      });
    }
  );

  it('returns the expected values for a non-component route', () => {
    (useAuthenticator as jest.Mock).mockReturnValueOnce({ route: 'idle' });
    const { result } = renderHook(() =>
      useAuthenticatorRoute({ components: DEFAULTS })
    );
    expect(result.current).toStrictEqual({
      Component: RenderNothing,
      props: {},
    });
  });
});

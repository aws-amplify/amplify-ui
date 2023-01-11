import * as React from 'react';
import { act, render } from '@testing-library/react';

import * as UI from '@aws-amplify/ui';
import { useAuthenticator } from '@aws-amplify/ui-react-core';

import { SetupTOTP } from '..';

jest.mock('qrcode');

jest.mock('../../hooks/useFormHandlers', () => ({
  useFormHandlers: () => ({ handleChange: jest.fn(), handleSubmit: jest.fn() }),
}));

jest.mock('@aws-amplify/ui-react-core');

jest.mock('../../hooks/useCustomComponents', () => ({
  useCustomComponents: () => ({
    components: {
      Header: () => null,
      Footer: () => null,
      SetupTOTP: { Header: () => null, Footer: () => null },
    },
  }),
}));

jest.mock('../../shared/FormFields', () => ({ FormFields: () => null }));

const DEFAULT_TOTP_ISSUER = 'AWSCognito';
const SECRET_KEY = 'secretKey';

const mockUser = { username: 'username' };

const getTotpCodeURLSpy = jest.spyOn(UI, 'getTotpCodeURL');

describe('SetupTOTP', () => {
  let mockGetTotpSecretCode: jest.Mock;
  beforeEach(() => {
    jest.clearAllMocks();

    mockGetTotpSecretCode = jest.fn().mockResolvedValue(SECRET_KEY);

    (useAuthenticator as jest.Mock).mockReturnValue({
      isPending: false,
      user: mockUser,
      getTotpSecretCode: mockGetTotpSecretCode,
    });
  });

  it('handles an undefined value when looking up its form field values', async () => {
    await act(async () => {
      render(<SetupTOTP className="className" variation="default" />);
    });

    expect(getTotpCodeURLSpy).toHaveBeenCalledTimes(1);
    expect(getTotpCodeURLSpy).toHaveBeenCalledWith(
      DEFAULT_TOTP_ISSUER,
      mockUser.username,
      SECRET_KEY
    );
  });

  it('handles custom values passed as form field values', async () => {
    const customTotpIssuer = 'customTOTPIssuer';
    const customTotpUsername = 'customTotpUsername';

    (useAuthenticator as jest.Mock).mockReturnValue({
      isPending: false,
      QRFields: {
        totpIssuer: customTotpIssuer,
        totpUsername: customTotpUsername,
      },
      getTotpSecretCode: mockGetTotpSecretCode,
      user: mockUser,
    });

    await act(async () => {
      render(<SetupTOTP className="className" variation="default" />);
    });

    expect(getTotpCodeURLSpy).toHaveBeenCalledTimes(1);
    expect(getTotpCodeURLSpy).toHaveBeenCalledWith(
      customTotpIssuer,
      customTotpUsername,
      SECRET_KEY
    );
  });
});

import * as React from 'react';
import { act, render } from '@testing-library/react';
import QRCode from 'qrcode';
import { Auth } from 'aws-amplify';

import { SetupTOTP } from '../SetupTOTP';
import { getTotpCode } from '@aws-amplify/ui';

jest.mock('../../hooks/useFormHandlers', () => ({
  useFormHandlers: () => ({ handleChange: jest.fn(), handleSubmit: jest.fn() }),
}));

jest.mock('../../hooks/useAuthenticator', () => ({
  useAuthenticator: () => ({ _state: {}, isPending: false }),
}));

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

const mockUser = { username: 'username' };
const mockContext = { formFields: { setupTOTP: { QR: null } }, user: mockUser };
jest.mock('@aws-amplify/ui', () => ({
  ...(jest.requireActual('@aws-amplify/ui') as {}),
  getActorState: () => ({ context: mockContext }),
}));

const DEFAULT_TOTP_ISSUER = 'AWSCognito';
const SECRET_KEY = 'secretKey';

const setupTOTPSpy = jest.spyOn(Auth, 'setupTOTP');
const toDataURLSpy = jest.spyOn(QRCode, 'toDataURL');

describe('SetupTOTP', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    setupTOTPSpy.mockResolvedValue(SECRET_KEY);
  });

  it('handles an undefined value when looking up its form field values', async () => {
    const defaultTotpCode = getTotpCode(
      DEFAULT_TOTP_ISSUER,
      mockUser.username,
      SECRET_KEY
    );

    await act(async () => {
      render(<SetupTOTP className="className" variation="default" />);
    });

    expect(setupTOTPSpy).toHaveBeenCalledTimes(1);
    expect(setupTOTPSpy).toHaveBeenCalledWith(mockUser);

    expect(toDataURLSpy).toHaveBeenCalledTimes(1);
    expect(toDataURLSpy).toHaveBeenCalledWith(defaultTotpCode);
  });

  it('handles custom values passed as form field values', async () => {
    const customTotpIssuer = 'customTOTPIssuer';
    const customTotpUsername = 'customTotpUsername';

    mockContext.formFields.setupTOTP.QR = {
      totpIssuer: customTotpIssuer,
      totpUsername: customTotpUsername,
    };

    const customTotpCode = getTotpCode(
      customTotpIssuer,
      customTotpUsername,
      SECRET_KEY
    );

    await act(async () => {
      render(<SetupTOTP className="className" variation="default" />);
    });

    expect(setupTOTPSpy).toHaveBeenCalledTimes(1);
    expect(setupTOTPSpy).toHaveBeenCalledWith(mockUser);

    expect(toDataURLSpy).toHaveBeenCalledTimes(1);
    expect(toDataURLSpy).toHaveBeenCalledWith(customTotpCode);
  });

  describe('QR Tests', () => {
    it('handles customTotpIssuer with spaces', async () => {
      const customTotpIssuer = 'customTOTPIssuer spaces';
      const customTotpUsername = 'customTotpUsername';

      const customTotpCode = getTotpCode(
        customTotpIssuer,
        customTotpUsername,
        SECRET_KEY
      );

      expect(customTotpCode).toBe(
        'otpauth://totp/customTOTPIssuer%20spaces:customTotpUsername?secret=secretKey&issuer=customTOTPIssuer%20spaces'
      );
    });
  });
});

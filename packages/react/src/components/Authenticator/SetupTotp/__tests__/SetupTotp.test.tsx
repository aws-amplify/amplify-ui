import * as React from 'react';
import { act, render } from '@testing-library/react';

import * as UI from '@aws-amplify/ui';
import { useAuthenticator, UseAuthenticator } from '@aws-amplify/ui-react-core';

import { SetupTotp } from '..';

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
      SetupTotp: { Header: () => null, Footer: () => null },
    },
  }),
}));

jest.mock('../../shared/FormFields', () => ({ FormFields: () => null }));

const DEFAULT_TOTP_ISSUER = 'AWSCognito';
const SECRET_KEY = "Don't tell anyone";

const username = 'username';

const getTotpCodeURLSpy = jest.spyOn(UI, 'getTotpCodeURL');

describe('SetupTotp', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useAuthenticator as jest.Mock).mockReturnValue({
      isPending: false,
      username,
      totpSecretCode: SECRET_KEY,
    } as UseAuthenticator);
  });

  it('handles an undefined value when looking up QR field values', async () => {
    await act(async () => {
      render(<SetupTotp className="className" variation="default" />);
    });

    expect(getTotpCodeURLSpy).toHaveBeenCalledTimes(1);
    expect(getTotpCodeURLSpy).toHaveBeenCalledWith(
      DEFAULT_TOTP_ISSUER,
      username,
      SECRET_KEY
    );
  });

  it('handles custom values passed as QR field values', async () => {
    const customTotpIssuer = 'customTOTPIssuer';
    const customTotpUsername = 'customTotpUsername';

    (useAuthenticator as jest.Mock).mockReturnValue({
      isPending: false,
      QRFields: {
        totpIssuer: customTotpIssuer,
        totpUsername: customTotpUsername,
      },
      totpSecretCode: SECRET_KEY,
      username,
    } as UseAuthenticator);

    await act(async () => {
      render(<SetupTotp className="className" variation="default" />);
    });

    expect(getTotpCodeURLSpy).toHaveBeenCalledTimes(1);
    expect(getTotpCodeURLSpy).toHaveBeenCalledWith(
      customTotpIssuer,
      customTotpUsername,
      SECRET_KEY
    );
  });
});

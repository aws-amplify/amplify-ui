import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { useAuthenticator, UseAuthenticator } from '@aws-amplify/ui-react-core';

import { VerifyUser } from '..';

jest.mock('@aws-amplify/ui-react-core');

jest.mock('../../hooks/useFormHandlers', () => ({
  useFormHandlers: () => ({ handleChange: jest.fn(), handleSubmit: jest.fn() }),
}));

jest.mock('../../hooks/useCustomComponents', () => ({
  useCustomComponents: () => ({
    components: {
      Header: () => null,
      Footer: () => null,
      VerifyUser: { Header: () => null, Footer: () => null },
    },
  }),
}));

describe('VerifyUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should select the first unverified attribute', async () => {
    (useAuthenticator as jest.Mock).mockReturnValue({
      isPending: false,
      unverifiedUserAttributes: {
        email: 'test@example.com',
      },
    } as UseAuthenticator);

    render(<VerifyUser className="className" variation="default" />);

    const radioInput = screen.getByRole('radio', {
      name: (content) => content.startsWith('Email:'),
    });

    expect(radioInput).toBeChecked();
  });

  it('should select the first unverified attribute when there are multiple attributes', async () => {
    (useAuthenticator as jest.Mock).mockReturnValue({
      isPending: false,
      unverifiedUserAttributes: {
        phone_number: '+1234566789',
        email: 'test@example.com',
      },
    } as UseAuthenticator);

    render(<VerifyUser className="className" variation="default" />);

    const phoneNumberRadioInput = screen.getByRole('radio', {
      name: (content) => content.startsWith('Phone Number:'),
    });

    const emailRadioInput = screen.getByRole('radio', {
      name: (content) => content.startsWith('Email:'),
    });

    expect(phoneNumberRadioInput).toBeChecked();
    expect(emailRadioInput).not.toBeChecked();
  });
});

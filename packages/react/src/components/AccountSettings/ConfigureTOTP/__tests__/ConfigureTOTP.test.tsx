import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';

import * as UIModule from '@aws-amplify/ui';

import ConfigureTOTP from '../ConfigureTOTP';

const user = { username: 'testuser' } as unknown as UIModule.AmplifyUser;
jest.mock('../../../../internal', () => ({
  useAuth: () => ({
    user,
    isLoading: false,
  }),
}));

const setupTOTPSpy = jest.spyOn(UIModule, 'setupTOTP');
const verifyTOTPToken = jest.spyOn(UIModule, 'verifyTOTPToken');

describe('ConfigureTOTP', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders as expected', () => {
    setupTOTPSpy.mockResolvedValue('secretcode');
    const { container } = render(<ConfigureTOTP />);
    expect(container).toMatchSnapshot();
  });

  it('calls setupTOTP with expected arguments', async () => {
    setupTOTPSpy.mockResolvedValue('secretcode');

    render(<ConfigureTOTP />);

    await screen.findByAltText('qr code');
    expect(setupTOTPSpy).toHaveBeenCalledWith(user);
  });

  it('onSuccess is called after successful totp verification', async () => {
    setupTOTPSpy.mockResolvedValue('secretcode');
    verifyTOTPToken.mockResolvedValue();

    const onSuccess = jest.fn();

    await act(async () => {
      render(<ConfigureTOTP onSuccess={onSuccess} />);
    });

    const submitButton = await screen.findByRole('button', {
      name: 'Confirm',
    });
    fireEvent.submit(submitButton);

    // submit handling is async, wait for onSuccess to be called
    // https://testing-library.com/docs/dom-testing-library/api-async/#waitfor
    await waitFor(() => expect(onSuccess).toBeCalledTimes(1));
  });

  it('onError is called after unsuccessful submit', async () => {
    setupTOTPSpy.mockResolvedValue('secretCode');
    verifyTOTPToken.mockRejectedValue(new Error('Mock Error'));

    const onError = jest.fn();
    await act(async () => {
      render(<ConfigureTOTP onError={onError} />);
    });
    const submitButton = await screen.findByRole('button', {
      name: 'Confirm',
    });

    fireEvent.submit(submitButton);

    // submit handling is async, wait for onError to be called
    await waitFor(() => expect(onError).toBeCalledTimes(1));
  });

  it('error message is displayed after unsuccessful submit', async () => {
    setupTOTPSpy.mockResolvedValue('secretCode');
    verifyTOTPToken.mockRejectedValue(new Error('Mock Error'));

    const onError = jest.fn();

    await act(async () => {
      render(<ConfigureTOTP onError={onError} />);
    });

    const submitButton = await screen.findByRole('button', {
      name: 'Confirm',
    });

    fireEvent.submit(submitButton);

    // submit handling is async, wait for error to be displayed
    expect(await screen.findByText('Mock Error')).toBeDefined();
  });

  it('error message is displayed after unsuccessful submit', async () => {
    setupTOTPSpy.mockResolvedValue('secretCode');
    verifyTOTPToken.mockRejectedValue(new Error('Mock Error'));

    const onError = jest.fn();
    await act(async () => {
      render(<ConfigureTOTP onError={onError} />);
    });

    const submitButton = await screen.findByRole('button', {
      name: 'Confirm',
    });

    fireEvent.submit(submitButton);

    expect(await screen.findByText('Mock Error')).toBeDefined();
  });
});

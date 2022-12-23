import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';

import * as UIModule from '@aws-amplify/ui';
import * as ReactCoreModule from '@aws-amplify/ui-react-core';

import SetupTOTP from '../SetupTOTP';

const user = { username: 'testuser' } as unknown as UIModule.AmplifyUser;
jest.spyOn(ReactCoreModule, 'useAuth').mockImplementation(() => ({
  user,
  isLoading: false,
}));

const setupTOTPSpy = jest.spyOn(UIModule, 'setupTOTP');
const verifyTOTPToken = jest.spyOn(UIModule, 'verifyTOTPToken');

describe('SetupTOTP', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders as expected', () => {
    setupTOTPSpy.mockResolvedValue('secretcode');
    const { container } = render(<SetupTOTP />);
    expect(container).toMatchSnapshot();
  });

  it('calls setupTOTP with expected arguments', async () => {
    setupTOTPSpy.mockResolvedValue('secretcode');

    render(<SetupTOTP />);

    await screen.findByAltText('qr code');
    expect(setupTOTPSpy).toHaveBeenCalledWith(user);
  });

  it('calls onSuccess on successful totp verification', async () => {
    setupTOTPSpy.mockResolvedValue('secretcode');
    verifyTOTPToken.mockResolvedValue();

    const onSuccess = jest.fn();

    await act(async () => {
      render(<SetupTOTP onSuccess={onSuccess} />);
    });

    const submitButton = await screen.findByRole('button', {
      name: 'Confirm',
    });
    fireEvent.submit(submitButton);

    // submit handling is async, wait for onSuccess to be called
    // https://testing-library.com/docs/dom-testing-library/api-async/#waitfor
    await waitFor(() => expect(onSuccess).toBeCalledTimes(1));
  });

  it('calls onError after unsuccessful submit', async () => {
    setupTOTPSpy.mockResolvedValue('secretCode');
    verifyTOTPToken.mockRejectedValue(new Error('Mock Error'));

    const onError = jest.fn();
    await act(async () => {
      render(<SetupTOTP onError={onError} />);
    });
    const submitButton = await screen.findByRole('button', {
      name: 'Confirm',
    });

    fireEvent.submit(submitButton);

    // submit handling is async, wait for onError to be called
    await waitFor(() => expect(onError).toBeCalledTimes(1));
  });

  it('displays an error message on unsuccessful submit', async () => {
    setupTOTPSpy.mockResolvedValue('secretCode');
    verifyTOTPToken.mockRejectedValue(new Error('Mock Error'));

    const onError = jest.fn();

    await act(async () => {
      render(<SetupTOTP onError={onError} />);
    });

    const submitButton = await screen.findByRole('button', {
      name: 'Confirm',
    });

    fireEvent.submit(submitButton);

    // submit handling is async, wait for error to be displayed
    expect(await screen.findByText('Mock Error')).toBeDefined();
  });
});

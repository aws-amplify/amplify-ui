import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import * as UIModule from '@aws-amplify/ui';

import ChangePassword from '../ChangePassword';

const user = {} as unknown as UIModule.AmplifyUser;
jest.mock('../../../../internal', () => ({
  useAuth: () => ({
    user,
    isLoading: false,
  }),
}));

const changePasswordSpy = jest.spyOn(UIModule, 'changePassword');

describe('ChangePassword', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders as expected', () => {
    const { container } = render(<ChangePassword />);
    expect(container).toMatchSnapshot();
  });

  it('calls changePassword with expected arguments', async () => {
    changePasswordSpy.mockResolvedValue();

    const onSuccess = jest.fn();
    render(<ChangePassword onSuccess={onSuccess} />);

    const currentPassword = await screen.findByLabelText('Current Password');
    const newPassword = await screen.findByLabelText('New Password');
    const submitButton = await screen.findByRole('button', {
      name: 'Update password',
    });

    fireEvent.input(currentPassword, {
      target: { name: 'currentPassword', value: 'oldpassword' },
    });

    fireEvent.input(newPassword, {
      target: { name: 'newPassword', value: 'newpassword' },
    });

    fireEvent.submit(submitButton);

    expect(changePasswordSpy).toBeCalledWith({
      user,
      currentPassword: 'oldpassword',
      newPassword: 'newpassword',
    });
  });

  it('onSuccess is called after successful sign up', async () => {
    changePasswordSpy.mockResolvedValue();

    const onSuccess = jest.fn();
    render(<ChangePassword onSuccess={onSuccess} />);

    const submitButton = await screen.findByRole('button', {
      name: 'Update password',
    });
    fireEvent.submit(submitButton);

    // submit handling is async, wait for onSuccess to be called
    await waitFor(() => expect(onSuccess).toBeCalledTimes(1));
  });

  it('onError is called after unsuccessful submit', async () => {
    changePasswordSpy.mockRejectedValue(new Error('Mock Error'));

    const onError = jest.fn();
    render(<ChangePassword onError={onError} />);

    const submitButton = await screen.findByRole('button', {
      name: 'Update password',
    });

    fireEvent.submit(submitButton);

    // submit handling is async, wait for onError to be called
    // https://testing-library.com/docs/dom-testing-library/api-async/#waitfor
    await waitFor(() => expect(onError).toBeCalledTimes(1));
  });

  it('error message is displayed after unsuccessful submit', async () => {
    changePasswordSpy.mockRejectedValue(new Error('Mock Error'));

    const onError = jest.fn();
    render(<ChangePassword onError={onError} />);

    const submitButton = await screen.findByRole('button', {
      name: 'Update password',
    });

    fireEvent.submit(submitButton);

    // submit handling is async, wait for error to be displayed
    await waitFor(() => expect(screen.findByText('Mock Error')).toBeDefined());
  });
});

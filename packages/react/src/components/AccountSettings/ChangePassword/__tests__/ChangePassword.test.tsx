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
jest.spyOn(UIModule, 'getPasswordSettings').mockReturnValue({
  passwordPolicyMinLength: 4,
  passwordPolicyCharacters: ['REQUIRES_LOWERCASE', 'REQUIRES_UPPERCASE'],
});

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
    // https://testing-library.com/docs/dom-testing-library/api-async/#waitfor
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
    await waitFor(() => expect(onError).toBeCalledTimes(1));
  });

  it('displays error message after unsuccessful submit', async () => {
    changePasswordSpy.mockRejectedValue(new Error('Mock Error'));

    const onError = jest.fn();
    render(<ChangePassword onError={onError} />);

    const submitButton = await screen.findByRole('button', {
      name: 'Update password',
    });

    fireEvent.submit(submitButton);

    // findBy is already async, so we do not need to use `waitFor`
    // https://testing-library.com/docs/queries/about#types-of-queries
    expect(await screen.findByText('Mock Error')).toBeDefined();
  });

  it('disables submit button on init', async () => {
    render(<ChangePassword />);

    const submitButton = await screen.findByRole('button', {
      name: 'Update password',
    });

    expect(submitButton).toHaveAttribute('disabled');
  });

  it('enables submit button once formValues are valid', async () => {
    render(<ChangePassword />);

    const currentPassword = await screen.findByLabelText('Current Password');
    const newPassword = await screen.findByLabelText('New Password');
    const confirmPassword = await screen.findByLabelText('Confirm Password');
    const submitButton = await screen.findByRole('button', {
      name: 'Update password',
    });

    fireEvent.input(currentPassword, {
      target: { name: 'currentPassword', value: 'oldpassword' },
    });

    fireEvent.input(newPassword, {
      target: { name: 'newPassword', value: 'Newpassword' },
    });

    fireEvent.input(confirmPassword, {
      target: { name: 'newPassword', value: 'Newpassword' },
    });

    // validation handling is async, wait for button to be re-enabled.
    waitFor(() => expect(submitButton).not.toHaveAttribute('disabled'));
  });

  it('displays new password validation error message', async () => {
    render(<ChangePassword />);

    const newPassword = await screen.findByLabelText('New Password');
    const submitButton = await screen.findByRole('button', {
      name: 'Update password',
    });

    fireEvent.input(newPassword, {
      target: { name: 'newPassword', value: 'badpassword' },
    });

    fireEvent.blur(newPassword, {
      target: { name: 'newPassword', value: 'badpassword' },
    });

    const validationError = await screen.findByText(
      'Password must have upper case letters'
    );

    expect(validationError).toBeDefined();
    expect(submitButton).toHaveAttribute('disabled');
  });

  it('displays confirm password validation error message', async () => {
    render(<ChangePassword />);

    const newPassword = await screen.findByLabelText('New Password');
    const confirmPassword = await screen.findByLabelText('Confirm Password');
    const submitButton = await screen.findByRole('button', {
      name: 'Update password',
    });

    fireEvent.input(newPassword, {
      target: { name: 'newPassword', value: 'newpassword' },
    });

    fireEvent.input(confirmPassword, {
      target: { name: 'confirmPassword', value: 'differentpassword' },
    });

    const validationError = await screen.findByText(
      'Your passwords must match'
    );

    expect(validationError).toBeDefined();
    expect(submitButton).toHaveAttribute('disabled');
  });
});
